import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, CircleDashed, Mail } from 'lucide-react'
import { useDemo } from '../state'

/**
 * Stage-aware negotiation status strip — negotiations run over months, so the
 * dashboard leads with where the correspondence is up to, what's agreed and
 * what's still open. All content derives from the demo's canned rounds.
 */

interface StageView {
  label: string
  lastCorrespondence: string
  next: string
  agreed: string[]
  outstanding: string[]
  roundsDone: number // of 3 written exchanges in the demo storyline
}

export default function NegotiationStatus() {
  const { letterDone, responseDigested, round2Digested } = useDemo()
  const nav = useNavigate()

  const v: StageView = round2Digested
    ? {
        label: 'Settlement in reach',
        lastCorrespondence: 'Closing letter sent 3 Sep 2026 (round 3 of correspondence)',
        next: 'Heads of agreement targeted 25 Sep — offer open to 30 Sep',
        agreed: [
          'Indexation carve-out (cl. 12.3) deleted',
          'Jointly appointed expert binds re-banding',
          '2 of 4 re-banded groups restored',
          'Colonoscopy +3.5% · arthroscopy +5.0%',
          'Schedule 4 quarantined to workstream',
          '14-day lodgement · quality reporting',
        ],
        outstanding: [
          'Cataract +4.9% v +5.8% sought',
          'Third re-banded group (oculoplastics)',
          'Indexation cap 4.0% v 4.25%',
          'Set-off 18 v 12 months',
          'Holdover CPI · termination 120d',
        ],
        roundsDone: 3,
      }
    : responseDigested
    ? {
        label: 'Round 1 assessed — counter sent',
        lastCorrespondence: 'Counter sent 8 Aug 2026 (replying to fund letter of 1 Aug)',
        next: 'Teams meet w/c 18 Aug · fund reply expected ~26 Aug',
        agreed: [
          '14-day claims lodgement (our give)',
          'Quality-data reporting (our give)',
          'Meeting w/c 18 Aug',
        ],
        outstanding: [
          'All rates (fund at +2.5% blanket)',
          'FY26 re-bandings (refused)',
          'Indexation — 50%-of-CPI trap declined',
          'Set-off 24 months (held)',
          'Schedule 4 (quarantine proposed)',
        ],
        roundsDone: 2,
      }
    : letterDone
    ? {
        label: 'Opening position lodged',
        lastCorrespondence: 'Opening letter sent 6 Jul 2026',
        next: 'Fund response expected within 3–4 weeks',
        agreed: [],
        outstanding: [
          'Cataract +7.0% + re-bands restored',
          'Carve-out (cl. 12.3) deleted',
          'Independent re-banding expert',
          'Set-off 12 months',
          'Colonoscopy +4.0% · arthroscopy +5.5%',
        ],
        roundsDone: 1,
      }
    : {
        label: 'Preparing position',
        lastCorrespondence: 'None yet — fund invited proposals on 8 Jun 2026',
        next: 'Analyse position → choose posture → draft the opening letter',
        agreed: [],
        outstanding: ['Position analysis', 'Posture decision', 'Opening letter'],
        roundsDone: 0,
      }

  return (
    <div className="card overflow-hidden">
      <div className="grid grid-cols-12">
        {/* status + correspondence */}
        <div className="col-span-4 px-5 py-4 border-r border-hairline">
          <div className="flex items-center gap-2">
            <span className="label-caps">Negotiation status</span>
            <span className="rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-white"
                  style={{ background: 'var(--color-neg-700)' }}>
              {v.label}
            </span>
          </div>
          <div className="mt-2.5 flex items-start gap-2">
            <Mail className="size-3.5 mt-0.5 shrink-0" style={{ color: 'var(--color-neg-700)' }} strokeWidth={1.75} />
            <div>
              <div className="text-[12.75px] font-semibold text-ink-950 leading-snug">{v.lastCorrespondence}</div>
              <div className="text-[11.75px] text-muted mt-0.5 leading-snug">{v.next}</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3].map((n) => (
                <span key={n} className="h-[6px] w-9 rounded-full"
                      style={{ background: n <= v.roundsDone ? 'var(--color-neg-600)' : 'var(--color-ink-50)' }} />
              ))}
            </div>
            <span className="text-[10.75px] text-faint tabular">{v.roundsDone} of ~3 written exchanges</span>
          </div>
        </div>

        {/* agreed */}
        <div className="col-span-4 px-5 py-4 border-r border-hairline">
          <div className="label-caps flex items-center gap-1.5 text-sage-700">
            <CheckCircle2 className="size-3" strokeWidth={2.5} /> Agreed so far ({v.agreed.length})
          </div>
          {v.agreed.length === 0 ? (
            <p className="text-[11.75px] text-faint mt-2 leading-snug">Nothing agreed yet — nothing is agreed until the package is.</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {v.agreed.map((a) => (
                <li key={a} className="flex items-start gap-1.5 text-[11.75px] text-ink-950 leading-snug">
                  <span className="mt-[5px] size-1 rounded-full shrink-0 bg-sage-600" />{a}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* outstanding */}
        <div className="col-span-4 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="label-caps flex items-center gap-1.5 text-amber-700">
              <CircleDashed className="size-3" strokeWidth={2.5} /> Outstanding ({v.outstanding.length})
            </div>
            <button onClick={() => nav(v.roundsDone === 0 ? '/analyse' : '/response')}
                    className="inline-flex items-center gap-1 text-[11.5px] font-semibold no-print"
                    style={{ color: 'var(--color-neg-700)' }}>
              {v.roundsDone === 0 ? 'Start' : 'Open correspondence'} <ArrowRight className="size-3" strokeWidth={2.5} />
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {v.outstanding.map((o) => (
              <li key={o} className="flex items-start gap-1.5 text-[11.75px] text-ink-950 leading-snug">
                <span className="mt-[5px] size-1 rounded-full shrink-0 bg-amber-600" />{o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
