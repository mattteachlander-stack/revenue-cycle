import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Building2, Gauge as GaugeIcon, Landmark, Scale, ShieldAlert } from 'lucide-react'
import { PageHeader, Section } from '../components/ui'
import {
  ausCareIntel, federationIntel, leverageFactors, leverageScore, leverageReading, dependencies, hospitalIntel,
} from '../data/fundIntel'

const C = 'var(--color-neg-700)'
const C600 = 'var(--color-neg-600)'
const C100 = 'var(--color-neg-100)'
const C50 = 'var(--color-neg-50)'

export default function FundIntelligence() {
  const nav = useNavigate()
  const [fund, setFund] = useState<'AusCare Health' | 'Federation Health'>('AusCare Health')
  const isAusCare = fund === 'AusCare Health'
  const intel: typeof ausCareIntel & { status?: string } = isAusCare ? ausCareIntel : federationIntel
  const score = leverageScore()
  const fin = intel.financial

  return (
    <div>
      <PageHeader
        accent={C600}
        kicker="Contracting suite · negotiation intelligence engine"
        title={`${fund} — fund intelligence${isAusCare ? ' & leverage' : ''}`}
        lede="Every fund gets a dossier the engine keeps warm. Public sources plus Bayview's own history — never other customers' terms. Every figure carries its evidence."
        right={
          <button onClick={() => nav('/clauses')}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white transition hover:brightness-110"
                  style={{ background: 'linear-gradient(120deg, #0ea5c4 0%, #2f6bf6 55%, #4f46e5 100%)' }}>
            Clause intelligence <ArrowRight className="size-4" strokeWidth={2} />
          </button>
        }
      />

      <Section className="pb-0">
        <div className="flex items-center gap-2">
          {(['AusCare Health', 'Federation Health'] as const).map((f) => (
            <button key={f} onClick={() => setFund(f)}
                    className={['rounded-full px-3.5 py-1.5 text-[12px] font-medium border transition',
                      fund === f ? 'text-white border-transparent' : 'bg-panel text-muted border-hairline-strong hover:text-ink-950'].join(' ')}
                    style={fund === f ? { background: C } : undefined}>
              {f}{f === 'AusCare Health' ? ' · live negotiation' : ''}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-faint">Updated {intel.updated} · synthetic</span>
        </div>
      </Section>

      {!isAusCare && (
        <Section className="pb-0">
          <div className="card p-5 flex items-start gap-4" style={{ background: C50, borderColor: C100 }}>
            <Scale className="size-5 mt-0.5 shrink-0" style={{ color: C }} strokeWidth={1.75} />
            <div>
              <div className="text-[14px] font-semibold text-ink-950">The benchmark relationship — no active negotiation</div>
              <p className="text-[12.75px] text-muted leading-relaxed mt-1">{intel.status} A full Negotiation
                Leverage Index is computed when a renewal window opens; until then the dossier below keeps
                accumulating so preparation starts from evidence, not a blank page.</p>
            </div>
          </div>
        </Section>
      )}

      {/* leverage index */}
      {isAusCare && <Section className="grid grid-cols-5 gap-4">
        <div className="card col-span-2 p-5 flex flex-col" style={{ background: C50, borderColor: C100 }}>
          <div className="flex items-center gap-2">
            <Scale className="size-4" style={{ color: C }} strokeWidth={1.75} />
            <span className="label-caps" style={{ color: C }}>Negotiation Leverage Index</span>
          </div>
          <div className="flex items-end gap-3 mt-3">
            <span className="font-display font-extrabold text-[52px] leading-none tabular text-ink-950">{score.toFixed(1)}</span>
            <span className="text-[14px] text-muted mb-1.5">/ 10 · moderately favourable</span>
          </div>
          <div className="mt-3 h-[10px] rounded-full bg-white overflow-hidden border border-hairline">
            <div className="h-full rounded-full brand-gradient" style={{ width: `${score * 10}%` }} />
          </div>
          <p className="text-[12.5px] text-body leading-relaxed mt-4">{leverageReading.summary}</p>
          <div className="mt-4 pt-3 border-t border-hairline">
            <div className="label-caps mb-1" style={{ color: C }}>Recommended posture</div>
            <p className="text-[13px] font-semibold text-ink-950">{leverageReading.posture}</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-[11.75px] leading-snug">
            <div>
              <div className="font-semibold text-sage-700 mb-1">Raises leverage</div>
              <ul className="space-y-1 text-muted">{leverageReading.raises.map((r) => <li key={r}>· {r}</li>)}</ul>
            </div>
            <div>
              <div className="font-semibold text-clay-700 mb-1">Lowers leverage</div>
              <ul className="space-y-1 text-muted">{leverageReading.lowers.map((r) => <li key={r}>· {r}</li>)}</ul>
            </div>
          </div>
          <p className="text-[10.5px] text-faint mt-3">Composite of the weighted factors at right — the score summarises the argument — the factors are the argument. Methodology illustrative (demo).</p>
        </div>

        <div className="card col-span-3 p-5">
          <h2 className="text-[14px] font-semibold text-ink-950">Why the score is what it is — every factor, weighted, evidenced</h2>
          <div className="mt-3 space-y-2">
            {leverageFactors.map((f) => (
              <div key={f.name} className="flex items-center gap-3">
                <span className={`w-1.5 h-6 rounded-full shrink-0 ${f.direction === 'up' ? 'bg-sage-600' : 'bg-clay-600'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12.25px] text-ink-950 leading-tight">{f.name}</div>
                  <div className="text-[10.75px] text-faint leading-tight">{f.evidence}</div>
                </div>
                <div className="w-28 shrink-0 h-[7px] rounded-full bg-ink-50 overflow-hidden">
                  <div className={`h-full ${f.direction === 'up' ? 'bg-sage-600' : 'bg-clay-600'}`}
                       style={{ width: `${f.score * 10}%`, opacity: 0.8 }} />
                </div>
                <span className="w-16 text-right text-[11px] tabular text-muted shrink-0">w {Math.round(f.weight * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </Section>}

      {/* fund profile */}
      <Section className="grid grid-cols-3 gap-4 pt-0">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Landmark className="size-4" style={{ color: C }} strokeWidth={1.75} />
            <h2 className="text-[14px] font-semibold text-ink-950">Financial intelligence</h2>
          </div>
          <div className="mb-4">
            <div className="label-caps mb-2">Premium increases vs CPI · 5 years</div>
            <div className="flex items-end gap-2 h-[86px]">
              {fin.premiumIncreases.map((p, i) => (
                <div key={p.year} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-[3px] justify-center" style={{ height: 62 }}>
                    <div className="w-3 rounded-t-sm" style={{ height: `${p.value * 14}px`, background: C600 }} />
                    <div className="w-3 rounded-t-sm bg-ink-100" style={{ height: `${fin.cpiComparator[i].value * 14}px` }} />
                  </div>
                  <span className="text-[9.5px] text-faint">{p.year}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-1 text-[10px] text-muted">
              <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm" style={{ background: C600 }} /> premium increase</span>
              <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm bg-ink-100" /> CPI</span>
            </div>
          </div>
          <dl className="space-y-1.5 text-[12.25px]">
            <Row k="Benefit ratio" v={`${fin.benefitRatioPct}% (industry ~${fin.industryBenefitRatioPct}%)`} bad={fin.benefitRatioPct < fin.industryBenefitRatioPct} />
            <Row k="Net margin" v={`${fin.netMarginPct}%`} />
            <Row k="Mgmt expense ratio" v={`${fin.managementExpensePct}% (industry ~${fin.industryMExpensePct}%)`} bad={fin.managementExpensePct > fin.industryMExpensePct} />
            <Row k="Membership growth" v={`${fin.membershipGrowthPct}% p.a.`} />
            <Row k="Capital coverage" v={`${fin.capitalCoverage}× PCA`} />
            <Row k="Claims inflation" v={`${fin.claimsInflationPct}%`} />
            <Row k="Hospital benefits paid" v={fin.hospitalBenefitsPaid} />
            <Row k="Policies" v={fin.policies} />
          </dl>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="size-4" style={{ color: C }} strokeWidth={1.75} />
            <h2 className="text-[14px] font-semibold text-ink-950">Commercial intelligence</h2>
          </div>
          <div className="label-caps mb-1.5">Strategic priorities</div>
          <ul className="space-y-1.5 text-[12.25px] text-muted leading-snug">
            {intel.commercial.priorities.map((p) => <li key={p}>· {p}</li>)}
          </ul>
          <div className="label-caps mb-1.5 mt-4">Positioning</div>
          <p className="text-[12.25px] text-muted leading-snug">{intel.commercial.positioning}</p>
          <div className="label-caps mb-1.5 mt-4">Public commitments (quotable)</div>
          <ul className="space-y-2">
            {intel.commercial.publicCommitments.map((p) => (
              <li key={p} className="text-[11.75px] italic text-body leading-snug border-l-2 pl-2.5" style={{ borderColor: C100 }}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="size-4" style={{ color: C }} strokeWidth={1.75} />
            <h2 className="text-[14px] font-semibold text-ink-950">Negotiation behaviour</h2>
          </div>
          <div className="label-caps mb-1.5">Typical posture</div>
          <p className="text-[12.25px] text-muted leading-snug">{intel.behaviour.posture}</p>
          <div className="label-caps mb-1.5 mt-3.5">Observed concessions (own history)</div>
          <ul className="space-y-1.5 text-[12.25px] text-muted leading-snug">
            {intel.behaviour.concessions.map((c) => <li key={c}>· {c}</li>)}
          </ul>
          <div className="label-caps mb-1.5 mt-3.5">Relationship timeline</div>
          <ol className="relative border-l border-hairline-strong ml-1 space-y-2">
            {intel.behaviour.relationship.map((r) => (
              <li key={r.when} className="pl-3.5 relative">
                <span className="absolute -left-[4px] top-1.5 size-2 rounded-full" style={{ background: C600 }} />
                <span className="text-[11px] tabular font-semibold text-ink-900 mr-1.5">{r.when}</span>
                <span className="text-[11.75px] text-muted">{r.event}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* dependency + hospital intel */}
      <Section className="grid grid-cols-5 gap-4 pt-0 pb-10">
        <div className="card col-span-3 p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[14px] font-semibold text-ink-950">Mutual dependency — who needs whom</h2>
            <span className="text-[11px] text-faint">synthetic catchment modelling</span>
          </div>
          <p className="text-[11.75px] text-muted mt-1 mb-4">Left: share of Bayview revenue. Right: share of that fund's local day-surgery admissions delivered at Bayview. Leverage lives where the right bar beats the left.</p>
          <div className="space-y-3.5">
            {dependencies.map((d) => (
              <div key={d.fund}>
                <div className="flex items-baseline justify-between">
                  <span className={`text-[12.75px] font-semibold ${d.fund.startsWith('AusCare') ? 'text-ink-950' : 'text-muted'}`}>{d.fund}</span>
                  <span className="text-[10.75px] text-faint">{d.uniqueness}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <div className="h-[10px] rounded-full bg-ink-50 overflow-hidden">
                      <div className="h-full bg-clay-600/75" style={{ width: `${d.revenueSharePct * 3}%` }} />
                    </div>
                    <div className="text-[10.5px] text-muted mt-0.5 tabular">{d.revenueSharePct}% of Bayview revenue</div>
                  </div>
                  <div>
                    <div className="h-[10px] rounded-full bg-ink-50 overflow-hidden">
                      <div className="h-full bg-sage-600/80" style={{ width: `${d.fundLocalReliancePct * 3}%` }} />
                    </div>
                    <div className="text-[10.5px] text-muted mt-0.5 tabular">{d.fundLocalReliancePct}% of the fund's local day admissions</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-body mt-4 pt-3 border-t border-hairline leading-relaxed">
            <strong>The AusCare read:</strong> it holds 22% of your revenue, but you deliver <strong>31% of its local day-surgery
            admissions</strong> — its members' shortest ophthalmic and endoscopy pathway. Neither side walks cheaply; the negotiation is
            real on both sides of the table.
          </p>
        </div>

        <div className="card col-span-2 p-5">
          <div className="flex items-center gap-2 mb-3">
            <GaugeIcon className="size-4" style={{ color: C }} strokeWidth={1.75} />
            <h2 className="text-[14px] font-semibold text-ink-950">Hospital intelligence — Bayview</h2>
          </div>
          <dl className="space-y-1.5 text-[12.25px]">
            <Row k="Catchment" v={`${hospitalIntel.catchment.name} · pop ${hospitalIntel.catchment.population}`} />
            <Row k="Over-65 / PHI cover" v={`${hospitalIntel.catchment.over65Pct}% · ${hospitalIntel.catchment.phiCoveragePct}%`} />
            <Row k="Capacity" v={`${hospitalIntel.capacity.theatres} theatres · ${hospitalIntel.capacity.utilisationPct}% utilised · ${hospitalIntel.capacity.headroom}`} />
          </dl>
          <div className="label-caps mb-1.5 mt-3.5">Competitors in catchment</div>
          <ul className="space-y-2">
            {hospitalIntel.competitors.map((c) => (
              <li key={c.name} className="rounded-lg border border-hairline px-3 py-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12.25px] font-semibold text-ink-950">{c.name}</span>
                  <span className="text-[10.5px] text-faint tabular">{c.distance}</span>
                </div>
                <div className="text-[11.25px] text-muted leading-snug">{c.overlap} · {c.position}</div>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-3 mt-3.5 text-[11.5px] leading-snug">
            <div>
              <div className="font-semibold text-sage-700 mb-1">Strengths</div>
              <ul className="space-y-1 text-muted">{hospitalIntel.strengths.map((s) => <li key={s}>· {s}</li>)}</ul>
            </div>
            <div>
              <div className="font-semibold text-clay-700 mb-1">Watch-outs</div>
              <ul className="space-y-1 text-muted">{hospitalIntel.weaknesses.map((s) => <li key={s}>· {s}</li>)}</ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

function Row({ k, v, bad }: { k: string; v: string; bad?: boolean }) {
  return (
    <div className="flex gap-3">
      <dt className="w-40 shrink-0 text-muted">{k}</dt>
      <dd className={`font-medium ${bad ? 'text-clay-700' : 'text-ink-950'}`}>{v}</dd>
    </div>
  )
}
