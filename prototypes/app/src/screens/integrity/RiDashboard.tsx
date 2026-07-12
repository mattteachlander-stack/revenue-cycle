import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, ArrowUpRight, CheckCircle2, CircleDashed, GraduationCap, Inbox, Loader, Minus, ShieldCheck, Timer, TrendingUp } from 'lucide-react'
import { PageHeader, Section } from '../../components/ui'
import { MonthlyOutcomeChart, CategoryImpactChart, OutcomeLegend } from '../../components/charts'
import { auscareItems, history, learningActions, CATEGORIES, type Category, type Fund } from '../../data/integrity'
import { useRi } from '../../state-integrity'

type FundFilter = 'All funds' | Fund
type Period = 'Last quarter' | 'Last 6 months' | 'Full year'

const PERIODS: { label: Period; fromIdx: number }[] = [
  { label: 'Last quarter', fromIdx: 9 },
  { label: 'Last 6 months', fromIdx: 6 },
  { label: 'Full year', fromIdx: 0 },
]

const QUARTERS = [
  { label: 'Q1 · Jul–Sep 25', from: 0, to: 2 },
  { label: 'Q2 · Oct–Dec 25', from: 3, to: 5 },
  { label: 'Q3 · Jan–Mar 26', from: 6, to: 8 },
  { label: 'Q4 · Apr–Jun 26', from: 9, to: 11 },
]

