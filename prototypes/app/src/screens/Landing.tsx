import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Handshake, History, MessagesSquare, ClipboardCheck, Radar,
  Braces, Bot, Layers, Sparkles, Scale, ListChecks, GitCompareArrows,
  Columns3, FileQuestion, Landmark, type LucideIcon,
} from 'lucide-react'
import { CoreMark } from '../components/Logo'

interface Module {
  name: string
  desc: string
  icon: LucideIcon
  to?: string          // live module
  badge?: string       // e.g. "Live in demo"
}

interface Suite {
  letter: string
  key: 'neg' | 'ops' | 'ri' | 'ora'
  name: string
  strap: string
  desc: string
  modules: Module[]
}

const suites: Suite[] = [
  {
    letter: 'C',
    key: 'neg',
    name: 'Contracting',
    strap: 'Win and keep winning',
    desc: 'Everything that touches the agreement itself — the live negotiation, and whether the value you negotiated actually lands.',
    modules: [
      { name: 'Negotiation', desc: 'Run current and live HPPA negotiations round by round with the human-in-the-loop copilot, with board packs generated at any stage.', icon: Handshake, to: '/dashboard', badge: 'Live in demo' },
      { name: 'Board packs', desc: 'Interim packs for every board meeting during a negotiation, and the final close-out pack when it settles.', icon: Landmark, to: '/boardpack', badge: 'Live in demo' },
      { name: 'Fund intelligence', desc: 'Fund profiles, mutual dependency, and the decomposed Negotiation Leverage Index.', icon: Scale, to: '/fund-intel', badge: 'Live in demo' },
      { name: 'Clause intelligence', desc: 'Every clause classified, unfair terms flagged and valued; levers, packages, commercial dashboard.', icon: ListChecks, to: '/clauses', badge: 'Live in demo' },
      { name: 'Change intelligence', desc: 'Version compare, change register, hospital-proposed clauses and scenario modelling.', icon: GitCompareArrows, to: '/changes', badge: 'Live in demo' },
      { name: 'Historical', desc: 'Negotiation performance over time and value realisation through each contract period.', icon: History, to: '/performance', badge: 'Live in demo' },
    ],
  },
  {
    letter: 'O',
    key: 'ops',
    name: 'Operational',
    strap: 'Run the revenue day-to-day',
    desc: 'The modules that sit inside daily operations — coding, classification, and billing automation as they are developed.',
    modules: [
      { name: 'Provisional DRG allocation', desc: 'Suggested DRG at booking and discharge, before coding.', icon: Layers, to: '/operational', badge: 'Preview' },
      { name: 'AI coding assistant', desc: 'Draft clinical coding with confidence scores for coder review.', icon: Braces, to: '/operational', badge: 'Preview' },
      { name: 'Billing bots', desc: 'Automated claim assembly, checks and lodgement workflows.', icon: Bot, to: '/operational', badge: 'Preview' },
    ],
  },
  {
    letter: 'R',
    key: 'ri',
    name: 'Revenue Integrity',
    strap: 'Defend every dollar',
    desc: 'Audit management in both directions — respond to the funds’ audits with a full record, and proactively find your own leakage first.',
    modules: [
      { name: 'Fund audit response', desc: 'Import fund audit files, enrich from the PAS, manage responses, export back to the fund, and track outcomes on dashboards.', icon: ClipboardCheck, to: '/integrity', badge: 'Live in demo' },
      { name: 'Proactive optimisation', desc: 'Claims-vs-contract reconciliation that surfaces underpayments and systematic leakage before anyone audits you.', icon: Radar },
      { name: 'Clinical documentation improvement', desc: 'Documentation queries at discharge so the record supports the care delivered — audit findings teach it what to catch.', icon: FileQuestion, to: '/integrity/cdi', badge: 'Roadmap' },
    ],
  },
  {
    letter: 'E',
    key: 'ora',
    name: 'Enquiry',
    strap: 'Ask anything, get citations',
    desc: 'The question-answering layer over everything the platform holds — contracts today, and every other document set you load tomorrow.',
    modules: [
      { name: 'Ask the contract', desc: 'Staff-facing Q&A over a single agreement with citations, confidence, and escalation when the contract is silent.', icon: MessagesSquare, to: '/oracle', badge: 'Live in demo' },
      { name: 'Compare contracts', desc: 'One question, every contract’s answer side by side — termination, payment terms, indexation across the portfolio.', icon: Columns3, to: '/compare', badge: 'Live in demo' },
    ],
  },
]

const tone = {
  neg: { c700: 'var(--color-neg-700)', c600: 'var(--color-neg-600)', c100: 'var(--color-neg-100)', c50: 'var(--color-neg-50)' },
  ops: { c700: 'var(--color-ops-700)', c600: 'var(--color-ops-600)', c100: 'var(--color-ops-100)', c50: 'var(--color-ops-50)' },
  ri: { c700: 'var(--color-ri-700)', c600: 'var(--color-ri-600)', c100: 'var(--color-ri-100)', c50: 'var(--color-ri-50)' },
  ora: { c700: 'var(--color-ora-700)', c600: 'var(--color-ora-600)', c100: 'var(--color-ora-100)', c50: 'var(--color-ora-50)' },
}

