import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/faq'
import { Reveal } from './Reveal'

/** FAQ uses native <details>, so answers are in the HTML for crawlers and work without JavaScript. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-10 sm:py-20">
      <div className="container-page">
        <div className="glass-theme panel panel-mist">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-white/10 rounded-3xl border border-white/12 bg-white/[0.05]">
            {faqs.map((f) => (
              <details key={f.question} className="group px-5 sm:px-7">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-bold sm:text-lg [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[inherit]">{f.question}</h3>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-violet transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 text-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
