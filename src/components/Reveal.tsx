import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

/** Subtle fade/slide-in when the element enters the viewport (Motion). */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
