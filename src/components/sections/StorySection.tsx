import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const BAKER_IMAGE =
  'https://v3b.fal.media/files/b/0a92519c/XM-rmRQgyjkQiNiGzpYAS_WvwTismV.png'

export function StorySection() {
  const sectionRef = useScrollAnimation()

  return (
    <section
      id="our-story"
      className="bg-background py-24 md:py-32"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[45fr_55fr] lg:gap-20">
          {/* Image */}
          <div className="scroll-animate">
            <div className="overflow-hidden rounded-2xl shadow-warm">
              <img
                src={BAKER_IMAGE}
                alt="Alia preparing baked goods"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="scroll-animate" style={{ transitionDelay: '150ms' }}>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Our Story
            </span>

            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground md:text-5xl">
              Meet Alia
            </h2>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              It all started in a small kitchen in Cairo with a simple belief:
              that the best baked goods come from the heart. What began as
              treats shared between friends and family quickly grew into
              something more — a passion turned purpose. Every recipe is tested
              and perfected with care, using only the finest butter, chocolate,
              and spices sourced from trusted local suppliers.
            </p>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              At Batch by Alia, there are no shortcuts. Each cookie is scooped
              by hand, every brownie batter folded with intention, and every
              cinnamon bun swirled with love. We bake in small batches to make
              sure every single piece is as special as the first one we ever
              made. Because to us, baking isn't just about flour and sugar — it's
              about creating moments of joy, one bite at a time.
            </p>

            <div className="my-8 h-px w-16 bg-border" />

            <p className="font-display text-xl italic text-foreground">
              — Alia
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
