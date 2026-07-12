import { useState } from 'react'
import { Download, Landmark, Printer } from 'lucide-react'
import { PageHeader, Section, GenerateButton } from '../components/ui'
import { StreamedDoc } from '../components/Doc'
import { boardPack } from '../content/closeout'

const riskRegister = `# Risk register — AusCare FY27 agreement (hypothetical settled outcome)

| # | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Fund under-applies year-1 indexation despite carve-out deletion | Low | $41k | Indexation verified against remittances within 14 days of 1 Jul (Historical module tracks) | Finance |
| R2 | Re-banding referred to committee is slow-walked | Medium | $74k | Contractual 60-day committee window; expert referral triggers automatically | CEO |
| R3 | Schedule 4 (digital compliance) returns with unpriced obligations | Medium | ~$18k | Separate workstream, 20-day review, cost pass-through agreed in principle | Finance |
| R4 | Ortho growth commitment outpaces theatre-4 capacity ramp | Medium | relationship | Volumes contracted from FY28 with agreed ramp schedule | CEO |
| R5 | Quality loading dispute at first determination | Low | $15.6k | Determination uses existing cl. 17.2 packs; dispute path via cl. 18 | Quality |

*Synthetic demonstration output. Review at each board meeting until closed.*
`

const talkingPoints = `# Meeting talking points — AusCare executive meeting (19 Aug)

**Open with (60 seconds):**
- We are here to renew, not to fight — and we have modelled every scenario including the ones neither of us wants.
- Three asks decide this: indexation integrity, classification fairness, and the cataract schedule. Everything else is packaging.

**If they lead with affordability:**
- Your premium round was 3.85%; our indexation was 1.9%. Affordability applied asymmetrically is margin transfer, not affordability.

**If they defend the re-bandings:**
- Then you will welcome an independent expert confirming them. If the classifications are right, the referee costs you nothing.

**If they offer rates without terms:**
- A +4% headline with the carve-out intact is worth less than +2.5% without it. We have the ten-year table that shows why.

**Hold in reserve:**
- Growth volumes (~420 episodes/yr) — only against a September signature.
- The quality loading — introduce after re-banding lands; it lets them say yes to something.

**Never say:**
- Any threat of termination or second-tier. Our BATNA is priced, not brandished.

*Synthetic demonstration output — drafted by CORE, delivered by you.*
`

function downloadMd(name: string, text: string) {
  const blob = new Blob([text], { type: 'text/markdown' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.click()
  URL.revokeObjectURL(a.href)
}

type Stage = 'idle' | 'streaming' | 'done'

export default function Closeout() {
  const [stage, setStage] = useState<Stage>('idle')

  const download = () => {
    const blob = new Blob([boardPack], { type: 'text/markdown' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'bayview-auscare-board-pack.md'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div>
      <PageHeader
        kicker="Negotiation copilot · Step 6"
        title="Close-out — board pack"
        lede="A hypothetical settled outcome for this demo: sought vs settled on every element, the financial impact, how the result was achieved, and the operational changes staff need on day one."
        right={
          stage === 'done' ? (
            <div className="flex items-center gap-2">
              <button onClick={download} className="inline-flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-panel px-3 py-2.5 text-[12.5px] font-medium text-ink-800 hover:bg-ink-50 transition">
                <Download className="size-4" /> Download .md
              </button>
              <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-panel px-3 py-2.5 text-[12.5px] font-medium text-ink-800 hover:bg-ink-50 transition">
                <Printer className="size-4" /> Print / PDF
              </button>
            </div>
          ) : undefined
        }
      />

      <Section className="pb-12">
        {stage === 'idle' && (
          <div className="card px-10 py-14 grid place-items-center text-center">
            <div className="size-12 rounded-xl bg-ink-50 grid place-items-center mb-4">
              <Landmark className="size-5 text-ink-600" strokeWidth={1.75} />
            </div>
            <h2 className="text-[16px] font-semibold text-ink-950">Agreement reached — generate the close-out pack</h2>
            <p className="text-[13px] text-muted mt-1.5 max-w-[54ch] leading-relaxed">
              For the demo, assume heads of agreement were reached on 25 September after the counter.
              The pack presents the outcome the way a board wants it: sought vs settled, dollars, and implementation.
            </p>
            <div className="mt-6">
              <GenerateButton onClick={() => setStage('streaming')}>Generate board pack</GenerateButton>
            </div>
          </div>
        )}

        {stage !== 'idle' && (
          <div className="card px-10 py-9 max-w-[880px] rise-in">
            <StreamedDoc md={boardPack} active={stage === 'streaming'} cps={560} onDone={() => setStage('done')} />
          </div>
        )}

        {stage === 'done' && (
          <div className="mt-4 max-w-[880px] grid grid-cols-2 gap-4 no-print rise-in">
            <button onClick={() => downloadMd('auscare-risk-register.md', riskRegister)}
                    className="card p-4.5 text-left hover:shadow-raised transition">
              <div className="label-caps mb-1">Also in this pack</div>
              <div className="text-[14px] font-semibold text-ink-950">Risk register (.md)</div>
              <p className="text-[12px] text-muted mt-1 leading-snug">Five tracked risks on the settled agreement, with owners and mitigations — board-review ready.</p>
            </button>
            <button onClick={() => downloadMd('auscare-talking-points.md', talkingPoints)}
                    className="card p-4.5 text-left hover:shadow-raised transition">
              <div className="label-caps mb-1">Also in this pack</div>
              <div className="text-[14px] font-semibold text-ink-950">Meeting talking points (.md)</div>
              <p className="text-[12px] text-muted mt-1 leading-snug">The 19 Aug executive meeting: openings, rebuttals, reserves, and the things never to say.</p>
            </button>
          </div>
        )}
      </Section>
    </div>
  )
}
