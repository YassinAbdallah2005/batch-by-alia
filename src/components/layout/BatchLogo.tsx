import { cn } from '@/lib/utils'

/**
 * Inline whisk SVG that replaces the "H" in BATCH.
 * It swings continuously from the top pivot point.
 */
function SwingingWhisk({ size = 'hero' }: { size?: 'nav' | 'hero' }) {
  const isHero = size === 'hero'

  return (
    <span
      className="inline-block animate-[whiskSwing_2.8s_ease-in-out_infinite]"
      style={{
        transformOrigin: 'top center',
        display: 'inline-flex',
        alignItems: 'flex-end',
        verticalAlign: 'bottom',
        height: isHero ? '1em' : '1em',
        width: isHero ? '0.55em' : '0.55em',
        marginBottom: isHero ? '-0.02em' : '-0.02em',
      }}
    >
      <svg
        viewBox="0 0 48 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Handle (bottom half) */}
        <rect x="21" y="50" width="6" height="48" rx="3" fill="currentColor" />
        <rect x="22.5" y="52" width="3" height="44" rx="1.5" fill="currentColor" opacity="0.6" />
        {/* Band where wires meet handle */}
        <rect x="19" y="48" width="10" height="5" rx="2.5" fill="currentColor" opacity="0.9" />
        {/* Whisk wires – 6 curved wire loops */}
        <path d="M24 50 C2 44, -4 24, 10 8 C16 1, 22 0, 24 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M24 50 C46 44, 52 24, 38 8 C32 1, 26 0, 24 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M24 50 C8 42, 2 24, 16 6 C20 2, 23 0, 24 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M24 50 C40 42, 46 24, 32 6 C28 2, 25 0, 24 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M24 50 C16 40, 12 24, 24 4 C24 2, 24 1, 24 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M24 50 C32 40, 36 24, 24 4 C24 2, 24 1, 24 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.45" />
        {/* Top tip */}
        <circle cx="24" cy="0" r="2" fill="currentColor" opacity="0.7" />
      </svg>
    </span>
  )
}

/**
 * Recreated BATCH logo as HTML/CSS with an animated swinging whisk as the H.
 * "BATC" in Playfair Display + whisk in place of H + "BY ALIA" below.
 */
export function BatchLogoAnimated({
  size = 'hero',
  className,
}: {
  size?: 'nav' | 'hero'
  className?: string
}) {
  const isHero = size === 'hero'

  return (
    <div
      className={cn(
        'flex flex-col items-center select-none',
        isHero ? 'gap-1' : 'gap-0',
        className
      )}
    >
      {/* BATCH with whisk H */}
      <div
        className={cn(
          'font-display font-black tracking-[0.06em] leading-none flex items-end',
          isHero ? 'text-7xl sm:text-8xl md:text-9xl' : 'text-3xl'
        )}
        style={{ color: 'inherit' }}
      >
        <span>BATC</span>
        <SwingingWhisk size={size} />
      </div>

      {/* BY ALIA */}
      <span
        className={cn(
          'font-display tracking-[0.35em] uppercase opacity-70',
          isHero
            ? 'text-base sm:text-lg md:text-xl'
            : 'text-[0.5rem]'
        )}
        style={{ letterSpacing: isHero ? '0.35em' : '0.25em', color: 'inherit' }}
      >
        BY ALIA
      </span>
    </div>
  )
}
