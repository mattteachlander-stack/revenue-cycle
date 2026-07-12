import { useEffect, useRef, useState } from 'react'
import { BookMarked, CornerDownLeft, Landmark, Lightbulb, Scale } from 'lucide-react'
import { PageHeader, Pill } from '../components/ui'
import { Doc } from '../components/Doc'
import { useStream } from '../lib/stream'
import { legisCorpus, legisFallback, suggestedCorpus, type LegisQA } from '../content/legislation'

interface Turn {
  question: string
  qa: LegisQA | null
}

export default function Legislation() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const asked = new Set(turns.map((t) => t.qa?.id).filter(Boolean))
  const remaining = legisCorpus.filter((q) => !asked.has(q.id))

  const ask = (text: string, qa: LegisQA | null) => {
    if (busy) return
    setTurns((t) => [...t, { question: text, qa }])
    setBusy(true)
    setInput('')
  }

  const submitFree = () => {
    const text = input.trim()
    if (!text) return
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '')
    const words = new Set(norm(text).split(/\s+/).filter((w) => w.length > 3))
    let best: LegisQA | null = null
    let bestScore = 0
    for (const qa of legisCorpus) {
      const qWords = norm(qa.question + ' ' + qa.answer.slice(0, 200)).split(/\s+/)
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
      <PageHeader
        kicker="Enquiry suite · Ask legislation"
        title="Ask legislation"
        lede="The private health insurance and Medicare benefit rules that sit behind every contract — product compliance, benefit floors, waiting periods, device benefits. Every answer cites the provision and translates it into what it means for the facility in real terms."
      />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[880px] space-y-6">
          {turns.length === 0 && (
            <>
              <div className="card p-6 border-ora-100" style={{ borderColor: 'var(--color-ora-100)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Scale className="size-4 text-ora-600" strokeWidth={1.75} />
                  <span className="text-[13.5px] font-semibold text-ink-950">Questions the sector actually asks</span>
                </div>
                <p className="text-[12px] text-muted mb-3">
                  Demo corpus: curated summaries of the PHI Act 2007 and its Rules, and the Health Insurance Act 1973 /
                  MBS. Production answers from the current consolidated text with amendment tracking.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {legisCorpus.map((qa) => (
                    <button key={qa.id} onClick={() => ask(qa.question, qa)}
                            className="text-left rounded-lg border border-hairline bg-paper hover:border-ink-500 hover:bg-ink-50/50 px-3.5 py-2.5 text-[12.5px] text-ink-950 leading-snug transition">
                      {qa.question}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="size-4 text-amber-600" strokeWidth={1.75} />
                  <span className="text-[13.5px] font-semibold text-ink-950">Corpus roadmap — what else should live here?</span>
                </div>
                <div className="space-y-2">
                  {suggestedCorpus.map((s) => (
                    <div key={s.name} className="flex items-start gap-3 text-[12px]">
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide mt-px ${
                        s.status === 'In demo corpus' ? 'text-white' : 'bg-ink-50 text-muted'}`}
                            style={s.status === 'In demo corpus' ? { background: 'var(--color-ora-700)' } : undefined}>
                        {s.status}
                      </span>
                      <span><strong className="font-semibold text-ink-950">{s.name}</strong>
                        <span className="text-muted"> — {s.detail}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {turns.map((t, i) => (
            <TurnView key={i} turn={t} live={i === turns.length - 1 && busy} onDone={() => setBusy(false)} />
          ))}

          {turns.length > 0 && !busy && remaining.length > 0 && (
            <div className="pt-1">
              <div className="label-caps mb-2">More to try</div>
              <div className="grid grid-cols-2 gap-2">
                {remaining.slice(0, 4).map((qa) => (
                  <button key={qa.id} onClick={() => ask(qa.question, qa)}
                          className="text-left rounded-lg border border-hairline bg-paper hover:border-ink-500 hover:bg-ink-50/50 px-3.5 py-2.5 text-[12.5px] text-ink-950 leading-snug transition">
                    {qa.question}
                  </button>
                ))}
              </div>
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
            placeholder="Ask the legislation — benefit rules, product tiers, waiting periods, device benefits…"
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
        <p className="max-w-[880px] text-[10.75px] text-faint mt-2">
          Curated legislative summaries for demonstration — general information, not legal advice. Free-text questions map
          to the nearest demo answer. Production verifies against legislation.gov.au and the MBS before answering.
        </p>
      </div>
    </div>
  )
}

function TurnView({ turn, live, onDone }: { turn: Turn; live: boolean; onDone: () => void }) {
  const qa = turn.qa
  const answerText = qa ? qa.answer : legisFallback.answer
  const realTerms = qa ? qa.realTerms : legisFallback.realTerms
  const confidence = qa ? qa.confidence : legisFallback.confidence
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
          <span className="label-caps">Legislation lookup</span>
          <Pill tone={confidence === 'High' ? 'sage' : 'amber'}>Confidence: {confidence}</Pill>
        </div>
        <div className={done ? '' : 'stream-caret'}>
          <Doc md={shown} className="!text-[0.9rem]" />
        </div>
        {done && (
          <div className="mt-3.5 rounded-lg px-4 py-3"
               style={{ background: 'var(--color-ora-50)', border: '1px solid var(--color-ora-100)' }}>
            <div className="label-caps mb-1 flex items-center gap-1.5" style={{ color: 'var(--color-ora-700)' }}>
              <Landmark className="size-3" /> In real terms
            </div>
            <p className="text-[12.5px] leading-relaxed text-ink-950">{realTerms}</p>
          </div>
        )}
        {done && qa && (
          <div className="mt-4 pt-3.5 border-t border-hairline">
            <div className="label-caps mb-2 flex items-center gap-1.5">
              <BookMarked className="size-3" /> References
            </div>
            <ul className="space-y-1.5">
              {qa.citations.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12px]">
                  <span className="shrink-0 inline-flex items-center rounded-md border px-1.5 py-px font-semibold bg-amber-100/60 text-amber-700 border-amber-100">
                    {c.source} · {c.ref}
                  </span>
                  <span className="text-muted italic leading-snug">“{c.quote}”</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
