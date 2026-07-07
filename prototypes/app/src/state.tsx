import { createContext, useContext, useState, type ReactNode } from 'react'

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
}

const Ctx = createContext<DemoState | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [analysisDone, setAnalysisDone] = useState(false)
  const [posture, setPosture] = useState<PostureId | null>(null)
  const [letterDone, setLetterDone] = useState(false)
  const [responseDigested, setResponseDigested] = useState(false)
  return (
    <Ctx.Provider
      value={{
        analysisDone, setAnalysisDone,
        posture, setPosture,
        letterDone, setLetterDone,
        responseDigested, setResponseDigested,
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