export default function Landing() {
  const nav = useNavigate()
  return (
    <div className="min-h-full">
      {/* hero — brand navy */}
      <div className="px-10 pt-9 pb-9 relative overflow-hidden" style={{ background: 'var(--color-navy-950)' }}>
        <div className="absolute -right-24 -top-40 size-[520px] rounded-full opacity-[0.13] blur-3xl brand-gradient" />
        <div className="max-w-[1240px] relative">
          <div className="label-caps" style={{ color: '#5f7397' }}>Commercial intelligence for healthcare · licensed to Bayview Day Surgery</div>
          <div className="mt-4 flex items-center gap-5">
            <CoreMark size={64} />
            <div>
              <h1 className="font-display font-extrabold tracking-tight text-[33px] leading-[1.12] text-white">
                The full revenue cycle.<br />
                <span className="brand-gradient-text">Or just the piece you need.</span>
              </h1>
            </div>
          </div>
          <p className="text-[14px] mt-5 max-w-[82ch] leading-relaxed" style={{ color: '#a9b6cf' }}>
            CORE is four suites — <Strong k="neg">Contracting</Strong>, <Strong k="ops">Operational</Strong>,{' '}
            <Strong k="ri">Revenue&nbsp;Integrity</Strong> and <Strong k="ora">Enquiry</Strong> — with focused modules
            underneath each. Licence the lot for an end-to-end treatment of the revenue cycle, or pick the modules
            strategic for your facility.
          </p>
          <p className="font-display font-bold text-[13px] tracking-[0.06em] mt-4 text-white/90">
            Every <span style={{ color: '#2ee6c9' }}>Contract</span>. Every <span style={{ color: '#22b8f0' }}>Dollar</span>. Every <span style={{ color: '#7c9dff' }}>Decision</span>.
          </p>
        </div>
      </div>

      {/* suites */}
      <div className="px-10 py-8 max-w-[1300px]">
        <div className="grid grid-cols-4 gap-4 items-start">
          {suites.map((s) => {
            const t = tone[s.key]
            return (
              <div key={s.letter} className="card overflow-hidden flex flex-col"
                   style={{ borderTop: `4px solid ${t.c600}` }}>
                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="grid place-items-center size-10 rounded-lg font-display text-[19px] font-extrabold text-white"
                          style={{ background: t.c700 }}>
                      {s.letter}
                    </span>
                    <div>
                      <div className="text-[10.5px] font-bold tracking-[0.09em] uppercase" style={{ color: t.c600 }}>{s.strap}</div>
                      <h2 className="text-[17px] font-semibold tracking-tight text-ink-950 leading-tight">{s.name} suite</h2>
                    </div>
                  </div>
                  <p className="text-[12px] text-muted leading-relaxed mt-2.5">{s.desc}</p>
                </div>

                <div className="px-3.5 pb-4 space-y-2 flex-1">
                  {s.modules.map((m) => {
                    const Icon = m.icon
                    const live = !!m.to
                    return (
                      <button
                        key={m.name}
                        onClick={() => m.to && nav(m.to)}
                        disabled={!live}
                        className={[
                          'w-full text-left rounded-xl border px-3.5 py-3 transition',
                          live ? 'bg-panel hover:shadow-raised cursor-pointer' : 'border-dashed opacity-75 cursor-default',
                        ].join(' ')}
                        style={{ borderColor: live ? t.c100 : 'var(--color-hairline-strong)', background: live ? t.c50 : undefined }}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="size-4 shrink-0" style={{ color: t.c700 }} strokeWidth={1.75} />
                          <span className="text-[13px] font-semibold text-ink-950">{m.name}</span>
                          <span className={'ml-auto shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide ' +
                                           (live ? 'text-white' : 'bg-ink-50 text-faint')}
                                style={live ? { background: t.c700 } : undefined}>
                            {m.badge ?? 'Roadmap'}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-muted leading-snug mt-1.5">{m.desc}</p>
                        {live && (
                          <span className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold" style={{ color: t.c700 }}>
                            Open <ArrowRight className="size-3" strokeWidth={2.5} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* pricing strip */}
        <div className="mt-5 rounded-xl px-6 py-5 bg-ink-950 text-white flex items-start gap-4">
          <div className="size-10 rounded-xl bg-white/10 grid place-items-center shrink-0">
            <Sparkles className="size-4.5 text-white/80" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <div className="text-[10.5px] font-bold tracking-[0.09em] uppercase text-white/50">Modular by design</div>
            <p className="text-[12.75px] text-white/85 leading-relaxed mt-1 max-w-[110ch]">
              Suites and modules are licensed per facility, tiered by theatre count — comprehensive for a group that wants the
              full treatment, bespoke for a smaller organisation that only wants the pieces strategic to its business. Add or
              drop modules at renewal; no bundle lock-in. Indicative pricing: Contracting from $18k/yr · Enquiry +$6k ·
              Revenue Integrity +$9k · Operational modules priced as released.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Strong({ k, children }: { k: keyof typeof tone; children: React.ReactNode }) {
  return <strong className="font-semibold" style={{ color: tone[k].c700 }}>{children}</strong>
}
