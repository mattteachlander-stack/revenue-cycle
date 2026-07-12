import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Download, Landmark, Printer } from 'lucide-react'
import { PageHeader, Section, GenerateButton } from '../components/ui'
import { StreamedDoc } from '../components/Doc'
import { interimPacks, stageMeta, type BoardStage } from '../content/boardpacks'
import { useDemo } from '../state'

const order: BoardStage[] = ['briefing', 'opening', 'round1', 'round2']

function downloadMd(name: string, text: string) {
  const blob = new Blob([text], { type: 'text/markdown' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.click()
  URL.revokeObjectURL(a.href)
}

export default function BoardPack() {
  const { letterDone, responseDigested, round2Digested } = useDemo()
  const nav = useNavigate()

  // furthest stage the negotiation has actually reached
  const current: BoardStage = round2Digested ? 'round2' : responseDigested ? 'round1' : letterDone ? 'opening' : 'briefing'
  const reached = order.slice(0, order.indexOf(current) + 1)

  const [stage, setStage] = useState<BoardStage>(current)
  const [run, setRun] = useState<'idle' | 'streaming' | 'done'>('idle')

  const pick = (s: BoardStage) => { setStage(s); setRun('idle') }

  return (
    <div>
      <PageHeader
        kicker="Negotiation copilot · any stage"
        title="Board pack — generated whenever the board meets"
        lede="Boards meet monthly; negotiations don't wait for close-out. Generate an interim pack at any point — it reflects exactly what has happened so far: the position, the correspondence, the movement, and the decision the board is actually being asked to make."
        right={
          run === 'done' ? (
            <div className="flex items-center gap-2">
              <button onClick={() => downloadMd(`bayview-auscare-board-pack-${stage}.md`, interimPacks[stage])}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-panel px-3 py-2.5 text-[12.5px] font-medium text-ink-800 hover:bg-ink-50 transition">
                <Download className="size-4" /> Download .md
              </button>
              <button onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-panel px-3 py-2.5 text-[12.5px] font-medium text-ink-800 hover:bg-ink-50 transition">
                <Printer className="size-4" /> Print / PDF
              </button>
            </div>
          ) : undefined
        }
      />

      <Section className="pb-12">
        {/* stage picker — only stages the negotiation has reached are generatable */}
        <div className="grid grid-cols-4 gap-3 no-print">
          {order.map((s) => {
            const meta = stageMeta[s]
            const available = reached.includes(s)
            const active = s === stage
            return (
              <button
                key={s}
                onClick={() => available && pick(s)}
                disabled={!available}
                className={[
                  'card p-4 text-left transition',
                  active ? 'ring-2' : available ? 'hover:shadow-raised' : 'opacity-45 cursor-not-allowed border-dashed',
                ].join(' ')}
                style={active ? { borderColor: 'var(--color-neg-600)', ['--tw-ring-color' as string]: 'var(--color-neg-100)' } : undefined}
              >
                <div className="flex items-center justify-between">
                  <span className="label-caps" style={{ color: available ? 'var(--color-neg-700)' : undefined }}>{meta.meeting}</span>
                  {available && s !== current && <Check className="size-3.5 text-sage-700" strokeWidth={2.5} />}
                  {s === current && (
                    <span className="rounded-full px-2 py-0.5 text-[9.5px] font-bold text-white" style={{ background: 'var(--color-neg-700)' }}>
                      CURRENT
                    </span>
                  )}
                </div>
                <div className="text-[13.5px] font-semibold text-ink-950 mt-1.5 leading-tight">{meta.label}</div>
                <p className="text-[11.5px] text-muted leading-snug mt-1.5">{meta.desc}</p>
                {!available && <p className="text-[10.5px] text-faint mt-1.5">Negotiation hasn't reached this stage yet.</p>}
              </button>
            )
          })}
        </div>

        {run === 'idle' && (
          <div className="card px-10 py-12 mt-4 grid place-items-center text-center">
            <div className="size-12 rounded-xl bg-ink-50 grid place-items-center mb-4">
              <Landmark className="size-5 text-ink-600" strokeWidth={1.75} />
            </div>
            <h2 className="text-[16px] font-semibold text-ink-950">{stageMeta[stage].label}</h2>
            <p className="text-[13px] text-muted mt-1.5 max-w-[56ch] leading-relaxed">
              {stageMeta[stage].desc} Generated from the live negotiation file — the same evidence, letters and
              valuations you've seen in the copilot, framed for a board decision.
            </p>
            <div className="mt-6">
              <GenerateButton onClick={() => setRun('streaming')}>Generate interim board pack</GenerateButton>
            </div>
          </div>
        )}

        {run !== 'idle' && (
          <div className="card px-10 py-9 mt-4 max-w-[880px] rise-in">
            <StreamedDoc md={interimPacks[stage]} active={run === 'streaming'} cps={560} onDone={() => setRun('done')} />
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 text-[12px] text-muted no-print">
          <span>The final close-out pack — sought vs settled, financial impact, implementation — is generated at Step 6 once heads of agreement are reached.</span>
          <button onClick={() => nav('/closeout')} className="inline-flex items-center gap-1 font-semibold" style={{ color: 'var(--color-neg-700)' }}>
            Close-out <ArrowRight className="size-3" strokeWidth={2.5} />
          </button>
        </div>
      </Section>
    </div>
  )
}
