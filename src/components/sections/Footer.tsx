import { Heart, Instagram, MessageCircle, Phone, Mail } from 'lucide-react'
import { BatchLogoAnimated } from '../layout/BatchLogo'

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0A0604] py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Logo */}
        <div className="mb-12 flex justify-center opacity-70">
          <BatchLogoAnimated size="nav" className="text-[#F5EDE0]" />
        </div>

        {/* Divider */}
        <div className="mb-12 h-px bg-[#2E1E12]" />

        {/* Columns */}
        <div className="grid gap-10 text-center sm:grid-cols-3 sm:text-left">
          {/* Menu */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#5A4030]">
              Menu
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Cookies', href: '#menu' },
                { label: 'Brownies', href: '#menu' },
                { label: 'Cinnamon Buns', href: '#menu' },
                { label: 'Order Now', href: '#order' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="cursor-pointer text-sm text-[#6A5040] transition-colors hover:text-[#F5EDE0]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#5A4030]">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.instagram.com/batchbakery_eg?igsh=MXYxYXpka3hkYzgybg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#6A5040] transition-colors hover:text-[#F5EDE0]"
                >
                  <Instagram className="size-3.5" />
                  @batchbakery_eg
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201120110109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#6A5040] transition-colors hover:text-[#F5EDE0]"
                >
                  <MessageCircle className="size-3.5" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#5A4030]">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@batchbyalia.com"
                  className="inline-flex items-center gap-2 text-sm text-[#6A5040] transition-colors hover:text-[#F5EDE0]"
                >
                  <Mail className="size-3.5" />
                  hello@batchbyalia.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+201120110109"
                  className="inline-flex items-center gap-2 text-sm text-[#6A5040] transition-colors hover:text-[#F5EDE0]"
                >
                  <Phone className="size-3.5" />
                  +20 112 011 0109
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-[#2E1E12] pt-8 text-center">
          <p className="inline-flex items-center gap-1.5 text-xs text-[#3A2820]">
            © 2024 Batch by Alia. Made with
            <Heart className="size-3 fill-[#D4944A] text-[#D4944A]" />
            in Cairo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
