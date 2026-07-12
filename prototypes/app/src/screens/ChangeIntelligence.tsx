import { useState } from 'react'
import { Columns2, GitCompareArrows, Lightbulb, ListTodo, Route } from 'lucide-react'
import { PageHeader, Section, Pill } from '../components/ui'
import { changes, proposedClause, scenariosFor, type ChangeItem } from '../data/changes'

const C = 'var(--color-neg-700)'
const C600 = 'var(--color-neg-600)'
const C100 = 'var(--color-neg-100)'
const C50 = 'var(--color-neg-50)'

type Tab = 'compare' | 'register' | 'propose' | 'scenarios'

const favourTone = {
  'Favourable to hospital': 'sage', 'Favourable to fund': 'clay', Neutral: 'ink',
} as const
const statusTone = {
  Open: 'amber', Countered: 'ink', 'Agreed in principle': 'sage', Rejected: 'clay', Parked: 'amber',
} as const

export default function ChangeIntelligence() {
  const [tab, setTab] = useState<Tab>('compare')
  const [sel, setSel] = useState<ChangeItem>(changes[1])

  return (
    <div>
      <PageHeader
        accent={C600}
        kicker="Contracting suite · contract change intelligence engine"
        title="Every proposed change, understood before it's agreed"
        lede="Current contract versus proposed drafting — fund-originated and hospital-originated — each change classified, valued and tracked from first proposal to final position. The negotiation's central working document."
      />
      <Section className="pb-10">
        <div className="flex items-center gap-2 mb-4">
          <TabBtn active={tab === 'compare'} onClick={() => setTab('compare')} icon={GitCompareArrows} label="Version compare" />
          <TabBtn active={tab === 'register'} onClick={() => setTab('register')} icon={ListTodo} label="Change register" />
          <TabBtn active={tab === 'propose'} onClick={() => setTab('propose')} icon={Lightbulb} label="Propose a clause" />
          <TabBtn active={tab === 'scenarios'} onClick={() => setTab('scenarios')} icon={Route} label="Scenario modelling" />
          <span className="ml-auto text-[11.5px] text-faint">AusCare renewal · current (2023) vs proposed drafts · synthetic</span>
        </div>

        {tab === 'compare' && <Compare sel={sel} setSel={setSel} />}
        {tab === 'register' && <Register />}
        {tab === 'propose' && <Propose />}
        {tab === 'scenarios' && <Scenarios />}
      </Section>
    </div>
  )
}

function TabBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof Route; label: string }) {
  return (
    <button onClick={onClick}
            className={['inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.75px] font-semibold border transition',
              active ? 'text-white border-transparent' : 'bg-panel text-muted border-hairline hover:text-ink-950'].join(' ')}
            style={active ? { background: C } : undefined}>
      <Icon className="size-3.5" strokeWidth={2} /> {label}
    </button>
  )
}

