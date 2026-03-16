import { ChevronDown } from 'lucide-react'
import { BatchLogoAnimated } from '../layout/BatchLogo'

const HERO_BG =
  'https://v3b.fal.media/files/b/0a92519b/y8tirr5W0tArRTkwInvLo_Qv0E9d39.png'

export function HeroSection() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <img
        src={HERO_BG}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/20 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <span className="text-sm font-medium tracking-wide text-background">
            Handmade in Cairo
          </span>
        </div>

        {/* Big animated BATCH logo with swinging whisk – floating, no background */}
        <div className="animate-scale-in delay-100 mb-10 flex justify-center animate-float">
          <BatchLogoAnimated size="hero" className="text-background [&_*]:text-background" />
        </div>

        {/* Headline */}
        <h1 className="animate-text-reveal delay-300 font-display text-5xl leading-[1.08] tracking-tight text-background sm:text-6xl md:text-7xl lg:text-8xl">
          Baked with Love,
          <br />
          Served with Joy
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-500 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-background/80 md:text-xl">
          Artisan cookies, brownies &amp; cinnamon buns — crafted in small
          batches with the finest ingredients
        </p>

        {/* Buttons */}
        <div className="animate-fade-in-up delay-700 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => scrollTo('#order')}
            className="border-beam rounded-full bg-accent px-8 py-3.5 text-base font-medium text-accent-foreground transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Order Now
          </button>
          <button
            onClick={() => scrollTo('#our-story')}
            className="rounded-full border border-background/20 bg-background/10 px-8 py-3.5 text-base font-medium text-background backdrop-blur-sm transition-all hover:bg-background/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#menu')}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-fade-in delay-700"
      >
        <ChevronDown className="size-6 text-background/60 animate-float" />
      </button>
    </section>
  )
}
