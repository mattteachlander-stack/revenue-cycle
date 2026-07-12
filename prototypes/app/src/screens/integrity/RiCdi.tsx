import { ArrowRight, FileQuestion, GraduationCap, Sparkles, Stethoscope } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageHeader, Section } from '../../components/ui'

const R700 = 'var(--color-ri-700)'
const R600 = 'var(--color-ri-600)'
const R100 = 'var(--color-ri-100)'
const R50 = 'var(--color-ri-50)'

/** SYNTHETIC concept preview — CDI is a roadmap module in the Revenue Integrity suite. */

const queryQueue = [
  {
    patient: 'R.T. · URN-40733 · Dr H. Vieira',
    episode: 'Cataract extraction & IOL, right — discharged today',
    prompt: 'Operation note records "complex anterior capsule management" but no supporting detail. If capsular staining or iris hooks were used, documenting them supports the complexity classification (Band 2 vs Band 1 — ≈ $310 difference).',
    kind: 'Specificity query',
    status: 'Awaiting clinician',
  },
  {
    patient: 'A.M. · URN-40741 · Dr S. Rao',
    episode: 'Colonoscopy w/ polypectomy — discharged today',
    prompt: 'Histology request notes 3 polyps; operation note records 1. Reconciling the count before coding prevents the exact under-documentation pattern that lost audit item AC-2214 in March.',
    kind: 'Consistency query',
    status: 'Awaiting clinician',
  },
  {
    patient: 'J.K. · URN-40726 · Dr H. Vieira',
    episode: 'Knee arthroscopy + chondroplasty — discharged yesterday',
    prompt: 'Anaesthetic record documents BMI 41 and OSA; neither appears in the discharge summary. Documented comorbidities substantiate the complexity the fund queried in two FY26 audits.',
    kind: 'Comorbidity capture',
    status: 'Answered — documentation updated',
  },
]

const learningLoop = [
  { from: 'Audit outcome (reactive RI)', signal: 'Fund overturns upheld where operation notes lacked complexity detail (ophthalmology, 4 items FY26)', to: 'CDI focus area: anterior-segment complexity documentation' },
  { from: 'Proactive optimisation', signal: 'Band 1 coding on episodes whose theatre time and prosthesis use pattern matches Band 2', to: 'CDI query template: complexity drivers checklist at discharge' },
  { from: 'Clause intelligence (Contracting)', signal: 'cl. 8.4 re-banding disputes turn on documented acuity', to: 'CDI metric: % episodes with classification-grade documentation' },
]

