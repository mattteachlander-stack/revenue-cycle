import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Check, Download, FileText, MessageSquarePlus, Paperclip, Sparkles, Stethoscope,
} from 'lucide-react'
import * as XLSX from 'xlsx'
import { PageHeader, Section } from '../../components/ui'
import { fundTone, type AuditItem, type Decision } from '../../data/integrity'
import { useRi, useItemState } from '../../state-integrity'

const DECISION_META: Record<Decision, { label: string; cls: string }> = {
  dispute: { label: 'Dispute', cls: 'bg-sage-100 text-sage-700' },
  accept: { label: 'Accept adjustment', cls: 'bg-clay-100 text-clay-700' },
  partial: { label: 'Partial', cls: 'bg-amber-100 text-amber-700' },
}

export default function RiWorkbench() {
  const { batches, items, itemState } = useRi()
  const active = batches.filter((b) => b.status !== 'awaiting import')
  const [batchId, setBatchId] = useState(active[0].id)
  const batch = active.find((b) => b.id === batchId) ?? active[0]
  const batchItems = useMemo(() => items.filter((i) => i.batchId === batch.id), [items, batch.id])
  const [selectedId, setSelectedId] = useState<string | null>(batchItems[0]?.id ?? null)
  const selected = batchItems.find((i) => i.id === selectedId) ?? batchItems[0]
  const nav = useNavigate()

  const decided = batchItems.filter((i) => itemState[i.id]?.decision).length

  const exportXlsx = () => {
    const rows = batchItems.map((i) => {
      const st = itemState[i.id]
      const d = st?.decision
      return {
        'Audit ref': i.id, 'Claim ID': i.claimId, 'Member no': i.memberNo,
        'Admission date': i.admissionDate, 'Items': i.items, 'Amount at risk ($)': i.atRisk,
        'Category': i.category,
        'Hospital decision': d ? DECISION_META[d].label : 'Pending review',
        'Hospital response': st?.responseNote || '',
        'Supporting documents': [...i.documents, ...(st?.extraDocs ?? [])].join('; '),
        'Contact': 'Bayview Day Surgery — finance@bayviewdaysurgery.example',
      }
    })
    const ws = XLSX.utils.json_to_sheet(rows)
    ws['!cols'] = [{ wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 22 }, { wch: 14 },
                   { wch: 22 }, { wch: 16 }, { wch: 60 }, { wch: 34 }, { wch: 34 }]
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Audit response')
    XLSX.writeFile(wb, `Bayview-response-${batch.id}.xlsx`)
  }

  return (
    <div>
      <PageHeader
        accent="var(--color-ri-600)"
        kicker="Revenue Integrity · response workbench"
        title={`${batch.fund} — ${batch.name}`}
        lede="Each queried claim, enriched from the PAS, with the copilot's suggested response. You decide item by item; the export builds the fund's Excel response from your decisions and the document trail."
        right={
          <button
            onClick={exportXlsx}
            disabled={decided === 0}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white transition hover:opacity-90 disabled:opacity-35"
            style={{ background: 'var(--color-ri-700)' }}
          >
            <Download className="size-4" strokeWidth={1.75} />
            Export response (.xlsx) · {decided}/{batchItems.length}
          </button>
        }
      />

      <Section className="pb-10">
        <div className="flex items-center gap-2 mb-4">
          {active.map((b) => (
            <button key={b.id}
                    onClick={() => { setBatchId(b.id); setSelectedId(null) }}
                    className={[
                      'rounded-full px-3.5 py-1.5 text-[12px] font-medium border transition',
                      b.id === batch.id ? 'text-white border-transparent' : 'bg-panel text-muted border-hairline-strong hover:text-ink-950',
                    ].join(' ')}
                    style={b.id === batch.id ? { background: 'var(--color-ri-700)' } : undefined}>
              {b.fund} · {items.filter((i) => i.batchId === b.id).length} items
            </button>
          ))}
          <span className="ml-auto text-[11.75px] text-muted">
            Response due <strong className="text-ink-950">{batch.due}</strong> · {batch.daysLeft} days
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4 items-start">
          {/* item list */}
          <div className="col-span-5 card overflow-hidden">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-hairline-strong">
                  <Th>Claim</Th><Th>Category</Th><Th right>At risk</Th><Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {batchItems.map((i) => (
                  <ItemRow key={i.id} item={i} selected={selected?.id === i.id} onClick={() => setSelectedId(i.id)} />
                ))}
              </tbody>
            </table>
          </div>

          {/* detail */}
          {selected && <ItemDetail item={selected} key={selected.id} />}
        </div>

        <p className="mt-4 text-[11px] text-faint">
          Synthetic data throughout. In production the PAS panel is a live integration and the copilot
          suggestion is generated from the item, the episode record and the relevant HPPA — always for human review.{' '}
          <button className="underline underline-offset-2" onClick={() => nav('/integrity')}>Results feed the dashboard.</button>
        </p>
      </Section>
    </div>
  )
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th className={`px-3.5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted ${right ? 'text-right' : 'text-left'}`}>
      {children}
    </th>
  )
}

