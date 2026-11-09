import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '@fontsource-variable/manrope'
import './index.css'
import App from './App.tsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered (see scripts/prerender.mjs), so hydrate it; the dev server starts empty.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
