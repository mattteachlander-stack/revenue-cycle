import { createContext, useContext, useState, type ReactNode } from 'react'
import { clauses, type Valuation, type ValuationOverride } from './data/clauses'

/** Human-in-the-loop valuation overrides (Wave 1) + package selection (Wave 2). */

interface CommercialState {
  valuations: Record<string, Valuation>
  overrideValuation: (clauseId: string, to: number, rationale: string) => void
  selectedLevers: Set<string>
  toggleLever: (id: string) => void
  setLevers: (ids: string[]) => void
}

const Ctx = createContext<CommercialState | null>(null)

export function CommercialProvider({ children }: { children: ReactNode }) {
  const [valuations, setValuations] = useState<Record<string, Valuation>>(() => {
    const m: Record<string, Valuation> = {}
    for (const c of clauses) if (c.valuation) m[c.id] = c.valuation
    return m
  })
  const [selectedLevers, setSelectedLevers] = useState<Set<string>>(new Set(['L1', 'L2', 'L3', 'L4', 'L5']))

  const overrideValuation = (clauseId: string, to: number, rationale: string) => {
    setValuations((v) => {
      const cur = v[clauseId] ?? {
        method: 'Manual (commercial judgement)' as const, annualValue: 0,
        confidence: 'Low' as const, basis: 'Human-assigned value.', overrides: [] as ValuationOverride[],
      }
      const entry: ValuationOverride = { when: 'Today', by: 'You', from: cur.annualValue, to, rationale }
      return {
        ...v,
        [clauseId]: {
          ...cur,
          method: 'Manual (commercial judgement)',
          annualValue: to,
          confidence: 'Medium',
          basis: rationale || cur.basis,
          overrides: [...cur.overrides, entry],
        },
      }
    })
  }

  const toggleLever = (id: string) =>
    setSelectedLevers((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  const setLevers = (ids: string[]) => setSelectedLevers(new Set(ids))

  return (
    <Ctx.Provider value={{ valuations, overrideValuation, selectedLevers, toggleLever, setLevers }}>
      {children}
    </Ctx.Provider>
  )
}

export function useCommercial() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useCommercial outside provider')
  return v
}
