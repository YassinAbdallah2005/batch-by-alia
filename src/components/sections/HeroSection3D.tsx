import { ArrowRight, ChevronDown } from 'lucide-react'

const COOKIES_IMG = 'https://v3b.fal.media/files/b/0a92519b/nq4ohVa4HwoCaXqlQRulD_kstuz1D3.png'
const BROWNIES_IMG = 'https://v3b.fal.media/files/b/0a92519b/Mdxty-nFYu6B7Kxplz1Z1_T5rwahNv.png'
const CINNAMON_IMG = 'https://v3b.fal.media/files/b/0a92523c/7JTMl7-FJJCkQM4f8ikeb_yLWBYBhm.png'

const MARQUEE_ITEMS = [
  'Chocolate Chip Cookies',
  'Fudge Brownies',
  'Cinnamon Buns',
  'Small Batches Only',
  'Handmade in Cairo',
  'Baked Fresh Daily',
]

export function HeroSection3D() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FEFAF4]">
      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0 z-0" />

      {/* Subtle warm radial */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/4 -translate-y-1/4 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200,135,74,0.10) 0%, transparent 65%)' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_440px]">

          {/* LEFT: Text */}
          <div>
            {/* Badge */}
            <div className="animate-fade-in mb-10 inline-flex items-center gap-2.5 rounded-full border border-[#C8874A]/30 bg-[#C8874A]/8 px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-[#C8874A]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#C8874A]">
                Handmade in Cairo
              </span>
            </div>

            {/*
              Unique title: each line alternates between
              upright dark serif and indented italic gold —
              creating an editorial rhythm you won't see anywhere else.
            */}
            <h1 className="animate-fade-in-up font-display leading-[1] tracking-tight">
              <span
                className="block text-[#1A0F08]"
                style={{ fontSize: 'clamp(64px, 9vw, 130px)' }}
              >
                Baked
              </span>
              <span
                className="block pl-[0.18em] italic text-[#C8874A]"
                style={{ fontSize: 'clamp(48px, 6.5vw, 96px)' }}
              >
                with Love,
              </span>
              <span
                className="block text-[#1A0F08]"
                style={{ fontSize: 'clamp(64px, 9vw, 130px)' }}
              >
                Served
              </span>
              <span
                className="block pl-[0.18em] italic text-[#C8874A]"
                style={{ fontSize: 'clamp(48px, 6.5vw, 96px)' }}
              >
                with Joy
              </span>
            </h1>

            {/* Ruled subtitle */}
            <div className="animate-fade-in-up delay-200 mt-8 flex items-center gap-4">
              <div className="h-px w-10 bg-[#C8874A]/50 shrink-0" />
              <p className="text-sm leading-relaxed text-[#9A7A62]">
                Small-batch artisan baking — Cairo's finest cookies,
                brownies &amp; cinnamon buns
              </p>
            </div>

            {/* CTAs */}
            <div className="animate-fade-in-up delay-300 mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('#order')}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#1A0F08] px-7 py-3.5 text-sm font-semibold text-[#FEFAF4] transition-all duration-200 hover:bg-[#C8874A] hover:scale-[1.02] active:scale-[0.98]"
              >
                Order Now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('#our-story')}
                className="cursor-pointer rounded-full border border-[#1A0F08]/15 px-7 py-3.5 text-sm font-medium text-[#1A0F08]/60 transition-all hover:border-[#1A0F08]/30 hover:text-[#1A0F08]"
              >
                Our Story
              </button>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up delay-500 mt-12 flex items-center gap-10 border-t border-[#1A0F08]/8 pt-8">
              {[
                { num: '3', label: 'Signature Items' },
                { num: '100%', label: 'Handmade' },
                { num: '∞', label: 'Made with Love' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl text-[#1A0F08]">{s.num}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[#9A7A62]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Actual product photo collage — no stock imagery */}
          <div className="hidden lg:flex flex-col gap-3" style={{ height: '580px' }}>
            {/* Top: Cookies — wide, feature shot */}
            <div className="overflow-hidden rounded-2xl" style={{ flex: 11 }}>
              <img
                src={COOKIES_IMG}
                alt="Chocolate Chip Cookies"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                draggable={false}
              />
            </div>
            {/* Bottom: Brownies + Cinnamon Buns side by side */}
            <div className="flex gap-3" style={{ flex: 9 }}>
              <div className="flex-1 overflow-hidden rounded-2xl">
                <img
                  src={BROWNIES_IMG}
                  alt="Fudge Brownies"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  draggable={false}
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-2xl">
                <img
                  src={CINNAMON_IMG}
                  alt="Cinnamon Buns"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative z-10 overflow-hidden border-t border-[#1A0F08]/8 bg-[#F5ECE0] py-3.5">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 22s linear infinite' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex shrink-0 items-center">
              <span className="font-display text-sm italic text-[#9A7A62]">{item}</span>
              <span className="mx-5 text-[#C8874A]">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#menu')}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="size-5 animate-float text-[#9A7A62]/50" />
      </button>
    </section>
  )
}
