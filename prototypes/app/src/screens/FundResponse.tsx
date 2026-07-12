import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, FileUp, Inbox, Landmark, RefreshCw, ScanSearch } from 'lucide-react'
import { PageHeader, Section, GenerateButton } from '../components/ui'
import { Doc, StreamedDoc } from '../components/Doc'
import { fundReplyLetter, fundReplyDigest, counterDraft } from '../content/fundReply'
import { fundReplyLetter2, fundReplyDigest2, counterDraft2 } from '../content/fundReply2'
import { useDemo } from '../state'

type Stage = 'inbox' | 'digesting' | 'digested' | 'countering' | 'done'

const rounds = [
  {
    n: 1,
    received: 'Received 1 Aug 2026 · AusCare Provider Contracting',
    letter: fundReplyLetter,
    digest: fundReplyDigest,
    counter: counterDraft,
    counterLabel: 'Draft counter — for your review before sending',
    inboxTitle: 'AusCare has responded',
    inboxLede: 'A warm letter with movement on almost nothing — and two pieces of wording that are worth more to the fund than the rates. Let the copilot show you.',
  },
  {
    n: 2,
    received: 'Received 26 Aug 2026 · AusCare Provider Contracting',
    letter: fundReplyLetter2,
    digest: fundReplyDigest2,
    counter: counterDraft2,
    counterLabel: 'Draft closing letter — for your review before sending',
    inboxTitle: 'Round 2 uploaded — the evidence pack worked',
    inboxLede: 'After the 19 August meeting, AusCare has moved on almost every front. The copilot scores the movement and tells you whether to keep negotiating or start closing.',
  },
]

