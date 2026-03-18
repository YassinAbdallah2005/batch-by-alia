import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const BAKER_IMAGE = 'https://v3b.fal.media/files/b/0a92519c/XM-rmRQgyjkQiNiGzpYAS_WvwTismV.png'

export function StorySection() {
  const sectionRef = useScrollAnimation()

  return (
    <section
      id="our-story"
      className="overflow-hidden bg-[#0F0905]"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2">
          {/* Left: Full-bleed image */}
          <div className="scroll-animate relative min-h-[480px] lg:min-h-[680px]">
            <img
              src={BAKER_IMAGE}
              alt="Alia preparing baked goods"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Warm overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0905]/10 via-transparent to-[#0F0905]/50" />
            <div className="absolute inset-0 bg-[#7B3F00]/8" />
          </div>

          {/* Right: Content */}
          <div
            className="scroll-animate flex flex-col justify-center px-8 py-16 md:px-16 md:py-24"
            style={{ transitionDelay: '150ms' }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4944A]">
              Our Story
            </span>

            <h2 className="mt-4 font-display text-5xl leading-tight tracking-tight text-[#F5EDE0] md:text-6xl">
              Meet Alia
            </h2>

            {/* Pull quote */}
            <blockquote className="mt-8 border-l-2 border-[#D4944A] pl-6">
              <p className="font-display text-lg italic leading-relaxed text-[#D4944A]">
                "Every recipe is tested and perfected with care, because to us,
                baking isn't just about flour and sugar — it's about creating
                moments of joy."
              </p>
            </blockquote>

            <p className="mt-8 text-base leading-relaxed text-[#9A7A62]">
              It all started in a small kitchen in Cairo with a simple belief:
              that the best baked goods come from the heart. What began as treats
              shared between friends and family quickly grew into something more —
              a passion turned purpose.
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#9A7A62]">
              At Batch by Alia, there are no shortcuts. Each cookie is scooped
              by hand, every brownie batter folded with intention, and every
              cinnamon bun swirled with love. We bake in small batches to make
              sure every single piece is as special as the first one we ever made.
            </p>

            <div className="mt-10 h-px w-12 bg-[#2E1E12]" />
            <p className="mt-4 font-display text-xl italic text-[#F5EDE0]">— Alia</p>
          </div>
        </div>
      </div>
    </section>
  )
}
