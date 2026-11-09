import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FRAME_COUNT = 120
/** Landscape crop for wide screens, full portrait frames for tall (phone) screens. */
const SETS = {
  wide: (i: number) => `/media/bg-wide/f_${String(i + 1).padStart(3, '0')}.webp`,
  tall: (i: number) => `/media/hero/f_${String(i + 1).padStart(3, '0')}.webp`,
}
type SetName = keyof typeof SETS

/**
 * Full-screen, fixed background that "plays" the promotional video as the visitor scrolls
 * anywhere on the page (GSAP ScrollTrigger scrub over the whole document).
 * Frames are drawn to a canvas, which scrubs smoothly on every browser, including iOS Safari.
 */
export function ScrollVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const images = useRef<HTMLImageElement[]>([])
  const frame = useRef(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const index = frame.current
    const imgs = images.current
    let img: HTMLImageElement | undefined
    for (let d = 0; d < FRAME_COUNT; d++) {
      const a = imgs[index - d]
      if (a?.complete && a.naturalWidth) { img = a; break }
      const b = imgs[index + d]
      if (b?.complete && b.naturalWidth) { img = b; break }
    }
    if (!img) return
    const cw = canvas.width
    const ch = canvas.height
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
  }, [])

  // Load the frame set that suits the screen shape; swap if the shape changes.
  useEffect(() => {
    const mq = window.matchMedia('(min-aspect-ratio: 1/1)')
    let cancelled = false
    let idleHandle: number | undefined

    const load = (set: SetName) => {
      const url = SETS[set]
      const imgs: HTMLImageElement[] = []
      images.current = imgs
      // Phones and data-saver connections get every 2nd frame (half the download); the
      // nearest-loaded-frame lookup in draw() keeps scrubbing smooth.
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
      const step = set === 'tall' || saveData ? 2 : 1
      const indices = Array.from({ length: FRAME_COUNT }, (_, i) => i).filter((i) => i % step === 0)
      const first = frame.current - (frame.current % step)
      // Current frame first so something shows immediately, then the rest when idle.
      const order = [first, ...indices.filter((i) => i !== first)]
      const loadOne = (i: number) => {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => {
          if (images.current === imgs && Math.abs(i - frame.current) < 3) draw()
        }
        img.src = url(i)
        imgs[i] = img
      }
      loadOne(order[0])
      const rest = () => {
        for (const i of order.slice(1)) {
          if (cancelled || images.current !== imgs) return
          loadOne(i)
        }
      }
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 150))
      idleHandle = idle(rest) as number
    }

    load(mq.matches ? 'wide' : 'tall')
    const onChange = () => load(mq.matches ? 'wide' : 'tall')
    mq.addEventListener('change', onChange)
    return () => {
      cancelled = true
      mq.removeEventListener('change', onChange)
      if (idleHandle !== undefined && window.cancelIdleCallback) window.cancelIdleCallback(idleHandle)
    }
  }, [draw])

  // Match canvas resolution to the viewport.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      draw()
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [draw])

  // Scroll anywhere on the page -> advance the video.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const state = { f: 0 }
      gsap.to(state, {
        f: FRAME_COUNT - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
        onUpdate() {
          const next = Math.round(state.f)
          if (barRef.current) barRef.current.style.transform = `scaleX(${this.progress()})`
          if (next !== frame.current) {
            frame.current = next
            draw()
          }
        },
      })
    })
    // Recalculate once images/fonts settle the final page height.
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => {
      window.clearTimeout(t)
      mm.revert()
    }
  }, [draw])

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[#140f1d]" aria-hidden="true">
        <canvas ref={canvasRef} className="block h-full w-full" />
        {/* Readability overlay: darker on the left where hero copy sits, light vignette elsewhere. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,10,22,0.78)_0%,rgba(14,10,22,0.45)_45%,rgba(14,10,22,0.2)_100%)] max-md:bg-[linear-gradient(180deg,rgba(14,10,22,0.7)_0%,rgba(14,10,22,0.35)_55%,rgba(14,10,22,0.6)_100%)]" />
      </div>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]" aria-hidden="true">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-violet via-[#b58cf0] to-[#f2c46b]" />
      </div>
    </>
  )
}
