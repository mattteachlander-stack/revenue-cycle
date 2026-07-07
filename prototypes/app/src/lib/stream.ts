import { useEffect, useRef, useState } from 'react'

/**
 * Simulated model streaming. The full text is authored at build time; this hook
 * reveals it in word-ish chunks with a variable cadence (fast runs, brief
 * "thinking" pauses at paragraph breaks) so it reads like live generation.
 * There is no network call anywhere in this app.
 */
export function useStream(text: string, active: boolean, opts?: { cps?: number; onDone?: () => void }) {
  const [shown, setShown] = useState(active ? '' : text)
  const [done, setDone] = useState(!active)
  const idx = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const onDoneRef = useRef(opts?.onDone)
  onDoneRef.current = opts?.onDone
  const base = opts?.cps ?? 340 // characters per second, roughly

  useEffect(() => {
    if (!active) { setShown(text); setDone(true); return }
    idx.current = 0
    setShown('')
    setDone(false)

    const step = () => {
      const i = idx.current
      if (i >= text.length) {
        setDone(true)
        onDoneRef.current?.()
        return
      }
      // reveal a chunk of 2–14 chars, ending on a word boundary where possible
      let n = 2 + Math.floor(Math.random() * 12)
      let j = Math.min(i + n, text.length)
      const space = text.indexOf(' ', j)
      if (space !== -1 && space - j < 8) j = space
      idx.current = j
      setShown(text.slice(0, j))

      const revealed = j - i
      let delay = (revealed / base) * 1000 * (0.6 + Math.random() * 0.9)
      // pause a beat at paragraph breaks and headings
      if (text.slice(Math.max(0, j - 2), j) === '\n\n') delay += 140 + Math.random() * 260
      timer.current = setTimeout(step, delay)
    }
    timer.current = setTimeout(step, 260)
    return () => clearTimeout(timer.current)
  }, [text, active, base])

  const skip = () => {
    clearTimeout(timer.current)
    idx.current = text.length
    setShown(text)
    setDone(true)
    onDoneRef.current?.()
  }

  return { shown, done, skip }
}
