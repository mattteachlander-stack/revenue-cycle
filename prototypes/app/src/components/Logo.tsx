/** The CORE hexagonal "C" mark — cyan → blue → indigo gradient. */
export function CoreMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" aria-label="CORE logo">
      <defs>
        <linearGradient id="core-g" x1="380" y1="60" x2="380" y2="452" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2ee6c9" />
          <stop offset="0.38" stopColor="#22b8f0" />
          <stop offset="0.72" stopColor="#3b6cf6" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <path
        d="M 411.9 166 L 256 76 L 100.1 166 L 100.1 346 L 256 436 L 411.9 346"
        stroke="url(#core-g)"
        strokeWidth="88"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CoreWordmark({ dark = true }: { dark?: boolean }) {
  return (
    <span
      className="font-display font-extrabold tracking-[0.18em] text-[17px] leading-none"
      style={{ color: dark ? '#ffffff' : 'var(--color-navy-950)' }}
    >
      CORE
    </span>
  )
}
