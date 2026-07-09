import { MONTHS, type HistoryRecord, type Outcome } from '../data/integrity'

const OUTCOME_COLOR: Record<Outcome, string> = {
  overturned: 'var(--color-sage-600)',
  partial: 'var(--color-amber-600)',
  upheld: 'var(--color-clay-600)',
}

export const OUTCOME_LABEL: Record<Outcome, string> = {
  overturned: 'Overturned (defended)',
  partial: 'Partial',
  upheld: 'Upheld (conceded)',
}

/** Stacked monthly bars of finalised audit items by outcome. */
export function MonthlyOutcomeChart({ records }: { records: HistoryRecord[] }) {
  const W = 620, H = 190, pad = { l: 26, r: 6, t: 14, b: 26 }
  const byMonth = MONTHS.map((_, m) => {
    const rs = records.filter((r) => r.monthIdx === m)
    return {
      overturned: rs.filter((r) => r.outcome === 'overturned').length,
      partial: rs.filter((r) => r.outcome === 'partial').length,
      upheld: rs.filter((r) => r.outcome === 'upheld').length,
    }
  })
  const max = Math.max(2, ...byMonth.map((b) => b.overturned + b.partial + b.upheld))
  const bw = (W - pad.l - pad.r) / 12
  const scale = (H - pad.t - pad.b) / max

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[...Array(max + 1)].map((_, i) =>
        i % 2 === 0 ? (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={H - pad.b - i * scale} y2={H - pad.b - i * scale}
                  stroke="var(--color-hairline)" strokeWidth={1} />
            <text x={pad.l - 6} y={H - pad.b - i * scale + 3} textAnchor="end" fontSize={9}
                  fill="var(--color-faint)">{i}</text>
          </g>
        ) : null,
      )}
      {byMonth.map((b, m) => {
        const x = pad.l + m * bw + bw * 0.18
        const w = bw * 0.64
        let y = H - pad.b
        const segs: [Outcome, number][] = [['overturned', b.overturned], ['partial', b.partial], ['upheld', b.upheld]]
        return (
          <g key={m}>
            {segs.map(([o, n]) => {
              if (!n) return null
              const h = n * scale
              y -= h
              return <rect key={o} x={x} y={y} width={w} height={h - 1.5} rx={2} fill={OUTCOME_COLOR[o]} opacity={0.88} />
            })}
            <text x={x + w / 2} y={H - pad.b + 14} textAnchor="middle" fontSize={9} fill="var(--color-muted)">
              {MONTHS[m].split(' ')[0]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** Horizontal defended-vs-conceded bars per category. */
export function CategoryImpactChart({ records }: { records: HistoryRecord[] }) {
  const cats = [...new Set(records.map((r) => r.category))]
  const rows = cats
    .map((c) => {
      const rs = records.filter((r) => r.category === c)
      const defended = rs.reduce((s, r) => s + r.defended, 0)
      const conceded = rs.reduce((s, r) => s + (r.atRisk - r.defended), 0)
      return { c, n: rs.length, defended, conceded, total: defended + conceded }
    })
    .sort((a, b) => b.total - a.total)
  const max = Math.max(...rows.map((r) => r.total), 1)

  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.c} className="flex items-center gap-3">
          <span className="w-44 shrink-0 text-[11.75px] text-ink-950 leading-tight">{r.c}</span>
          <span className="w-6 shrink-0 text-[11px] tabular text-faint text-right">{r.n}</span>
          <div className="flex-1 h-[13px] rounded-sm bg-ink-50 overflow-hidden flex">
            <div style={{ width: `${(r.defended / max) * 100}%`, background: 'var(--color-sage-600)', opacity: 0.85 }} />
            <div style={{ width: `${(r.conceded / max) * 100}%`, background: 'var(--color-clay-600)', opacity: 0.8 }} />
          </div>
          <span className="w-24 shrink-0 text-right text-[11.5px] tabular">
            <span className="text-sage-700 font-semibold">${(r.defended / 1000).toFixed(1)}k</span>
            <span className="text-faint"> / </span>
            <span className="text-clay-700">${(r.conceded / 1000).toFixed(1)}k</span>
          </span>
        </div>
      ))}
    </div>
  )
}

export function OutcomeLegend() {
  return (
    <div className="flex items-center gap-4">
      {(Object.keys(OUTCOME_COLOR) as Outcome[]).map((o) => (
        <span key={o} className="inline-flex items-center gap-1.5 text-[11px] text-muted">
          <span className="size-2.5 rounded-sm" style={{ background: OUTCOME_COLOR[o] }} />
          {OUTCOME_LABEL[o]}
        </span>
      ))}
    </div>
  )
}
