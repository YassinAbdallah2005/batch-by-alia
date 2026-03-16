import { Heart, Instagram, MessageCircle, Phone, Mail } from 'lucide-react'
import { BatchLogoAnimated } from '../layout/BatchLogo'

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Logo */}
        <div className="mb-12 flex justify-center opacity-80">
          <BatchLogoAnimated size="nav" className="text-foreground" />
        </div>

        {/* Columns */}
        <div className="grid gap-10 text-center sm:grid-cols-3 sm:text-left">
          {/* Menu */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-foreground">
              Menu
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Cookies', href: '#menu' },
                { label: 'Brownies', href: '#menu' },
                { label: 'Cinnamon Buns', href: '#menu' },
                { label: 'Order Now', href: '#order' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-foreground">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Instagram className="size-3.5" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201120110109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MessageCircle className="size-3.5" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-foreground">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@batchbyalia.com"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-3.5" />
                  hello@batchbyalia.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+201120110109"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-3.5" />
                  +20 112 011 0109
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            © 2024 Batch by Alia. Made with
            <Heart className="size-3 fill-accent text-accent" />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
