/**
 * Build-time server entry used by scripts/prerender.mjs.
 * Renders the page to static HTML so search engines, AI answer engines and link-preview bots
 * receive the full content without running JavaScript.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

export { business, addressOneLine, mapsLink } from './config/business'
export { services } from './data/services'
export { faqs } from './data/faq'
export { gallery } from './data/gallery'

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
