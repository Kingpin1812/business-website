import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu } from 'lucide-react'
import { business, navLinks } from '../config/business'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon } from './WhatsAppIcon'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // Close the menu if the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40"
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(16,12,24,0.72)' : 'rgba(16,12,24,0)',
        boxShadow: scrolled ? '0 10px 30px -18px rgba(0,0,0,0.6)' : '0 0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.3 }}
      style={{
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <a
          href="#home"
          className="flex items-center gap-2 font-extrabold tracking-tight text-white"
          aria-label={`${business.name}, back to top`}
        >
          <img
            src="/media/brand/rg-logo.webp"
            alt=""
            width={480}
            height={251}
            className="h-10 w-auto sm:h-11"
          />
          <span className="text-[0.98rem] leading-none sm:text-lg">
            Ramu <span className="text-[#cdb6f2]">Glass House</span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="rounded-full px-4 py-2 text-[0.95rem] font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppLink className="btn btn-whatsapp hidden !min-h-11 !px-5 sm:inline-flex">
            <WhatsAppIcon /> Chat on WhatsApp
          </WhatsAppLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </motion.header>
  )
}
