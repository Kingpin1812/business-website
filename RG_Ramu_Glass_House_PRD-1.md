
# Product Requirements Document (PRD)

## RG Ramu Glass House --- Business Website

**Document type:** Product Requirements Document\
**Project:** Responsive business website for RG Ramu Glass House\
**Primary contact:** 9363125793\
**Primary conversion:** WhatsApp enquiries\
**Target implementation:** Claude Code

------------------------------------------------------------------------

## 1. Product Overview

Build a professional, modern, mobile-first website for **RG Ramu Glass
House**, an aluminium and glass business. The website should present the
business professionally, showcase its products and services, build
customer trust, and make it extremely easy for visitors to contact the
business through WhatsApp.

The website should feel premium, clean, architectural, and
product-focused. Use the supplied glass-door reference image as visual
inspiration for the hero section and product presentation. The design
may use a white background with charcoal aluminium framing, glass
reflections, and tasteful purple cinematic accents. Do not make the
entire website dark or visually cluttered.

### Business information

-   **Business name:** RG Ramu Glass House
-   **Phone / WhatsApp number:** 9363125793
-   **WhatsApp destination:** `https://wa.me/919363125793`
-   **Business category:** Aluminium and glass works
-   **Location:** Not provided --- do not invent an address.
-   **Email:** Not provided --- do not invent one.
-   **Opening hours:** Not provided --- do not invent them.

Use the WhatsApp number as the main contact method throughout the
website.

------------------------------------------------------------------------

## 2. Goals and Success Criteria

### Main goals

1.  Explain what RG Ramu Glass House offers.
2.  Showcase aluminium and glass products through attractive images.
3.  Generate enquiries from prospective customers.
4.  Make WhatsApp contact accessible from every major section.
5.  Provide a responsive, fast-loading experience on mobile, tablet, and
    desktop.
6.  Make it easy for the business owner to update text, images,
    services, and contact details later.

### Success criteria

-   Every WhatsApp CTA opens a WhatsApp chat with **+91 93631 25793**.
-   The website works correctly on common mobile and desktop screen
    sizes.
-   All buttons, navigation links, and section links work.
-   No fabricated testimonials, addresses, certifications, project
    claims, or business history.
-   Images are optimized and have descriptive alt text.
-   The site has clear page titles, metadata, and basic SEO.

------------------------------------------------------------------------

## 3. Target Audience

-   Homeowners planning new doors, windows, partitions, or glass
    installations.
-   People renovating houses, offices, shops, or commercial spaces.
-   Builders, contractors, architects, and interior designers.
-   Customers looking for aluminium and glass products or installation
    enquiries.

The website should be easy to understand for visitors who are not
technically familiar with aluminium or glass specifications.

------------------------------------------------------------------------

## 4. Website Structure

Build a polished single-page website with these sections. Use a simple
navigation bar with smooth scrolling.

### 4.1 Header / Navigation

-   Business name or a clean text-based logo: **RG Ramu Glass House**.
-   Navigation: Home, About, Services, Gallery, Contact.
-   Prominent **Chat on WhatsApp** button.
-   Sticky header after scrolling.
-   Mobile hamburger menu with accessible open/close behavior.

### 4.2 Hero Section

-   Large, premium architectural hero visual featuring a modern
    aluminium-framed glass double door.
-   Use the provided reference image or a generated equivalent as
    inspiration.
-   White or very light neutral background, charcoal aluminium details,
    realistic glass reflections, subtle purple accent lighting.
-   Main heading: **"Elegant Aluminium & Glass Solutions"**
-   Supporting text: **"Upgrade your spaces with stylish aluminium and
    glass solutions. Contact RG Ramu Glass House to discuss your
    requirements."**
-   Primary CTA: **"Enquire on WhatsApp"**
-   Secondary CTA: **"Explore Our Services"**
-   Keep text readable and ensure the product image remains the visual
    focus.
-   Do not claim specific product guarantees, delivery times, or prices.

### 4.3 About Section

Heading: **"About RG Ramu Glass House"**

Suggested copy: "RG Ramu Glass House provides aluminium and glass
solutions for residential and commercial spaces. Get in touch to discuss
your project requirements and find a suitable solution for your space."

Do not invent the year the business was established, number of completed
projects, staff size, awards, or certifications.

### 4.4 Services Section

Create attractive service cards with a relevant image or icon. Treat
these as editable service categories and confirm actual offerings with
the business before publishing.

