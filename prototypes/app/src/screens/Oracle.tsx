import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BookMarked, Columns3, CornerDownLeft, ShieldQuestion } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageHeader, Pill } from '../components/ui'
import { Doc } from '../components/Doc'
import { useStream } from '../lib/stream'
import { oracleCorpus, suggestedQuestions, portfolioQuestions, singleQuestions, fallbackAnswer, type OracleQA, type Citation } from '../content/oracle'

interface Turn {
  question: string
  qa: OracleQA | null // null = fallback
}

const copy = {
  ask: {
    kicker: 'Enquiry suite · Ask the contract',
    title: 'Ask the contract',
    lede: 'Staff-facing Q&A over a single agreement — AusCare or Federation — plus the public legal framework and Bayview’s internal decisions register. Every answer cites its sources and states confidence; where the contract is silent, it says so and recommends escalation.',
    placeholder: 'Ask any agreement — payment terms, consents, exclusions, notice periods…',
    corpusNote: 'Demo corpus: two synthetic HPPAs (AusCare, Federation) · curated legislation summaries · synthetic internal register. Free-text questions map to the nearest demo answer.',
  },
  compare: {
    kicker: 'Enquiry suite · Compare contracts',
    title: 'Compare contracts',
    lede: 'One question, every contract’s answer side by side. Termination notice, payment terms, indexation, audit rights — compared across the whole executed portfolio, with per-contract citations, so differences surface instead of hiding in filing cabinets.',
    placeholder: 'Compare a term across all agreements — e.g. termination notice, payment terms…',
    corpusNote: 'Demo portfolio: two synthetic HPPAs (AusCare 2023, Federation 2025). Free-text questions map to the nearest demo comparison.',
  },
}

