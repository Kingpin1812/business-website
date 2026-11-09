import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon } from './WhatsAppIcon'

/** Hero copy sits directly on the scroll-driven video background. */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Slide only (no fade from opacity 0) so the prerendered H1 paints immediately — keeps LCP fast.
        gsap.from('[data-hero-intro]', { y: 22, duration: 0.85, stagger: 0.08, ease: 'power3.out' })
        // Copy drifts up and fades as the visitor scrolls into the page.
        gsap.to('[data-hero-copy]', {
          y: -80,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section id="home" ref={sectionRef} aria-labelledby="hero-title" className="relative">
      <div className="container-page flex min-h-svh flex-col justify-center pb-24 pt-28">
        <div data-hero-copy className="max-w-2xl text-white">
          <img
            data-hero-intro
            src="/media/brand/rg-logo.webp"
            alt="RG Ramu Glass House logo"
            width={480}
            height={251}
            className="mb-6 h-20 w-auto sm:h-24"
          />
          <p data-hero-intro className="eyebrow !text-[#cdb6f2]">Aluminium &amp; Glass Works · Saravanampatti, Coimbatore</p>
          <h1 id="hero-title" data-hero-intro className="mt-5 text-[2.6rem] font-extrabold sm:text-6xl lg:text-[4.2rem]">
            Elegant Aluminium <span className="text-[#cdb6f2]">&amp;</span> Glass Solutions{' '}
            <span className="block text-[0.5em] font-bold text-white/85">in Coimbatore</span>
          </h1>
          <p data-hero-intro className="mt-6 max-w-xl text-lg text-white/80">
            Upgrade your spaces with stylish aluminium and glass solutions. Contact RG Ramu Glass House to discuss
            your requirements.
          </p>
          <div data-hero-intro className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink className="btn btn-whatsapp" message="Hello RG Ramu Glass House, I would like to make an enquiry.">
              <WhatsAppIcon /> Enquire on WhatsApp
            </WhatsAppLink>
            <a href="#services" className="btn btn-outline-light">
              Explore Our Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <p
          data-hero-intro
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 text-sm font-semibold text-white/75"
        >
          <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
          Scroll to play the video
        </p>
      </div>
    </section>
  )
}