export default function RiCdi() {
  const nav = useNavigate()
  return (
    <div>
      <PageHeader
        accent={R600}
        kicker="Revenue Integrity suite · roadmap module"
        title="Clinical documentation improvement (CDI)"
        lede="Defence starts before the claim exists. CDI reviews documentation at (or before) discharge and raises precise, answerable queries to clinicians — so the record supports the care actually delivered, coding starts from complete notes, and the audit findings you've already conceded never recur."
      />

      <Section className="space-y-4 pb-10">
        <div className="rounded-xl px-5 py-4 flex items-center gap-3" style={{ background: R50, border: `1px solid ${R100}` }}>
          <Sparkles className="size-4 shrink-0" style={{ color: R700 }} />
          <p className="text-[12.5px] leading-relaxed" style={{ color: R700 }}>
            <strong className="font-semibold">Roadmap — not in the current licence.</strong> Shown as a designed concept on
            synthetic data. CDI closes the loop between the audit outcomes you record today and the documentation that
            prevents them tomorrow.
          </p>
        </div>

        {/* the query queue */}
        <div className="card overflow-hidden" style={{ borderTop: `3px solid ${R600}` }}>
          <div className="px-4 pt-4 pb-3 flex items-start gap-3">
            <div className="size-9 rounded-lg grid place-items-center shrink-0" style={{ background: R100 }}>
              <FileQuestion className="size-4" style={{ color: R700 }} strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-bold tracking-[0.09em] uppercase" style={{ color: R600 }}>Query the note, not the clinician's memory</span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide" style={{ background: R50, color: R700 }}>
                  <Sparkles className="size-2.5" /> Concept preview
                </span>
              </div>
              <h2 className="text-[16px] font-semibold text-ink-950 leading-tight">Today's documentation queries</h2>
              <p className="text-[12px] text-muted leading-snug mt-1">
                Raised automatically at discharge from the episode record; each query says exactly what's missing, why it
                matters in dollars or audit risk, and takes the clinician under a minute to resolve. Nothing changes the
                record except the clinician.
              </p>
            </div>
          </div>
          <div className="border-t border-hairline divide-y divide-hairline">
            {queryQueue.map((q) => (
              <div key={q.patient} className="px-5 py-3.5 flex items-start gap-4">
                <Stethoscope className="size-4 mt-0.5 shrink-0" style={{ color: R600 }} strokeWidth={1.75} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-semibold text-ink-950">{q.patient}</span>
                    <span className="text-[11.5px] text-faint">· {q.episode}</span>
                  </div>
                  <p className="text-[12px] text-muted leading-snug mt-1 max-w-[110ch]">{q.prompt}</p>
                </div>
                <div className="shrink-0 text-right space-y-1">
                  <span className="block rounded-full px-2.5 py-0.5 text-[10px] font-bold" style={{ background: R100, color: R700 }}>{q.kind}</span>
                  <span className={`block text-[10.5px] font-semibold ${q.status.startsWith('Answered') ? 'text-sage-700' : 'text-amber-700'}`}>{q.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* the learning loop */}
        <div className="card overflow-hidden" style={{ borderTop: `3px solid ${R600}` }}>
          <div className="px-4 pt-4 pb-3 flex items-start gap-3">
            <div className="size-9 rounded-lg grid place-items-center shrink-0" style={{ background: R100 }}>
              <GraduationCap className="size-4" style={{ color: R700 }} strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <span className="text-[10.5px] font-bold tracking-[0.09em] uppercase" style={{ color: R600 }}>The learning loop</span>
              <h2 className="text-[16px] font-semibold text-ink-950 leading-tight">Every audit you lose teaches CDI what to catch</h2>
              <p className="text-[12px] text-muted leading-snug mt-1">
                CDI focus areas aren't configured by hand — they're derived from the audit categories and outcomes the
                Revenue Integrity workbench already records, plus signals from Contracting.
              </p>
            </div>
          </div>
          <table className="w-full text-[12px] border-t border-hairline">
            <thead>
              <tr className="border-b border-hairline-strong">
                <th className="px-4 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted text-left">Signal source</th>
                <th className="px-3 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted text-left">What was observed</th>
                <th className="px-3 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted text-left">What CDI does with it</th>
              </tr>
            </thead>
            <tbody>
              {learningLoop.map((l) => (
                <tr key={l.from} className="border-b border-hairline last:border-0 align-top">
                  <td className="px-4 py-3 font-semibold text-ink-950 whitespace-nowrap">{l.from}</td>
                  <td className="px-3 py-3 text-muted leading-snug max-w-[48ch]">{l.signal}</td>
                  <td className="px-3 py-3 leading-snug max-w-[42ch]" style={{ color: R700 }}>{l.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-muted">
          <span>CDI queries draw on the same audit categories tracked on the</span>
          <button onClick={() => nav('/integrity')} className="inline-flex items-center gap-1 font-semibold" style={{ color: R700 }}>
            Revenue Integrity dashboard <ArrowRight className="size-3" strokeWidth={2.5} />
          </button>
        </div>

        <p className="text-[11px] text-faint">
          Concept preview on synthetic data — CDI is on the roadmap, not in the current licence. Queries shown are
          illustrative; in production, query rules are reviewed by the facility's clinical governance before activation,
          and only clinicians amend the record.
        </p>
      </Section>
    </div>
  )
}
