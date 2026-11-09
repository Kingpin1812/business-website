import { motion, useReducedMotion } from 'motion/react'
import { services } from '../data/services'
import { ServiceCard } from './ServiceCard'
import { Reveal } from './Reveal'

export function Services() {
  const reduce = useReducedMotion()
  return (
    <section id="services" aria-labelledby="services-title" className="py-10 sm:py-20">
      <div className="container-page">
      <div className="glass-theme panel panel-mist">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Our aluminium and glass services in Coimbatore
          </h2>
          <p className="mt-4 text-muted">
            Choose a category to start a WhatsApp enquiry. Your message will already mention the service you are
            interested in.
          </p>
        </Reveal>

        <motion.ul
          className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </motion.ul>
      </div>
      </div>
    </section>
  )
}
