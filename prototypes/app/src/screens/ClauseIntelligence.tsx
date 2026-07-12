import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle, Check, FileWarning, Layers3, ListChecks, PackageOpen, Scale, Sparkles,
} from 'lucide-react'
import { PageHeader, Section, Pill } from '../components/ui'
import {
  clauses, levers, packages, leverById, fmtKv,
  type ClauseRecord, type Contract, type Risk,
} from '../data/clauses'
import * as XLSX from 'xlsx'
import { useCommercial } from '../state-commercial'

const C = 'var(--color-neg-700)'
const C600 = 'var(--color-neg-600)'
const C100 = 'var(--color-neg-100)'
const C50 = 'var(--color-neg-50)'

type Tab = 'register' | 'levers' | 'packages' | 'dashboard'
const riskTone: Record<Risk, 'clay' | 'amber' | 'sage'> = { High: 'clay', Medium: 'amber', Low: 'sage' }

export default function ClauseIntelligence() {
  const [tab, setTab] = useState<Tab>('register')
  const [contract, setContract] = useState<Contract>('AusCare')
  const rows = useMemo(() => clauses.filter((c) => c.contract === contract), [contract])
  const [selectedId, setSelectedId] = useState<string>(rows[0].id)
  const selected = clauses.find((c) => c.id === selectedId && c.contract === contract) ?? rows[0]

  return (
    <div>
      <PageHeader
        accent={C600}
        kicker="Contracting suite · contract clause intelligence engine"
        title="Every clause, read like opposing counsel — then priced"
        lede="Each clause classified, risk-rated, explained in plain English, and valued — automated from PAS and revenue data where possible, rules-based where not, and always overridable by the human in the loop with a full audit trail."
      />

      <Section className="pb-10">
        <div className="flex items-center gap-2 mb-4">
          <TabBtn active={tab === 'register'} onClick={() => setTab('register')} icon={ListChecks} label="Clause register" />
          <TabBtn active={tab === 'levers'} onClick={() => setTab('levers')} icon={Scale} label="Negotiation levers" />
          <TabBtn active={tab === 'packages'} onClick={() => setTab('packages')} icon={PackageOpen} label="Package optimiser" />
          <TabBtn active={tab === 'dashboard'} onClick={() => setTab('dashboard')} icon={Layers3} label="Commercial dashboard" />
          {tab === 'register' && (
            <span className="ml-auto flex items-center gap-2">
              {(['AusCare', 'Federation'] as Contract[]).map((f) => (
                <button key={f} onClick={() => { setContract(f); setSelectedId(clauses.find((c) => c.contract === f)!.id) }}
                        className={['rounded-full px-3.5 py-1.5 text-[12px] font-medium border transition',
                          contract === f ? 'text-white border-transparent' : 'bg-panel text-muted border-hairline-strong hover:text-ink-950'].join(' ')}
                        style={contract === f ? { background: C } : undefined}>
                  {f} HPPA · {clauses.filter((c) => c.contract === f).length}
                </button>
              ))}
            </span>
          )}
        </div>

        {tab === 'register' && <Register rows={rows} selected={selected} onSelect={setSelectedId} />}
        {tab === 'levers' && <Levers />}
        {tab === 'packages' && <Packages />}
        {tab === 'dashboard' && <Dashboard />}
      </Section>
    </div>
  )
}

function TabBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof Scale; label: string }) {
  return (
    <button onClick={onClick}
            className={['inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.75px] font-semibold border transition',
              active ? 'text-white border-transparent' : 'bg-panel text-muted border-hairline hover:text-ink-950'].join(' ')}
            style={active ? { background: C } : undefined}>
      <Icon className="size-3.5" strokeWidth={2} /> {label}
    </button>
  )
}

