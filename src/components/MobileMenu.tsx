import { useEffect, useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { business, navLinks } from '../config/business'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon } from './WhatsAppIcon'

type Props = { open: boolean; onClose: () => void }

const noopSubscribe = () => () => {}

export function MobileMenu({ open, onClose }: Props) {
  // false during prerender and hydration, true afterwards: the portal target (<body>) only exists in the browser.
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>('a, button')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      opener?.focus({ preventScroll: true })
    }
  }, [open, onClose])

  // Portal to <body>: the header's backdrop-filter would otherwise trap this fixed overlay inside the header box.
  if (!isClient) return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] glass-theme flex-col bg-[#22182f]/92 px-6 pb-8 pt-5 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-alu">{business.name}</span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mist text-alu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-8">
              <motion.ul
                className="space-y-1"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                {navLinks.map((l) => (
                  <motion.li key={l.id} variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                    <a
                      href={`#${l.id}`}
                      onClick={onClose}
                      className="block rounded-xl px-3 py-3 text-xl font-bold text-ink hover:bg-violet-soft hover:text-violet"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
            <div className="mt-auto">
              <WhatsAppLink className="btn btn-whatsapp w-full">
                <WhatsAppIcon /> Chat on WhatsApp
              </WhatsAppLink>
              <WhatsAppLink className="mt-3 block text-center text-sm font-semibold text-muted underline-offset-4 hover:underline">
                {business.phoneDisplay}
              </WhatsAppLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
