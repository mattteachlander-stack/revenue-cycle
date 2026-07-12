import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { load, save } from './lib/persist'
import {
  auscareBatch, auscareItems, federationBatch, federationItems,
  type AuditBatch, type AuditItem, type Comment, type Decision,
} from './data/integrity'

export interface ItemState {
  decision: Decision | null
  responseNote: string
  extraComments: Comment[]
  extraDocs: string[]
}

interface RiState {
  imported: boolean
  setImported: (v: boolean) => void
  batches: AuditBatch[]
  items: AuditItem[]
  itemState: Record<string, ItemState>
  setDecision: (id: string, d: Decision, note: string) => void
  addComment: (id: string, text: string) => void
  addDoc: (id: string, name: string) => void
  respondedCount: number
}

const Ctx = createContext<RiState | null>(null)

const blank = (): ItemState => ({ decision: null, responseNote: '', extraComments: [], extraDocs: [] })

export function RiProvider({ children }: { children: ReactNode }) {
  const [imported, setImported] = useState(() => load('ri.imported', false))
  const [itemState, setItemState] = useState<Record<string, ItemState>>(() => load('ri.itemState', {}))
  useEffect(() => { save('ri.imported', imported) }, [imported])
  useEffect(() => { save('ri.itemState', itemState) }, [itemState])

  const batches = useMemo<AuditBatch[]>(
    () => (imported ? [{ ...auscareBatch, status: 'in review' as const }, federationBatch] : [auscareBatch, federationBatch]),
    [imported],
  )
  const items = useMemo<AuditItem[]>(
    () => (imported ? [...auscareItems, ...federationItems] : federationItems),
    [imported],
  )

  const get = (s: Record<string, ItemState>, id: string) => s[id] ?? blank()

  const setDecision = (id: string, d: Decision, note: string) =>
    setItemState((s) => ({ ...s, [id]: { ...get(s, id), decision: d, responseNote: note } }))

  const addComment = (id: string, text: string) =>
    setItemState((s) => ({
      ...s,
      [id]: { ...get(s, id), extraComments: [...get(s, id).extraComments, { author: 'You', when: 'Today', text }] },
    }))

  const addDoc = (id: string, name: string) =>
    setItemState((s) => ({ ...s, [id]: { ...get(s, id), extraDocs: [...get(s, id).extraDocs, name] } }))

  const respondedCount = Object.values(itemState).filter((v) => v.decision !== null).length

  return (
    <Ctx.Provider value={{ imported, setImported, batches, items, itemState, setDecision, addComment, addDoc, respondedCount }}>
      {children}
    </Ctx.Provider>
  )
}

export function useRi() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useRi outside provider')
  return v
}

export function useItemState(id: string): ItemState {
  const { itemState } = useRi()
  return itemState[id] ?? blank()
}
