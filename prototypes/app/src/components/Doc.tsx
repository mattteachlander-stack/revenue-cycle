import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useRef } from 'react'
import { useStream } from '../lib/stream'

export function Doc({ md, className = '' }: { md: string; className?: string }) {
  return (
    <div className={`doc ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </div>
  )
}

/**
 * A pre-authored document replayed with simulated streaming (canned demo —
 * no model call). Auto-follows the bottom while streaming.
 */
export function StreamedDoc({
  md, active, onDone, follow = true, cps,
}: {
  md: string
  active: boolean
  onDone?: () => void
  follow?: boolean
  cps?: number
}) {
  const { shown, done, skip } = useStream(md, active, { cps, onDone })
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!done && follow) endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [shown, done, follow])

  return (
    <div>
      <div className={`doc ${done ? '' : 'stream-caret'}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{shown}</ReactMarkdown>
      </div>
      {!done && (
        <div className="mt-4 no-print">
          <button
            onClick={skip}
            className="text-[11.5px] font-medium text-muted hover:text-ink-700 underline underline-offset-2"
          >
            Skip animation
          </button>
        </div>
      )}
      <div ref={endRef} />
    </div>
  )
}