export default function Oracle({ mode = 'ask' }: { mode?: 'ask' | 'compare' }) {
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const nav = useNavigate()

  const scoped = oracleCorpus.filter((q) => (mode === 'compare' ? q.scope === 'portfolio' : q.scope === 'single'))
  const scopedSuggestions = suggestedQuestions.filter((q) => (mode === 'compare' ? q.scope === 'portfolio' : q.scope === 'single'))
  const asked = new Set(turns.map((t) => t.qa?.id).filter(Boolean))
  const remaining = scopedSuggestions.filter((q) => !asked.has(q.id))
  const c = copy[mode]

  const ask = (text: string, qa: OracleQA | null) => {
    if (busy) return
    setTurns((t) => [...t, { question: text, qa }])
    setBusy(true)
    setInput('')
  }

  const submitFree = () => {
    const text = input.trim()
    if (!text) return
    // match a canned question by crude keyword overlap within this module's scope; otherwise fallback
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '')
    const words = new Set(norm(text).split(/\s+/).filter((w) => w.length > 3))
    let best: OracleQA | null = null
    let bestScore = 0
    for (const qa of scoped) {
      const qWords = norm(qa.question).split(/\s+/)
      const score = qWords.filter((w) => words.has(w)).length
      if (score > bestScore) { bestScore = score; best = qa }
    }
    ask(text, bestScore >= 3 ? best : null)
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [turns, busy])

  return (
    <div className="flex flex-col h-screen">
      <PageHeader kicker={c.kicker} title={c.title} lede={c.lede} />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[880px] space-y-6">
          {turns.length === 0 && mode === 'compare' && (
            <>
              <div className="card p-6 border-ora-100" style={{ borderColor: 'var(--color-ora-100)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Columns3 className="size-4 text-ora-600" strokeWidth={1.75} />
                  <span className="text-[13.5px] font-semibold text-ink-950">Compare across your whole contract portfolio</span>
                </div>
                <p className="text-[12px] text-muted mb-3">
                  Two agreements loaded — AusCare Health (2023) and Federation Health (2025). Ask one question, get every contract's answer side by side.
                </p>
                <SuggestedGrid onPick={(qa) => ask(qa.question, qa)} ids={portfolioQuestions.map((s) => s.id)} />
              </div>
              <SiblingPointer
                icon={ShieldQuestion}
                text="Need one agreement's answer, not a comparison?"
                cta="Ask the contract"
                onGo={() => nav('/oracle')}
              />
            </>
          )}
          {turns.length === 0 && mode === 'ask' && (
            <>
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldQuestion className="size-4 text-ink-600" strokeWidth={1.75} />
                  <span className="text-[13.5px] font-semibold text-ink-950">Questions your front desk asked this week</span>
                </div>
                <SuggestedGrid onPick={(qa) => ask(qa.question, qa)} ids={singleQuestions.map((s) => s.id)} />
              </div>
              <SiblingPointer
                icon={Columns3}
                text="Comparing a term across every agreement instead?"
                cta="Compare contracts"
                onGo={() => nav('/compare')}
              />
            </>
          )}

          {turns.map((t, i) => (
            <TurnView
              key={i}
              turn={t}
              live={i === turns.length - 1 && busy}
              onDone={() => setBusy(false)}
            />
          ))}

          {turns.length > 0 && !busy && remaining.length > 0 && (
            <div className="pt-1">
              <div className="label-caps mb-2">More to try</div>
              <SuggestedGrid onPick={(qa) => ask(qa.question, qa)} ids={remaining.slice(0, 4).map((r) => r.id)} compact />
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t border-hairline bg-panel px-8 py-4 no-print">
        <div className="max-w-[880px] flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitFree()}
            placeholder={c.placeholder}
            className="flex-1 rounded-lg border border-hairline-strong bg-paper px-4 py-2.5 text-[13.5px] outline-none
                       focus:border-ink-500 focus:ring-2 focus:ring-ink-100 placeholder:text-faint"
          />
          <button
            onClick={submitFree}
            disabled={busy || !input.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink-800 px-4 py-2.5 text-[13px] font-medium text-white
                       hover:bg-ink-700 transition disabled:opacity-40"
          >
            Ask <CornerDownLeft className="size-3.5" />
          </button>
        </div>
        <p className="max-w-[880px] text-[10.75px] text-faint mt-2">{c.corpusNote}</p>
      </div>
    </div>
  )
}

function SiblingPointer({ icon: Icon, text, cta, onGo }: {
  icon: typeof Columns3; text: string; cta: string; onGo: () => void
}) {
  return (
    <button onClick={onGo}
            className="w-full card px-5 py-3.5 flex items-center gap-3 text-left hover:shadow-raised transition">
      <Icon className="size-4 shrink-0 text-ora-600" strokeWidth={1.75} />
      <span className="text-[12.5px] text-muted flex-1">{text}</span>
      <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-ora-700">
        {cta} <ArrowRight className="size-3" strokeWidth={2.5} />
      </span>
    </button>
  )
}

function SuggestedGrid({ onPick, ids, compact }: { onPick: (qa: OracleQA) => void; ids: string[]; compact?: boolean }) {
  return (
    <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-2'} gap-2`}>
      {ids.map((id) => {
        const qa = oracleCorpus.find((q) => q.id === id)!
        return (
          <button
            key={id}
            onClick={() => onPick(qa)}
            className="text-left rounded-lg border border-hairline bg-paper hover:border-ink-500 hover:bg-ink-50/50
                       px-3.5 py-2.5 text-[12.5px] text-ink-950 leading-snug transition"
          >
            {qa.question}
          </button>
        )
      })}
    </div>
  )
}

function TurnView({ turn, live, onDone }: { turn: Turn; live: boolean; onDone: () => void }) {
  const qa = turn.qa
  const answerText = qa ? qa.answer : fallbackAnswer.answer
  const confidence = qa ? qa.confidence : fallbackAnswer.confidence
  const { shown, done } = useStream(answerText, live, { cps: 480, onDone })

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-br-md bg-ink-800 text-white px-4.5 py-2.5 text-[13.5px] max-w-[64ch] leading-relaxed">
          {turn.question}
        </div>
      </div>

      <div className="card p-5 max-w-[760px]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="label-caps">Contract oracle</span>
          <span className="flex items-center gap-2">
            {qa?.scope === 'portfolio' && (
              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{ background: 'var(--color-ora-100)', color: 'var(--color-ora-700)' }}>
                <Columns3 className="size-3" /> Portfolio comparison · 2 contracts
              </span>
            )}
            <ConfidenceBadge level={confidence} />
          </span>
        </div>
        <div className={done ? '' : 'stream-caret'}>
          <Doc md={shown} className="!text-[0.9rem]" />
        </div>
        {done && qa && (
          <div className="mt-4 pt-3.5 border-t border-hairline">
            <div className="label-caps mb-2 flex items-center gap-1.5">
              <BookMarked className="size-3" /> Sources
            </div>
            <ul className="space-y-1.5">
              {qa.citations.map((c, i) => <CitationRow key={i} c={c} />)}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function ConfidenceBadge({ level }: { level: OracleQA['confidence'] }) {
  const tone = level === 'High' ? 'sage' : level === 'Moderate' ? 'amber' : 'clay'
  return <Pill tone={tone}>Confidence: {level}</Pill>
}

function CitationRow({ c }: { c: Citation }) {
  const nav = useNavigate()
  const isContract = c.source.includes('HPPA')
  const tone =
    c.source === 'AusCare HPPA' ? 'bg-ink-50 text-ink-700 border-ink-100'
    : c.source === 'Federation HPPA' ? 'bg-neg-50 text-neg-700 border-neg-100'
    : c.source === 'Legislation' ? 'bg-amber-100/60 text-amber-700 border-amber-100'
    : 'bg-sage-100/60 text-sage-700 border-sage-100'
  return (
    <li className="flex items-start gap-2.5 text-[12px]">
      <button
        onClick={() => isContract && nav('/clauses')}
        disabled={!isContract}
        title={isContract ? 'Open in Clause intelligence' : undefined}
        className={`shrink-0 inline-flex items-center rounded-md border px-1.5 py-px font-semibold ${tone} ${isContract ? 'cursor-pointer hover:underline underline-offset-2' : 'cursor-default'}`}
      >
        {c.source} · {c.ref}{isContract ? ' ↗' : ''}
      </button>
      <span className="text-muted italic leading-snug">“{c.quote}”</span>
    </li>
  )
}
