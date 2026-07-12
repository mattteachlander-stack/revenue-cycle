import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Copy, Check, Download, PenLine, PencilRuler, Save } from 'lucide-react'
import { PageHeader, Section, GenerateButton, Pill } from '../components/ui'
import { StreamedDoc } from '../components/Doc'
import { openingLetters } from '../content/letters'
import { postureById } from '../content/postures'
import { useDemo } from '../state'
import { load, save } from '../lib/persist'

type Stage = 'idle' | 'streaming' | 'done'

export default function Correspondence() {
  const { posture, letterDone, setLetterDone } = useDemo()
  const [stage, setStage] = useState<Stage>(letterDone ? 'done' : 'idle')
  const [copied, setCopied] = useState(false)
  const [editing, setEditing] = useState(false)
  const [savedNote, setSavedNote] = useState('')
  const docRef = useRef<HTMLDivElement>(null)
  const nav = useNavigate()

  const draftKey = `demo.draftLetter.${posture}`
  const [savedDraft] = useState<string | null>(() => load<string | null>(draftKey, null))

  useEffect(() => {
    if (!editing && docRef.current) docRef.current.contentEditable = 'false'
  }, [editing])

  if (!posture) return null
  const p = postureById(posture)
  const letter = openingLetters[posture]

  const copy = async () => {
    const text = docRef.current?.innerText ?? letter.replace(/\*\*/g, '')
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const toggleEdit = () => {
    if (!docRef.current) return
    const next = !editing
    docRef.current.contentEditable = String(next)
    if (next) docRef.current.focus()
    setEditing(next)
  }

  const saveVersion = () => {
    if (!docRef.current) return
    save(draftKey, docRef.current.innerHTML)
    setSavedNote(`Version saved ${new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}`)
    setTimeout(() => setSavedNote(''), 2500)
  }

  const download = () => {
    const text = docRef.current?.innerText ?? letter.replace(/\*\*/g, '')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'bayview-opening-letter.txt'
    a.click()
    URL.revokeObjectURL(a.href)
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
              <button onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-panel px-3 py-2.5 text-[12.5px] font-medium text-ink-800 hover:bg-ink-50 transition">
                {copied ? <Check className="size-4 text-sage-600" /> : <Copy className="size-4" />}
                {copied ? 'Copied' : 'Copy'}
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
              <span className="label-caps">
                Draft — for your review before sending
                {savedDraft && !editing && stage === 'done' && (
                  <span className="ml-2 normal-case tracking-normal font-medium text-sage-700">· your edited version</span>
                )}
              </span>
              {stage === 'done' && (
                <span className="flex items-center gap-1.5 no-print">
                  {savedNote && <span className="text-[11px] font-semibold text-sage-700">{savedNote}</span>}
                  <ToolBtn onClick={toggleEdit} active={editing} icon={PencilRuler}
                           label={editing ? 'Finish editing' : 'Edit draft'} />
                  <ToolBtn onClick={saveVersion} icon={Save} label="Save version" />
                  <ToolBtn onClick={download} icon={Download} label=".txt" />
                </span>
              )}
            </div>
            <div className="px-10 py-9">
              <div ref={docRef}
                   className={editing ? 'rounded-lg outline-2 outline-dashed outline-amber-400 outline-offset-8' : ''}>
                {savedDraft ? (
                  <div className="doc" dangerouslySetInnerHTML={{ __html: savedDraft }} />
                ) : (
                  <StreamedDoc
                    md={letter}
                    active={stage === 'streaming'}
                    cps={430}
                    onDone={() => { setStage('done'); setLetterDone(true) }}
                  />
                )}
              </div>
              {editing && (
                <p className="text-[11.5px] text-amber-700 mt-4 no-print">
                  Editing the draft directly — changes stay on this device. Save a version to keep them across the session;
                  Reset demo clears everything.
                </p>
              )}
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}

function ToolBtn({ onClick, icon: Icon, label, active }: {
  onClick: () => void; icon: typeof Copy; label: string; active?: boolean
}) {
  return (
    <button onClick={onClick}
            className={[
              'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold transition',
              active ? 'border-amber-400 bg-amber-100/60 text-amber-700'
                     : 'border-hairline-strong text-ink-800 hover:bg-ink-50',
            ].join(' ')}>
      <Icon className="size-3" strokeWidth={2} /> {label}
    </button>
  )
}
