import { motion, useReducedMotion } from 'motion/react'
import { business, whatsappLink } from '../config/business'
import { WhatsAppIcon } from './WhatsAppIcon'

/** Floating WhatsApp button, fixed bottom-right. */
export function WhatsAppButton() {
  const reduce = useReducedMotion()
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${business.name} on WhatsApp`}
      className="fixed bottom-[calc(2.25rem+env(safe-area-inset-bottom))] right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp-dark text-white shadow-[0_14px_30px_-10px_rgba(18,140,74,0.8)] ring-4 ring-white sm:bottom-12 sm:right-6"
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.2 }}
      whileHover={reduce ? undefined : { scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  )
}
