import { useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarClock, TrendingDown, ShieldAlert, FileWarning } from 'lucide-react'
import { PageHeader, Section, GenerateButton, Pill, ClauseChip } from '../components/ui'
import { facility, negotiation, fmtM } from '../data/facility'

export default function Dashboard() {
  const nav = useNavigate()

  return (
    <div>
      <PageHeader
        kicker={`Negotiation copilot · ${negotiation.fund}`}
        title={`${facility.name} × ${negotiation.fund} — HPPA renewal`}
        lede={`Current agreement expires ${negotiation.contractExpires}. ${negotiation.fundShort} has asked for proposals by ${negotiation.proposalsDue}. Everything below is drawn from the executed HPPA, your uploaded financials, and public industry data.`}
        right={
          <GenerateButton onClick={() => nav('/analyse')}>
            Analyse position <ArrowRight className="size-4" strokeWidth={2} />
          </GenerateButton>
        }
      />

      {/* KPI row */}
      <Section className="grid grid-cols-4 gap-4">
        <Kpi
          icon={<TrendingDown className="size-4 text-clay-600" strokeWidth={1.75} />}
          label="Revenue under negotiation"
          value={fmtM(negotiation.revenueAtStake)}
          sub={`${negotiation.episodes.toLocaleString()} episodes/yr · 22% of facility revenue`}
        />
        <Kpi
          icon={<CalendarClock className="size-4 text-amber-600" strokeWidth={1.75} />}
          label="Days until proposals due"
          value={String(negotiation.daysToProposals)}
          sub={`Expiry in ${negotiation.daysToExpiry} days · frozen holdover after that (cl. 2.2)`}
        />
        <Kpi
          icon={<ShieldAlert className="size-4 text-clay-600" strokeWidth={1.75} />}
          label="Walk-away (second-tier) downside"
          value={`−$470k/yr`}
          sub={`Modelled at 85% floor: ${fmtM(negotiation.secondTier.revenue)} vs ${fmtM(negotiation.revenueAtStake)}`}
        />
        <Kpi
          icon={<FileWarning className="size-4 text-amber-600" strokeWidth={1.75} />}
          label="Adverse clauses identified"
          value={String(negotiation.flaggedClauses.length)}
          sub="2 already exercised by the fund this term"
        />
      </Section>

      <Section className="grid grid-cols-5 gap-4 pt-0">
        {/* rate position */}
        <div className="card col-span-3 p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[14px] font-semibold text-ink-950">Position vs market — {negotiation.fundShort} rates</h2>
            <span className="text-[11px] text-faint">vs synthetic state medians · demo</span>
          </div>
          <p className="text-[12.5px] text-muted mt-1 leading-relaxed">
            Where your contracted case payments sit against comparable day facilities, weighted by your volume.
          </p>
          <div className="mt-4 space-y-3">
            {negotiation.ratePosition.map((r) => (
              <RateBar key={r.line} line={r.line} pct={r.vsMarketPct} share={r.share} />
            ))}
          </div>
          <p className="text-[12px] text-muted mt-4 border-t border-hairline pt-3 leading-relaxed">
            Volume-weighted gap ≈ <strong className="text-clay-700 font-semibold">−5.6%</strong> — roughly{' '}
            <strong className="text-clay-700 font-semibold">$175k/yr</strong> against this fund alone, before terms.
          </p>
        </div>

        {/* contract summary */}
        <div className="card col-span-2 p-5">
          <h2 className="text-[14px] font-semibold text-ink-950">Current agreement</h2>
          <dl className="mt-3 space-y-2 text-[12.5px]">
            <Row k="Term" v={`${negotiation.contractSigned} → ${negotiation.contractExpires} (3 yrs)`} />
            <Row k="Structure" v="Bundled case payments, 4 bands — no per-diems" />
            <Row k="Indexation" v="CPI capped 4.0%, discretionary carve-out (cl. 12.3)" />
            <Row k="FY25 indexation paid" v="1.9% against CPI of 3.4% — carve-out exercised" />
            <Row k="Termination" v="Fund 90 days · Hospital 180 days (cl. 19.1)" />
          </dl>

          <div className="mt-4 pt-3 border-t border-hairline">
            <div className="label-caps mb-2">Flagged terms</div>
            <ul className="space-y-2">
              {negotiation.flaggedClauses.slice(0, 3).map((c) => (
                <li key={c.ref} className="flex items-start gap-2">
                  <ClauseChip refText={c.ref} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] font-medium text-ink-950">{c.name}</span>
                      <Pill tone={c.severity === 'high' ? 'clay' : 'amber'}>
                        {c.severity === 'high' ? 'High' : 'Medium'}
                      </Pill>
                    </div>
                    <p className="text-[11.75px] text-muted leading-snug mt-0.5">{c.note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => nav('/analyse')}
              className="mt-3 text-[12px] font-medium text-ink-600 hover:text-ink-800 inline-flex items-center gap-1"
            >
              Full analysis in the positioning paper <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </Section>

      <Section className="grid grid-cols-5 gap-4 pt-0 pb-10">
        {/* payer mix */}
        <div className="card col-span-2 p-5">
          <h2 className="text-[14px] font-semibold text-ink-950">Payer mix — share of revenue</h2>
          <div className="mt-4 space-y-2.5">
            {facility.payerMix.map((p) => (
              <div key={p.payer} className="flex items-center gap-3">
                <span className={`w-40 shrink-0 text-[12px] ${p.focus ? 'font-semibold text-ink-950' : 'text-muted'}`}>
                  {p.payer}
                </span>
                <div className="flex-1 h-[9px] rounded-full bg-ink-50 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${p.focus ? 'bg-ink-600' : 'bg-ink-100'}`}
                    style={{ width: `${p.pct * 3.5}%` }}
                  />
                </div>
                <span className={`w-9 text-right text-[12px] tabular ${p.focus ? 'font-semibold text-ink-950' : 'text-muted'}`}>
                  {p.pct}%
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11.75px] text-muted mt-4 leading-snug border-t border-hairline pt-3">
            All funds shown are fictional. AusCare concentration (22%) is the single largest negotiable exposure.
          </p>
        </div>

        {/* margin trend + key dates */}
        <div className="col-span-3 grid grid-rows-[auto_1fr] gap-4">
          <div className="card p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[14px] font-semibold text-ink-950">Facility EBITDA margin</h2>
              <span className="text-[11px] text-faint">{facility.year} revenue {fmtM(facility.revenue)}</span>
            </div>
            <div className="mt-4 flex items-end gap-8">
              {facility.marginTrend.map((m, i) => (
                <div key={m.year} className="flex flex-col items-center gap-1.5">
                  <span className={`text-[13px] tabular font-semibold ${i === 2 ? 'text-clay-700' : 'text-ink-900'}`}>
                    {m.pct.toFixed(1)}%
                  </span>
                  <div
                    className={`w-16 rounded-t-md ${i === 2 ? 'bg-clay-600/80' : 'bg-ink-600/70'}`}
                    style={{ height: `${m.pct * 11}px` }}
                  />
                  <span className="text-[11px] text-muted">{m.year}</span>
                </div>
              ))}
              <p className="text-[12.5px] text-muted leading-relaxed max-w-[36ch] self-center">
                Wages +6.2% p.a. and consumables +5.4% p.a. against blended indexation of +2.6% p.a. —
                every under-indexed agreement compounds this squeeze.
              </p>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-[14px] font-semibold text-ink-950">Key dates</h2>
            <ol className="mt-3 relative border-l border-hairline-strong ml-1.5 space-y-3.5">
              <DateRow date="6 Jul 2026" label="Today — demo date" state="now" />
              <DateRow date="31 Aug 2026" label={`Proposals due to ${negotiation.fundShort} (fund’s letter, 12 Jun)`} state="next" />
              <DateRow date="30 Sep 2026" label="Target: heads of agreement on rates & terms" state="future" />
              <DateRow date="30 Nov 2026" label="Agreement expires — frozen holdover begins (cl. 2.2)" state="risk" />
            </ol>
          </div>
        </div>
      </Section>
    </div>
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

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-32 shrink-0 text-muted">{k}</dt>
      <dd className="text-ink-950 font-medium">{v}</dd>
    </div>
  )
}

function RateBar({ line, pct, share }: { line: string; pct: number; share: string }) {
  const adverse = pct < -0.5
  return (
    <div className="flex items-center gap-3">
      <span className="w-52 shrink-0 text-[12.5px] text-ink-950">{line}</span>
      <div className="flex-1 relative h-[18px]">
        <div className="absolute inset-y-0 left-1/2 w-px bg-hairline-strong" />
        <div
          className={`absolute inset-y-[3px] rounded-sm ${adverse ? 'bg-clay-600/75' : 'bg-sage-600/70'}`}
          style={
            pct < 0
              ? { right: '50%', width: `${Math.abs(pct) * 5.5}%` }
              : { left: '50%', width: `${Math.max(Math.abs(pct) * 5.5, 0.5)}%` }
          }
        />
      </div>
      <span className={`w-14 text-right text-[12.5px] tabular font-semibold ${adverse ? 'text-clay-700' : 'text-sage-700'}`}>
        {pct === 0 ? 'at mkt' : `${pct.toFixed(1)}%`}
      </span>
      <span className="w-16 text-right text-[11px] text-faint">{share} vol</span>
    </div>
  )
}

function DateRow({ date, label, state }: { date: string; label: string; state: 'now' | 'next' | 'future' | 'risk' }) {
  const dot = {
    now: 'bg-ink-600 ring-4 ring-ink-100',
    next: 'bg-amber-600',
    future: 'bg-ink-100',
    risk: 'bg-clay-600',
  }[state]
  return (
    <li className="pl-5 relative">
      <span className={`absolute -left-[5px] top-1 size-2.5 rounded-full ${dot}`} />
      <span className="text-[12px] tabular font-semibold text-ink-900 mr-2">{date}</span>
      <span className="text-[12.5px] text-muted">{label}</span>
    </li>
  )
}
