import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, CalendarClock, Check, DatabaseZap, FileSpreadsheet, Loader2,
} from 'lucide-react'
import { PageHeader, Section } from '../../components/ui'
import { fundTone, type AuditBatch } from '../../data/integrity'
import { useRi } from '../../state-integrity'

type ImportStage = 'idle' | 'parsing' | 'matching' | 'done'

export default function RiInbox() {
  const { batches, items, imported, setImported } = useRi()
  const [stage, setStage] = useState<ImportStage>(imported ? 'done' : 'idle')
  const [matched, setMatched] = useState(imported ? 8 : 0)
  const nav = useNavigate()

  const runImport = () => {
    setStage('parsing')
    setTimeout(() => {
      setStage('matching')
      let n = 0
      const tick = () => {
        n += 1
        setMatched(n)
        if (n < 8) setTimeout(tick, 260)
        else {
          setTimeout(() => { setStage('done'); setImported(true) }, 350)
        }
      }
      setTimeout(tick, 300)
    }, 900)
  }

  return (
    <div>
      <PageHeader
        accent="var(--color-ri-600)"
        kicker="Revenue Integrity · audit inbox"
        title="Fund audit files, in one place"
        lede="Import the fund's audit spreadsheet; the platform parses each queried claim and enriches it from the patient administration system, so the response starts from the full record — not a filing-cabinet hunt."
      />

      <Section className="grid grid-cols-2 gap-4 pb-10">
        {/* import card */}
        <div className="card p-6" style={{ borderColor: stage !== 'done' ? 'var(--color-ri-100)' : undefined }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl grid place-items-center" style={{ background: 'var(--color-ri-100)' }}>
                <FileSpreadsheet className="size-4.5" style={{ color: 'var(--color-ri-700)' }} strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-ink-950">AusCare_Audit_Q4_FY26.csv</div>
                <div className="text-[11.75px] text-muted">Received 3 Jul 2026 · 8 queried claims · response due 7 Aug (32 days)</div>
              </div>
            </div>
            {stage === 'idle' && (
              <button onClick={runImport}
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white hover:opacity-90 transition"
                      style={{ background: 'var(--color-ri-700)' }}>
                Import file
              </button>
            )}
          </div>

          {stage !== 'idle' && (
            <ol className="mt-5 space-y-2.5">
              <Step done label="File parsed — 8 audit items, 6 categories, $9,957 at risk" active={stage === 'parsing'} />
              <Step done={stage === 'done' || (stage === 'matching' && matched >= 8)}
                    active={stage === 'matching'}
                    label={`PAS lookup — ${matched}/8 admissions matched and enriched (episode, clinician, timings, documents)`} />
              <Step done={stage === 'done'} active={false}
                    label="Copilot pre-read — suggested response drafted for every item, for your review" />
            </ol>
          )}

          {stage === 'done' && (
            <button onClick={() => nav('/integrity/workbench')}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white hover:opacity-90 transition"
                    style={{ background: 'var(--color-ri-700)' }}>
              Open in workbench <ArrowRight className="size-4" strokeWidth={2} />
            </button>
          )}
          {stage === 'idle' && (
            <p className="mt-4 text-[11.5px] text-faint">
              Demo replays a canned import — the file mirrors <code>shared-data/audits/auscare-audit-2026-q4.csv</code>. No data leaves this browser.
            </p>
          )}
        </div>

        {/* batches list */}
        <div className="space-y-4">
          {batches.map((b) => <BatchCard key={b.id} b={b} onOpen={() => nav('/integrity/workbench')} itemCount={items.filter((i) => i.batchId === b.id).length} />)}
        </div>
      </Section>
    </div>
  )
}

function Step({ label, done, active }: { label: string; done?: boolean; active?: boolean }) {
  return (
    <li className="flex items-center gap-2.5 text-[12.75px]">
      {done && !active ? (
        <span className="size-5 rounded-full grid place-items-center" style={{ background: 'var(--color-sage-100)' }}>
          <Check className="size-3 text-sage-700" strokeWidth={3} />
        </span>
      ) : active ? (
        <Loader2 className="size-5 animate-spin" style={{ color: 'var(--color-ri-600)' }} />
      ) : (
        <span className="size-5 rounded-full border border-hairline-strong" />
      )}
      <span className={done || active ? 'text-ink-950' : 'text-faint'}>{label}</span>
    </li>
  )
}

function BatchCard({ b, onOpen, itemCount }: { b: AuditBatch; onOpen: () => void; itemCount: number }) {
  const t = fundTone[b.fund]
  const pending = b.status === 'awaiting import'
  return (
    <div className={`card p-5 ${pending ? 'opacity-65' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className={`inline-flex rounded-md px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide ${t.bg} ${t.text}`}>
            {b.fund}
          </span>
          <h2 className="text-[15px] font-semibold text-ink-950 mt-1.5">{b.name}</h2>
          <div className="text-[11.75px] text-muted mt-0.5">
            {b.fileName} · received {b.received}
            {itemCount > 0 && <> · <span className="font-medium text-ink-950">{itemCount} items</span></>}
          </div>
        </div>
        <span className={[
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold',
          pending ? 'bg-amber-100 text-amber-700' : 'bg-sage-100 text-sage-700',
        ].join(' ')}>
          {b.status}
        </span>
      </div>
      <div className="mt-3 pt-3 border-t border-hairline flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[12px] text-muted">
          <CalendarClock className="size-3.5 text-amber-600" />
          Response due <strong className="text-ink-950 font-semibold">{b.due}</strong> · {b.daysLeft} days
        </span>
        {!pending && (
          <button onClick={onOpen} className="inline-flex items-center gap-1 text-[12.5px] font-semibold"
                  style={{ color: 'var(--color-ri-700)' }}>
            Workbench <ArrowRight className="size-3.5" />
          </button>
        )}
      </div>
      {pending && (
        <div className="mt-3 flex items-center gap-2 text-[11.75px] text-muted">
          <DatabaseZap className="size-3.5" style={{ color: 'var(--color-ri-600)' }} />
          Import the file (left) to parse items and enrich from the PAS.
        </div>
      )}
    </div>
  )
}
