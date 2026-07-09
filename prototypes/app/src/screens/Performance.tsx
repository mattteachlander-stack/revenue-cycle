import { useNavigate } from 'react-router-dom'
import { ArrowRight, CircleDollarSign, FileClock, Target, TrendingUp } from 'lucide-react'
import { PageHeader, Section } from '../components/ui'
import {
  negotiationHistory, indexationRealised, federationRealisation, opportunityRegister,
} from '../data/performance'

const C = 'var(--color-neg-700)'
const C600 = 'var(--color-neg-600)'
const C100 = 'var(--color-neg-100)'
const C50 = 'var(--color-neg-50)'

const toneCls = {
  good: 'bg-sage-100 text-sage-700',
  ok: 'bg-ink-50 text-ink-700',
  poor: 'bg-clay-100 text-clay-700',
  live: 'text-white',
} as const

const oppTone = {
  captured: 'bg-sage-100 text-sage-700',
  'in negotiation': 'text-white',
  lapsed: 'bg-clay-100 text-clay-700',
  identified: 'bg-amber-100 text-amber-700',
} as const

export default function Performance() {
  const nav = useNavigate()
  const oppTotal = opportunityRegister.reduce((s, o) => s + o.valuePerYear, 0)
  const oppCaptured = opportunityRegister.filter((o) => o.status === 'captured').reduce((s, o) => s + o.valuePerYear, 0)
  const oppLive = opportunityRegister.filter((o) => o.status === 'in negotiation').reduce((s, o) => s + o.valuePerYear, 0)
  const fedNegotiated = federationRealisation.reduce((s, r) => s + r.negotiated, 0)
  const fedRealised = federationRealisation.reduce((s, r) => s + r.realised, 0)

  return (
    <div>
      <PageHeader
        accent={C600}
        kicker="Contracting suite · historical module"
        title="Negotiation performance & value realisation"
        lede="Every negotiation the facility has run, what it settled for, and — the part most organisations never check — whether the negotiated value actually landed through the contract period."
      />

      <Section className="grid grid-cols-4 gap-4">
        <Kpi icon={<FileClock className="size-4" style={{ color: C600 }} />}
             label="Agreements under management" value="4"
             sub="AusCare · Federation · Wattle · AHSA group" />
        <Kpi icon={<TrendingUp className="size-4 text-sage-600" />}
             label="Federation FY25 deal realised" value={`${Math.round((fedRealised / fedNegotiated) * 100)}%`}
             sub={`$${Math.round(fedRealised / 1000)}k of $${Math.round(fedNegotiated / 1000)}k/yr negotiated value landed`} />
        <Kpi icon={<Target className="size-4" style={{ color: C600 }} />}
             label="Opportunities in play" value={`$${Math.round(oppLive / 1000)}k/yr`}
             sub="all three carried into the live AusCare renewal" />
        <Kpi icon={<CircleDollarSign className="size-4 text-sage-600" />}
             label="Opportunities captured FY26" value={`$${Math.round(oppCaptured / 1000)}k/yr`}
             sub={`of $${Math.round(oppTotal / 1000)}k/yr identified across the register`} />
      </Section>

      <Section className="grid grid-cols-5 gap-4 pt-0">
        {/* negotiation history */}
        <div className="card col-span-3 overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-hairline">
            <h2 className="text-[14px] font-semibold text-ink-950">Negotiation history</h2>
            <p className="text-[11.75px] text-muted mt-0.5">Every cycle, its approach, and what it settled for.</p>
          </div>
          <ul>
            {negotiationHistory.map((n) => (
              <li key={n.agreement + n.cycle} className="px-5 py-3.5 border-b border-hairline last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-semibold text-ink-950">{n.agreement}</span>
                  <span className="text-[11.5px] text-faint">{n.cycle} · {n.concluded}</span>
                  <span className={`ml-auto inline-flex rounded-full px-2.5 py-0.5 text-[10.75px] font-bold ${toneCls[n.outcomeTone]}`}
                        style={n.outcomeTone === 'live' ? { background: C } : undefined}>
                    {n.headline}
                  </span>
                </div>
                <div className="text-[11.75px] text-muted mt-1">
                  <span className="font-medium text-ink-700">{n.approach}.</span> {n.note}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* indexation realised */}
        <div className="card col-span-2 p-5">
          <h2 className="text-[14px] font-semibold text-ink-950">Did the contracts deliver? — FY26 indexation realised</h2>
          <p className="text-[11.75px] text-muted mt-0.5 mb-4">CPI for the year: 3.4% (grey line). What each agreement actually paid.</p>
          <div className="space-y-3.5">
            {indexationRealised.map((r) => (
              <div key={r.fund}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[12.5px] font-medium text-ink-950">{r.fund}</span>
                  <span className={`text-[12.5px] tabular font-bold ${r.tone === 'poor' ? 'text-clay-700' : r.tone === 'good' ? 'text-sage-700' : 'text-ink-900'}`}>
                    {r.realisedPct.toFixed(1)}%
                  </span>
                </div>
                <div className="relative mt-1 h-[10px] rounded-full bg-ink-50 overflow-hidden">
                  <div className="absolute inset-y-0 rounded-full"
                       style={{ width: `${(r.realisedPct / 4.5) * 100}%`,
                                background: r.tone === 'poor' ? 'var(--color-clay-600)' : r.tone === 'good' ? 'var(--color-sage-600)' : C600,
                                opacity: 0.85 }} />
                  <div className="absolute inset-y-0 w-[2px] bg-ink-900/50" style={{ left: `${(3.4 / 4.5) * 100}%` }} />
                </div>
                <div className="text-[11px] text-faint mt-0.5">{r.contracted}</div>
              </div>
            ))}
          </div>
          <p className="text-[11.75px] text-muted mt-4 pt-3 border-t border-hairline leading-snug">
            The AusCare shortfall (1.9% vs 3.4% CPI) is worth ≈ <strong className="text-clay-700">$45k/yr, compounding</strong> —
            quantified here, being corrected in the live renewal.
          </p>
        </div>
      </Section>

      <Section className="grid grid-cols-5 gap-4 pt-0 pb-10">
        {/* Federation realisation tracker */}
        <div className="card col-span-2 p-5" style={{ background: C50, borderColor: C100 }}>
          <h2 className="text-[14px] font-semibold text-ink-950">Value realisation — Federation FY25 deal</h2>
          <p className="text-[11.75px] text-muted mt-0.5 mb-3">Negotiated on paper vs landed in the bank, line by line.</p>
          <ul className="space-y-2.5">
            {federationRealisation.map((r) => (
              <li key={r.item} className="rounded-lg bg-panel border border-hairline px-3.5 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12.25px] font-medium text-ink-950 leading-snug">{r.item}</span>
                  <span className={`shrink-0 inline-flex rounded-full px-2 py-0.5 text-[10.5px] font-bold ${
                    r.status === 'captured' ? 'bg-sage-100 text-sage-700'
                    : r.status === 'behind' ? 'bg-clay-100 text-clay-700'
                    : r.status === 'at risk' ? 'bg-amber-100 text-amber-700'
                    : 'bg-ink-50 text-ink-700'}`}>
                    {r.status}
                  </span>
                </div>
                <div className="text-[11.5px] tabular text-muted mt-1">
                  ${Math.round(r.realised / 1000)}k realised of ${Math.round(r.negotiated / 1000)}k/yr negotiated
                </div>
                <p className="text-[11.25px] text-faint leading-snug mt-0.5">{r.note}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* opportunity register */}
        <div className="card col-span-3 overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-hairline flex items-baseline justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-ink-950">Value opportunity register</h2>
              <p className="text-[11.75px] text-muted mt-0.5">Everything the platform has identified across the portfolio — and what happened to it.</p>
            </div>
            <span className="text-[11.5px] tabular text-faint">${Math.round(oppTotal / 1000)}k/yr identified</span>
          </div>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-hairline-strong">
                <Th>Agreement</Th><Th>Opportunity</Th><Th right>Value / yr</Th><Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {opportunityRegister.map((o) => (
                <tr key={o.id} className="border-b border-hairline last:border-0">
                  <td className="px-5 py-2.5 font-semibold text-ink-950">{o.agreement}</td>
                  <td className="px-3 py-2.5 text-muted leading-snug">{o.opportunity}</td>
                  <td className="px-3 py-2.5 text-right tabular font-semibold text-ink-900">${(o.valuePerYear / 1000).toFixed(0)}k</td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10.5px] font-bold ${oppTone[o.status]}`}
                          style={o.status === 'in negotiation' ? { background: C } : undefined}>
                      {o.status}
                    </span>
                    <div className="text-[10.75px] text-faint mt-0.5">{o.when}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-hairline">
            <button onClick={() => nav('/dashboard')} className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: C }}>
              Three of these are live in the AusCare renewal <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </Section>
    </div>
  )
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th className={`px-3 first:px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted ${right ? 'text-right' : 'text-left'}`}>
      {children}
    </th>
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
