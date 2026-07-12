import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Presentation, X } from 'lucide-react'

/** Presenter mode — keeps a live demo on rails through the 14-step path. */

const steps = [
  { to: '/', title: 'Platform home', note: 'Open on CORE: four suites, modular licensing. Say "everything you\'ll see is synthetic data" out loud.' },
  { to: '/dashboard', title: 'The renewal', note: '$3.12m at stake, 56 days to the fund\'s deadline, 5 flagged clauses. This is the CEO\'s reality.' },
  { to: '/analyse', title: 'Positioning paper', note: 'Generate, let it stream a beat, then Skip. Point at the priced BATNA and the targets table.' },
  { to: '/fund-intel', title: 'Fund intelligence', note: 'The 6.2/10 leverage score — then immediately show the factor table. The score summarises; the factors argue. Flip to Federation to show every fund gets a dossier.' },
  { to: '/clauses', title: 'Clause intelligence', note: 'Click cl. 19.1 → set a manual value with a rationale → the override lands in the audit trail. Human-in-the-loop in five seconds.' },
  { to: '/clauses', title: 'Levers & packages', note: 'Levers tab: 8 priced opportunities. Packages tab: $285k asked / $174k weighted. Trade the tradeables, never the must-haves.' },
  { to: '/strategy', title: 'Choose the posture', note: 'Pick Assertive re-band (the recommended card). The choice is theirs — that\'s the point.' },
  { to: '/correspondence', title: 'The letter', note: 'Draft it, skip the stream. "The copilot has no send button" gets a laugh and lands the trust story.' },
  { to: '/response', title: 'The fund replies', note: 'Digest the response. The 50%-of-CPI trap is the money moment — a warm letter that legalises under-indexation.' },
  { to: '/changes', title: 'Change intelligence', note: 'Same trap as a tracked change: current vs proposed side by side. Show the register — the negotiation\'s working document.' },
  { to: '/integrity/inbox', title: 'Audit season', note: 'Import the AusCare file → watch the PAS enrichment. Then the workbench: decide one item, export the Excel. A real file downloads.' },
  { to: '/integrity', title: 'Prove improvement', note: '61% overturned, $32.9k defended, the learning loop. Audits become data, not fire drills.' },
  { to: '/oracle', title: 'Ask the contracts', note: 'Run the termination comparison (60 vs 90 days, cited). Finish on the Saturday-list question: "the contract is silent — escalate."' },
  { to: '/closeout', title: 'Board pack', note: 'Generate: sought vs settled, +$289k/yr, plus the risk register and talking points. End on "and nothing was ever sent without a human."' },
]

export default function Presenter() {
  const [on, setOn] = useState(false)
  const [i, setI] = useState(0)
  const nav = useNavigate()
  const loc = useLocation()

  const go = (n: number) => {
    const j = Math.max(0, Math.min(steps.length - 1, n))
    setI(j)
    if (loc.pathname !== steps[j].to) nav(steps[j].to)
  }

  if (!on) {
    return (
      <button
        onClick={() => { setOn(true); go(i) }}
        title="Presenter mode — guided demo path"
        className="no-print fixed bottom-16 right-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-raised hover:brightness-110 transition"
        style={{ background: 'linear-gradient(120deg, #0ea5c4 0%, #2f6bf6 55%, #4f46e5 100%)' }}
      >
        <Presentation className="size-4" strokeWidth={2} /> Presenter
      </button>
    )
  }

  const s = steps[i]
  return (
    <div className="no-print fixed bottom-16 right-5 z-40 w-[380px] card shadow-raised p-4"
         style={{ borderColor: 'var(--color-ink-100)' }}>
      <div className="flex items-center justify-between">
        <span className="label-caps" style={{ color: 'var(--color-blue-700)' }}>
          Presenter · step {i + 1} of {steps.length}
        </span>
        <button onClick={() => setOn(false)} className="text-faint hover:text-ink-950">
          <X className="size-4" />
        </button>
      </div>
      <div className="text-[14.5px] font-semibold text-ink-950 mt-1.5">{s.title}</div>
      <p className="text-[12.25px] text-muted leading-snug mt-1">{s.note}</p>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={() => go(i - 1)} disabled={i === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-hairline-strong px-3 py-1.5 text-[12px] font-semibold text-ink-800 hover:bg-ink-50 disabled:opacity-35 transition">
          <ChevronLeft className="size-3.5" /> Back
        </button>
        <button onClick={() => go(i + 1)} disabled={i === steps.length - 1}
                className="inline-flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-[12px] font-semibold text-white disabled:opacity-35 hover:brightness-110 transition"
                style={{ background: 'var(--color-blue-700)' }}>
          Next <ChevronRight className="size-3.5" />
        </button>
        <div className="ml-auto flex gap-[3px]">
          {steps.map((_, k) => (
            <button key={k} onClick={() => go(k)}
                    className="size-1.5 rounded-full transition"
                    style={{ background: k === i ? 'var(--color-blue-600)' : 'var(--color-hairline-strong)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
