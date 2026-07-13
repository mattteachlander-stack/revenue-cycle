import { useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarClock, GraduationCap, Megaphone, Radar, Sigma } from 'lucide-react'
import { PageHeader, Section, Pill } from '../components/ui'
import { regChanges, materialityMeta } from '../data/regchange'

const O700 = 'var(--color-ops-700)'
const O600 = 'var(--color-ops-600)'
const O100 = 'var(--color-ops-100)'
const O50 = 'var(--color-ops-50)'

export default function RegChange() {
  const nav = useNavigate()
  const material = regChanges.filter((c) => c.materiality === 'Material')
  const consultations = regChanges.filter((c) => c.dateLabel === 'Consultation closes')
  const eduTriggers = regChanges.filter((c) => c.educationLink)

  return (
    <div>
      <PageHeader
        accent={O600}
        kicker="Operational suite · Regulatory change"
        title="Every MBS, banding and reform change — assessed against your data"
        lede="MBS item updates, theatre banding reform, legislation and consultations are ingested as they land, then compared against the facility's own services, volumes and rates. The output is a materiality call and a decision: respond to the consultation, update education, brief the sites — or, just as valuably, do nothing."
      />

      <Section className="grid grid-cols-4 gap-4">
        <Kpi icon={<Radar className="size-4" style={{ color: O700 }} />}
             label="Changes ingested this quarter" value={String(regChanges.length)}
             sub="MBS reviews · banding reform · Prescribed List · PHI rules · state guidance" />
        <Kpi icon={<Sigma className="size-4 text-clay-600" />}
             label="Assessed material" value={String(material.length)}
             sub="exposure computed from the facility's own volumes and rates" />
        <Kpi icon={<Megaphone className="size-4 text-amber-600" />}
             label="Consultation windows open" value={String(consultations.length)}
             sub="earliest close: 22 Aug (banding reform)" />
        <Kpi icon={<GraduationCap className="size-4" style={{ color: O700 }} />}
             label="Education updates triggered" value={String(eduTriggers.length)}
             sub="flagged automatically into the Education library" />
      </Section>

      {/* the materiality method, on one worked example */}
      <Section className="pt-0">
        <div className="card overflow-hidden" style={{ borderTop: `3px solid ${O600}` }}>
          <div className="px-5 pt-4 pb-3">
            <span className="text-[10.5px] font-bold tracking-[0.09em] uppercase" style={{ color: O600 }}>How a materiality call is made — worked example</span>
            <h2 className="text-[15px] font-semibold text-ink-950 mt-0.5">RC-1 · MBS colonoscopy descriptor changes, 1 Nov 2026</h2>
          </div>
          <div className="grid grid-cols-3 border-t border-hairline divide-x divide-hairline text-[12.25px]">
            <div className="px-5 py-3.5">
              <div className="label-caps mb-1">The change</div>
              <p className="text-muted leading-snug">Tightened indications, surveillance intervals and documentation notes on the 32222–32228 item group.</p>
            </div>
            <div className="px-5 py-3.5" style={{ background: O50 }}>
              <div className="label-caps mb-1" style={{ color: O700 }}>Against your data</div>
              <p className="leading-snug" style={{ color: O700 }}>
                <strong className="font-semibold">3,410 episodes/yr</strong> bill this group — the facility's largest line
                ($4.47m). Both HPPAs band off the MBS item, and "indication not documented" is already an audit category
                the funds use.
              </p>
            </div>
            <div className="px-5 py-3.5">
              <div className="label-caps mb-1">The call</div>
              <p className="text-muted leading-snug">
                <strong className="font-semibold text-clay-700">Material.</strong> Not because fees move — because
                documentation non-compliance converts directly into bounced claims and audit findings at your volume.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* register */}
      <Section className="pt-0 pb-10">
        <div className="card overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-hairline flex items-baseline justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-ink-950">Change register — assessed, decided, tracked</h2>
              <p className="text-[11.75px] text-muted mt-0.5">Every change gets a decision on the record — including the decision to do nothing.</p>
            </div>
            <span className="text-[11px] text-faint">synthetic feed · FY26–27</span>
          </div>
          <div className="divide-y divide-hairline">
            {regChanges.map((c) => {
              const m = materialityMeta[c.materiality]
              return (
                <div key={c.id} className="px-5 py-3.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded-md border border-hairline-strong px-1.5 py-px text-[10.5px] font-semibold text-muted">{c.source}</span>
                    <span className="text-[13px] font-semibold text-ink-950">{c.title}</span>
                    <span className="ml-auto flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] text-faint">
                        <CalendarClock className="size-3" /> {c.dateLabel} {c.date}
                      </span>
                      <Pill tone={m.tone}>{c.materiality}</Pill>
                    </span>
                  </div>
                  <p className="text-[12px] text-muted leading-snug mt-1 max-w-[100ch]">{c.what}</p>
                  <div className="grid grid-cols-12 gap-3 mt-2">
                    <div className="col-span-3 rounded-lg border border-hairline px-3 py-2">
                      <div className="label-caps mb-0.5">Exposure — your data</div>
                      <div className="text-[12.25px] font-semibold text-ink-950">{c.exposure}</div>
                      <p className="text-[11px] text-muted leading-snug mt-0.5">{c.exposureBasis}</p>
                    </div>
                    <div className="col-span-6 rounded-lg border border-hairline px-3 py-2">
                      <div className="label-caps mb-0.5">Recommendation</div>
                      <p className="text-[11.75px] text-ink-950 leading-snug">{c.recommendation}</p>
                    </div>
                    <div className="col-span-3 rounded-lg border border-hairline px-3 py-2">
                      <div className="label-caps mb-0.5">Actions · status</div>
                      <div className="flex flex-wrap gap-1 mb-1">
                        {c.actions.map((a) => (
                          <span key={a} className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                                style={{ background: O100, color: O700 }}>{a}</span>
                        ))}
                      </div>
                      <span className={`text-[11px] font-semibold ${
                        c.status === 'Decision needed' ? 'text-amber-700'
                        : c.status === 'Actioned' ? 'text-sage-700' : 'text-muted'}`}>
                        {c.status}
                      </span>
                      {c.educationLink && (
                        <button onClick={() => nav('/education')}
                                className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-left no-print"
                                style={{ color: O700 }}>
                          <GraduationCap className="size-3" /> {c.educationLink} <ArrowRight className="size-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <p className="text-[11px] text-faint mt-3">
          Synthetic demonstration data — changes, dates and exposures are illustrative. In production the feed ingests
          MBS updates, Federal Register instruments, Prescribed List determinations and consultation papers as published.
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
