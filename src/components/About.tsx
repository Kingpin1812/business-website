import { Reveal } from './Reveal'
import { business } from '../config/business'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-10 sm:py-20">
      <div className="container-page">
      <div className="glass-theme panel grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <img
              src="/media/gallery/still-4.webp"
              alt="Close-up of a brushed steel pull handle on an aluminium-framed glass door"
              width={720}
              height={1280}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-2xl object-cover"
            />
            <img
              src="/media/gallery/still-2.webp"
              alt="Aluminium glass double door with fixed glass side panels"
              width={720}
              height={1280}
              loading="lazy"
              className="mt-8 aspect-[3/4] w-full rounded-2xl object-cover sm:mt-12"
            />
          </div>
        </Reveal>
        <Reveal className="order-1 lg:order-2" delay={0.05}>
          <p className="eyebrow">About us</p>
          <h2 id="about-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            About {business.name}
          </h2>
          <p className="mt-5 text-lg text-muted">
            RG Ramu Glass House provides aluminium and glass solutions for residential and commercial spaces. Get in
            touch to discuss your project requirements and find a suitable solution for your space.
          </p>
          <p className="mt-4 text-muted">
            {business.name} is an aluminium and glass works business at {business.addressLines[0]},{' '}
            {business.addressLines[2]}, Coimbatore, offering aluminium doors, aluminium windows, glass doors and glass
            partitions for homes, offices and shops.
          </p>
          <p className="mt-4 text-muted">
            Whether you are planning a new entrance, updating windows or dividing an office with glass, start with a
            quick message on WhatsApp and share what you have in mind.
          </p>
        </Reveal>
      </div>
      </div>
    </section>
  )
}
