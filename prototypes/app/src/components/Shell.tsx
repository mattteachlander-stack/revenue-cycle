import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileSearch, Signpost, PenLine, MailQuestion,
  Landmark, MessagesSquare, Lock, Check, FlaskConical, LayoutGrid,
  Gauge, Inbox, ClipboardCheck, History, Layers, Scale, ListChecks, GitCompareArrows,
  Columns3, FileQuestion,
} from 'lucide-react'
import { useDemo } from '../state'
import { useRi } from '../state-integrity'
import { facility, negotiation } from '../data/facility'
import { CoreMark, CoreWordmark } from './Logo'
import Presenter from './Presenter'

const stepIcon = {
  dashboard: LayoutDashboard,
  analyse: FileSearch,
  strategy: Signpost,
  correspondence: PenLine,
  response: MailQuestion,
  closeout: Landmark,
}

// CORE suite tints for the dark navy sidebar (brand gradient family)
const MOD = {
  neg: '#5a8bff',
  ops: '#2fc4e0',
  ri: '#8b83f0',
  ora: '#2ee6c9',
}

function SectionLabel({ color, letter, children }: { color?: string; letter?: string; children: ReactNode }) {
  return (
    <div className="px-2 pt-5 pb-2 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.09em] text-white/40 font-medium">
      {letter && (
        <span className="grid place-items-center size-4 rounded-[5px] font-display text-[10px] font-bold normal-case"
              style={{ background: color, color: '#081022' }}>
          {letter}
        </span>
      )}
      {children}
    </div>
  )
}

function Item({
  to, icon: Icon, label, sub, unlocked = true, trailing, accent,
}: {
  to: string
  icon: typeof LayoutDashboard
  label: string
  sub: string
  unlocked?: boolean
  trailing?: ReactNode
  accent?: string
}) {
  const loc = useLocation()
  const active = loc.pathname === to
  return (
    <NavLink
      to={unlocked ? to : '#'}
      onClick={(e) => { if (!unlocked) e.preventDefault() }}
      className={[
        'group flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors',
        active ? 'bg-white/12' : unlocked ? 'hover:bg-white/6' : 'opacity-40 cursor-not-allowed',
      ].join(' ')}
      style={active && accent ? { boxShadow: `inset 3px 0 0 ${accent}` } : undefined}
    >
      <span className={[
        'relative grid place-items-center size-7 rounded-md border',
        active ? 'border-white/25 bg-white/10' : 'border-white/12',
      ].join(' ')}>
        <Icon className="size-3.5" strokeWidth={1.75} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[13px] font-medium leading-tight">{label}</span>
        <span className="block text-[11px] text-white/45 leading-tight mt-px">{sub}</span>
      </span>
      {trailing}
    </NavLink>
  )
}

