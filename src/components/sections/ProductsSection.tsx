import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const PRODUCTS = [
  {
    number: '01',
    name: 'Chocolate Chip Cookies',
    description: 'Chunky, gooey center, golden brown',
    price: '85 EGP',
    per: '/ box',
    image: 'https://v3b.fal.media/files/b/0a92519b/nq4ohVa4HwoCaXqlQRulD_kstuz1D3.png',
    tag: 'Best Seller',
  },
  {
    number: '02',
    name: 'Fudge Brownies',
    description: 'Rich, crackly top, intense chocolate',
    price: '120 EGP',
    per: '/ box',
    image: 'https://v3b.fal.media/files/b/0a92519b/Mdxty-nFYu6B7Kxplz1Z1_T5rwahNv.png',
    tag: 'Customer Fave',
  },
  {
    number: '03',
    name: 'Cinnamon Buns',
    description: 'Soft swirled, cream cheese frosted',
    price: '95 EGP',
    per: '/ box',
    image: 'https://v3b.fal.media/files/b/0a92523c/7JTMl7-FJJCkQM4f8ikeb_yLWBYBhm.png',
    tag: 'Signature',
  },
]

export function ProductsSection() {
  const sectionRef = useScrollAnimation()

  const scrollToOrder = () => {
    document.querySelector('#order')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="menu" className="bg-[#FEFAF4] py-24 md:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="scroll-animate mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4944A]">What we bake</span>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-tight text-[#0F0905] sm:text-6xl md:text-7xl">
              The Menu
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#9A7A62]">
            Every batch is made fresh to order. No shortcuts, no compromises — just quality you can taste.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.name}
              className="scroll-animate group flex flex-col"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image area */}
              <div className="relative overflow-hidden rounded-2xl bg-[#F0E8DE]" style={{ aspectRatio: '3/4' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-[#0F0905]/78 p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    onClick={scrollToOrder}
                    className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#D4944A] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#0F0905] transition-all hover:bg-[#E8B470]"
                  >
                    Order Now <ArrowRight className="size-3.5" />
                  </button>
                  <p className="mt-4 text-center text-sm text-[#F5EDE0]/70">{product.description}</p>
                </div>

                {/* Number badge */}
                <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-[#0F0905]/60 backdrop-blur-sm">
                  <span className="font-display text-xs text-[#D4944A]">{product.number}</span>
                </div>

                {/* Tag badge */}
                <div className="absolute left-4 top-4 rounded-full bg-[#D4944A] px-3 py-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0F0905]">{product.tag}</span>
                </div>
              </div>

              {/* Card footer */}
              <div className="mt-4 flex items-end justify-between px-1">
                <h3 className="font-display text-xl text-[#0F0905]">{product.name}</h3>
                <div className="text-right shrink-0 ml-4">
                  <span className="font-display text-lg text-[#D4944A]">{product.price}</span>
                  <span className="text-xs text-[#9A7A62]"> {product.per}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="scroll-animate mt-16 text-center">
          <button
            onClick={scrollToOrder}
            className="cursor-pointer inline-flex items-center gap-3 rounded-full border-2 border-[#0F0905]/15 bg-transparent px-10 py-4 text-sm font-semibold uppercase tracking-widest text-[#0F0905] transition-all duration-200 hover:bg-[#0F0905] hover:text-[#F5EDE0] hover:scale-[1.02] active:scale-[0.98]"
          >
            Place an Order <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
