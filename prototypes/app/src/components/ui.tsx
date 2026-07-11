import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

export function PageHeader({
  kicker, title, lede, right, accent,
}: { kicker: string; title: string; lede?: string; right?: ReactNode; accent?: string }) {
  return (
    <div className="px-8 pt-7 pb-5 border-b border-hairline bg-panel/60">
      <div className="flex items-end justify-between gap-6 max-w-[1180px]">
        <div>
          <div className="label-caps" style={accent ? { color: accent } : undefined}>{kicker}</div>
          <h1 className="text-[22px] font-semibold tracking-tight text-ink-950 mt-1">{title}</h1>
          {lede && <p className="text-[13.5px] text-muted mt-1.5 max-w-[68ch] leading-relaxed">{lede}</p>}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </div>
  )
}

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-8 py-6 max-w-[1180px] ${className}`}>{children}</div>
}

export function GenerateButton({
  children, onClick, disabled,
}: { children: ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-lg px-4.5 py-2.5 text-[13.5px] font-semibold text-white shadow-raised
                 hover:brightness-110 active:translate-y-px transition disabled:opacity-40 disabled:pointer-events-none"
      style={{ background: 'linear-gradient(120deg, #0ea5c4 0%, #2f6bf6 55%, #4f46e5 100%)' }}
    >
      <Sparkles className="size-4" strokeWidth={1.75} />
      {children}
    </button>
  )
}

export function Pill({ tone, children }: { tone: 'sage' | 'amber' | 'clay' | 'ink'; children: ReactNode }) {
  const map = {
    sage: 'bg-sage-100 text-sage-700',
    amber: 'bg-amber-100 text-amber-700',
    clay: 'bg-clay-100 text-clay-700',
    ink: 'bg-ink-50 text-ink-700',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${map[tone]}`}>
      {children}
    </span>
  )
}

export function ClauseChip({ refText }: { refText: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-ink-50 border border-ink-100 px-1.5 py-px text-[11px] font-semibold text-ink-700 tabular">
      {refText}
    </span>
  )
}
