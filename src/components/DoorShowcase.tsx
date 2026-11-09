import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hand, Loader2 } from 'lucide-react'
import type { DoorScene } from '../three/doorScene'
import { Reveal } from './Reveal'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon } from './WhatsAppIcon'

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Interactive 3D double glass door (Babylon.js).
 * The engine chunk is only downloaded when this section approaches the viewport.
 * Scroll position (GSAP ScrollTrigger) swings the doors open.
 */
export function DoorShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'fallback'>('idle')

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    let door: DoorScene | null = null
    let trigger: ScrollTrigger | null = null
    let visObserver: IntersectionObserver | null = null
    let disposed = false

    const start = async () => {
      if (!webglAvailable()) {
        setStatus('fallback')
        return
      }
      setStatus('loading')
      try {
        const { createDoorScene } = await import('../three/doorScene')
        if (disposed) return
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const interactive = window.matchMedia('(pointer: fine)').matches
        door = createDoorScene(canvas, { interactive, reducedMotion })
        setStatus('ready')

        if (reducedMotion) {
          door.setOpen(0.45)
        } else {
          trigger = ScrollTrigger.create({
            trigger: section,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: true,
            onUpdate: (self) => door?.setOpen(gsap.parseEase('power2.inOut')(self.progress)),
          })
        }

        // Only render while on screen.
        visObserver = new IntersectionObserver(([entry]) => door?.setActive(entry.isIntersecting), { threshold: 0 })
        visObserver.observe(canvas)
      } catch (err) {
        console.warn('3D preview unavailable', err)
        setStatus('fallback')
      }
    }

    // Lazy-load when the section is within ~one screen of the viewport.
    const lazy = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lazy.disconnect()
          void start()
        }
      },
      { rootMargin: '100% 0px' },
    )
    lazy.observe(section)

    return () => {
      disposed = true
      lazy.disconnect()
      visObserver?.disconnect()
      trigger?.kill()
      door?.dispose()
    }
  }, [])

  return (
    <section ref={sectionRef} id="showcase" aria-labelledby="showcase-title" className="py-10 sm:py-20">
      <div className="container-page">
      <div className="glass-theme panel grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Explore in 3D</p>
          <h2 id="showcase-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Aluminium-framed glass double doors, in 3D
          </h2>
          <p className="mt-5 text-muted">
            Scroll to swing the doors open. On a computer you can also drag the model to look around it. This is an
            illustrative model of a double glass door with fixed side panels. Your design is planned around your own
            opening and requirements.
          </p>
          <ul className="mt-6 space-y-2 text-[0.95rem] text-ink/85">
            <li className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />Aluminium frame, door leaves and side panels</li>
            <li className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />Long vertical pull handles</li>
            <li className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />Sizes and configuration discussed with you</li>
          </ul>
          <WhatsAppLink
            className="btn btn-whatsapp mt-8"
            message="Hello RG Ramu Glass House, I would like to enquire about a glass double door."
          >
            <WhatsAppIcon /> Ask about a glass door
          </WhatsAppLink>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-[radial-gradient(80%_70%_at_50%_45%,#dccdf5_0%,#8d75b6_55%,#3a2a57_100%)] shadow-[0_40px_80px_-50px_rgba(42,29,61,0.6)]">
            <canvas
              ref={canvasRef}
              className="block h-full w-full touch-pan-y outline-none"
              role="img"
              aria-label="Interactive 3D model of an aluminium-framed double glass door with side panels. The doors open as you scroll."
            />
            {status === 'loading' && (
              <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-muted">
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading 3D preview…
                </span>
              </div>
            )}
            {status === 'fallback' && (
              <img
                src="/media/gallery/still-5.webp"
                alt="Aluminium-framed double glass door"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                width={720}
                height={1280}
              />
            )}
            {status === 'ready' && (
              <p className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur [@media(pointer:fine)]:inline-flex">
                <Hand className="h-3.5 w-3.5" aria-hidden="true" /> Drag to look around
              </p>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-muted">Illustrative 3D model, not to scale.</p>
        </Reveal>
      </div>
      </div>
    </section>
  )
}
