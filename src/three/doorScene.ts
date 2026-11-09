/**
 * Procedural Babylon.js scene: an aluminium-framed double glass door with side lites.
 * Built entirely from primitives (no external models or environment textures), so it is
 * light to download and works offline. Loaded lazily via dynamic import.
 */
import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { PointLight } from '@babylonjs/core/Lights/pointLight'
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color'
import { TransformNode } from '@babylonjs/core/Meshes/transformNode'
import type { Mesh } from '@babylonjs/core/Meshes/mesh'
import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder'
import { CreateCylinder } from '@babylonjs/core/Meshes/Builders/cylinderBuilder'
import { CreateDisc } from '@babylonjs/core/Meshes/Builders/discBuilder'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { FresnelParameters } from '@babylonjs/core/Materials/fresnelParameters'

export type DoorScene = {
  /** 0 = closed, 1 = fully open. */
  setOpen: (p: number) => void
  /** Pause / resume rendering (e.g. when off-screen). */
  setActive: (active: boolean) => void
  dispose: () => void
}

type Options = { interactive: boolean; reducedMotion: boolean }

const ALU = Color3.FromHexString('#34363B')
const VIOLET = Color3.FromHexString('#6D42A6')

export function createDoorScene(canvas: HTMLCanvasElement, opts: Options): DoorScene {
  const engine = new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: false, antialias: true }, true)
  engine.setHardwareScalingLevel(1 / Math.min(window.devicePixelRatio || 1, 2))

  const scene = new Scene(engine)
  scene.clearColor = new Color4(0, 0, 0, 0)
  scene.skipPointerMovePicking = true

  // Camera ------------------------------------------------------------------
  const camera = new ArcRotateCamera('cam', -Math.PI / 2 - 0.35, Math.PI / 2.15, 6.3, new Vector3(0, 1.25, 0), scene)
  camera.fov = 0.62
  camera.minZ = 0.1
  camera.lowerBetaLimit = Math.PI / 3
  camera.upperBetaLimit = Math.PI / 1.9
  camera.lowerAlphaLimit = -Math.PI / 2 - 1.1
  camera.upperAlphaLimit = -Math.PI / 2 + 1.1
  camera.lowerRadiusLimit = camera.upperRadiusLimit = 6.3
  camera.inputs.removeByType('ArcRotateCameraMouseWheelInput')
  camera.inputs.removeByType('ArcRotateCameraKeyboardMoveInput')
  camera.panningSensibility = 0
  camera.angularSensibilityX = 2400
  if (opts.interactive) camera.attachControl(canvas, true)

  // Lights ------------------------------------------------------------------
  const hemi = new HemisphericLight('hemi', new Vector3(0.2, 1, -0.3), scene)
  hemi.intensity = 0.75
  hemi.groundColor = new Color3(0.82, 0.8, 0.86)

  const key = new DirectionalLight('key', new Vector3(0.6, -0.8, 0.9), scene)
  key.intensity = 0.9

  const rim = new PointLight('rim', new Vector3(0, 2.4, 2.2), scene)
  rim.diffuse = VIOLET
  rim.specular = new Color3(0.75, 0.6, 1)
  rim.intensity = 1.1
  rim.range = 9

  // Materials ---------------------------------------------------------------
  const aluMat = new StandardMaterial('alu', scene)
  aluMat.diffuseColor = ALU
  aluMat.specularColor = new Color3(0.45, 0.45, 0.5)
  aluMat.specularPower = 48

  const steelMat = new StandardMaterial('steel', scene)
  steelMat.diffuseColor = new Color3(0.78, 0.79, 0.82)
  steelMat.specularColor = new Color3(1, 1, 1)
  steelMat.specularPower = 96

  const glassMat = new StandardMaterial('glass', scene)
  glassMat.diffuseColor = new Color3(0.86, 0.84, 0.95)
  glassMat.specularColor = new Color3(1, 1, 1)
  glassMat.specularPower = 160
  glassMat.alpha = 0.16
  glassMat.backFaceCulling = false
  glassMat.emissiveFresnelParameters = new FresnelParameters({
    leftColor: new Color3(0.55, 0.42, 0.8),
    rightColor: new Color3(0, 0, 0),
    bias: 0.15,
    power: 2.2,
  })
  glassMat.opacityFresnelParameters = new FresnelParameters({
    leftColor: new Color3(1, 1, 1),
    rightColor: new Color3(0.22, 0.22, 0.22),
    bias: 0.1,
    power: 2,
  })

  const floorMat = new StandardMaterial('floor', scene)
  floorMat.diffuseColor = new Color3(0.9, 0.88, 0.94)
  floorMat.specularColor = new Color3(0, 0, 0)
  floorMat.alpha = 0.55

  // Geometry ----------------------------------------------------------------
  const H = 2.55 // door height
  const LEAF_W = 0.95
  const SIDE_W = 0.5
  const PROF = 0.07 // aluminium profile width
  const DEPTH = 0.1

  const root = new TransformNode('door-root', scene)

  const box = (name: string, w: number, h: number, d: number, pos: Vector3, mat: StandardMaterial, parent: TransformNode): Mesh => {
    const m = CreateBox(name, { width: w, height: h, depth: d }, scene)
    m.position = pos
    m.material = mat
    m.parent = parent
    return m
  }

  /** A rectangular aluminium frame with a glass infill, centred on (cx, cy). */
  const framedPanel = (name: string, w: number, h: number, cx: number, cy: number, parent: TransformNode, prof = PROF) => {
    box(`${name}-top`, w, prof, DEPTH, new Vector3(cx, cy + h / 2 - prof / 2, 0), aluMat, parent)
    box(`${name}-bot`, w, prof * 1.6, DEPTH, new Vector3(cx, cy - h / 2 + (prof * 1.6) / 2, 0), aluMat, parent)
    box(`${name}-l`, prof, h, DEPTH, new Vector3(cx - w / 2 + prof / 2, cy, 0), aluMat, parent)
    box(`${name}-r`, prof, h, DEPTH, new Vector3(cx + w / 2 - prof / 2, cy, 0), aluMat, parent)
    box(`${name}-glass`, w - prof * 1.6, h - prof * 2.2, 0.014, new Vector3(cx, cy + prof * 0.15, 0), glassMat, parent)
  }

  // Outer frame (head + jambs) around the whole opening.
  const totalW = LEAF_W * 2 + SIDE_W * 2 + PROF * 2
  const outer = PROF * 1.3
  box('head', totalW + outer * 2, outer, DEPTH * 1.3, new Vector3(0, H + outer / 2, 0), aluMat, root)
  box('jamb-l', outer, H + outer, DEPTH * 1.3, new Vector3(-totalW / 2 - outer / 2, (H + outer) / 2, 0), aluMat, root)
  box('jamb-r', outer, H + outer, DEPTH * 1.3, new Vector3(totalW / 2 + outer / 2, (H + outer) / 2, 0), aluMat, root)

  // Fixed side lites.
  framedPanel('side-l', SIDE_W, H, -totalW / 2 + SIDE_W / 2, H / 2, root)
  framedPanel('side-r', SIDE_W, H, totalW / 2 - SIDE_W / 2, H / 2, root)

  // Mullions between side lites and door leaves.
  const mullX = LEAF_W + PROF / 2
  box('mull-l', PROF, H, DEPTH * 1.2, new Vector3(-mullX, H / 2, 0), aluMat, root)
  box('mull-r', PROF, H, DEPTH * 1.2, new Vector3(mullX, H / 2, 0), aluMat, root)

  // Door leaves hinge on their outer edge.
  const makeLeaf = (side: -1 | 1) => {
    const hinge = new TransformNode(`hinge-${side}`, scene)
    hinge.parent = root
    hinge.position = new Vector3(side * LEAF_W, 0, 0)
    const leafH = H - 0.02
    framedPanel(`leaf-${side}`, LEAF_W, leafH, -side * (LEAF_W / 2), leafH / 2, hinge, PROF * 1.15)

    // Long pull handle near the meeting stile, on the camera side (−z).
    const hx = -side * (LEAF_W - 0.17)
    const handleLen = 1.3
    const bar = CreateCylinder(`handle-${side}`, { height: handleLen, diameter: 0.034, tessellation: 20 }, scene)
    bar.position = new Vector3(hx, 1.2, -0.13)
    bar.material = steelMat
    bar.parent = hinge
    for (const dy of [-handleLen / 2 + 0.12, handleLen / 2 - 0.12]) {
      const standoff = CreateCylinder(`standoff-${side}-${dy}`, { height: 0.09, diameter: 0.022, tessellation: 12 }, scene)
      standoff.rotation.x = Math.PI / 2
      standoff.position = new Vector3(hx, 1.2 + dy, -0.085)
      standoff.material = steelMat
      standoff.parent = hinge
    }
    return hinge
  }
  const leftHinge = makeLeaf(-1)
  const rightHinge = makeLeaf(1)

  // Soft floor disc.
  const floor = CreateDisc('floor', { radius: 3.4, tessellation: 64 }, scene)
  floor.rotation.x = Math.PI / 2
  floor.position.y = -0.002
  floor.material = floorMat

  // Freeze static meshes for performance (hinges stay dynamic).
  scene.meshes.forEach((m) => {
    if (!m.isDescendantOf(leftHinge) && !m.isDescendantOf(rightHinge)) m.freezeWorldMatrix()
  })

  // Animation state ----------------------------------------------------------
  const MAX_SWING = 1.05 // radians
  let targetOpen = 0
  let open = 0
  let idleT = 0
  let lastInteraction = 0
  const baseAlpha = camera.alpha

  canvas.addEventListener('pointerdown', () => (lastInteraction = performance.now()))

  scene.onBeforeRenderObservable.add(() => {
    const dt = engine.getDeltaTime() / 1000
    open += (targetOpen - open) * Math.min(1, dt * 6)
    leftHinge.rotation.y = open * MAX_SWING
    rightHinge.rotation.y = -open * MAX_SWING

    // Slow idle sway of the camera unless the user is dragging or prefers reduced motion.
    if (!opts.reducedMotion && performance.now() - lastInteraction > 3500) {
      idleT += dt
      const goal = baseAlpha + Math.sin(idleT * 0.35) * 0.32
      camera.alpha += (goal - camera.alpha) * Math.min(1, dt * 1.5)
    }
  })

  let active = false
  const loop = () => scene.render()
  const setActive = (next: boolean) => {
    if (next === active) return
    active = next
    if (active) engine.runRenderLoop(loop)
    else engine.stopRenderLoop(loop)
  }

  const onResize = () => engine.resize()
  const ro = new ResizeObserver(onResize)
  ro.observe(canvas)

  setActive(true)

  return {
    setOpen: (p) => {
      targetOpen = Math.max(0, Math.min(1, p))
    },
    setActive,
    dispose: () => {
      ro.disconnect()
      engine.stopRenderLoop()
      scene.dispose()
      engine.dispose()
    },
  }
}
