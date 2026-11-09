import { MotionConfig } from 'motion/react'
import { Header } from './components/Header'
import { ScrollVideoBackground } from './components/ScrollVideoBackground'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { DoorShowcase } from './components/DoorShowcase'
import { Services } from './components/Services'
import { WhyChooseUs } from './components/WhyChooseUs'
import { Gallery } from './components/Gallery'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-alu px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollVideoBackground />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <DoorShowcase />
        <WhyChooseUs />
        <Gallery />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}
