# RG Ramu Glass House — Website

Single-page, mobile-first business website for **RG Ramu Glass House** (aluminium and glass works).
Every enquiry button opens WhatsApp chat with **+91 93631 25793**.

Built with React, TypeScript, Vite and Tailwind CSS, plus:

| Library | Used for |
| --- | --- |
| **GSAP + ScrollTrigger** | Full-page background that plays the promo video frame-by-frame as you scroll; scroll-driven door opening in the 3D section; "Why choose us" batch reveals |
| **Motion** (Framer Motion) | Section reveals, service card stagger and hover, mobile menu, gallery lightbox (shared-element zoom + swipe), floating WhatsApp button, header on scroll |
| **Babylon.js** | Interactive 3D aluminium double glass door (lazy-loaded only when the section approaches the viewport; renders only while visible) |

All animation respects the visitor's *reduce motion* setting: the hero shows a still frame, the 3D door is shown half-open with no idle movement, and reveals are disabled.

## Requirements

- Node.js 20 or newer (tested with Node 24)

## Install and run

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
```

## Check and build

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build at http://localhost:4173
```

## SEO and AI-search setup

`npm run build` does three things: the normal client build, a server build of `src/entry-server.tsx`, and
`scripts/prerender.mjs`. The prerender step:

- renders the whole page to static HTML inside `dist/index.html`, so Google, Bing, ChatGPT, Perplexity, Claude
  and WhatsApp link previews read the content without running JavaScript (React then hydrates it in the browser);
- injects JSON-LD structured data (LocalBusiness + HomeAndConstructionBusiness, WebSite, FAQPage) built from
  `src/config/business.ts`, `src/data/services.ts` and `src/data/faq.ts`;
- writes `dist/llms.txt` (plain-text business summary for AI tools).

**When the domain is known**, set `siteUrl` in `src/config/business.ts` (e.g. `'https://www.example.com'`) and rebuild.
That automatically adds the canonical link, `og:url`, absolute share-image URLs, `dist/sitemap.xml` and the
`Sitemap:` line in `robots.txt`. Also fill in `googleMapsUrl` (your Google Business Profile link), `profiles`
(social / directory pages) and `openingHours` (e.g. `'Mo-Sa 09:00-19:00'`) when available.

`public/robots.txt` allows all crawlers, including AI search bots. FAQ answers in `src/data/faq.ts` must only state
facts the owner has confirmed.

After deploying: verify the site in Google Search Console and Bing Webmaster Tools and submit `/sitemap.xml`.

## Deploy

`npm run build` produces a static site in `dist/`. Upload that folder to any static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, or regular web hosting). No server or database is needed.

## Editing content

| What | Where |
| --- | --- |
| Business name, WhatsApp number, displayed phone, address, email | `src/config/business.ts` (also update the address block in `index.html` structured data) |
| Service cards (title, description, icon) | `src/data/services.ts` |
| "Our work" gallery photos, captions, alt text | `src/data/gallery.ts` (photos in `public/media/work/`) |
| Page title, description, social image | `index.html` |

Change the number once in `src/config/business.ts` and every WhatsApp link updates.

## Media

- `video/` — the original promotional video (source only; not served by the site).
- **Scroll-driven background video** (`src/components/ScrollVideoBackground.tsx`): the video is fixed behind the whole page and advances as the visitor scrolls from top to bottom. Two frame sets are used:
  - `public/media/bg-wide/f_001…f_120.webp` — landscape crop (1080×720) for wide screens (~1.2 MB)
  - `public/media/hero/f_001…f_120.webp` — full portrait frames (540×960) for phones (~1.6 MB)
- `public/media/brand/rg-logo.webp` / `.png` — RG logo with transparent background (header, hero, footer); `public/favicon.png`, `public/apple-touch-icon.png` — icons cut from the same logo.
- `public/media/gallery/still-*.webp` — stills from the same video, used in About and Gallery.
- `public/media/og-image.jpg` — social sharing image.

To regenerate the frames from a new video (needs ffmpeg):

```bash
# delogo removes the corner mark at the bottom-right of the source video (1080x1920)
ffmpeg -i video/your-video.mp4 -vf "delogo=x=848:y=1688:w=104:h=104,fps=12,scale=540:960" -c:v libwebp -quality 72 public/media/hero/f_%03d.webp
ffmpeg -i video/your-video.mp4 -vf "fps=12,crop=1080:720:0:600" -c:v libwebp -quality 66 public/media/bg-wide/f_%03d.webp
```

If the new video has a different number of frames, update `FRAME_COUNT` in `src/components/ScrollVideoBackground.tsx`.

## Still needed from the business

- More real project photographs for the "Our work" gallery (4 so far).
- Confirmation of which service categories are actually offered.
- Opening hours — intentionally not shown until provided.
