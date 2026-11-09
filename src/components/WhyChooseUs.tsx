import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ClipboardList, Sparkles, MessageCircle, Building2 } from 'lucide-react'

const points = [
  { icon: ClipboardList, title: 'Solutions based on your project requirements', text: 'Tell us about your space and we will discuss options that suit it.' },
  { icon: Sparkles, title: 'Clean, modern product presentation', text: 'Slim aluminium lines and clear glass for a tidy, contemporary look.' },
  { icon: MessageCircle, title: 'Enquiry support through WhatsApp', text: 'Send photos, sizes and questions in one simple chat.' },
  { icon: Building2, title: 'Options for residential and commercial spaces', text: 'From home entrances to offices and shopfronts.' },
]

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null)

  // GSAP ScrollTrigger batch reveal with a light stagger.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('[data-why]', { opacity: 0, y: 34 })
        gsap.from('[data-why-line]', {
          scaleX: 0,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 60%', scrub: true },
        })
        ScrollTrigger.batch('[data-why]', {
          start: 'top 85%',
          once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }),
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} aria-labelledby="why-title" className="py-10 sm:py-20">
      <div className="container-page">
      <div className="glass-theme panel panel-mist">
        <div className="max-w-2xl">
          <p className="eyebrow">Why choose us</p>
          <h2 id="why-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            A simple, personal way to plan your aluminium and glass work
          </h2>
        </div>
        <div data-why-line className="mt-10 h-px w-full bg-gradient-to-r from-violet via-alu/30 to-transparent" aria-hidden="true" />
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, text }) => (
            <li key={title} data-why>
              <Icon className="h-7 w-7 text-violet" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  )
}