Suggested categories: - Aluminium Doors - Aluminium Windows - Glass
Doors - Glass Partitions - Office and Shop Glass Solutions - Custom
Aluminium and Glass Works

Each card should include: - Service title - One short, clear
description - Relevant image or icon - Optional WhatsApp enquiry link
with a prefilled message naming the service

Avoid claiming that a service is available if the business does not
offer it. Make the service list easy to edit in one data/configuration
file.

### 4.5 Why Choose Us Section

Use benefit statements that do not make unverified factual claims.
Suggested wording: - Solutions based on your project requirements -
Clean, modern product presentation - Enquiry support through WhatsApp -
Options for residential and commercial spaces

Do not use unsupported claims such as "No. 1", "best in the city", "20
years of experience", "100% guaranteed", or "thousands of happy
customers".

### 4.6 Project Gallery

-   Responsive image grid showing aluminium doors, windows, glass doors,
    partitions, and related work.
-   Use supplied business photographs when available.
-   If no real project photos are supplied, use clearly replaceable
    demo/stock visuals. Do not represent stock images as completed work
    by RG Ramu Glass House.
-   Add a lightbox or modal for viewing images at a larger size.
-   Add descriptive alt text.
-   Optimize images and lazy-load images below the fold.

### 4.7 Contact Section

Heading: **"Let's Discuss Your Project"**

Show: - Business name: RG Ramu Glass House - Phone: +91 93631 25793 - A
prominent WhatsApp button - A short enquiry invitation

Do not display a fabricated address, map pin, email, or opening hours.
Add those only after the owner provides verified details.

### 4.8 Footer

-   RG Ramu Glass House
-   Quick navigation links
-   Phone / WhatsApp contact
-   Copyright year generated dynamically
-   Small note: "Designed to help you explore our aluminium and glass
    solutions."

------------------------------------------------------------------------

## 5. WhatsApp Integration --- Critical Requirement

This is the most important functional requirement.

### WhatsApp number

Use the international format with India country code:

`919363125793`

### WhatsApp URL

`https://wa.me/919363125793`

### Required behavior

Whenever a visitor clicks any phone number, WhatsApp icon, WhatsApp
button, or enquiry CTA, open a WhatsApp chat with this number.

Use a normal anchor element:

``` html
<a
  href="https://wa.me/919363125793"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with RG Ramu Glass House on WhatsApp"
>
  Chat on WhatsApp
</a>
```

For service-specific enquiry buttons, use a URL-encoded prefilled
message. Example:

``` text
https://wa.me/919363125793?text=Hello%20RG%20Ramu%20Glass%20House%2C%20I%20would%20like%20to%20enquire%20about%20aluminium%20doors.
```

### Contact number display

Display the readable number as **+91 93631 25793**. Make the number
itself clickable and route it to WhatsApp, not to a telephone dialer.

### Floating WhatsApp button

-   Add a fixed floating WhatsApp button at the bottom-right of the
    viewport.
-   Keep it visible while scrolling.
-   Ensure it does not cover important content or mobile navigation.
-   Use an accessible label and sufficient contrast.
-   On click, open the WhatsApp chat in a new tab or the WhatsApp app
    when supported by the device/browser.

Centralize the number and WhatsApp URL in one configuration file so that
the number can be changed in one place later.

------------------------------------------------------------------------

## 6. Visual Design System

### Design direction

-   Premium architectural brand aesthetic.
-   Minimal, spacious, clean, and professional.
-   Product photography should be the main visual element.
-   White, off-white, charcoal, and restrained purple accents.
-   Avoid excessive gradients, neon effects, heavy shadows, and crowded
    layouts.

### Suggested colors

-   Primary background: `#FFFFFF`
-   Secondary background: `#F5F5F5`
-   Main text: `#202124`
-   Muted text: `#666666`
-   Aluminium charcoal: `#34363B`
-   Accent purple: `#6D42A6`
-   WhatsApp green: `#25D366`

Use purple as a subtle accent rather than the dominant site color.

### Typography

-   Use a modern sans-serif font such as Inter, Manrope, or a similar
    readable web font.
-   Strong, clear headings.
-   Comfortable paragraph line-height.
-   Maintain consistent type scale and spacing.

### Motion and interactions

-   Subtle fade/slide-in reveals as sections enter the viewport.
-   Smooth anchor scrolling.
-   Gentle hover effects on cards and buttons.
-   Restrained transitions; respect `prefers-reduced-motion`.
-   Avoid animations that delay access to content or reduce usability.

