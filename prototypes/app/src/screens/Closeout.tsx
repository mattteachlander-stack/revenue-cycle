import { useState } from 'react'
import { Download, Landmark, Printer } from 'lucide-react'
import { PageHeader, Section, GenerateButton } from '../components/ui'
import { StreamedDoc } from '../components/Doc'
import { boardPack } from '../content/closeout'

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
      </Section>
    </div>
  )
}
