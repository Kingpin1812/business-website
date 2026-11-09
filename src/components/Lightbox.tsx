import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { gallery } from '../data/gallery'

type Props = {
  index: number | null
  onClose: () => void
  onNavigate: (i: number) => void
}

export function Lightbox({ index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  const open = index !== null

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      opener?.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (index === null) return
    const n = gallery.length
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % n)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onNavigate])

  const img = index !== null ? gallery[index] : null
  const n = gallery.length

  return (
    <AnimatePresence>
      {img && index !== null && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={img.caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#141018]/90 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

          <figure className="relative z-10 flex max-h-full flex-col items-center">
            <motion.img
              key={img.src}
              layoutId={reduce ? undefined : `gallery-${index}`}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="max-h-[78svh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-2xl"
              drag={reduce ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) onNavigate((index + 1) % n)
                else if (info.offset.x > 60) onNavigate((index - 1 + n) % n)
              }}
            />
            <figcaption className="mt-4 text-center text-sm font-semibold text-white/90">
              {img.caption} <span className="text-white/50">({index + 1} / {n})</span>
            </figcaption>
          </figure>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="absolute right-3 top-3 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate((index - 1 + n) % n)}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:inline-flex"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate((index + 1) % n)}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:inline-flex"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
