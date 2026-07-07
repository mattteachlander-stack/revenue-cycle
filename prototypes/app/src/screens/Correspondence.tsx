import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Copy, Check, PenLine } from 'lucide-react'
import { PageHeader, Section, GenerateButton, Pill } from '../components/ui'
import { StreamedDoc } from '../components/Doc'
import { openingLetters } from '../content/letters'
import { postureById } from '../content/postures'
import { useDemo } from '../state'

type Stage = 'idle' | 'streaming' | 'done'

export default function Correspondence() {
  const { posture, letterDone, setLetterDone } = useDemo()
  const [stage, setStage] = useState<Stage>(letterDone ? 'done' : 'idle')
  const [copied, setCopied] = useState(false)
  const nav = useNavigate()

  if (!posture) return null
  const p = postureById(posture)
  const letter = openingLetters[posture]

  const copy = async () => {
    await navigator.clipboard.writeText(letter.replace(/\*\*/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div>
      <PageHeader
        kicker="Negotiation copilot · Step 4"
        title="Opening letter"
        lede={`Drafted for the “${p.name}” posture, in a register appropriate to a fund contracting team. You edit and send it yourself — the copilot sends nothing.`}
        right={
          stage === 'done' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-panel px-3 py-2.5 text-[12.5px] font-medium text-ink-800 hover:bg-ink-50 transition"
              >
                {copied ? <Check className="size-4 text-sage-600" /> : <Copy className="size-4" />}
                {copied ? 'Copied' : 'Copy letter'}
              </button>
              <GenerateButton onClick={() => nav('/response')}>
                AusCare has replied <ArrowRight className="size-4" strokeWidth={2} />
              </GenerateButton>
            </div>
          ) : undefined
        }
      />

      <Section className="pb-12">
        <div className="flex items-center gap-2 mb-4">
          <Pill tone="ink">Posture: {p.name}</Pill>
          <span className="text-[12px] text-faint">Change it any time on the Strategy screen — the letter re-drafts.</span>
        </div>

        {stage === 'idle' && (
          <div className="card px-10 py-14 grid place-items-center text-center">
            <div className="size-12 rounded-xl bg-ink-50 grid place-items-center mb-4">
              <PenLine className="size-5 text-ink-600" strokeWidth={1.75} />
            </div>
            <h2 className="text-[16px] font-semibold text-ink-950">Ready to draft</h2>
            <p className="text-[13px] text-muted mt-1.5 max-w-[52ch] leading-relaxed">
              The letter will carry the {p.name.toLowerCase()} asks, the trade offers, and a response deadline —
              addressed to AusCare Provider Contracting.
            </p>
            <div className="mt-6">
              <GenerateButton onClick={() => setStage('streaming')}>Draft opening letter</GenerateButton>
            </div>
          </div>
        )}

        {stage !== 'idle' && (
          <div className="card max-w-[820px] rise-in overflow-hidden">
            <div className="bg-ink-50/60 border-b border-hairline px-8 py-3 flex items-center justify-between">
              <span className="label-caps">Draft — for your review before sending</span>
              <span className="text-[11px] text-faint">letterhead preview</span>
            </div>
            <div className="px-10 py-9">
              <StreamedDoc
                md={letter}
                active={stage === 'streaming'}
                cps={430}
                onDone={() => { setStage('done'); setLetterDone(true) }}
              />
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}
