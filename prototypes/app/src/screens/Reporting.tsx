import { useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarClock, CheckCircle2, Database, FileSearch, ListChecks } from 'lucide-react'
import { PageHeader, Section, Pill } from '../components/ui'
import { obligations, statusMeta } from '../data/reporting'

const O700 = 'var(--color-ops-700)'
const O600 = 'var(--color-ops-600)'
const O100 = 'var(--color-ops-100)'
const O50 = 'var(--color-ops-50)'

export default function Reporting() {
  const nav = useNavigate()

  const active = obligations.filter((o) => o.status !== 'under-negotiation')
  const next30 = active.filter((o) => o.dueInDays <= 30)
  const autoCollected = active.filter((o) => o.source.includes('auto')).length
  const timeline = [...obligations]
    .filter((o) => o.dueInDays < 900)
    .sort((a, b) => a.dueInDays - b.dueInDays)

  return (
    <div>
      <PageHeader
        accent={O600}
        kicker="Operational suite · Contract reporting"
        title="Every reporting obligation, scoured from every contract"
        lede="Contracts don't just set rates — they impose reporting duties, and a missed one hands the fund a compliance lever mid-negotiation. This module extracts every obligation from every executed agreement, builds the submission timeline, and assembles the data from the systems that hold it."
      />

      <Section className="grid grid-cols-4 gap-4">
        <Kpi icon={<ListChecks className="size-4" style={{ color: O700 }} />}
             label="Obligations tracked" value={String(obligations.length)}
             sub="across 2 executed agreements · re-scoured on every amendment" />
        <Kpi icon={<CalendarClock className="size-4 text-amber-600" />}
             label="Due in next 30 days" value={String(next30.length)}
             sub="earliest: 14 Jul (AusCare quality pack + claims file)" />
        <Kpi icon={<CheckCircle2 className="size-4 text-sage-600" />}
             label="Overdue" value="0"
             sub="12 consecutive months without a late submission" />
        <Kpi icon={<Database className="size-4" style={{ color: O700 }} />}
             label="Auto-collected" value={`${autoCollected} of ${active.length}`}
             sub="assembled from PAS, PMS billing and the quality system" />
      </Section>

      <Section className="grid grid-cols-5 gap-4 pt-0">
        {/* timeline */}
        <div className="card col-span-2 p-5">
          <h2 className="text-[14px] font-semibold text-ink-950">Submission timeline</h2>
          <p className="text-[11.75px] text-muted mt-0.5">Next 90 days, from the contracts as executed.</p>
          <ol className="mt-4 space-y-0">
            {timeline.map((o, i) => {
              const m = statusMeta[o.status]
              return (
                <li key={o.id} className="relative pl-6 pb-4 last:pb-0">
                  {i < timeline.length - 1 && (
                    <span className="absolute left-[7px] top-4 bottom-0 w-px bg-hairline-strong" />
                  )}
                  <span className="absolute left-0 top-1 size-[15px] rounded-full border-2 grid place-items-center"
                        style={{ borderColor: O600, background: o.status === 'submitted' ? O600 : '#fff' }}>
                    {o.status === 'submitted' && <CheckCircle2 className="size-2.5 text-white" strokeWidth={3} />}
                  </span>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[12.5px] font-semibold text-ink-950">{o.nextDue}</span>
                    <Pill tone={m.tone}>{m.label}</Pill>
                  </div>
                  <div className="text-[12px] text-ink-950 mt-0.5">{o.name}</div>
                  <div className="text-[11px] text-faint">{o.contract} · {o.clause}</div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* register */}
        <div className="card col-span-3 overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-hairline">
            <h2 className="text-[14px] font-semibold text-ink-950">Obligation register</h2>
            <p className="text-[11.75px] text-muted mt-0.5">
              Extracted clause-by-clause — the same engine that classifies terms for Clause intelligence flags anything
              that requires the facility to report, attest, produce or notify.
            </p>
          </div>
          <div className="divide-y divide-hairline">
            {obligations.map((o) => {
              const m = statusMeta[o.status]
              return (
                <div key={o.id} className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[12.75px] font-semibold text-ink-950">{o.name}</span>
                    <span className="rounded-md border border-hairline-strong px-1.5 py-px text-[10.5px] font-semibold text-muted">
                      {o.contract} · {o.clause}
                    </span>
                    <span className="ml-auto"><Pill tone={m.tone}>{m.label}</Pill></span>
                  </div>
                  <p className="text-[11.75px] text-muted leading-snug mt-1 max-w-[92ch]">{o.what}</p>
                  <div className="flex items-center gap-4 mt-1.5 text-[11px] text-faint">
                    <span>{o.frequency}</span>
                    <span>Next: <strong className="font-semibold text-ink-800">{o.nextDue}</strong></span>
                    <span className="inline-flex items-center gap-1"><Database className="size-3" /> {o.source}</span>
                  </div>
                  {o.note && (
                    <p className="text-[11.25px] leading-snug mt-1.5 rounded-md px-2.5 py-1.5 inline-block"
                       style={{ background: O50, color: O700 }}>
                      {o.note}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      <Section className="pt-0 pb-10">
        <div className="rounded-xl px-5 py-4 flex items-center gap-3" style={{ background: O50, border: `1px solid ${O100}` }}>
          <FileSearch className="size-4 shrink-0" style={{ color: O700 }} />
          <p className="text-[12.25px] leading-relaxed" style={{ color: O700 }}>
            <strong className="font-semibold">Why this sits in CORE:</strong> reporting obligations are contract terms —
            when a schedule changes in negotiation (like AusCare's proposed Schedule 4), the register updates from
            Change intelligence, and the cost of a new obligation is priced before it's accepted, not discovered after.
          </p>
          <button onClick={() => nav('/changes')}
                  className="ml-auto shrink-0 inline-flex items-center gap-1 text-[12px] font-semibold no-print"
                  style={{ color: O700 }}>
            Change intelligence <ArrowRight className="size-3" strokeWidth={2.5} />
          </button>
        </div>
        <p className="text-[11px] text-faint mt-3">
          Synthetic demonstration data — obligations, clause references and dates are illustrative, drawn from the two
          synthetic HPPAs.
        </p>
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
