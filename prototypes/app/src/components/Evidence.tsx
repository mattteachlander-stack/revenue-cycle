import { useEffect, useState } from 'react'
import { ScanSearch, X } from 'lucide-react'

/**
 * Evidence panel — "what's behind this view": source, period, method,
 * confidence, assumptions, limitations, and the human-approval rule.
 * Adopted from the founder's improved-demo review; rebuilt as a first-class
 * component so every analytical screen can declare its own provenance.
 */

export interface EvidenceSpec {
  source: string
  period: string
  method: string
  confidence: string
  assumptions: string
  limitations: string
}

const defaults: EvidenceSpec = {
  source: 'Bayview–AusCare and Bayview–Federation synthetic agreements, schedules and remittance history supplied in this demonstration.',
  period: 'FY2024–FY2026 synthetic activity, rate and quality data.',
  method: 'Clause extraction, market-rate comparison and episode-level commercial modelling.',
  confidence: 'Illustrative demo result — confidence varies by claim and depends on source completeness.',
  assumptions: 'Volumes, market benchmarks and growth remain consistent with the scenario inputs.',
  limitations: 'Synthetic data only. Not legal, clinical or financial advice.',
}

export default function EvidenceButton({ spec }: { spec?: Partial<EvidenceSpec> }) {
  const [open, setOpen] = useState(false)
  const s = { ...defaults, ...spec }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Evidence behind this view"
        className="no-print inline-flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-panel px-2.5 py-1.5 text-[11.5px] font-semibold text-ink-800 hover:bg-ink-50 transition"
      >
        <ScanSearch className="size-3.5" strokeWidth={2} /> Evidence
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center p-6"
             style={{ background: 'rgba(8,16,34,0.48)' }}
             onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
          <div role="dialog" aria-modal="true" aria-label="Evidence behind this view"
               className="card w-[640px] max-h-[85vh] overflow-y-auto shadow-raised">
            <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-hairline">
              <div>
                <h2 className="text-[15px] font-semibold text-ink-950">Evidence behind this view</h2>
                <p className="text-[11.75px] text-muted mt-0.5">Traceable context for human review and approval.</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close evidence panel"
                      className="text-faint hover:text-ink-950 mt-0.5"><X className="size-4" /></button>
            </div>
            <div className="px-6 py-4 grid grid-cols-2 gap-3">
              {([
                ['Source', s.source], ['Data period', s.period], ['Method', s.method],
                ['Confidence', s.confidence], ['Key assumptions', s.assumptions], ['Limitations', s.limitations],
              ] as const).map(([k, v]) => (
                <div key={k} className="rounded-lg border border-hairline px-3.5 py-2.5">
                  <div className="label-caps mb-1">{k}</div>
                  <p className="text-[12px] text-muted leading-snug">{v}</p>
                </div>
              ))}
            </div>
            <div className="mx-6 mb-5 rounded-lg px-4 py-3 text-[12.25px] leading-relaxed"
                 style={{ background: 'var(--color-amber-100)', color: 'var(--color-amber-700)' }}>
              <strong className="font-semibold">Human approval required.</strong> Verify source clauses, calculations and
              commercial assumptions before relying on or sending any output.
            </div>
          </div>
        </div>
      )}
    </>
  )
}