// ------------------------------------------------------------- tab: register
function Register({ rows, selected, onSelect }: { rows: ClauseRecord[]; selected: ClauseRecord; onSelect: (id: string) => void }) {
  const { valuations, overrideValuation } = useCommercial()
  const [editVal, setEditVal] = useState('')
  const [editWhy, setEditWhy] = useState('')
  const v = valuations[selected.id]

  return (
    <div className="grid grid-cols-12 gap-4 items-start">
      <div className="col-span-5 card overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-hairline-strong">
              <Th>Clause</Th><Th>Category</Th><Th>Risk</Th><Th right>Value / yr</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const val = valuations[c.id]
              const active = selected.id === c.id
              return (
                <tr key={c.id} onClick={() => onSelect(c.id)}
                    className={`border-b border-hairline last:border-0 cursor-pointer transition ${active ? '' : 'hover:bg-ink-50/40'}`}
                    style={active ? { background: C50 } : undefined}>
                  <td className="px-3.5 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-ink-950 tabular">{c.ref}</span>
                      {c.unfair && <AlertTriangle className="size-3 text-clay-600" strokeWidth={2.25} />}
                    </div>
                    <div className="text-[11px] text-faint leading-tight">{c.title}</div>
                  </td>
                  <td className="px-3 py-2.5 text-muted">{c.category}</td>
                  <td className="px-3 py-2.5"><Pill tone={riskTone[c.risk]}>{c.risk}</Pill></td>
                  <td className="px-3.5 py-2.5 text-right tabular font-semibold text-ink-950">{val ? fmtKv(val.annualValue) : '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* drawer */}
      <div className="col-span-7 space-y-4">
        <div className="card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15px] font-semibold text-ink-950 tabular">{selected.ref}</span>
                <span className="text-[14px] font-semibold text-ink-950">{selected.title}</span>
                <Pill tone="ink">{selected.category}</Pill>
                <Pill tone={riskTone[selected.risk]}>{selected.risk} risk</Pill>
              </div>
              <p className="text-[11.75px] text-faint italic mt-2 leading-snug">“{selected.excerpt}”</p>
            </div>
            <div className="text-right shrink-0">
              <div className="label-caps">Priority</div>
              <div className="text-[22px] font-bold tabular" style={{ color: C }}>{selected.negotiationPriority}<span className="text-[12px] text-faint">/10</span></div>
            </div>
          </div>

          <div className="mt-3 rounded-lg px-4 py-3" style={{ background: C50, border: `1px solid ${C100}` }}>
            <div className="label-caps mb-1" style={{ color: C }}>In plain English</div>
            <p className="text-[13px] text-body leading-relaxed">{selected.plain}</p>
          </div>

          {selected.unfair && (
            <div className="mt-3 rounded-lg border border-clay-100 bg-clay-100/40 px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1">
                <FileWarning className="size-3.5 text-clay-700" />
                <span className="label-caps text-clay-700">Flagged: {selected.unfair.type}</span>
              </div>
              <ul className="text-[12.25px] text-body space-y-1">
                {selected.unfair.reasons.map((r) => <li key={r}>· {r}</li>)}
              </ul>
            </div>
          )}

          <div className="mt-3 grid grid-cols-2 gap-3 text-[12.25px]">
            <div className="rounded-lg border border-hairline px-3.5 py-2.5">
              <div className="label-caps mb-1">Commercial impact</div>
              <p className="text-muted leading-snug">{selected.commercialImpact}</p>
            </div>
            <div className="rounded-lg border border-hairline px-3.5 py-2.5">
              <div className="label-caps mb-1">Operational impact</div>
              <p className="text-muted leading-snug">{selected.operationalImpact}</p>
              <div className="flex gap-4 mt-2 text-[11px] text-faint tabular">
                <span>Burden {selected.burden}/5</span><span>Complexity {selected.complexity}/5</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10.75px] text-faint">Evidence: {selected.evidence.join(' · ')}</span>
            <AskOracleLink />
          </div>
        </div>

        {/* valuation */}
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5" style={{ color: C }} />
              <span className="label-caps">Clause valuation — you can override</span>
            </div>
            {v && <Pill tone={v.confidence === 'High' ? 'sage' : v.confidence === 'Medium' ? 'amber' : 'clay'}>Confidence: {v.confidence}</Pill>}
          </div>
          {v ? (
            <>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-[30px] font-bold tabular text-ink-950">{fmtKv(v.annualValue)}<span className="text-[13px] text-faint font-medium"> /yr</span></span>
                {v.negotiationValue !== undefined && v.negotiationValue !== v.annualValue && (
                  <span className="text-[12.5px] text-muted tabular">negotiation value {fmtKv(v.negotiationValue)}</span>
                )}
                <span className="ml-auto inline-flex rounded-md px-2 py-0.5 text-[10.5px] font-semibold bg-ink-50 text-ink-700">{v.method}</span>
              </div>
              <p className="text-[12px] text-muted leading-snug mt-1.5">{v.basis}</p>
              {v.overrides.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-hairline">
                  <div className="label-caps mb-1.5">Override audit trail</div>
                  <ul className="space-y-1">
                    {v.overrides.map((o, i) => (
                      <li key={i} className="text-[11.75px] text-muted leading-snug">
                        <span className="font-semibold text-ink-950">{o.by}</span> · {o.when} · {fmtKv(o.from)} → <span className="font-semibold text-ink-950">{fmtKv(o.to)}</span> — {o.rationale}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p className="text-[12.5px] text-muted mt-2">No valuation assigned — a market-standard or neutral clause. Assign one below if your context differs.</p>
          )}
          <div className="mt-3 pt-3 border-t border-hairline flex items-center gap-2">
            <input value={editVal} onChange={(e) => setEditVal(e.target.value.replace(/[^0-9]/g, ''))}
                   placeholder="$ / yr" className="w-24 rounded-lg border border-hairline-strong bg-paper px-3 py-1.5 text-[12.5px] tabular outline-none focus:border-ink-500" />
            <input value={editWhy} onChange={(e) => setEditWhy(e.target.value)}
                   placeholder="Rationale (required for the audit trail)…"
                   className="flex-1 rounded-lg border border-hairline-strong bg-paper px-3 py-1.5 text-[12.5px] outline-none focus:border-ink-500 placeholder:text-faint" />
            <button
              disabled={!editVal || !editWhy.trim()}
              onClick={() => { overrideValuation(selected.id, Number(editVal), editWhy.trim()); setEditVal(''); setEditWhy('') }}
              className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold text-white disabled:opacity-35 transition hover:brightness-110"
              style={{ background: C }}>
              <Check className="size-3.5" strokeWidth={2.5} /> Set value
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function exportLevers() {
  const rows = levers.map((l) => ({
    Lever: l.title, 'Clause refs': l.clauseRefs.join(', '), Issue: l.issue, 'Why it matters': l.why,
    'Value $/yr': l.negotiationValue, 'Ease': l.ease, 'Likelihood %': l.likelihoodPct,
    'Recommended position': l.recommended, 'Fallback position': l.fallback,
    'Dependencies': l.dependencies.join('; '), 'Evidence': l.evidence.join('; '),
    'Must-have': l.mustHave ? 'Yes' : '', 'Tradeable': l.tradeable ? 'Yes' : '', 'Quick win': l.quickWin ? 'Yes' : '',
  }))
  const ws = XLSX.utils.json_to_sheet(rows)
  ws['!cols'] = [{ wch: 34 }, { wch: 16 }, { wch: 30 }, { wch: 46 }, { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 52 }, { wch: 52 }, { wch: 34 }, { wch: 40 }, { wch: 9 }, { wch: 9 }, { wch: 9 }]
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Negotiation levers')
  XLSX.writeFile(wb, 'core-negotiation-levers.xlsx')
}

// --------------------------------------------------------------- tab: levers
function Levers() {
  const { selectedLevers, toggleLever } = useCommercial()
  return (
    <div className="card overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-hairline flex items-baseline justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-ink-950">Negotiation lever register — AusCare renewal</h2>
          <p className="text-[11.75px] text-muted mt-0.5">Every identified opportunity with positions, evidence and dependencies. Tick levers to build the package on the next tab.</p>
        </div>
        <span className="flex items-center gap-3">
          <span className="text-[11.5px] tabular text-faint">{levers.length} levers · ${Math.round(levers.reduce((s, l) => s + l.negotiationValue, 0) / 1000)}k/yr identified</span>
          <button onClick={exportLevers}
                  className="rounded-lg border border-hairline-strong px-3 py-1.5 text-[11.5px] font-semibold text-ink-800 hover:bg-ink-50 transition">
            Export .xlsx
          </button>
        </span>
      </div>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="border-b border-hairline-strong">
            <Th> </Th><Th>Lever</Th><Th>Recommended → fallback</Th><Th right>Value/yr</Th><Th right>Ease · likelihood</Th><Th>Flags</Th>
          </tr>
        </thead>
        <tbody>
          {levers.map((l) => (
            <tr key={l.id} className="border-b border-hairline last:border-0 align-top">
              <td className="pl-5 pr-1 py-3">
                <input type="checkbox" checked={selectedLevers.has(l.id)} onChange={() => toggleLever(l.id)}
                       className="size-4 accent-[#2456d4] cursor-pointer" />
              </td>
              <td className="px-3 py-3">
                <div className="font-semibold text-ink-950">{l.title}</div>
                <div className="text-[11px] text-faint">{l.clauseRefs.join(', ')} · {l.issue}</div>
                <div className="text-[11.25px] text-muted leading-snug mt-1 max-w-[38ch]">{l.why}</div>
              </td>
              <td className="px-3 py-3 text-[11.75px] leading-snug max-w-[34ch]">
                <div className="text-ink-950">{l.recommended}</div>
                <div className="text-faint mt-1">↳ {l.fallback}</div>
                {l.dependencies.length > 0 && <div className="text-[10.75px] mt-1" style={{ color: C }}>{l.dependencies.join(' · ')}</div>}
              </td>
              <td className="px-3 py-3 text-right tabular font-semibold text-ink-950">{fmtKv(l.negotiationValue)}</td>
              <td className="px-3 py-3 text-right text-[11.5px] text-muted tabular whitespace-nowrap">{l.ease} · {l.likelihoodPct}%</td>
              <td className="px-3 py-3">
                <div className="flex flex-wrap gap-1">
                  {l.mustHave && <Pill tone="clay">Must-have</Pill>}
                  {l.tradeable && <Pill tone="amber">Tradeable</Pill>}
                  {l.quickWin && <Pill tone="sage">Quick win</Pill>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ------------------------------------------------------------- tab: packages
function Packages() {
  const { selectedLevers, setLevers } = useCommercial()
  const sel = levers.filter((l) => selectedLevers.has(l.id))
  const total = sel.reduce((s, l) => s + l.negotiationValue, 0)
  const expected = sel.reduce((s, l) => s + l.negotiationValue * (l.likelihoodPct / 100), 0)

  return (
    <div className="space-y-4">
      <div className="card p-5" style={{ background: C50, borderColor: C100 }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="label-caps" style={{ color: C }}>Your current package · {sel.length} levers</div>
            <div className="flex items-baseline gap-4 mt-1">
              <span className="text-[30px] font-bold tabular text-ink-950">${Math.round(total / 1000)}k<span className="text-[13px] font-medium text-faint">/yr asked</span></span>
              <span className="text-[15px] font-semibold tabular text-sage-700">${Math.round(expected / 1000)}k/yr likelihood-weighted</span>
              <span className="text-[12px] text-muted">{sel.filter((l) => l.mustHave).length} must-have · {sel.filter((l) => l.tradeable).length} tradeable · {sel.filter((l) => l.quickWin).length} quick wins</span>
            </div>
          </div>
          <div className="text-right text-[11.75px] text-muted max-w-[34ch] leading-snug">
            Successful negotiations settle on balanced bundles, not clause-by-clause wins — trade the tradeables, never the must-haves.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {packages.map((p) => {
          const pl = p.leverIds.map(leverById)
          const pv = pl.reduce((s, l) => s + l.negotiationValue, 0)
          const pe = pl.reduce((s, l) => s + l.negotiationValue * (l.likelihoodPct / 100), 0)
          const isActive = p.leverIds.length === sel.length && p.leverIds.every((id) => selectedLevers.has(id))
          return (
            <div key={p.id} className={`card p-5 flex flex-col ${isActive ? 'ring-2' : ''}`}
                 style={isActive ? { borderColor: 'transparent', boxShadow: `0 0 0 2px ${C600}` } : undefined}>
              <div className="label-caps" style={{ color: C }}>{p.posture}</div>
              <h3 className="text-[15px] font-semibold text-ink-950 mt-0.5">{p.name}</h3>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-[22px] font-bold tabular text-ink-950">${Math.round(pv / 1000)}k</span>
                <span className="text-[12px] tabular text-sage-700 font-semibold">${Math.round(pe / 1000)}k weighted</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {pl.map((l) => (
                  <span key={l.id} className="inline-flex rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold bg-ink-50 text-ink-700 tabular">{l.id}</span>
                ))}
              </div>
              <div className="label-caps mt-3 mb-1">You trade</div>
              <ul className="text-[11.75px] text-muted space-y-0.5">{p.gives.map((g) => <li key={g}>· {g}</li>)}</ul>
              <div className="label-caps mt-3 mb-1">Sequencing</div>
              <ol className="text-[11.75px] text-muted space-y-0.5 list-decimal pl-4">{p.sequencing.map((g) => <li key={g}>{g}</li>)}</ol>
              <p className="text-[11.25px] text-faint italic leading-snug mt-3">{p.relationshipNote}</p>
              <button onClick={() => setLevers(p.leverIds)}
                      className={['mt-4 rounded-lg px-3.5 py-2 text-[12.5px] font-semibold border transition',
                        isActive ? 'text-white border-transparent' : 'text-ink-800 border-hairline-strong hover:bg-ink-50'].join(' ')}
                      style={isActive ? { background: C } : undefined}>
                {isActive ? 'Active package' : 'Load this package'}
              </button>
            </div>
          )
        })}
      </div>
      <p className="text-[11px] text-faint">Values are the synthetic clause valuations (overrides included). In production the optimiser also models dependency effects between levers and the fund’s historical concession patterns.</p>
    </div>
  )
}

// ------------------------------------------------------------ tab: dashboard
function Dashboard() {
  const { valuations } = useCommercial()
  const ac = clauses.filter((c) => c.contract === 'AusCare')
  const totalOpp = levers.reduce((s, l) => s + l.negotiationValue, 0)
  const highRisk = ac.filter((c) => c.risk === 'High').length
  const flagged = ac.filter((c) => c.unfair).length
  const burden = (ac.reduce((s, c) => s + c.burden, 0) / ac.length).toFixed(1)
  const complexity = (ac.reduce((s, c) => s + c.complexity, 0) / ac.length).toFixed(1)
  const cats = [...new Set(ac.map((c) => c.category))]
  const top = [...ac].sort((a, b) => b.negotiationPriority - a.negotiationPriority).slice(0, 10)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Kpi label="Total identified opportunity" value={`$${Math.round(totalOpp / 1000)}k/yr`} sub={`across ${levers.length} negotiation levers`} />
        <Kpi label="Flagged clauses" value={`${flagged} of ${ac.length}`} sub={`${highRisk} high-risk · unfair/penalty terms with reasons`} />
        <Kpi label="Burden · complexity" value={`${burden} · ${complexity}`} sub="average /5 across the agreement" />
        <Kpi label="Negotiation readiness" value="87%" sub="evidence attached to 11 of 12 levers & flags" />
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="card col-span-3 p-5">
          <h3 className="text-[14px] font-semibold text-ink-950 mb-3">Clause risk heatmap — AusCare HPPA</h3>
          <div className="space-y-1.5">
            {cats.map((cat) => {
              const cs = ac.filter((c) => c.category === cat)
              return (
                <div key={cat} className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-[11.5px] text-muted">{cat}</span>
                  <div className="flex gap-1 flex-1">
                    {cs.map((c) => (
                      <span key={c.id} title={`${c.ref} — ${c.title}`}
                            className="h-6 flex-1 max-w-[70px] rounded-md grid place-items-center text-[9.5px] font-bold text-white tabular"
                            style={{ background: c.risk === 'High' ? 'var(--color-clay-600)' : c.risk === 'Medium' ? 'var(--color-amber-600)' : 'var(--color-sage-600)', opacity: 0.88 }}>
                        {c.ref.replace('cl. ', '')}
                      </span>
                    ))}
                  </div>
                  <span className="w-14 text-right text-[11px] tabular text-faint">{fmtKv(cs.reduce((s, c) => s + (valuations[c.id]?.annualValue ?? 0), 0))}</span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-hairline text-[10.5px] text-muted">
            <span className="inline-flex items-center gap-1"><span className="size-2.5 rounded-sm bg-clay-600" /> High</span>
            <span className="inline-flex items-center gap-1"><span className="size-2.5 rounded-sm bg-amber-600" /> Medium</span>
            <span className="inline-flex items-center gap-1"><span className="size-2.5 rounded-sm bg-sage-600" /> Low</span>
            <span className="ml-auto">value shown = annual exposure per category (incl. your overrides)</span>
          </div>
        </div>

        <div className="card col-span-2 p-5">
          <h3 className="text-[14px] font-semibold text-ink-950 mb-3">Top negotiation priorities</h3>
          <ol className="space-y-1.5">
            {top.map((c, i) => (
              <li key={c.id} className="flex items-center gap-2.5 text-[12.25px]">
                <span className="size-5 rounded-md grid place-items-center text-[10.5px] font-bold text-white tabular shrink-0" style={{ background: C }}>{i + 1}</span>
                <span className="tabular font-semibold text-ink-950 w-16 shrink-0">{c.ref}</span>
                <span className="text-muted flex-1 leading-tight">{c.title}</span>
                <span className="tabular text-[11.5px] text-faint">{valuations[c.id] ? fmtKv(valuations[c.id].annualValue) : '—'}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 pt-3 border-t border-hairline">
            <div className="label-caps mb-1.5">Progress — agreed changes this negotiation</div>
            <div className="h-[10px] rounded-full bg-ink-50 overflow-hidden">
              <div className="h-full brand-gradient" style={{ width: '14%' }} />
            </div>
            <p className="text-[11.5px] text-muted mt-1">1 of 7 tracked changes agreed (14-day lodgement) — see Change intelligence.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Kpi({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="card p-4.5">
      <div className="label-caps">{label}</div>
      <div className="text-[24px] font-bold tracking-tight text-ink-950 tabular mt-1.5 leading-none">{value}</div>
      <p className="text-[11.5px] text-muted mt-1.5 leading-snug">{sub}</p>
    </div>
  )
}

function AskOracleLink() {
  const nav = useNavigate()
  return (
    <button onClick={() => nav('/oracle')}
            className="shrink-0 text-[11.5px] font-semibold hover:underline underline-offset-2"
            style={{ color: 'var(--color-ora-700)' }}>
      Ask the oracle about this clause ↗
    </button>
  )
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th className={`px-3 first:pl-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted ${right ? 'text-right' : 'text-left'}`}>
      {children}
    </th>
  )
}
