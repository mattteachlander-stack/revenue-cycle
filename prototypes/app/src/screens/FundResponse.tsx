import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Inbox, ScanSearch } from 'lucide-react'
import { PageHeader, Section, GenerateButton } from '../components/ui'
import { Doc, StreamedDoc } from '../components/Doc'
import { fundReplyLetter, fundReplyDigest, counterDraft } from '../content/fundReply'
import { useDemo } from '../state'

type Stage = 'inbox' | 'digesting' | 'digested' | 'countering' | 'done'

export default function FundResponse() {
  const { responseDigested, setResponseDigested } = useDemo()
  const [stage, setStage] = useState<Stage>(responseDigested ? 'done' : 'inbox')
  const nav = useNavigate()

  return (
    <div>
      <PageHeader
        kicker="Negotiation copilot · Step 5"
        title="Fund response — digest and counter"
        lede="Paste the fund’s letter (or open it from the inbox). The copilot summarises what it actually says, flags traps in the wording, scores the movement, and drafts your counter."
        right={
          stage === 'done' ? (
            <GenerateButton onClick={() => nav('/closeout')}>
              Settle & close out <ArrowRight className="size-4" strokeWidth={2} />
            </GenerateButton>
          ) : undefined
        }
      />

      <Section className="pb-12 grid grid-cols-12 gap-4 items-start">
        {/* the fund's letter */}
        <div className="col-span-5 card overflow-hidden sticky top-4">
          <div className="bg-ink-50/60 border-b border-hairline px-6 py-3 flex items-center gap-2">
            <Inbox className="size-3.5 text-ink-600" />
            <span className="label-caps">Received 1 Aug 2026 · AusCare Provider Contracting</span>
          </div>
          <div className="px-7 py-6 max-h-[72vh] overflow-y-auto">
            <Doc md={fundReplyLetter} className="!text-[0.875rem]" />
          </div>
        </div>

        {/* analysis pane */}
        <div className="col-span-7 space-y-4">
          {stage === 'inbox' && (
            <div className="card px-10 py-14 grid place-items-center text-center">
              <div className="size-12 rounded-xl bg-ink-50 grid place-items-center mb-4">
                <ScanSearch className="size-5 text-ink-600" strokeWidth={1.75} />
              </div>
              <h2 className="text-[16px] font-semibold text-ink-950">AusCare has responded</h2>
              <p className="text-[13px] text-muted mt-1.5 max-w-[50ch] leading-relaxed">
                A warm letter with movement on almost nothing — and two pieces of wording that are worth
                more to the fund than the rates. Let the copilot show you.
              </p>
              <div className="mt-6">
                <GenerateButton onClick={() => setStage('digesting')}>Digest the response</GenerateButton>
              </div>
            </div>
          )}

          {(stage === 'digesting' || stage === 'digested' || stage === 'countering' || stage === 'done') && (
            <div className="card px-9 py-8 rise-in">
              <StreamedDoc
                md={fundReplyDigest}
                active={stage === 'digesting'}
                cps={560}
                follow={stage === 'digesting'}
                onDone={() => setStage((s) => (s === 'digesting' ? 'digested' : s))}
              />
              {stage === 'digested' && (
                <div className="mt-6 pt-5 border-t border-hairline no-print">
                  <GenerateButton onClick={() => setStage('countering')}>Draft the counter</GenerateButton>
                </div>
              )}
            </div>
          )}

          {(stage === 'countering' || stage === 'done') && (
            <div className="card rise-in overflow-hidden">
              <div className="bg-ink-50/60 border-b border-hairline px-7 py-3">
                <span className="label-caps">Draft counter — for your review before sending</span>
              </div>
              <div className="px-9 py-8">
                <StreamedDoc
                  md={counterDraft}
                  active={stage === 'countering'}
                  cps={430}
                  follow={stage === 'countering'}
                  onDone={() => { setStage('done'); setResponseDigested(true) }}
                />
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}
