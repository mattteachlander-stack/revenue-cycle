import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, GraduationCap, Inbox, ShieldCheck, Timer, TrendingUp } from 'lucide-react'
import { PageHeader, Section } from '../../components/ui'
import { MonthlyOutcomeChart, CategoryImpactChart, OutcomeLegend } from '../../components/charts'
import { history, learningActions, type Fund } from '../../data/integrity'
import { useRi } from '../../state-integrity'

type FundFilter = 'All funds' | Fund
type Period = 'Full year' | 'Last 6 months'

export default function RiDashboard() {
  const nav = useNavigate()
  const { items, imported } = useRi()
  const [fund, setFund] = useState<FundFilter>('All funds')
  const [period, setPeriod] = useState<Period>('Full year')

  const records = useMemo(
    () => history.filter((r) =>
      (fund === 'All funds' || r.fund === fund) &&
      (period === 'Full year' || r.monthIdx >= 6)),
    [fund, period],
  )

  const finalised = records.length
  const defended = records.reduce((s, r) => s + r.defended, 0)
  const atRisk = records.reduce((s, r) => s + r.atRisk, 0)
  const conceded = atRisk - defended
  const overturnPct = Math.round(
    (records.filter((r) => r.outcome === 'overturned').length / Math.max(finalised, 1)) * 100,
  )
  const openItems = items.length
  const openAtRisk = items.reduce((s, i) => s + i.atRisk, 0)

  return (
    <div>
      <PageHeader
        accent="var(--color-ri-600)"
        kicker="Revenue Integrity · dashboard"
        title="Audit outcomes & revenue assurance"
        lede="Every fund audit item, its category, its outcome and its dollar impact — so the facility can prove improvement, not just respond. Filter by fund and period; every figure recomputes."
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
          {(['Full year', 'Last 6 months'] as Period[]).map((p) => (
            <Chip key={p} active={period === p} onClick={() => setPeriod(p)}>{p}</Chip>
          ))}
          <span className="ml-auto text-[11px] text-faint">FY2025–26 · synthetic data</span>
        </div>
      </Section>

      <Section className="grid grid-cols-4 gap-4 pt-4">
        <Kpi icon={<Inbox className="size-4" style={{ color: 'var(--color-ri-600)' }} />}
             label="Audit items finalised" value={String(finalised)}
             sub={`+ ${openItems} open in the inbox ($${(openAtRisk / 1000).toFixed(1)}k at risk)`} />
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
              const rs = history.filter((r) => r.fund === f && (period === 'Full year' || r.monthIdx >= 6))
              const d = rs.reduce((s, r) => s + r.defended, 0)
              const a = rs.reduce((s, r) => s + r.atRisk, 0)
              const pct = Math.round((rs.length / Math.max(history.filter((r) => period === 'Full year' || r.monthIdx >= 6).length, 1)) * 100)
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
