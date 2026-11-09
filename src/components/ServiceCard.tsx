import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '../data/services'
import { serviceEnquiryMessage } from '../config/business'
import { WhatsAppLink } from './WhatsAppLink'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function ServiceCard({ service }: { service: Service }) {
  const reduce = useReducedMotion()
  const Icon = service.icon
  return (
    <motion.li
      variants={cardVariants}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative flex flex-col rounded-3xl border border-white/12 bg-white/[0.06] p-6 transition-[background-color,box-shadow] hover:bg-white/[0.1] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,0.8)] sm:p-7"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-soft text-violet transition-colors group-hover:bg-violet group-hover:text-[#1b1426]">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-bold">{service.title}</h3>
      <p className="mt-2 flex-1 text-[0.95rem] text-muted">{service.description}</p>
      <WhatsAppLink
        message={serviceEnquiryMessage(service.title)}
        ariaLabel={`Enquire about ${service.title} on WhatsApp`}
        className="-mx-2 mt-3 inline-flex min-h-11 items-center gap-1.5 self-start rounded-full px-2 text-sm font-bold text-violet hover:underline hover:underline-offset-4"
      >
        Enquire on WhatsApp <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </WhatsAppLink>
    </motion.li>
  )
}