export default function Shell({ children }: { children: ReactNode }) {
  const { analysisDone, posture, letterDone, responseDigested } = useDemo()
  const { imported } = useRi()

  const steps: {
    key: keyof typeof stepIcon
    to: string
    label: string
    sub: string
    unlocked: boolean
    complete: boolean
  }[] = [
    { key: 'dashboard', to: '/dashboard', label: 'Dashboard', sub: 'Position at a glance', unlocked: true, complete: true },
    { key: 'analyse', to: '/analyse', label: 'Analyse position', sub: 'Positioning paper', unlocked: true, complete: analysisDone },
    { key: 'strategy', to: '/strategy', label: 'Strategy', sub: 'Choose a posture', unlocked: analysisDone, complete: posture !== null },
    { key: 'correspondence', to: '/correspondence', label: 'Correspondence', sub: 'Opening letter', unlocked: posture !== null, complete: letterDone },
    { key: 'response', to: '/response', label: 'Fund responses', sub: 'Digest & counter, each round', unlocked: letterDone, complete: responseDigested },
    { key: 'closeout', to: '/closeout', label: 'Close-out', sub: 'Final board pack', unlocked: responseDigested, complete: false },
  ]

  return (
    <div className="min-h-screen flex">
      <aside className="w-[264px] shrink-0 text-white flex flex-col fixed inset-y-0 no-print overflow-y-auto"
             style={{ background: 'var(--color-navy-950)' }}>
        <div className="px-5 pt-5 pb-4 border-b border-white/10">
          <NavLink to="/" className="flex items-center gap-3">
            <CoreMark size={34} />
            <div>
              <CoreWordmark />
              <div className="text-[8.5px] text-white/50 tracking-[0.16em] mt-1.5 leading-[1.5]">
                COMMERCIAL INTELLIGENCE<br />FOR <span style={{ color: '#2fc4e0' }}>HEALTHCARE</span>
              </div>
            </div>
          </NavLink>
        </div>

        <div className="px-5 py-3.5 border-b border-white/10">
          <div className="text-[10.5px] uppercase tracking-[0.09em] text-white/40 font-medium">Facility</div>
          <div className="text-[13px] font-medium mt-0.5">{facility.name}</div>
          <div className="text-[11.5px] text-white/50">{facility.theatres} theatres · {facility.location}</div>
        </div>

        <nav className="flex-1 px-3 pb-4">
          <div className="pt-3">
            <Item to="/" icon={LayoutGrid} label="Platform home" sub="Modules & licences" />
          </div>

          <SectionLabel color={MOD.neg} letter="C">Contracting</SectionLabel>
          <div className="px-2 pb-1 text-[10.75px] text-white/35">Negotiation — {negotiation.fundShort} renewal</div>
          <ol className="space-y-0.5">
            {steps.map((s, i) => {
              const Icon = stepIcon[s.key]
              return (
                <li key={s.key}>
                  <Item accent={MOD.neg}
                    to={s.to} icon={Icon} label={s.label} sub={s.sub} unlocked={s.unlocked}
                    trailing={!s.unlocked ? <Lock className="size-3 text-white/35" />
                      : s.complete && i > 0 ? <Check className="size-3.5 text-sage-100/80" strokeWidth={2.5} /> : null}
                  />
                </li>
              )
            })}
          </ol>
          <div className="mt-1.5 space-y-0.5">
            <Item accent={MOD.neg} to="/boardpack" icon={Landmark} label="Board pack" sub="Generate at any stage" />
            <Item accent={MOD.neg} to="/fund-intel" icon={Scale} label="Fund intelligence" sub="Profile · leverage index" />
            <Item accent={MOD.neg} to="/clauses" icon={ListChecks} label="Clause intelligence" sub="Register · levers · packages" />
            <Item accent={MOD.neg} to="/changes" icon={GitCompareArrows} label="Change intelligence" sub="Versions · register · scenarios" />
            <Item accent={MOD.neg} to="/performance" icon={History} label="Historical" sub="Performance & value realisation" />
          </div>

          <SectionLabel color={MOD.ops} letter="O">Operational</SectionLabel>
          <Item accent={MOD.ops} to="/operational" icon={Layers} label="Concept previews" sub="Provisional DRG · coding · billing bots" />

          <SectionLabel color={MOD.ri} letter="R">Revenue Integrity</SectionLabel>
          <div className="space-y-0.5">
            <Item accent={MOD.ri} to="/integrity" icon={Gauge} label="Dashboard" sub="Outcomes, trends, learning" />
            <Item accent={MOD.ri}
              to="/integrity/inbox" icon={Inbox} label="Audit inbox" sub="Import fund audit files"
              trailing={!imported ? (
                <span className="rounded-full px-1.5 py-0.5 text-[9.5px] font-bold" style={{ background: MOD.ri, color: '#241536' }}>1 NEW</span>
              ) : null}
            />
            <Item accent={MOD.ri} to="/integrity/workbench" icon={ClipboardCheck} label="Workbench" sub="Review & respond" />
            <Item accent={MOD.ri} to="/integrity/cdi" icon={FileQuestion} label="CDI" sub="Documentation improvement · roadmap" />
          </div>

          <SectionLabel color={MOD.ora} letter="E">Enquiry</SectionLabel>
          <div className="space-y-0.5">
            <Item accent={MOD.ora} to="/oracle" icon={MessagesSquare} label="Ask the contract" sub="Cited answers, one agreement" />
            <Item accent={MOD.ora} to="/compare" icon={Columns3} label="Compare contracts" sub="One question, every agreement" />
          </div>
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-start gap-2 text-white/55">
            <FlaskConical className="size-3.5 mt-0.5 shrink-0" />
            <p className="text-[10.75px] leading-snug">
              Demonstration on <span className="text-white/80">synthetic data</span>. All outputs pre-authored;
              no live model calls.
            </p>
          </div>
          <button
            onClick={() => { sessionStorage.clear(); location.hash = '#/'; location.reload() }}
            className="mt-2.5 w-full rounded-lg border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/70 hover:bg-white/8 hover:text-white transition"
          >
            Reset demo
          </button>
        </div>
      </aside>

      <div className="flex-1 ml-[264px] flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Presenter />
        <footer className="no-print border-t border-hairline bg-panel/70 px-8 py-3 flex items-center justify-between">
          <p className="text-[11px] text-faint">
            Demo — synthetic data only (Bayview Day Surgery, AusCare Health and Federation Health are fictional).
            Decision support, <strong className="font-medium text-muted">not legal or financial advice</strong>.
          </p>
          <p className="text-[11px] text-faint tabular">CORE · Every Contract. Every Dollar. Every Decision. · prototype 0.4</p>
        </footer>
      </div>
    </div>
  )
}
