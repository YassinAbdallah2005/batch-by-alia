import { ArrowRight, ChevronDown } from 'lucide-react'

const HERO_IMAGE = 'https://v3b.fal.media/files/b/0a92519b/y8tirr5W0tArRTkwInvLo_Qv0E9d39.png'
const COOKIES_IMG = 'https://v3b.fal.media/files/b/0a92519b/nq4ohVa4HwoCaXqlQRulD_kstuz1D3.png'
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
    <section className="relative overflow-hidden bg-[#0F0905]">
      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0 z-0" />

      {/* Warm radial glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[700px] w-[700px] -translate-y-1/3 translate-x-1/4 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(212,148,74,0.14) 0%, transparent 65%)' }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-10">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">

          {/* LEFT: Text */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div className="animate-fade-in mb-10 inline-flex items-center gap-2.5 rounded-full border border-[#D4944A]/25 bg-[#D4944A]/10 px-4 py-1.5 cursor-default">
              <span className="size-1.5 rounded-full bg-[#D4944A]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4944A]">
                Handmade in Cairo
              </span>
            </div>

            {/* Giant headline */}
            <h1
              className="animate-fade-in-up font-display tracking-tight text-[#F5EDE0]"
              style={{ fontSize: 'clamp(56px, 8.5vw, 128px)', lineHeight: '0.92' }}
            >
              Baked
              <br />
              <span className="italic text-[#D4944A]">with</span> Love,
              <br />
              Served
              <br />
              <span className="italic text-[#D4944A]">with</span> Joy
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-200 mt-8 max-w-md text-base leading-relaxed text-[#9A7A62]">
              Artisan cookies, brownies &amp; cinnamon buns — crafted in small
              batches with the finest ingredients, straight from Alia's kitchen.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap items-center gap-5">
              <button
                onClick={() => scrollTo('#order')}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#D4944A] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#0F0905] transition-all duration-200 hover:bg-[#E8B470] hover:scale-[1.02] active:scale-[0.98]"
              >
                Order Now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('#our-story')}
                className="cursor-pointer inline-flex items-center gap-3 text-sm font-medium text-[#9A7A62] transition-colors hover:text-[#F5EDE0]"
              >
                <span className="h-px w-8 bg-current" />
                Our Story
              </button>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up delay-500 mt-14 flex items-center gap-10 border-t border-[#2E1E12] pt-8">
              {[
                { num: '3', label: 'Signature Items' },
                { num: '100%', label: 'Handmade' },
                { num: '∞', label: 'Made with Love' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-display text-2xl text-[#D4944A]">{s.num}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#5A4030]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Images cluster */}
          <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-shrink-0">
            <div className="relative w-[400px] h-[540px]">
              {/* Glow blob */}
              <div
                className="absolute inset-0 rounded-[2rem] pointer-events-none"
                style={{ boxShadow: '0 0 100px 30px rgba(212,148,74,0.18)' }}
              />

              {/* Main hero image */}
              <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                <img
                  src={HERO_IMAGE}
                  alt="Batch by Alia baked goods"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0905]/50 via-transparent to-transparent" />
              </div>

              {/* Floating card — Cookies (bottom-left) */}
              <div
                className="absolute -bottom-8 -left-14 w-44 overflow-hidden rounded-2xl border border-[#2E1E12] bg-[#1A1008]"
                style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.6)', animation: 'float 4s ease-in-out infinite' }}
              >
                <img src={COOKIES_IMG} alt="Cookies" className="aspect-[4/3] w-full object-cover" />
                <div className="px-3.5 py-3">
                  <p className="font-display text-sm text-[#F5EDE0]">Cookies</p>
                  <p className="mt-0.5 text-xs text-[#D4944A]">85 EGP / box</p>
                </div>
              </div>

              {/* Floating card — Cinnamon Buns (top-right) */}
              <div
                className="absolute -top-10 -right-12 w-40 overflow-hidden rounded-2xl border border-[#2E1E12] bg-[#1A1008]"
                style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.6)', animation: 'float 5.5s ease-in-out infinite 1s' }}
              >
                <img src={CINNAMON_IMG} alt="Cinnamon Buns" className="aspect-[4/3] w-full object-cover" />
                <div className="px-3.5 py-3">
                  <p className="font-display text-sm text-[#F5EDE0]">Cinnamon Buns</p>
                  <p className="mt-0.5 text-xs text-[#D4944A]">95 EGP / box</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative z-10 mt-10 overflow-hidden border-t border-[#2E1E12] bg-[#0A0604] py-4">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 22s linear infinite' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex shrink-0 items-center">
              <span className="font-display text-sm italic text-[#5A4030]">{item}</span>
              <span className="mx-6 text-[#D4944A]">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#menu')}
        className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="size-5 text-[#5A4030] animate-float" />
      </button>
    </section>
  )
}