------------------------------------------------------------------------

## 7. Technical Requirements

Claude Code should first inspect the existing repository and follow its
current framework and conventions. If the repository is empty, use the
following default stack:

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   Lucide icons (or an equivalent lightweight icon library)

### Implementation requirements

-   Use reusable React components.
-   Keep business content and service cards in a central
    data/configuration file.
-   Use semantic HTML.
-   Use accessible buttons, links, headings, and form labels.
-   Ensure keyboard navigation and visible focus states.
-   Add responsive layouts for mobile, tablet, laptop, and large
    desktop.
-   Use optimized WebP/AVIF images where possible.
-   Lazy-load non-hero images.
-   Avoid unnecessary libraries and dependencies.
-   Do not add a backend or database unless genuinely required.
-   Do not expose API keys or secrets in frontend code.
-   Add a clear README with installation and run instructions.

### Suggested component structure

``` text
src/
  components/
    Header.tsx
    MobileMenu.tsx
    Hero.tsx
    About.tsx
    Services.tsx
    ServiceCard.tsx
    Gallery.tsx
    Lightbox.tsx
    WhyChooseUs.tsx
    Contact.tsx
    Footer.tsx
    WhatsAppButton.tsx
  config/
    business.ts
  data/
    services.ts
    gallery.ts
  assets/
    images/
  App.tsx
  main.tsx
  index.css
```

The exact structure may be adjusted to fit the existing repository.

------------------------------------------------------------------------

## 8. SEO and Social Sharing

Add: - Page title: `RG Ramu Glass House | Aluminium & Glass Solutions` -
Meta description:
`Explore aluminium and glass solutions from RG Ramu Glass House. Contact us on WhatsApp at +91 93631 25793 for enquiries.` -
Appropriate heading hierarchy. - Open Graph title, description, and
image. - Favicon or simple text-based brand mark. - Descriptive image
alt text.

Do not add an unverified business address or location-specific SEO
claims.

------------------------------------------------------------------------

## 9. Performance and Quality

-   Aim for strong Lighthouse performance and accessibility scores.
-   Avoid large uncompressed images and unnecessary JavaScript.
-   Prevent layout shifts by defining image dimensions or aspect ratios.
-   Check that all images load and have sensible fallbacks.
-   Ensure no horizontal overflow on small screens.
-   Test all WhatsApp links on desktop and mobile.
-   Ensure the site remains usable if animations are disabled.

------------------------------------------------------------------------

## 10. Acceptance Tests

Before considering the website complete, verify all of the following:

1.  The home page loads without console errors.
2.  The header navigation scrolls to the correct sections.
3.  The mobile menu opens and closes correctly.
4.  Every visible phone number links to `https://wa.me/919363125793`.
5.  Every WhatsApp button opens a chat with **+91 93631 25793**.
6.  Service enquiry buttons include the correct prefilled service
    message.
7.  The floating WhatsApp button works on mobile and desktop.
8.  Gallery images open correctly in the lightbox, if implemented.
9.  The layout works at 360px, 390px, 768px, 1024px, and 1440px viewport
    widths.
10. There are no broken links, missing images, or placeholder lorem
    ipsum text.
11. No fabricated business details or testimonials appear.
12. The README explains how to install, run, build, and deploy the site.

------------------------------------------------------------------------

## 11. Instructions to Claude Code

Work as a senior UI/UX designer and frontend engineer.

1.  Inspect the existing project before changing files.
2.  If an application already exists, preserve its framework and avoid
    overwriting unrelated work.
3.  Implement the complete website, not just a mockup or static
    screenshot.
4.  Use the reference glass-door image as inspiration for the hero
    visual if it is available in the project assets. If it is not
    available, create a polished visual using suitable replaceable
    assets.
5.  Make the site responsive, accessible, and production-ready.
6.  Implement and test all WhatsApp links using **+91 93631 25793**.
7.  Keep all business details centralized and easy to edit.
8.  Do not invent missing business information.
9.  Run the available lint, type-check, and production build commands.
    Fix errors before finishing.
10. At the end, report the files created/changed, commands used to run
    the site, and any business details or real project photos still
    needed.

**Final deliverable:** A complete, polished, responsive website for **RG
Ramu Glass House**, with working WhatsApp enquiry links throughout the
website.