function RoundBlock({ round, initialStage, onDone }: {
  round: typeof rounds[number]
  initialStage: Stage
  onDone: () => void
}) {
  const [stage, setStage] = useState<Stage>(initialStage)

  return (
    <div className="grid grid-cols-12 gap-4 items-start">
      {/* the fund's letter */}
      <div className="col-span-5 card overflow-hidden sticky top-4">
        <div className="bg-ink-50/60 border-b border-hairline px-6 py-3 flex items-center gap-2">
          <Inbox className="size-3.5 text-ink-600" />
          <span className="label-caps">Round {round.n} · {round.received}</span>
        </div>
        <div className="px-7 py-6 max-h-[72vh] overflow-y-auto">
          <Doc md={round.letter} className="!text-[0.875rem]" />
        </div>
      </div>

      {/* analysis pane */}
      <div className="col-span-7 space-y-4">
        {stage === 'inbox' && (
          <div className="card px-10 py-14 grid place-items-center text-center">
            <div className="size-12 rounded-xl bg-ink-50 grid place-items-center mb-4">
              <ScanSearch className="size-5 text-ink-600" strokeWidth={1.75} />
            </div>
            <h2 className="text-[16px] font-semibold text-ink-950">{round.inboxTitle}</h2>
            <p className="text-[13px] text-muted mt-1.5 max-w-[50ch] leading-relaxed">{round.inboxLede}</p>
            <div className="mt-6">
              <GenerateButton onClick={() => setStage('digesting')}>Digest the response</GenerateButton>
            </div>
          </div>
        )}

        {stage !== 'inbox' && (
          <div className="card px-9 py-8 rise-in">
            <StreamedDoc
              md={round.digest}
              active={stage === 'digesting'}
              cps={560}
              follow={stage === 'digesting'}
              onDone={() => setStage((s) => (s === 'digesting' ? 'digested' : s))}
            />
            {stage === 'digested' && (
              <div className="mt-6 pt-5 border-t border-hairline no-print">
                <GenerateButton onClick={() => setStage('countering')}>
                  {round.n === 1 ? 'Draft the counter' : 'Draft the closing letter'}
                </GenerateButton>
              </div>
            )}
          </div>
        )}

        {(stage === 'countering' || stage === 'done') && (
          <div className="card rise-in overflow-hidden">
            <div className="bg-ink-50/60 border-b border-hairline px-7 py-3">
              <span className="label-caps">{round.counterLabel}</span>
            </div>
            <div className="px-9 py-8">
              <StreamedDoc
                md={round.counter}
                active={stage === 'countering'}
                cps={430}
                follow={stage === 'countering'}
                onDone={() => { setStage('done'); onDone() }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function FundResponse() {
  const { responseDigested, setResponseDigested, round2Digested, setRound2Digested } = useDemo()
  // round 2 visibility: once "uploaded", it stays; completed rounds render done
  const [round2Open, setRound2Open] = useState(round2Digested)
  const nav = useNavigate()

  return (
    <div>
      <PageHeader
        kicker="Negotiation copilot · Step 5 — repeats each round"
        title="Fund responses — digest, counter, repeat"
        lede="Negotiations run in rounds. Each time the fund writes back, upload the letter: the copilot digests what it actually says, flags traps, scores the movement against the last round, and drafts your reply — as many rounds as the negotiation takes."
        right={
          round2Digested ? (
            <GenerateButton onClick={() => nav('/closeout')}>
              Settle & close out <ArrowRight className="size-4" strokeWidth={2} />
            </GenerateButton>
          ) : undefined
        }
      />

      <Section className="pb-12 space-y-6">
        <RoundBlock
          round={rounds[0]}
          initialStage={responseDigested ? 'done' : 'inbox'}
          onDone={() => setResponseDigested(true)}
        />

        {/* the loop: upload the next response */}
        {responseDigested && !round2Open && (
          <div className="card px-8 py-7 rise-in flex items-center gap-5 no-print"
               style={{ borderColor: 'var(--color-neg-100)', background: 'var(--color-neg-50)' }}>
            <div className="size-11 rounded-xl grid place-items-center shrink-0" style={{ background: 'var(--color-neg-100)' }}>
              <RefreshCw className="size-5" style={{ color: 'var(--color-neg-700)' }} strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <h2 className="text-[15px] font-semibold text-ink-950">Counter sent — waiting on AusCare</h2>
              <p className="text-[12.5px] text-muted mt-0.5 leading-relaxed max-w-[70ch]">
                When the fund's next letter arrives, upload it and the loop repeats: digest → flag → counter.
                Every round is kept on file below the last, so the whole correspondence trail reads top to bottom.
              </p>
            </div>
            <button
              onClick={() => setRound2Open(true)}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[12.5px] font-semibold text-white hover:brightness-110 transition shrink-0"
              style={{ background: 'var(--color-neg-700)' }}
            >
              <FileUp className="size-4" strokeWidth={2} /> Upload fund response (.pdf / .docx / .eml)
            </button>
          </div>
        )}
        {responseDigested && !round2Open && (
          <p className="text-[11px] text-faint -mt-3 px-1 no-print">
            Demo: the upload loads a canned round-2 letter (26 Aug). In production any received document is ingested as the next round.
          </p>
        )}

        {round2Open && (
          <RoundBlock
            round={rounds[1]}
            initialStage={round2Digested ? 'done' : 'inbox'}
            onDone={() => setRound2Digested(true)}
          />
        )}

        {round2Digested && (
          <div className="card px-8 py-6 rise-in flex items-center gap-5 no-print">
            <div className="size-11 rounded-xl bg-ink-50 grid place-items-center shrink-0">
              <Landmark className="size-5 text-ink-600" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <h2 className="text-[15px] font-semibold text-ink-950">The loop continues until you settle</h2>
              <p className="text-[12.5px] text-muted mt-0.5 leading-relaxed max-w-[72ch]">
                Further rounds work exactly the same way — upload, digest, counter. At any point, generate an
                interim <button onClick={() => nav('/boardpack')} className="font-semibold underline underline-offset-2" style={{ color: 'var(--color-neg-700)' }}>board pack</button> for
                the next board meeting. When heads of agreement are reached, close out at Step 6.
              </p>
            </div>
            <GenerateButton onClick={() => nav('/closeout')}>
              Settle & close out <ArrowRight className="size-4" strokeWidth={2} />
            </GenerateButton>
          </div>
        )}
      </Section>
    </div>
  )
}
