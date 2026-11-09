import { Mail, MapPin, Phone } from 'lucide-react'
import { business, mailtoLink, mapsLink } from '../config/business'
import { Reveal } from './Reveal'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon } from './WhatsAppIcon'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-10 sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#1b1622]/80 px-6 ring-1 ring-white/10 backdrop-blur-xl py-14 text-white sm:px-12 sm:py-16 lg:px-16">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet/50 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="eyebrow !text-[#c9b8e6]">Contact</p>
                <h2 id="contact-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
                  Let&rsquo;s Discuss Your Project
                </h2>
                <p className="mt-4 max-w-lg text-white/75">
                  Share your requirement, photos of the space or approximate sizes on WhatsApp, and we will get back to
                  you to talk it through.
                </p>
              </div>
              <div className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8">
                <p className="text-lg font-bold">{business.name}</p>
                <WhatsAppLink
                  className="mt-3 inline-flex min-h-8 items-center gap-2 text-white/85 underline-offset-4 hover:underline"
                  ariaLabel={`Message ${business.phoneDisplay} on WhatsApp`}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {business.phoneDisplay}
                </WhatsAppLink>
                <a
                  href={mailtoLink}
                  className="flex min-h-8 items-center gap-2 break-all text-white/85 underline-offset-4 hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {business.email}
                </a>
                <address className="mt-3 flex gap-2 not-italic text-white/85">
                  <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {business.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex min-h-8 items-center text-sm font-semibold text-[#cdb6f2] underline-offset-4 hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </span>
                </address>
                <WhatsAppLink
                  className="btn btn-whatsapp mt-6 w-full"
                  message="Hello RG Ramu Glass House, I would like to discuss a project."
                >
                  <WhatsAppIcon /> Chat on WhatsApp
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
