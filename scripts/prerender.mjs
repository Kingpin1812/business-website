/**
 * Post-build prerender step (runs after `vite build` and `vite build --ssr`).
 *
 * 1. Renders the React app to static HTML and injects it into dist/index.html, so crawlers and
 *    AI answer engines see the full content without JavaScript. React hydrates it in the browser.
 * 2. Injects JSON-LD structured data generated from the same config files the page uses.
 * 3. When `business.siteUrl` is set: adds the canonical link, absolute Open Graph URLs,
 *    dist/sitemap.xml and the Sitemap line in dist/robots.txt.
 * 4. Writes dist/llms.txt (plain-text business summary for AI tools).
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = resolve(root, 'dist')
const ssrEntry = resolve(root, 'dist-ssr', 'entry-server.js')

if (!existsSync(ssrEntry)) {
  console.error('prerender: dist-ssr/entry-server.js not found — run the SSR build first.')
  process.exit(1)
}

const { render, business, addressOneLine, mapsLink, services, faqs, gallery } = await import(pathToFileURL(ssrEntry).href)

const siteUrl = (business.siteUrl || '').replace(/\/+$/, '')
const abs = (path) => (siteUrl ? `${siteUrl}${path}` : null)
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// ---------- Structured data ----------
const businessId = `${siteUrl}/#business`
const websiteId = `${siteUrl}/#website`
const [street1, street2, street3] = business.addressLines

const localBusiness = {
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': businessId,
  name: business.name,
  description: `${business.category} in Saravanampatti, Coimbatore: ${services.map((s) => s.title.toLowerCase()).join(', ')}.`,
  telephone: `+${business.whatsappNumber}`,
  email: business.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${street1}, ${street2}, ${street3}`,
    addressLocality: 'Coimbatore',
    postalCode: '641035',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  hasMap: mapsLink,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+${business.whatsappNumber}`,
    email: business.email,
    contactType: 'customer service',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Aluminium and glass services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.description },
    })),
  },
}
if (siteUrl) {
  Object.assign(localBusiness, {
    url: `${siteUrl}/`,
    logo: abs('/media/brand/rg-logo.png'),
    image: [abs('/media/og-image.jpg'), ...gallery.slice(0, 3).map((g) => abs(g.src))],
  })
}
if (business.profiles?.length) localBusiness.sameAs = business.profiles
if (business.openingHours) localBusiness.openingHours = business.openingHours

const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: business.name,
  inLanguage: 'en-IN',
  publisher: { '@id': businessId },
  ...(siteUrl ? { url: `${siteUrl}/` } : {}),
}

const faqPage = {
  '@type': 'FAQPage',
  ...(siteUrl ? { '@id': `${siteUrl}/#faq`, url: `${siteUrl}/#faq` } : {}),
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const jsonLd = { '@context': 'https://schema.org', '@graph': [localBusiness, website, faqPage] }

// ---------- Head + body injection ----------
const headTags = [
  siteUrl && `<link rel="canonical" href="${siteUrl}/" />`,
  siteUrl && `<meta property="og:url" content="${siteUrl}/" />`,
  `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
]
  .filter(Boolean)
  .join('\n    ')

const indexPath = resolve(dist, 'index.html')
let html = readFileSync(indexPath, 'utf8')
html = html.replace(/<!--app-head[\s\S]*?-->/, headTags)
html = html.replace('<!--app-html-->', render())
if (siteUrl) {
  html = html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")\/(media\/og-image\.jpg")/g, `$1${siteUrl}/$2`)
}
writeFileSync(indexPath, html)

// ---------- robots.txt / sitemap.xml ----------
const robotsPath = resolve(dist, 'robots.txt')
if (siteUrl && existsSync(robotsPath)) {
  writeFileSync(robotsPath, `${readFileSync(robotsPath, 'utf8').trimEnd()}\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
  const today = new Date().toISOString().slice(0, 10)
  const images = gallery
    .map((g) => `    <image:image><image:loc>${abs(g.src)}</image:loc></image:image>`)
    .join('\n')
  writeFileSync(
    resolve(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
${images}
  </url>
</urlset>
`,
  )
}

// ---------- llms.txt ----------
writeFileSync(
  resolve(dist, 'llms.txt'),
  `# ${business.name}

> ${business.category} in Saravanampatti, Coimbatore, Tamil Nadu, India.

## Contact
- Phone / WhatsApp: ${business.phoneDisplay} (https://wa.me/${business.whatsappNumber})
- Email: ${business.email}
- Address: ${addressOneLine}
- Map: ${mapsLink}
${siteUrl ? `- Website: ${siteUrl}/\n` : ''}
## Services
${services.map((s) => `- ${s.title}: ${s.description}`).join('\n')}

## FAQ
${faqs.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')}
`,
)

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })

const words = render().replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
console.log(`prerender: injected ${words} words of static HTML + JSON-LD (${escapeHtml(business.name)}).`)
if (!siteUrl) {
  console.warn(
    'prerender: business.siteUrl is empty — canonical, og:url, absolute image URLs and sitemap.xml were skipped.\n' +
      '           Set siteUrl in src/config/business.ts once the domain is known, then rebuild.',
  )
}
