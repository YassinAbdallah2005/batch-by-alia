import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const BAKER_IMAGE = 'https://v3b.fal.media/files/b/0a92519c/XM-rmRQgyjkQiNiGzpYAS_WvwTismV.png'

export function StorySection() {
  const sectionRef = useScrollAnimation()

  return (
    <section
      id="our-story"
      className="bg-[#FEFAF4] py-24 md:py-32"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[45fr_55fr] lg:gap-20">

          {/* Left: Image */}
          <div className="scroll-animate">
            <div className="overflow-hidden rounded-2xl" style={{ boxShadow: '0 8px 40px rgba(200,135,74,0.15)' }}>
              <img
                src={BAKER_IMAGE}
                alt="Alia preparing baked goods"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="scroll-animate" style={{ transitionDelay: '150ms' }}>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#C8874A]">
              Our Story
            </span>

            <h2 className="mt-4 font-display text-4xl tracking-tight text-[#1A0F08] md:text-5xl">
              Meet Alia
            </h2>

            {/* Pull quote */}
            <blockquote className="mt-8 border-l-2 border-[#C8874A] pl-6">
              <p className="font-display text-lg italic leading-relaxed text-[#C8874A]">
                "Every recipe is tested and perfected with care, because to us,
                baking isn't just about flour and sugar — it's about creating
                moments of joy."
              </p>
            </blockquote>

            <p className="mt-8 text-base leading-relaxed text-[#7A6655]">
              It all started in a small kitchen in Cairo with a simple belief:
              that the best baked goods come from the heart. What began as treats
              shared between friends and family quickly grew into something more —
              a passion turned purpose.
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#7A6655]">
              At Batch by Alia, there are no shortcuts. Each cookie is scooped
              by hand, every brownie batter folded with intention, and every
              cinnamon bun swirled with love. We bake in small batches to make
              sure every single piece is as special as the first one we ever made.
            </p>

            <div className="mt-10 h-px w-12 bg-[#1A0F08]/10" />
            <p className="mt-4 font-display text-xl italic text-[#1A0F08]">— Alia</p>
          </div>
        </div>
      </div>
    </section>
  )
}
