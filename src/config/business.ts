/**
 * Central business configuration.
 * Change the phone number here and every WhatsApp link on the site updates.
 */
export const business = {
  name: 'RG Ramu Glass House',
  category: 'Aluminium and glass works',
  /**
   * Live website address, e.g. 'https://www.example.com' (no trailing slash).
   * Leave empty until the domain is decided. When set, the build adds the canonical URL,
   * absolute Open Graph URLs, sitemap.xml and the robots.txt Sitemap line automatically.
   */
  siteUrl: '',
  /** Google Business Profile / Maps share link. When empty, an address search link is used. */
  googleMapsUrl: '',
  /** Public profiles (Google Business Profile, Facebook, Instagram, JustDial…) for schema sameAs. */
  profiles: [] as string[],
  /** International format, digits only (country code + number). */
  whatsappNumber: '919363125793',
  /** Human-readable display format. */
  phoneDisplay: '+91 93631 25793',
  /** Postal address, one line per entry. */
  addressLines: ['51, Sathy Road', 'Anandakumar Mills', 'Saravanampatti Post', 'Coimbatore – 641035'],
  email: 'ramuglasshouse@gmail.com',
  // Not provided yet — leave null until the owner verifies them.
  openingHours: null as string | null,
} as const

export const addressOneLine = business.addressLines.join(', ')
export const mapsLink =
  business.googleMapsUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${business.name}, ${addressOneLine}, Tamil Nadu, India`,
  )}`
export const mailtoLink = `mailto:${business.email}?subject=${encodeURIComponent(`Enquiry for ${business.name}`)}`

export const whatsappBase = `https://wa.me/${business.whatsappNumber}`

/** Build a WhatsApp link, optionally with a prefilled message. */
export function whatsappLink(message?: string): string {
  return message ? `${whatsappBase}?text=${encodeURIComponent(message)}` : whatsappBase
}

export function serviceEnquiryMessage(serviceName: string): string {
  return `Hello ${business.name}, I would like to enquire about ${serviceName.toLowerCase()}.`
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
] as const
