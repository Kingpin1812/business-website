import type { ReactNode } from 'react'
import { business, whatsappLink } from '../config/business'

type Props = {
  message?: string
  className?: string
  children: ReactNode
  ariaLabel?: string
}

/** Every WhatsApp CTA on the site goes through this anchor. */
export function WhatsAppLink({ message, className, children, ariaLabel }: Props) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? `Chat with ${business.name} on WhatsApp`}
      className={className}
    >
      {children}
    </a>
  )
}
