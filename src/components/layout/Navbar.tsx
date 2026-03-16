import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BatchLogoAnimated } from './BatchLogo'

const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'Order', href: '#order' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 animate-slide-down transition-all duration-300',
          scrolled
            ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border/50'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <a href="#" className="shrink-0">
            <BatchLogoAnimated
              size="nav"
              className={scrolled ? 'text-foreground' : 'text-background'}
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  'font-sans text-sm tracking-wide transition-colors',
                  scrolled
                    ? 'text-foreground/70 hover:text-foreground'
                    : 'text-background/80 hover:text-background'
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => handleNavClick('#order')}
            className={cn(
              'border-beam hidden rounded-full px-5 py-2 text-sm font-medium transition-all lg:block',
              'bg-accent text-accent-foreground hover:bg-accent/90'
            )}
          >
            Order Now
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              scrolled
                ? 'text-foreground hover:bg-muted'
                : 'text-background hover:bg-background/10'
            )}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background animate-fade-in">
          <div className="flex h-16 items-center justify-between px-6">
            <BatchLogoAnimated size="nav" />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-foreground hover:bg-muted"
            >
              <X className="size-6" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-8 pt-20">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-3xl text-foreground animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#order')}
              className="mt-4 rounded-full bg-accent px-8 py-3 text-lg font-medium text-accent-foreground animate-fade-in-up delay-300"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </>
  )
}
