import { useNavigate } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { PageHeader, Section, Pill } from '../components/ui'
import { postures } from '../content/postures'
import { useDemo } from '../state'

export default function Strategy() {
  const { posture, setPosture, setLetterDone, setResponseDigested } = useDemo()
  const nav = useNavigate()

  const choose = (id: typeof postures[number]['id']) => {
    if (posture !== id) { setLetterDone(false); setResponseDigested(false) }
    setPosture(id)
    nav('/correspondence')
  }

  return (
    <div>
      <PageHeader
        kicker="Negotiation copilot · Step 3"
        title="Choose your posture"
        lede="Three internally consistent strategies built from the positioning paper. Each shows what it asks, what it trades, its risk, and the fund’s likely response. You choose — the copilot never acts alone."
      />

      <Section className="grid grid-cols-3 gap-4 pb-12 items-start">
        {postures.map((p) => {
          const selected = posture === p.id
          return (
            <div
              key={p.id}
              className={[
                'card p-5 flex flex-col transition relative',
                selected ? 'ring-2 ring-ink-600 border-transparent' : 'hover:shadow-raised',
              ].join(' ')}
            >
              {p.recommended && (
                <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full bg-ink-800 text-white px-2.5 py-0.5 text-[10.5px] font-semibold tracking-wide">
                  <Star className="size-3" strokeWidth={2} /> RECOMMENDED ON THE EVIDENCE
                </span>
              )}
              <h2 className="text-[15.5px] font-semibold text-ink-950 mt-1">{p.name}</h2>
              <p className="text-[12px] text-ink-600 font-medium mt-0.5">{p.tagline}</p>
              <p className="text-[12.75px] text-muted leading-relaxed mt-3">{p.summary}</p>

              <div className="mt-4">
                <div className="label-caps mb-1.5">The ask</div>
                <ul className="space-y-1">
                  {p.asks.map((a) => (
                    <li key={a} className="text-[12.25px] text-ink-950 leading-snug pl-3 relative">
                      <span className="absolute left-0 top-[0.55em] size-1 rounded-full bg-ink-500" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3.5">
                <div className="label-caps mb-1.5">What you trade</div>
                <ul className="space-y-1">
                  {p.gives.map((g) => (
                    <li key={g} className="text-[12.25px] text-muted leading-snug pl-3 relative">
                      <span className="absolute left-0 top-[0.55em] size-1 rounded-full bg-hairline-strong" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3.5 border-t border-hairline space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="label-caps">Risk</span>
                    <Pill tone={p.risk.level === 'Lower' ? 'sage' : p.risk.level === 'Moderate' ? 'amber' : 'clay'}>
                      {p.risk.level}
                    </Pill>
                  </div>
                  <p className="text-[12px] text-muted leading-snug mt-1">{p.risk.note}</p>
                </div>
                <div>
                  <div className="label-caps">Likely fund response</div>
                  <p className="text-[12px] text-muted leading-snug mt-1">{p.fundResponse}</p>
                </div>
                <div>
                  <div className="label-caps">Best when</div>
                  <p className="text-[12px] text-muted leading-snug mt-1">{p.bestWhen}</p>
                </div>
              </div>

              <button
                onClick={() => choose(p.id)}
                className={[
                  'mt-5 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium transition',
                  selected
                    ? 'bg-ink-800 text-white'
                    : 'border border-hairline-strong text-ink-800 hover:bg-ink-50',
                ].join(' ')}
              >
                {selected ? 'Selected — draft the letter' : 'Choose this posture'}
                <ArrowRight className="size-4" strokeWidth={2} />
              </button>
            </div>
          )
        })}
      </Section>
    </div>
  )
}
