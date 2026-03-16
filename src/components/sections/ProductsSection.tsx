import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const PRODUCTS = [
  {
    name: 'Cookies',
    description:
      'Chunky chocolate chip cookies with a gooey center, baked golden brown',
    price: '85 EGP / box',
    image:
      'https://v3b.fal.media/files/b/0a92519b/nq4ohVa4HwoCaXqlQRulD_kstuz1D3.png',
  },
  {
    name: 'Brownies',
    description:
      'Rich, fudgy brownies with a crackly top and intense chocolate flavor',
    price: '120 EGP / box',
    image:
      'https://v3b.fal.media/files/b/0a92519b/Mdxty-nFYu6B7Kxplz1Z1_T5rwahNv.png',
  },
  {
    name: 'Cinnamon Buns',
    description:
      'Soft swirled buns with cinnamon sugar and cream cheese frosting',
    price: '95 EGP / box',
    image:
      'https://v3b.fal.media/files/b/0a92523c/7JTMl7-FJJCkQM4f8ikeb_yLWBYBhm.png',
  },
]

export function ProductsSection() {
  const sectionRef = useScrollAnimation()

  const scrollToOrder = () => {
    document.querySelector('#order')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="menu" className="py-24 md:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="scroll-animate mb-16 text-center">
          <h2 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Our Menu
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-accent" />
          <p className="mt-4 text-lg text-muted-foreground">
            Every batch tells a story
          </p>
        </div>

        {/* Product grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.name}
              className="scroll-animate group card-flashlight overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 p-6">
                <h3 className="font-display text-2xl text-card-foreground">
                  {product.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <p className="font-display text-lg text-accent">
                  {product.price}
                </p>
                <button
                  onClick={scrollToOrder}
                  className="mt-2 rounded-lg border border-accent px-4 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-accent-foreground active:scale-[0.98]"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