function ItemRow({ item, selected, onClick }: { item: AuditItem; selected: boolean; onClick: () => void }) {
  const st = useItemState(item.id)
  return (
    <tr onClick={onClick}
        className={`border-b border-hairline last:border-0 cursor-pointer transition ${selected ? '' : 'hover:bg-ink-50/40'}`}
        style={selected ? { background: 'var(--color-ri-50)' } : undefined}>
      <td className="px-3.5 py-2.5">
        <div className="font-semibold text-ink-950 tabular">{item.claimId}</div>
        <div className="text-[11px] text-faint">{item.admissionDate}</div>
      </td>
      <td className="px-3.5 py-2.5 text-muted leading-tight">{item.category}</td>
      <td className="px-3.5 py-2.5 text-right tabular font-semibold text-clay-700">
        {item.atRisk === 0 ? '—' : `$${item.atRisk.toLocaleString()}`}
      </td>
      <td className="px-3.5 py-2.5">
        {st.decision ? (
          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${DECISION_META[st.decision].cls}`}>
            {DECISION_META[st.decision].label}
          </span>
        ) : (
          <span className="inline-flex rounded-full px-2 py-0.5 text-[10.5px] font-semibold bg-ink-50 text-muted">To review</span>
        )}
      </td>
    </tr>
  )
}

function ItemDetail({ item }: { item: AuditItem }) {
  const { setDecision, addComment, addDoc } = useRi()
  const st = useItemState(item.id)
  const [note, setNote] = useState(st.responseNote || item.suggested.note)
  const [comment, setComment] = useState('')
  const t = fundTone[item.batchId.startsWith('ac') ? 'AusCare Health' : 'Federation Health']

  const comments = [...item.comments, ...st.extraComments]
  const docs = [...item.documents, ...st.extraDocs]

  return (
    <div className="col-span-7 space-y-4">
      <div className="card p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-ink-950 tabular">{item.claimId}</span>
              <span className={`inline-flex rounded-md px-2 py-0.5 text-[10.5px] font-bold ${t.bg} ${t.text}`}>{item.id}</span>
              <span className="inline-flex rounded-md px-2 py-0.5 text-[10.5px] font-semibold bg-ink-50 text-ink-700">{item.category}</span>
            </div>
            <div className="text-[11.75px] text-muted mt-1">
              {item.items} · {item.band} · paid ${item.paidAmount.toLocaleString()} · member {item.memberNo}
            </div>
          </div>
          <div className="text-right">
            <div className="label-caps">At risk</div>
            <div className="text-[19px] font-semibold tabular text-clay-700">
              {item.atRisk === 0 ? '$0' : `$${item.atRisk.toLocaleString()}`}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-hairline px-4 py-3">
            <div className="label-caps mb-1">Fund's assertion</div>
            <p className="text-[12.5px] text-ink-950 leading-snug">{item.assertion}</p>
            <p className="text-[11.75px] text-muted leading-snug mt-1.5"><strong>Requested:</strong> {item.requestedAction}</p>
          </div>
          <div className="rounded-lg px-4 py-3" style={{ background: 'var(--color-ri-50)', border: '1px solid var(--color-ri-100)' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Stethoscope className="size-3.5" style={{ color: 'var(--color-ri-700)' }} />
              <span className="label-caps" style={{ color: 'var(--color-ri-700)' }}>From the PAS</span>
            </div>
            <p className="text-[12px] text-ink-950 leading-snug">
              {item.pas.patient} · {item.pas.urn} · {item.pas.surgeon} · {item.pas.theatre} ·
              admitted {item.pas.admitted}, discharged {item.pas.discharged} ({Math.floor(item.pas.losMins / 60)}h{item.pas.losMins % 60}m)
            </p>
            <p className="text-[12px] text-muted leading-snug mt-1.5">{item.pas.note}</p>
          </div>
        </div>

        {/* copilot suggestion + decision */}
        <div className="mt-4 rounded-lg border border-hairline px-4 py-3.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-ink-600" />
            <span className="label-caps">Suggested response — you decide</span>
            <span className={`ml-auto inline-flex rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${DECISION_META[item.suggested.decision].cls}`}>
              Suggests: {DECISION_META[item.suggested.decision].label}
            </span>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="mt-2.5 w-full rounded-lg border border-hairline-strong bg-paper px-3 py-2 text-[12.5px] leading-snug outline-none focus:border-ink-500"
          />
          <div className="mt-2.5 flex items-center gap-2">
            {(Object.keys(DECISION_META) as Decision[]).map((d) => (
              <button key={d}
                      onClick={() => setDecision(item.id, d, note)}
                      className={[
                        'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition',
                        st.decision === d ? 'text-white border-transparent' : 'border-hairline-strong text-ink-800 hover:bg-ink-50',
                      ].join(' ')}
                      style={st.decision === d ? { background: 'var(--color-ri-700)' } : undefined}>
                {st.decision === d && <Check className="size-3.5" strokeWidth={3} />}
                {DECISION_META[d].label}
              </button>
            ))}
            {st.decision && <span className="text-[11.5px] text-sage-700 font-medium ml-1">Recorded — included in the export.</span>}
          </div>
        </div>
      </div>

      {/* documents + comments */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-4.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Paperclip className="size-3.5 text-ink-600" />
            <span className="label-caps">Supporting documents</span>
          </div>
          {docs.length === 0 && <p className="text-[12px] text-faint">None attached yet.</p>}
          <ul className="space-y-1.5">
            {docs.map((d) => (
              <li key={d} className="flex items-center gap-2 text-[12.25px] text-ink-950">
                <FileText className="size-3.5 text-ink-500" /> {d}
              </li>
            ))}
          </ul>
          <button onClick={() => addDoc(item.id, `Attachment-${item.claimId}-${docs.length + 1}.pdf`)}
                  className="mt-3 text-[12px] font-semibold" style={{ color: 'var(--color-ri-700)' }}>
            + Attach document (demo)
          </button>
        </div>

        <div className="card p-4.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <MessageSquarePlus className="size-3.5 text-ink-600" />
            <span className="label-caps">Comments & audit trail</span>
          </div>
          {comments.length === 0 && <p className="text-[12px] text-faint">No comments yet.</p>}
          <ul className="space-y-2">
            {comments.map((c, i) => (
              <li key={i} className="text-[12.25px] leading-snug">
                <span className="font-semibold text-ink-950">{c.author}</span>
                <span className="text-faint"> · {c.when}</span>
                <p className="text-muted">{c.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-2">
            <input value={comment} onChange={(e) => setComment(e.target.value)}
                   onKeyDown={(e) => { if (e.key === 'Enter' && comment.trim()) { addComment(item.id, comment.trim()); setComment('') } }}
                   placeholder="Add a comment…"
                   className="flex-1 rounded-lg border border-hairline-strong bg-paper px-3 py-1.5 text-[12px] outline-none focus:border-ink-500 placeholder:text-faint" />
            <button onClick={() => { if (comment.trim()) { addComment(item.id, comment.trim()); setComment('') } }}
                    disabled={!comment.trim()}
                    className="rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-white disabled:opacity-35"
                    style={{ background: 'var(--color-ri-700)' }}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
