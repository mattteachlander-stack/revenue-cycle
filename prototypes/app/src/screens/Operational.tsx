import { Bot, Braces, Check, CircleAlert, Layers, Sparkles } from 'lucide-react'
import { PageHeader, Section } from '../components/ui'

const O700 = 'var(--color-ops-700)'
const O600 = 'var(--color-ops-600)'
const O100 = 'var(--color-ops-100)'
const O50 = 'var(--color-ops-50)'

/** SYNTHETIC concept previews — roadmap modules shown as designed mocks. */

const drgQueue = [
  { patient: 'K.L. · URN-40711', booking: 'Knee arthroscopy + meniscectomy', items: '49560, 49561', drg: 'I18Z', label: 'Knee procedures', conf: 0.94, est: '$2,405', flag: null },
  { patient: 'S.P. · URN-40718', booking: 'Colonoscopy w/ polypectomy', items: '32228', drg: 'G48B', label: 'Colonoscopy, same-day', conf: 0.97, est: '$950', flag: null },
  { patient: 'M.R. · URN-40723', booking: 'Cataract extraction & IOL, left', items: '42702', drg: 'C16B', label: 'Lens procedures, same-day', conf: 0.96, est: '$1,885', flag: null },
  { patient: 'D.W. · URN-40729', booking: 'Complex flap repair, forearm', items: '45201, 45203', drg: 'J11B', label: 'Skin/subcut. procedures', conf: 0.71, est: '$2,455', flag: 'Complexity drivers unclear from booking note — coder review suggested' },
]

const codingEpisode = {
  header: 'E.S. · URN-40548 · Dr H. Vieira · discharged 16 Apr 2026',
  suggested: [
    { code: 'H25.9', kind: 'ICD-10-AM', desc: 'Age-related cataract, unspecified', conf: 0.97, accepted: true },
    { code: '42702-00', kind: 'ACHI', desc: 'Extracapsular crystalline lens extraction w/ IOL insertion', conf: 0.98, accepted: true },
    { code: 'H40.1', kind: 'ICD-10-AM', desc: 'Primary open-angle glaucoma (documented comorbidity)', conf: 0.86, accepted: false },
    { code: 'Z96.1', kind: 'ICD-10-AM', desc: 'Presence of intraocular lens (contralateral)', conf: 0.74, accepted: false },
  ],
}

const botChecks = [
  { claim: 'BV-88712 · AusCare', checks: [['OEC verified', true], ['IFC on file', true], ['Prosthesis sticker matched', true], ['Lodgement window (7-day internal)', true]], state: 'Lodged automatically · 2 Jul 14:22' },
  { claim: 'BV-88716 · Federation', checks: [['OEC verified', true], ['IFC on file', true], ['Prosthesis sticker missing', false], ['Lodgement window', true]], state: 'Held — sticker sheet missing, theatre notified' },
  { claim: 'BV-88719 · Wattle', checks: [['OEC verified', true], ['IFC required?', true], ['Band check vs schedule', true], ['Lodgement window', true]], state: 'Lodged automatically · 3 Jul 09:05' },
]

