import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BellRing, GraduationCap, Search } from 'lucide-react'
import { PageHeader, Section, Pill } from '../components/ui'
import { eduItems, eduStatusMeta } from '../data/education'

const E700 = 'var(--color-ora-700)'
const E100 = 'var(--color-ora-100)'
const E50 = 'var(--color-ora-50)'

export default function Education() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const norm = (s: string) => s.toLowerCase()
  const items = eduItems.filter((e) =>
    !q.trim() || norm(e.title + ' ' + e.summary + ' ' + e.audience).includes(norm(q.trim())))
  const flagged = eduItems.filter((e) => e.status !== 'Current')

  return (
    <div>
      <PageHeader
        kicker="Enquiry suite · Education"
        title="Education library — the organisation's answers, kept current"
        lede="Every piece of documented education disseminated across the organisation, in one searchable place — and connected to the rest of CORE: when a contract clause changes, an MBS descriptor moves, or an audit teaches a lesson, the education it invalidates is flagged automatically."
      />

      {/* update-required flags — the module's point */}
      <Section>
        <div className="card overflow-hidden" style={{ borderColor: E100 }}>
          <div className="px-5 pt-4 pb-3 flex items-center gap-2" style={{ background: E50 }}>
            <BellRing className="size-4" style={{ color: E700 }} strokeWidth={1.75} />
            <h2 className="text-[14px] font-semibold text-ink-950">Flagged by other modules — {flagged.length} artefacts need attention</h2>
          </div>
          <div className="divide-y divide-hairline">
            {flagged.map((e) => (
              <div key={e.id} className="px-5 py-3 grid grid-cols-12 gap-3 items-start">
                <div className="col-span-4">
                  <div className="text-[12.75px] font-semibold text-ink-950">{e.title}</div>
                  <div className="text-[11px] text-faint mt-0.5">{e.audience} · {e.version} · updated {e.updated}</div>
                </div>
                <div className="col-span-6 text-[11.75px] leading-snug">
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold mr-1.5"
                        style={{ background: E100, color: E700 }}>{e.trigger?.module}</span>
                  <span className="text-muted">{e.trigger?.change}</span>
                  <div className="text-ink-950 mt-1"><strong className="font-semibold">→ </strong>{e.trigger?.to}</div>
                </div>
                <div className="col-span-2 text-right">
                  <Pill tone={eduStatusMeta[e.status].tone}>{e.status}</Pill>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* searchable library */}
      <Section className="pt-0 pb-10">
        <div className="card overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-hairline flex items-center gap-3">
            <div>
              <h2 className="text-[14px] font-semibold text-ink-950">Library</h2>
              <p className="text-[11.75px] text-muted mt-0.5">Searchable by title, topic or audience — the internal enquiry base staff actually use.</p>
            </div>
            <div className="ml-auto relative w-[300px] no-print">
              <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the education base…"
                className="w-full rounded-lg border border-hairline-strong bg-paper pl-9 pr-3 py-2 text-[12.5px] outline-none focus:border-ink-500 focus:ring-2 focus:ring-ink-100 placeholder:text-faint"
              />
            </div>
          </div>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-hairline-strong">
                <Th>Artefact</Th><Th>Audience</Th><Th>Format</Th><Th>Owner</Th><Th>Version · updated</Th><Th right>Status</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e.id} className="border-b border-hairline last:border-0 align-top">
                  <td className="px-4 py-2.5 max-w-[38ch]">
                    <div className="font-semibold text-ink-950">{e.title}</div>
                    <p className="text-[11.25px] text-muted leading-snug mt-0.5">{e.summary}</p>
                  </td>
                  <td className="px-3 py-2.5 text-muted whitespace-nowrap">{e.audience}</td>
                  <td className="px-3 py-2.5 text-muted">{e.format}</td>
                  <td className="px-3 py-2.5 text-muted whitespace-nowrap">{e.owner}</td>
                  <td className="px-3 py-2.5 text-muted tabular whitespace-nowrap">{e.version} · {e.updated}</td>
                  <td className="px-3 py-2.5 text-right"><Pill tone={eduStatusMeta[e.status].tone}>{e.status}</Pill></td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-6 text-center text-faint text-[12.5px]">
                  Nothing matches “{q}” — in production, unanswered searches feed the education gap list.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-xl px-5 py-4 flex items-center gap-3" style={{ background: E50, border: `1px solid ${E100}` }}>
          <GraduationCap className="size-4 shrink-0" style={{ color: E700 }} />
          <p className="text-[12.25px] leading-relaxed" style={{ color: E700 }}>
            <strong className="font-semibold">Where the flags come from:</strong> Change intelligence (new/settled clauses),
            Regulatory change (MBS, banding, Prescribed List), and Revenue Integrity learning actions. Next step on the
            roadmap: staff ask questions of this library through the same cited-answer interface as the other Enquiry modules.
          </p>
          <button onClick={() => nav('/regchange')}
                  className="ml-auto shrink-0 inline-flex items-center gap-1 text-[12px] font-semibold no-print"
                  style={{ color: E700 }}>
            Regulatory change <ArrowRight className="size-3" strokeWidth={2.5} />
          </button>
        </div>
        <p className="text-[11px] text-faint mt-3">Synthetic demonstration data — artefacts, owners and triggers are illustrative.</p>
      </Section>
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
