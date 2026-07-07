import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileSearch, Signpost, PenLine, MailQuestion,
  Landmark, MessagesSquare, Lock, Check, FlaskConical,
} from 'lucide-react'
import { useDemo } from '../state'
import { facility, negotiation } from '../data/facility'

const stepIcon = {
  dashboard: LayoutDashboard,
  analyse: FileSearch,
  strategy: Signpost,
  correspondence: PenLine,
  response: MailQuestion,
  closeout: Landmark,
}

export default function Shell({ children }: { children: ReactNode }) {
  const { analysisDone, posture, letterDone, responseDigested } = useDemo()
  const loc = useLocation()

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
    { key: 'response', to: '/response', label: 'Fund response', sub: 'Digest & counter', unlocked: letterDone, complete: responseDigested },
    { key: 'closeout', to: '/closeout', label: 'Close-out', sub: 'Board pack', unlocked: responseDigested, complete: false },
  ]

  return (
    <div className="min-h-screen flex">
      {/* ---------- sidebar ---------- */}
      <aside className="w-[264px] shrink-0 bg-ink-950 text-white flex flex-col fixed inset-y-0 no-print">
        <div className="px-5 pt-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-gradient-to-br from-ink-500 to-ink-700 grid place-items-center font-serif text-[15px] font-bold text-white">
              C
            </div>
            <div>
              <div className="text-[14.5px] font-semibold tracking-tight leading-none">Counterpart Health</div>
              <div className="text-[10.5px] text-white/45 mt-1 tracking-wide">REVENUE CYCLE INTELLIGENCE</div>
            </div>
          </div>
        </div>

        <div className="px-5 py-3.5 border-b border-white/10">
          <div className="text-[10.5px] uppercase tracking-[0.09em] text-white/40 font-medium">Facility</div>
          <div className="text-[13px] font-medium mt-0.5">{facility.name}</div>
          <div className="text-[11.5px] text-white/50">{facility.theatres} theatres · {facility.location}</div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="px-2 pb-2 text-[10.5px] uppercase tracking-[0.09em] text-white/40 font-medium">
            Negotiation copilot — {negotiation.fundShort}
          </div>
          <ol className="space-y-0.5">
            {steps.map((s, i) => {
              const Icon = stepIcon[s.key]
              const active = loc.pathname === s.to
              return (
                <li key={s.key}>
                  <NavLink
                    to={s.unlocked ? s.to : '#'}
                    onClick={(e) => { if (!s.unlocked) e.preventDefault() }}
                    className={[
                      'group flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors',
                      active ? 'bg-white/12' : s.unlocked ? 'hover:bg-white/6' : 'opacity-40 cursor-not-allowed',
                    ].join(' ')}
                  >
                    <span className={[
                      'relative grid place-items-center size-7 rounded-md border',
                      active ? 'border-white/25 bg-white/10' : 'border-white/12',
                    ].join(' ')}>
                      <Icon className="size-3.5" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[13px] font-medium leading-tight">{s.label}</span>
                      <span className="block text-[11px] text-white/45 leading-tight mt-px">{s.sub}</span>
                    </span>
                    {!s.unlocked ? (
                      <Lock className="size-3 text-white/35" />
                    ) : s.complete && i > 0 ? (
                      <Check className="size-3.5 text-sage-100/80" strokeWidth={2.5} />
                    ) : null}
                  </NavLink>
                </li>
              )
            })}
          </ol>

          <div className="px-2 pt-6 pb-2 text-[10.5px] uppercase tracking-[0.09em] text-white/40 font-medium">
            Contract oracle
          </div>
          <NavLink
            to="/oracle"
            className={({ isActive }) => [
              'group flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors',
              isActive ? 'bg-white/12' : 'hover:bg-white/6',
            ].join(' ')}
          >
            <span className="grid place-items-center size-7 rounded-md border border-white/12">
              <MessagesSquare className="size-3.5" strokeWidth={1.75} />
            </span>
            <span className="flex-1">
              <span className="block text-[13px] font-medium leading-tight">Ask the contract</span>
              <span className="block text-[11px] text-white/45 leading-tight mt-px">Cited answers, staff-facing</span>
            </span>
          </NavLink>
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-start gap-2 text-white/55">
            <FlaskConical className="size-3.5 mt-0.5 shrink-0" />
            <p className="text-[10.75px] leading-snug">
              Demonstration on <span className="text-white/80">synthetic data</span>. All outputs pre-authored;
              no live model calls.
            </p>
          </div>
        </div>
      </aside>

      {/* ---------- main ---------- */}
      <div className="flex-1 ml-[264px] flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <footer className="no-print border-t border-hairline bg-panel/70 px-8 py-3 flex items-center justify-between">
          <p className="text-[11px] text-faint">
            Demo — synthetic data only (Bayview Day Surgery and AusCare Health are fictional).
            Decision support, <strong className="font-medium text-muted">not legal or financial advice</strong>.
          </p>
          <p className="text-[11px] text-faint tabular">Counterpart Health · prototype 0.1</p>
        </footer>
      </div>
    </div>
  )
}