export default function Operational() {
  return (
    <div>
      <PageHeader
        accent={O600}
        kicker="Operational suite · concept previews"
        title="The revenue day-to-day, automated with review"
        lede="Three roadmap modules shown as designed concepts with synthetic examples. Same platform principles as everything live today: the system proposes, a human confirms, everything leaves a trail."
      />

      <Section className="space-y-4 pb-10">
        <PreviewCard
          icon={Layers}
          name="Provisional DRG allocation"
          strap="Know the revenue before the episode happens"
          desc="At booking, the module proposes the AR-DRG and estimated case payment from the booking note and item numbers — so tomorrow's list has a revenue forecast and coding starts from a draft, not a blank page."
        >
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-hairline-strong">
                <Th>Tomorrow's list</Th><Th>Booked procedure</Th><Th>Provisional DRG</Th><Th right>Confidence</Th><Th right>Est. payment</Th>
              </tr>
            </thead>
            <tbody>
              {drgQueue.map((d) => (
                <tr key={d.patient} className="border-b border-hairline last:border-0 align-top">
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="font-semibold text-ink-950 tabular">{d.patient}</div>
                  </td>
                  <td className="px-3 py-2.5 text-muted">{d.booking}<div className="text-[10.75px] text-faint">MBS {d.items}</div></td>
                  <td className="px-3 py-2.5">
                    <span className="inline-flex rounded-md px-2 py-0.5 text-[11px] font-bold tabular" style={{ background: O100, color: O700 }}>{d.drg}</span>
                    <div className="text-[10.75px] text-faint mt-0.5">{d.label}</div>
                    {d.flag && (
                      <div className="mt-1 flex items-start gap-1 text-[10.75px] text-amber-700">
                        <CircleAlert className="size-3 mt-px shrink-0" />{d.flag}
                      </div>
                    )}
                  </td>
                  <td className={`px-3 py-2.5 text-right tabular font-semibold ${d.conf < 0.8 ? 'text-amber-700' : 'text-sage-700'}`}>{Math.round(d.conf * 100)}%</td>
                  <td className="px-4 py-2.5 text-right tabular font-semibold text-ink-950">{d.est}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PreviewCard>

        <div className="grid grid-cols-2 gap-4">
          <PreviewCard
            icon={Braces}
            name="AI coding assistant"
            strap="Draft codes, coder decides"
            desc="Post-discharge, suggested ICD-10-AM / ACHI coding with confidence — the coder accepts, edits or rejects each line."
          >
            <div className="px-4 pb-4">
              <div className="text-[11.5px] text-faint mb-2">{codingEpisode.header}</div>
              <ul className="space-y-1.5">
                {codingEpisode.suggested.map((c) => (
                  <li key={c.code} className="flex items-center gap-2.5 rounded-lg border border-hairline px-3 py-2">
                    <span className="w-20 shrink-0 text-[12px] font-bold tabular" style={{ color: O700 }}>{c.code}</span>
                    <span className="w-16 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-faint">{c.kind}</span>
                    <span className="flex-1 text-[12px] text-ink-950 leading-snug">{c.desc}</span>
                    <span className={`shrink-0 text-[11.5px] tabular font-semibold ${c.conf < 0.8 ? 'text-amber-700' : 'text-sage-700'}`}>{Math.round(c.conf * 100)}%</span>
                    <span className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${c.accepted ? 'bg-sage-100 text-sage-700' : 'bg-ink-50 text-muted'}`}>
                      {c.accepted ? <><Check className="size-2.5" strokeWidth={3} /> Accepted</> : 'Awaiting coder'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </PreviewCard>

          <PreviewCard
            icon={Bot}
            name="Billing bots"
            strap="Clean claims, lodged on time, every time"
            desc="Automated pre-lodgement checks against the contract and internal rules; anything that fails is held with a reason, not lodged and hoped for."
          >
            <div className="px-4 pb-4 space-y-2">
              {botChecks.map((b) => (
                <div key={b.claim} className="rounded-lg border border-hairline px-3.5 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-semibold text-ink-950 tabular">{b.claim}</span>
                    <span className={`text-[11px] font-semibold ${b.state.startsWith('Held') ? 'text-amber-700' : 'text-sage-700'}`}>{b.state}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {b.checks.map(([label, ok]) => (
                      <span key={String(label)} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${ok ? 'bg-sage-100 text-sage-700' : 'bg-clay-100 text-clay-700'}`}>
                        {ok ? <Check className="size-2.5" strokeWidth={3} /> : <CircleAlert className="size-2.5" />}
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PreviewCard>
        </div>

        <p className="text-[11px] text-faint">
          Concept previews on synthetic data — these modules are on the roadmap, not in the current licence. Shown to
          demonstrate where the Operational suite goes; classifications and codes are illustrative only.
        </p>
      </Section>
    </div>
  )
}

function PreviewCard({
  icon: Icon, name, strap, desc, children,
}: { icon: typeof Layers; name: string; strap: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="card overflow-hidden" style={{ borderTop: `3px solid ${O600}` }}>
      <div className="px-4 pt-4 pb-3 flex items-start gap-3">
        <div className="size-9 rounded-lg grid place-items-center shrink-0" style={{ background: O100 }}>
          <Icon className="size-4" style={{ color: O700 }} strokeWidth={1.75} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-bold tracking-[0.09em] uppercase" style={{ color: O600 }}>{strap}</span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide" style={{ background: O50, color: O700 }}>
              <Sparkles className="size-2.5" /> Concept preview
            </span>
          </div>
          <h2 className="text-[16px] font-semibold text-ink-950 leading-tight">{name}</h2>
          <p className="text-[12px] text-muted leading-snug mt-1">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th className={`px-3 first:px-4 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted ${right ? 'text-right' : 'text-left'}`}>
      {children}
    </th>
  )
}
