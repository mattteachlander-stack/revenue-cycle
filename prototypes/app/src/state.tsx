import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { load, save } from './lib/persist'

export type PostureId = 'collaborative' | 'assertive' | 'restructure'

interface DemoState {
  analysisDone: boolean
  setAnalysisDone: (v: boolean) => void
  posture: PostureId | null
  setPosture: (p: PostureId | null) => void
  letterDone: boolean
  setLetterDone: (v: boolean) => void
  responseDigested: boolean
  setResponseDigested: (v: boolean) => void
  round2Digested: boolean
  setRound2Digested: (v: boolean) => void
}

const Ctx = createContext<DemoState | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [analysisDone, setAnalysisDone] = useState(() => load('demo.analysisDone', false))
  const [posture, setPosture] = useState<PostureId | null>(() => load<PostureId | null>('demo.posture', null))
  const [letterDone, setLetterDone] = useState(() => load('demo.letterDone', false))
  const [responseDigested, setResponseDigested] = useState(() => load('demo.responseDigested', false))
  const [round2Digested, setRound2Digested] = useState(() => load('demo.round2Digested', false))
  useEffect(() => { save('demo.analysisDone', analysisDone) }, [analysisDone])
  useEffect(() => { save('demo.posture', posture) }, [posture])
  useEffect(() => { save('demo.letterDone', letterDone) }, [letterDone])
  useEffect(() => { save('demo.responseDigested', responseDigested) }, [responseDigested])
  useEffect(() => { save('demo.round2Digested', round2Digested) }, [round2Digested])
  return (
    <Ctx.Provider
      value={{
        analysisDone, setAnalysisDone,
        posture, setPosture,
        letterDone, setLetterDone,
        responseDigested, setResponseDigested,
        round2Digested, setRound2Digested,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useDemo() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useDemo outside provider')
  return v
}
