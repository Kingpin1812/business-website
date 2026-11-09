import { business, mailtoLink, mapsLink } from '../config/business'
import { WhatsAppLink } from './WhatsAppLink'

export function Footer() {
  return (
    <footer className="pb-28 pt-4 sm:pb-10 sm:pt-6">
      <div className="container-page">
        <div className="rounded-[2rem] bg-[#100c18]/80 px-6 py-10 text-white ring-1 ring-white/10 backdrop-blur-xl sm:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-2 font-extrabold">
                <img
                  src="/media/brand/rg-logo.webp"
                  alt="RG Ramu Glass House logo"
                  width={480}
                  height={251}
                  loading="lazy"
                  className="h-12 w-auto"
                />
                {business.name}
              </div>
              <p className="mt-3 max-w-xs text-sm text-white/65">
                Designed to help you explore our aluminium and glass solutions.
              </p>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold">Phone / WhatsApp</p>
                <WhatsAppLink
                  className="inline-flex min-h-8 items-center text-white/70 hover:text-white"
                  ariaLabel={`Message ${business.phoneDisplay} on WhatsApp`}
                >
                  {business.phoneDisplay}
                </WhatsAppLink>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <a href={mailtoLink} className="inline-flex min-h-8 items-center break-all text-white/70 hover:text-white">
                  {business.email}
                </a>
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <address className="mt-1 not-italic text-white/70">
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {business.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </a>
                </address>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/55" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
