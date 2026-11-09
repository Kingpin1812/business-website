import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Expand } from 'lucide-react'
import { gallery } from '../data/gallery'
import { business } from '../config/business'
import { Lightbox } from './Lightbox'
import { Reveal } from './Reveal'

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const reduce = useReducedMotion()

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-10 sm:py-20">
      <div className="container-page">
      <div className="glass-theme panel">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Gallery</p>
          <h2 id="gallery-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Our work
          </h2>
          <p className="mt-4 text-muted">
            A few recent projects completed by {business.name}. Tap a photo to see it larger.
          </p>
        </Reveal>

        <motion.ul
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          {gallery.map((img, i) => (
            <motion.li
              key={img.src}
              variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-violet-deep"
                aria-label={`View larger: ${img.caption}`}
              >
                <motion.img
                  layoutId={reduce ? undefined : `gallery-${i}`}
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform sm:aspect-[4/3] duration-700 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/65 to-transparent p-3 pt-10 text-left text-sm font-semibold text-white sm:p-4">
                  {img.caption}
                  <Expand className="h-4 w-4 shrink-0 opacity-80" aria-hidden="true" />
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      </div>
      <Lightbox index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </section>
  )
}
