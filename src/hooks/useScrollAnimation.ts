import { useEffect, useRef } from 'react'

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    // Observe the element itself and any children with scroll-animate
    const targets = el.querySelectorAll('.scroll-animate')
    targets.forEach((target) => observer.observe(target))

    if (el.classList.contains('scroll-animate')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