// ------------------------------------------------------------ tab: compare
function Compare({ sel, setSel }: { sel: ChangeItem; setSel: (c: ChangeItem) => void }) {
  return (
    <div className="grid grid-cols-12 gap-4 items-start">
      <div className="col-span-4 card overflow-hidden">
        {changes.map((c) => (
          <button key={c.id} onClick={() => setSel(c)}
                  className={`w-full text-left px-4 py-3 border-b border-hairline last:border-0 transition ${sel.id === c.id ? '' : 'hover:bg-ink-50/40'}`}
                  style={sel.id === c.id ? { background: C50 } : undefined}>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-ink-950 tabular">{c.clauseRef}</span>
              <Pill tone={favourTone[c.favour]}>{c.favour.replace('Favourable to ', '→ ')}</Pill>
            </div>
            <div className="text-[12.25px] text-ink-950 font-medium leading-tight mt-0.5">{c.title}</div>
            <div className="text-[10.75px] text-faint mt-0.5">{c.originator} · priority {c.priority}/10 · {c.status}</div>
          </button>
        ))}
      </div>

      <div className="col-span-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4.5">
            <div className="flex items-center gap-1.5 mb-2">
              <Columns2 className="size-3.5 text-faint" />
              <span className="label-caps">Current (2023 agreement)</span>
            </div>
            <p className="text-[12.5px] text-body leading-relaxed font-serif">{sel.currentText}</p>
          </div>
          <div className="card p-4.5" style={{ borderColor: sel.favour === 'Favourable to fund' ? 'var(--color-clay-100)' : sel.favour === 'Favourable to hospital' ? 'var(--color-sage-100)' : undefined }}>
            <div className="flex items-center gap-1.5 mb-2">
              <Columns2 className="size-3.5" style={{ color: C }} />
              <span className="label-caps" style={{ color: C }}>Proposed ({sel.originator})</span>
            </div>
            <p className="text-[12.5px] text-body leading-relaxed font-serif">{sel.proposedText}</p>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-ink-950">{sel.title}</h3>
            <span className={`text-[15px] font-bold tabular ${sel.annualValue > 0 ? 'text-sage-700' : sel.annualValue < 0 ? 'text-clay-700' : 'text-muted'}`}>
              {sel.annualValue === 0 ? 'value-neutral' : `${sel.annualValue > 0 ? '+' : '−'}$${Math.abs(Math.round(sel.annualValue / 1000))}k/yr`}
            </span>
          </div>
          <p className="text-[12.75px] text-body leading-relaxed mt-2">{sel.summary}</p>
          <div className="grid grid-cols-3 gap-3 mt-3 text-[11.75px]">
            <ImpactBox label="Commercial" text={sel.impacts.commercial} />
            <ImpactBox label="Operational" text={sel.impacts.operational} />
            <ImpactBox label="Implementation" text={sel.impacts.implementation} />
          </div>
          <div className="mt-3 rounded-lg px-4 py-3" style={{ background: C50, border: `1px solid ${C100}` }}>
            <div className="label-caps mb-1" style={{ color: C }}>Recommended action</div>
            <p className="text-[12.5px] text-body leading-relaxed">{sel.action}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImpactBox({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg border border-hairline px-3 py-2.5">
      <div className="label-caps mb-1">{label}</div>
      <p className="text-muted leading-snug">{text}</p>
    </div>
  )
}

// ------------------------------------------------------------ tab: register
function Register() {
  const agreed = changes.filter((c) => c.status === 'Agreed in principle').length
  return (
    <div className="card overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-hairline flex items-baseline justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-ink-950">Negotiation change register</h2>
          <p className="text-[11.75px] text-muted mt-0.5">Every proposed change, its owner, status and full decision history — the single source of truth through the negotiation.</p>
        </div>
        <span className="text-[11.5px] tabular text-faint">{changes.length} items · {agreed} agreed</span>
      </div>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="border-b border-hairline-strong">
            <Th>Change</Th><Th>Originator</Th><Th>Favour</Th><Th right>Value/yr</Th><Th>Owner</Th><Th>Status</Th><Th>History</Th>
          </tr>
        </thead>
        <tbody>
          {changes.map((c) => (
            <tr key={c.id} className="border-b border-hairline last:border-0 align-top">
              <td className="pl-5 pr-3 py-3">
                <div className="font-semibold text-ink-950">{c.title}</div>
                <div className="text-[10.75px] text-faint tabular">{c.clauseRef} · priority {c.priority}/10</div>
              </td>
              <td className="px-3 py-3 text-muted whitespace-nowrap">{c.originator}</td>
              <td className="px-3 py-3"><Pill tone={favourTone[c.favour]}>{c.favour.replace('Favourable to ', '→ ')}</Pill></td>
              <td className={`px-3 py-3 text-right tabular font-semibold ${c.annualValue > 0 ? 'text-sage-700' : c.annualValue < 0 ? 'text-clay-700' : 'text-muted'}`}>
                {c.annualValue === 0 ? '—' : `${c.annualValue > 0 ? '+' : '−'}$${Math.abs(Math.round(c.annualValue / 1000))}k`}
              </td>
              <td className="px-3 py-3 text-muted whitespace-nowrap">{c.owner}</td>
              <td className="px-3 py-3"><Pill tone={statusTone[c.status]}>{c.status}</Pill></td>
              <td className="px-3 py-3 text-[11px] text-muted leading-snug max-w-[30ch]">
                {c.history.map((h) => <div key={h.when}><span className="tabular text-faint">{h.when}:</span> {h.what}</div>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ------------------------------------------------------------- tab: propose
function Propose() {
  return (
    <div className="grid grid-cols-12 gap-4 items-start">
      <div className="col-span-7 space-y-4">
        <div className="card overflow-hidden">
          <div className="px-6 py-3 border-b border-hairline" style={{ background: C50 }}>
            <span className="label-caps" style={{ color: C }}>Hospital-proposed clause · AI-drafted for your review</span>
          </div>
          <div className="px-7 py-5">
            <h3 className="text-[15px] font-semibold text-ink-950">{proposedClause.title}</h3>
            <p className="font-serif text-[13.5px] leading-[1.7] text-body mt-3 border-l-2 pl-4" style={{ borderColor: C100 }}>
              {proposedClause.draftWording}
            </p>
            <div className="label-caps mt-4 mb-1">Commercial rationale</div>
            <p className="text-[12.5px] text-muted leading-relaxed">{proposedClause.rationale}</p>
            <div className="grid grid-cols-2 gap-3 mt-3 text-[11.75px]">
              <ImpactBox label="Financial impact" text={proposedClause.financialImpact} />
              <ImpactBox label="Implementation" text={proposedClause.implementation} />
            </div>
            <div className="label-caps mt-4 mb-1">Alternative drafting</div>
            <ul className="text-[12px] text-muted space-y-1">{proposedClause.alternatives.map((a) => <li key={a}>· {a}</li>)}</ul>
          </div>
        </div>
      </div>
      <div className="col-span-5 space-y-4">
        <div className="card p-5">
          <h3 className="text-[13.5px] font-semibold text-ink-950 mb-2.5">Predicted fund objections — with responses</h3>
          <ul className="space-y-3">
            {proposedClause.objections.map((o) => (
              <li key={o.objection}>
                <div className="text-[12.5px] font-medium text-clay-700 leading-snug">{o.objection}</div>
                <div className="text-[12.25px] text-muted leading-snug mt-0.5">↳ {o.response}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5" style={{ background: C50, borderColor: C100 }}>
          <div className="label-caps mb-1" style={{ color: C }}>Negotiation strategy</div>
          <p className="text-[12.5px] text-body leading-relaxed">{proposedClause.strategy}</p>
        </div>
        <p className="text-[11px] text-faint px-1">
          In production, this builder drafts any commercial proposal — funding models, No-Gap arrangements, bundled care,
          audit reform, VBC — with the same structure: wording, rationale, impact, objections, alternatives. Demo shows one worked example.
        </p>
      </div>
    </div>
  )
}

// ------------------------------------------------------------ tab: scenarios
function Scenarios() {
  const [which, setWhich] = useState<'CH-2' | 'CH-6'>('CH-2')
  const item = changes.find((c) => c.id === which)!
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {(['CH-2', 'CH-6'] as const).map((id) => {
          const c = changes.find((x) => x.id === id)!
          return (
            <button key={id} onClick={() => setWhich(id)}
                    className={['rounded-full px-3.5 py-1.5 text-[12px] font-medium border transition',
                      which === id ? 'text-white border-transparent' : 'bg-panel text-muted border-hairline-strong hover:text-ink-950'].join(' ')}
                    style={which === id ? { background: C } : undefined}>
              {c.clauseRef} · {c.title}
            </button>
          )
        })}
        <span className="ml-auto text-[11.5px] text-faint">Outcomes simulated against the fund's behaviour profile · synthetic</span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {scenariosFor[which].map((s) => (
          <div key={s.name} className="card p-4.5 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-ink-950 leading-tight">{s.name}</span>
              <span className="text-[13px] font-bold tabular shrink-0" style={{ color: C }}>{s.likelihoodPct}%</span>
            </div>
            <div className="h-[6px] rounded-full bg-ink-50 overflow-hidden mt-2">
              <div className="h-full brand-gradient" style={{ width: `${s.likelihoodPct}%` }} />
            </div>
            <div className="label-caps mt-3 mb-0.5">Commercial</div>
            <p className="text-[11.75px] text-muted leading-snug">{s.commercial}</p>
            <div className="label-caps mt-2.5 mb-0.5">Financial</div>
            <p className="text-[11.75px] font-medium text-ink-950 leading-snug">{s.financial}</p>
            <div className="mt-auto pt-3">
              <div className="rounded-lg px-3 py-2 text-[11.75px] leading-snug" style={{ background: C50, border: `1px solid ${C100}` }}>
                <span className="font-semibold" style={{ color: C }}>Next: </span>
                <span className="text-body">{s.next}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-muted">
        Reference point: <strong className="text-ink-950">{item.title}</strong> — {item.summary}
      </p>
    </div>
  )
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th className={`px-3 first:pl-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted ${right ? 'text-right' : 'text-left'}`}>
      {children}
    </th>
  )
}
