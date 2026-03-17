import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { BatchLogoAnimated } from '../layout/BatchLogo'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; opacity: number; opacityDir: number
}

const PRODUCTS = [
  {
    name: 'Chocolate Chip Cookies',
    image: 'https://v3b.fal.media/files/b/0a92519b/nq4ohVa4HwoCaXqlQRulD_kstuz1D3.png',
    depth: 0.35,
    bobSpeed: 1.5,
    bobAmp: 13,
    rotateZ: -8,
    top: '10%',
    left: '-2%',
    width: 200,
    entranceDelay: 0,
  },
  {
    name: 'Cinnamon Buns',
    image: 'https://v3b.fal.media/files/b/0a92523c/7JTMl7-FJJCkQM4f8ikeb_yLWBYBhm.png',
    depth: 1.0,
    bobSpeed: 1.0,
    bobAmp: 20,
    rotateZ: 3,
    top: '26%',
    left: '22%',
    width: 252,
    entranceDelay: 150,
  },
  {
    name: 'Fudge Brownies',
    image: 'https://v3b.fal.media/files/b/0a92519b/Mdxty-nFYu6B7Kxplz1Z1_T5rwahNv.png',
    depth: 0.6,
    bobSpeed: 1.8,
    bobAmp: 14,
    rotateZ: 6,
    top: '6%',
    left: '55%',
    width: 216,
    entranceDelay: 80,
  },
]

export function HeroSection3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const startTimeRef = useRef<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([])
  const entranceRef = useRef(PRODUCTS.map(() => ({ y: 80, opacity: 0 })))
  const hoverRef = useRef(PRODUCTS.map(() => ({ x: 0, y: 0, tx: 0, ty: 0 })))

  const initParticles = (w: number, h: number): Particle[] =>
    Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -(Math.random() * 0.45 + 0.15),
      size: Math.random() * 2.6 + 0.7,
      opacity: Math.random() * 0.5 + 0.08,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }))

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      particlesRef.current = initParticles(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now
      const t = (now - startTimeRef.current) / 1000

      // Particles
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        p.opacity += p.opacityDir * 0.0035
        if (p.opacity > 0.65 || p.opacity < 0.06) p.opacityDir *= -1
        if (p.y < -6) { p.y = H + 6; p.x = Math.random() * W }
        if (p.x < -6) p.x = W + 6
        if (p.x > W + 6) p.x = -6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(196, 144, 86, ${p.opacity})`
        ctx.fill()
      }

      // Card transforms
      const mouse = mouseRef.current
      PRODUCTS.forEach((p, i) => {
        const el = cardRefs.current[i]
        const inner = cardInnerRefs.current[i]
        if (!el || !inner) return

        const ent = entranceRef.current[i]
        const hov = hoverRef.current[i]
        const delay = p.entranceDelay / 1000

        if (t > delay) {
          ent.y = lerp(ent.y, 0, 0.065)
          ent.opacity = lerp(ent.opacity, 1, 0.065)
        }

        hov.x = lerp(hov.x, hov.tx, 0.1)
        hov.y = lerp(hov.y, hov.ty, 0.1)

        const bobY = Math.sin(t * p.bobSpeed) * p.bobAmp
        const px = mouse.x * p.depth * 58
        const py = mouse.y * p.depth * 38 + bobY + ent.y

        el.style.transform = `translateX(${px}px) translateY(${py}px) rotateZ(${p.rotateZ}deg) rotateX(${hov.x}deg) rotateY(${hov.y}deg)`
        el.style.opacity = String(Math.min(1, Math.max(0, ent.opacity)))

        const shadowDist = 18 + Math.abs(bobY) * 0.55
        const shadowBlur = 32 + Math.abs(bobY) * 0.8
        const shadowAlpha = (0.14 + Math.abs(bobY) * 0.0025).toFixed(3)
        inner.style.boxShadow = `0 ${shadowDist}px ${shadowBlur}px rgba(110, 68, 20, ${shadowAlpha})`
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    }
  }

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    hoverRef.current[i].tx = cy * -18
    hoverRef.current[i].ty = cx * 18
  }

  const handleCardMouseLeave = (i: number) => {
    hoverRef.current[i].tx = 0
    hoverRef.current[i].ty = 0
  }

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: '#FAF7F2' }}
      onMouseMove={handleMouseMove}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-6 flex flex-col lg:flex-row items-center min-h-screen">

        {/* Left: text */}
        <div className="flex-1 text-center lg:text-left py-24 lg:py-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c07843]/35 bg-[#c07843]/10 px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c07843]" />
            <span className="text-sm font-medium tracking-wide text-[#8B5E3C]">
              Handmade in Cairo
            </span>
          </div>

          {/* Logo */}
          <div className="mb-10 flex justify-center lg:justify-start">
            <BatchLogoAnimated size="hero" className="text-foreground" />
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl leading-[1.08] tracking-tight text-[#1c1410] sm:text-6xl md:text-7xl">
            Baked with Love,
            <br />
            Served with Joy
          </h1>

          {/* Subtitle */}
          <p className="mt-6 mx-auto lg:mx-0 max-w-lg text-lg leading-relaxed text-[#7a6655] md:text-xl">
            Artisan cookies, brownies &amp; cinnamon buns — crafted in small
            batches with the finest ingredients
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <button
              onClick={() => scrollTo('#order')}
              className="rounded-full bg-[#c07843] px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-[#a8633a] hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(192,120,67,0.35)]"
            >
              Order Now
            </button>
            <button
              onClick={() => scrollTo('#our-story')}
              className="rounded-full border border-[#c07843]/45 bg-transparent px-8 py-3.5 text-base font-medium text-[#8B5E3C] transition-all hover:bg-[#c07843]/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              Our Story
            </button>
          </div>
        </div>

        {/* Right: 3D floating cards – desktop */}
        <div
          className="flex-1 relative hidden lg:block"
          style={{ height: '72vh', perspective: '1100px' }}
        >
          {PRODUCTS.map((product, i) => (
            <div
              key={product.name}
              ref={(el) => { cardRefs.current[i] = el }}
              className="absolute cursor-pointer select-none"
              style={{
                top: product.top,
                left: product.left,
                width: product.width,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
                zIndex: Math.round(product.depth * 10),
                opacity: 0,
              }}
              onMouseMove={(e) => handleCardMouseMove(e, i)}
              onMouseLeave={() => handleCardMouseLeave(i)}
            >
              <div
                ref={(el) => { cardInnerRefs.current[i] = el }}
                className="rounded-2xl overflow-hidden bg-white"
                style={{ boxShadow: '0 18px 36px rgba(110,68,20,0.14)' }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full object-cover block"
                  style={{ height: Math.round(product.width * 0.76) }}
                  draggable={false}
                />
                <div className="px-4 py-3">
                  <p className="font-display text-base text-[#1c1410]">{product.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: simple bobbing row */}
        <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 mt-2 mb-16 w-full">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.name}
              ref={(el) => { cardRefs.current[i] = el }}
              className="flex-shrink-0 rounded-2xl overflow-hidden bg-white select-none"
              style={{
                width: 168,
                boxShadow: '0 12px 28px rgba(110,68,20,0.13)',
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover block"
                style={{ height: 126 }}
                draggable={false}
              />
              <div className="px-3 py-2.5">
                <p className="font-display text-sm text-[#1c1410]">{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#menu')}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        aria-label="Scroll to menu"
      >
        <ChevronDown className="size-6 text-[#8B5E3C]/55" />
      </button>
    </section>
  )
}
