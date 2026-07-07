import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Download, FileSearch, Printer } from 'lucide-react'
import { PageHeader, Section, GenerateButton } from '../components/ui'
import { StreamedDoc } from '../components/Doc'
import { positioningPaper } from '../content/positioning'
import { negotiation } from '../data/facility'
import { useDemo } from '../state'

type Stage = 'idle' | 'streaming' | 'done'

export default function Analyse() {
  const { analysisDone, setAnalysisDone } = useDemo()
  const [stage, setStage] = useState<Stage>(analysisDone ? 'done' : 'idle')
  const nav = useNavigate()

  const download = () => {
    const blob = new Blob([positioningPaper], { type: 'text/markdown' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'bayview-auscare-positioning-paper.md'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div>
      <PageHeader
        kicker="Negotiation copilot · Step 2"
        title="Analyse position"
        lede="The copilot reads the executed HPPA, your financials and case mix, and public industry data, and produces the positioning paper a contracting team would take into the room."
        right={
          stage === 'done' ? (
            <div className="flex items-center gap-2">
              <IconBtn onClick={download} label="Download .md"><Download className="size-4" /></IconBtn>
              <IconBtn onClick={() => window.print()} label="Print / PDF"><Printer className="size-4" /></IconBtn>
              <GenerateButton onClick={() => nav('/strategy')}>
                Choose strategy <ArrowRight className="size-4" strokeWidth={2} />
              </GenerateButton>
            </div>
          ) : undefined
        }
      />

      <Section className="pb-12">
        {stage === 'idle' && (
          <div className="card px-10 py-14 grid place-items-center text-center">
            <div className="size-12 rounded-xl bg-ink-50 grid place-items-center mb-4">
              <FileSearch className="size-5 text-ink-600" strokeWidth={1.75} />
            </div>
            <h2 className="text-[16px] font-semibold text-ink-950">Positioning paper not yet generated</h2>
            <p className="text-[13px] text-muted mt-1.5 max-w-[52ch] leading-relaxed">
              Inputs ready: executed AusCare HPPA (21 clauses, 3 schedules) · {negotiation.episodes.toLocaleString()} episodes
              of billing history · facility P&amp;L · public industry data pack.
            </p>
            <div className="mt-6">
              <GenerateButton onClick={() => setStage('streaming')}>Generate positioning paper</GenerateButton>
            </div>
            <p className="text-[11px] text-faint mt-4">Demo replays a pre-authored analysis — no live model call.</p>
          </div>
        )}

        {stage !== 'idle' && (
          <div className="card px-10 py-9 max-w-[860px] rise-in">
            <StreamedDoc
              md={positioningPaper}
              active={stage === 'streaming'}
              cps={520}
              onDone={() => { setStage('done'); setAnalysisDone(true) }}
            />
          </div>
        )}
      </Section>
    </div>
  )
}

function IconBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-panel px-3 py-2.5 text-[12.5px] font-medium text-ink-800 hover:bg-ink-50 transition"
    >
      {children}
      {label}
    </button>
  )
}