export default function RiDashboard() {
  const nav = useNavigate()
  const { items, imported, itemState } = useRi()
  const [fund, setFund] = useState<FundFilter>('All funds')
  const [period, setPeriod] = useState<Period>('Full year')

  const fromIdx = PERIODS.find((p) => p.label === period)!.fromIdx
  const records = useMemo(
    () => history.filter((r) => (fund === 'All funds' || r.fund === fund) && r.monthIdx >= fromIdx),
    [fund, fromIdx],
  )

  // ---- live status counts (from the working state, not the historical file)
  const decided = (id: string) => itemState[id]?.decision != null
  const outstanding = items.filter((i) => !decided(i.id)).length + (imported ? 0 : auscareItems.length)
  const inProgress = items.filter((i) => decided(i.id)).length
  const finalised = records.length

  // ---- outcome economics for the selected period
  const defended = records.reduce((s, r) => s + r.defended, 0)
  const atRisk = records.reduce((s, r) => s + r.atRisk, 0)
  const conceded = atRisk - defended
  const overturnPct = Math.round(
    (records.filter((r) => r.outcome === 'overturned').length / Math.max(finalised, 1)) * 100,
  )
  const openAtRisk = items.filter((i) => !decided(i.id)).reduce((s, i) => s + i.atRisk, 0)
    + (imported ? 0 : auscareItems.reduce((s, i) => s + i.atRisk, 0))

  // ---- historic view by category (full year, fund-filtered)
  const fundHistory = useMemo(
    () => history.filter((r) => fund === 'All funds' || r.fund === fund),
    [fund],
  )
  const categoryRows = CATEGORIES.map((cat) => {
    const rs = fundHistory.filter((r) => r.category === cat)
    if (rs.length === 0) return null
    const cells = QUARTERS.map((q) => {
      const qr = rs.filter((r) => r.monthIdx >= q.from && r.monthIdx <= q.to)
      const d = qr.reduce((s, r) => s + r.defended, 0)
      const a = qr.reduce((s, r) => s + r.atRisk, 0)
      return { n: qr.length, defended: d, atRisk: a }
    })
    const firstHalf = cells[0].n + cells[1].n
    const secondHalf = cells[2].n + cells[3].n
    const trend: 'up' | 'down' | 'flat' = secondHalf > firstHalf ? 'up' : secondHalf < firstHalf ? 'down' : 'flat'
    const totalD = rs.reduce((s, r) => s + r.defended, 0)
    const totalA = rs.reduce((s, r) => s + r.atRisk, 0)
    return { cat, cells, trend, totalD, totalA, total: rs.length }
  }).filter(Boolean) as {
    cat: Category
    cells: { n: number; defended: number; atRisk: number }[]
    trend: 'up' | 'down' | 'flat'
    totalD: number
    totalA: number
    total: number
  }[]

  return (
    <div>
      <PageHeader
        accent="var(--color-ri-600)"
        kicker="Revenue Integrity · dashboard"
        title="Audit outcomes & revenue assurance"
        lede="Every fund audit item, its status, its category, its outcome and its dollar impact — so the facility can prove improvement, not just respond. Filter by fund and time frame; every figure recomputes."
        right={
          <button
            onClick={() => nav('/integrity/inbox')}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white transition hover:opacity-90"
            style={{ background: 'var(--color-ri-700)' }}
          >
            <Inbox className="size-4" strokeWidth={1.75} />
            Audit inbox {imported ? '' : '· 1 new file'}
          </button>
        }
      />

      <Section className="pb-2">
        <div className="flex items-center gap-2">
          {(['All funds', 'AusCare Health', 'Federation Health'] as FundFilter[]).map((f) => (
            <Chip key={f} active={fund === f} onClick={() => setFund(f)}>{f}</Chip>
          ))}
          <span className="w-px h-5 bg-hairline-strong mx-1.5" />
          {PERIODS.map((p) => (
            <Chip key={p.label} active={period === p.label} onClick={() => setPeriod(p.label)}>{p.label}</Chip>
          ))}
          <span className="ml-auto text-[11px] text-faint">FY2025–26 · synthetic data</span>
        </div>
      </Section>

      {/* ---- audit status: where every audit item sits right now ---- */}
      <Section className="grid grid-cols-3 gap-4 pt-4">
        <StatusCard
          icon={<CircleDashed className="size-4 text-amber-600" strokeWidth={2} />}
          label="Outstanding" value={outstanding}
          tone="amber"
          sub={`received, not yet reviewed · $${(openAtRisk / 1000).toFixed(1)}k at risk${imported ? '' : ' · incl. 1 file awaiting import'}`}
          onClick={() => nav('/integrity/inbox')}
        />
        <StatusCard
          icon={<Loader className="size-4" style={{ color: 'var(--color-ri-600)' }} strokeWidth={2} />}
          label="In progress" value={inProgress}
          tone="ri"
          sub="decision recorded · response being assembled in the workbench"
          onClick={() => nav('/integrity/workbench')}
        />
        <StatusCard
          icon={<CheckCircle2 className="size-4 text-sage-600" strokeWidth={2} />}
          label="Finalised" value={finalised}
          tone="sage"
          sub={`closed with a fund outcome in the selected time frame (${period.toLowerCase()})`}
        />
      </Section>

      {/* ---- outcome economics for the selected period ---- */}
      <Section className="grid grid-cols-3 gap-4 pt-0">
        <Kpi icon={<ShieldCheck className="size-4 text-sage-600" />}
             label="Revenue defended" value={`$${(defended / 1000).toFixed(1)}k`}
             sub={`of $${(atRisk / 1000).toFixed(1)}k challenged · $${(conceded / 1000).toFixed(1)}k conceded`} />
        <Kpi icon={<TrendingUp className="size-4 text-sage-600" />}
             label="Overturn rate" value={`${overturnPct}%`}
             sub="fully overturned · partials counted separately" />
        <Kpi icon={<Timer className="size-4 text-amber-600" />}
             label="Avg days to respond" value="9.2"
             sub="against shortest contractual window of 30 days" />
      </Section>

      <Section className="grid grid-cols-5 gap-4 pt-0">
        <div className="card col-span-3 p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[14px] font-semibold text-ink-950">Results over time — finalised items by outcome</h2>
          </div>
          <div className="mt-3">
            <MonthlyOutcomeChart records={records} />
          </div>
          <div className="mt-2 border-t border-hairline pt-3">
            <OutcomeLegend />
          </div>
        </div>

        <div className="card col-span-2 p-5">
          <h2 className="text-[14px] font-semibold text-ink-950">Who's auditing us</h2>
          <div className="mt-3 space-y-3">
            {(['AusCare Health', 'Federation Health'] as Fund[]).map((f) => {
              const rs = history.filter((r) => r.fund === f && r.monthIdx >= fromIdx)
              const d = rs.reduce((s, r) => s + r.defended, 0)
              const a = rs.reduce((s, r) => s + r.atRisk, 0)
              const pct = Math.round((rs.length / Math.max(history.filter((r) => r.monthIdx >= fromIdx).length, 1)) * 100)
              return (
                <div key={f} className="rounded-lg border border-hairline px-4 py-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] font-semibold text-ink-950">{f}</span>
                    <span className="text-[11.5px] text-faint tabular">{rs.length} items · {pct}% of volume</span>
                  </div>
                  <div className="mt-2 h-[9px] rounded-full bg-ink-50 overflow-hidden flex">
                    <div style={{ width: `${(d / Math.max(a, 1)) * 100}%`, background: 'var(--color-sage-600)', opacity: 0.85 }} />
                  </div>
                  <div className="mt-1.5 text-[11.5px] text-muted tabular">
                    ${(d / 1000).toFixed(1)}k defended of ${(a / 1000).toFixed(1)}k challenged
                    <span className="font-semibold text-sage-700"> ({Math.round((d / Math.max(a, 1)) * 100)}%)</span>
                  </div>
                </div>
              )
            })}
            <p className="text-[11.5px] text-muted leading-snug pt-1">
              Prostheses queries dominate Federation activity; AusCare spreads across coding,
              classification and eligibility — different playbooks, both documented below.
            </p>
          </div>
        </div>
      </Section>

      {/* ---- historic view by category: quarter-by-quarter, full year ---- */}
      <Section className="pt-0">
        <div className="card p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[14px] font-semibold text-ink-950">Historic view by category — quarter by quarter</h2>
            <span className="text-[11px] text-faint">full FY2025–26 · items finalised (defended share shaded) · trend = H2 vs H1</span>
          </div>
          <table className="w-full text-[12px] mt-3">
            <thead>
              <tr className="border-b border-hairline-strong">
                <Th>Category</Th>
                {QUARTERS.map((q) => <Th key={q.label} center>{q.label}</Th>)}
                <Th right>FY total</Th>
                <Th right>$ defended / challenged</Th>
                <Th center>Trend</Th>
              </tr>
            </thead>
            <tbody>
              {categoryRows.map((row) => (
                <tr key={row.cat} className="border-b border-hairline last:border-0">
                  <td className="px-4 py-2.5 font-semibold text-ink-950 whitespace-nowrap">{row.cat}</td>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="px-3 py-2.5 text-center">
                      {cell.n === 0 ? (
                        <span className="text-faint">—</span>
                      ) : (
                        <span className="inline-flex flex-col items-center gap-1 min-w-[44px]">
                          <span className="tabular font-semibold text-ink-950">{cell.n}</span>
                          <span className="h-[5px] w-full max-w-[52px] rounded-full bg-clay-100 overflow-hidden flex">
                            <span style={{
                              width: `${(cell.defended / Math.max(cell.atRisk, 1)) * 100}%`,
                              background: 'var(--color-sage-600)',
                            }} />
                          </span>
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-3 py-2.5 text-right tabular font-semibold text-ink-950">{row.total}</td>
                  <td className="px-3 py-2.5 text-right tabular text-muted whitespace-nowrap">
                    <span className="font-semibold text-sage-700">${(row.totalD / 1000).toFixed(1)}k</span>
                    {' / '}${(row.totalA / 1000).toFixed(1)}k
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    {row.trend === 'up' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-clay-700">
                        <ArrowUpRight className="size-3.5" strokeWidth={2.5} /> rising
                      </span>
                    )}
                    {row.trend === 'down' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sage-700">
                        <ArrowDownRight className="size-3.5" strokeWidth={2.5} /> falling
                      </span>
                    )}
                    {row.trend === 'flat' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-faint">
                        <Minus className="size-3.5" strokeWidth={2.5} /> steady
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[11.5px] text-muted leading-snug mt-3">
            A <span className="font-semibold text-clay-700">rising</span> category is where audit pressure is moving —
            and where the learning actions (right) and the CDI roadmap module aim next. A{' '}
            <span className="font-semibold text-sage-700">falling</span> category with a high defended share is a
            playbook that's working.
          </p>
        </div>
      </Section>

      <Section className="grid grid-cols-5 gap-4 pt-0 pb-10">
        <div className="card col-span-3 p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[14px] font-semibold text-ink-950">Results by category — defended vs conceded</h2>
            <span className="text-[11px] text-faint">count · $ defended / $ conceded</span>
          </div>
          <div className="mt-4">
            <CategoryImpactChart records={records} />
          </div>
        </div>

        <div className="card col-span-2 p-5" style={{ background: 'var(--color-ri-50)', borderColor: 'var(--color-ri-100)' }}>
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4" style={{ color: 'var(--color-ri-700)' }} strokeWidth={1.75} />
            <h2 className="text-[14px] font-semibold text-ink-950">Learning actions — closing the loop</h2>
          </div>
          <p className="text-[11.75px] text-muted mt-1 leading-snug">
            Every audit category feeds a process fix, so the same finding doesn't come back next quarter.
          </p>
          <ul className="mt-3 space-y-3">
            {learningActions.map((a) => (
              <li key={a.action} className="rounded-lg bg-panel border border-hairline px-3.5 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold tracking-wide uppercase" style={{ color: 'var(--color-ri-700)' }}>{a.category}</span>
                  <span className="text-[10.5px] text-faint">{a.when}</span>
                </div>
                <p className="text-[12.25px] text-ink-950 font-medium leading-snug mt-1">{a.action}</p>
                <p className="text-[11.25px] text-muted leading-snug mt-0.5">{a.trigger}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => nav('/integrity/workbench')}
                  className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                  style={{ color: 'var(--color-ri-700)' }}>
            Open the response workbench <ArrowRight className="size-3.5" />
          </button>
        </div>
      </Section>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={[
        'rounded-full px-3.5 py-1.5 text-[12px] font-medium border transition',
        active ? 'text-white border-transparent' : 'bg-panel text-muted border-hairline-strong hover:text-ink-950',
      ].join(' ')}
      style={active ? { background: 'var(--color-ri-700)' } : undefined}
    >
      {children}
    </button>
  )
}

const statusTone = {
  amber: { bg: 'var(--color-amber-100)', fg: 'var(--color-amber-700)' },
  ri: { bg: 'var(--color-ri-100)', fg: 'var(--color-ri-700)' },
  sage: { bg: 'var(--color-sage-100)', fg: 'var(--color-sage-700)' },
}

function StatusCard({ icon, label, value, sub, tone, onClick }: {
  icon: React.ReactNode
  label: string
  value: number
  sub: string
  tone: keyof typeof statusTone
  onClick?: () => void
}) {
  const t = statusTone[tone]
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag onClick={onClick}
         className={`card p-4.5 text-left ${onClick ? 'hover:shadow-raised transition cursor-pointer' : ''}`}
         style={{ borderTop: `3px solid ${t.fg}` }}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="label-caps">Audits {label.toLowerCase()}</span>
        <span className="ml-auto rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide"
              style={{ background: t.bg, color: t.fg }}>
          {label}
        </span>
      </div>
      <div className="text-[30px] font-semibold tracking-tight text-ink-950 tabular mt-2 leading-none">{value}</div>
      <p className="text-[11.75px] text-muted mt-2 leading-snug">{sub}</p>
    </Tag>
  )
}

function Kpi({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="card p-4.5">
      <div className="flex items-center gap-2">
        {icon}
        <span className="label-caps">{label}</span>
      </div>
      <div className="text-[26px] font-semibold tracking-tight text-ink-950 tabular mt-2 leading-none">{value}</div>
      <p className="text-[11.75px] text-muted mt-2 leading-snug">{sub}</p>
    </div>
  )
}

function Th({ children, right, center }: { children: React.ReactNode; right?: boolean; center?: boolean }) {
  return (
    <th className={`px-3 first:px-4 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted ${right ? 'text-right' : center ? 'text-center' : 'text-left'}`}>
      {children}
    </th>
  )
}
