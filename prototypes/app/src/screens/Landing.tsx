import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Handshake, MessagesSquare, ClipboardCheck, Check,
  BarChart3, FileStack, Sparkles,
} from 'lucide-react'

interface Module {
  key: 'neg' | 'ora' | 'ri'
  name: string
  strap: string
  desc: string
  features: string[]
  price: string
  status: 'Licensed' | 'Licensed' | 'Active trial'
  to: string
  cta: string
  icon: typeof Handshake
}

const modules: Module[] = [
  {
    key: 'neg',
    name: 'Negotiation Agent',
    strap: 'Win the renewal',
    desc: 'A human-in-the-loop copilot for HPPA negotiations — positioning paper, strategy options, drafted correspondence, fund-response analysis, board pack.',
    features: [
      'Contract digested like opposing counsel',
      'Public-data benchmarking & priced walk-away',
      'Choose-your-own-adventure strategy',
      'Every letter drafted — nothing sent for you',
    ],
    price: 'From $18k/yr · per facility',
    status: 'Licensed',
    to: '/dashboard',
    cta: 'Open the AusCare renewal',
    icon: Handshake,
  },
  {
    key: 'ora',
    name: 'Contract Oracle',
    strap: 'Ask the contract',
    desc: 'Staff-facing Q&A grounded in every executed agreement, the PHI legal framework, and your internal decisions — with citations, confidence, and cross-contract comparison.',
    features: [
      'Clause-level citations on every answer',
      'Compare terms across your whole portfolio',
      '“The contract is silent — escalate” honesty',
      'Front desk to theatre, one source of truth',
    ],
    price: '+ $6k/yr · add-on or standalone',
    status: 'Licensed',
    to: '/oracle',
    cta: 'Ask the contract',
    icon: MessagesSquare,
  },
  {
    key: 'ri',
    name: 'Revenue Integrity',
    strap: 'Defend every dollar',
    desc: 'An audit-response and revenue-assurance platform: import fund audit files, enrich from your PAS, manage responses with a full record, export back to the fund, and learn from every outcome.',
    features: [
      'Fund audit spreadsheets in, Excel responses out',
      'PAS enrichment on every audited episode',
      'Comments, documents & audit trail per item',
      'Outcome dashboards by fund, category & time',
    ],
    price: '+ $9k/yr · add-on',
    status: 'Active trial',
    to: '/integrity',
    cta: 'Open audit dashboard',
    icon: ClipboardCheck,
  },
]

const coming = [
  { icon: BarChart3, name: 'Benchmarking & Analytics', desc: 'Rate and case-mix benchmarks from public aggregates — competition-law-safe by design.' },
  { icon: FileStack, name: 'Contract Lifecycle', desc: 'Renewal calendar, obligation tracker, and variation register across every agreement.' },
]

const tone = {
  neg: { c700: 'var(--color-neg-700)', c600: 'var(--color-neg-600)', c100: 'var(--color-neg-100)', c50: 'var(--color-neg-50)' },
  ora: { c700: 'var(--color-ora-700)', c600: 'var(--color-ora-600)', c100: 'var(--color-ora-100)', c50: 'var(--color-ora-50)' },
  ri: { c700: 'var(--color-ri-700)', c600: 'var(--color-ri-600)', c100: 'var(--color-ri-100)', c50: 'var(--color-ri-50)' },
}

export default function Landing() {
  const nav = useNavigate()
  return (
    <div className="min-h-full">
      {/* hero */}
      <div className="px-10 pt-10 pb-8 border-b border-hairline bg-panel/60">
        <div className="max-w-[1180px]">
          <div className="label-caps">Counterpart Health · Bayview Day Surgery</div>
          <h1 className="font-serif text-[34px] font-bold tracking-tight text-ink-950 mt-2 leading-tight">
            One platform. Three modules.<br />Buy only what your facility needs.
          </h1>
          <p className="text-[14.5px] text-muted mt-3 max-w-[74ch] leading-relaxed">
            Counterpart is modular: start with the negotiation that's in front of you, add the contract
            oracle your staff will use every day, and switch on revenue integrity when the audit letters
            arrive. Each module stands alone; together they cover the revenue cycle.
          </p>
        </div>
      </div>

      {/* modules */}
      <div className="px-10 py-8 max-w-[1240px]">
        <div className="grid grid-cols-3 gap-5">
          {modules.map((m) => {
            const t = tone[m.key]
            const Icon = m.icon
            return (
              <div key={m.key} className="card flex flex-col overflow-hidden"
                   style={{ borderTop: `4px solid ${t.c600}` }}>
                <div className="p-6 pb-5 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="size-11 rounded-xl grid place-items-center" style={{ background: t.c100 }}>
                      <Icon className="size-5" style={{ color: t.c700 }} strokeWidth={1.75} />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-bold tracking-wide uppercase"
                          style={{ background: m.status === 'Active trial' ? 'var(--color-amber-100)' : t.c100,
                                   color: m.status === 'Active trial' ? 'var(--color-amber-700)' : t.c700 }}>
                      {m.status}
                    </span>
                  </div>
                  <div className="mt-4 text-[11px] font-bold tracking-[0.09em] uppercase" style={{ color: t.c600 }}>{m.strap}</div>
                  <h2 className="text-[19px] font-semibold tracking-tight text-ink-950 mt-0.5">{m.name}</h2>
                  <p className="text-[12.75px] text-muted leading-relaxed mt-2">{m.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[12.5px] text-ink-950 leading-snug">
                        <Check className="size-3.5 mt-0.5 shrink-0" style={{ color: t.c600 }} strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 py-4 border-t border-hairline flex items-center justify-between" style={{ background: t.c50 }}>
                  <span className="text-[11.5px] font-semibold" style={{ color: t.c700 }}>{m.price}</span>
                  <button
                    onClick={() => nav(m.to)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.5px] font-semibold text-white transition hover:opacity-90"
                    style={{ background: t.c700 }}
                  >
                    {m.cta} <ArrowRight className="size-3.5" strokeWidth={2.25} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* coming soon + pricing note */}
        <div className="grid grid-cols-3 gap-5 mt-5">
          {coming.map((c) => {
            const Icon = c.icon
            return (
              <div key={c.name} className="rounded-xl border border-dashed border-hairline-strong px-6 py-5 flex items-start gap-4 opacity-80">
                <div className="size-10 rounded-xl bg-ink-50 grid place-items-center shrink-0">
                  <Icon className="size-4.5 text-faint" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-[10.5px] font-bold tracking-[0.09em] uppercase text-faint">On the roadmap</div>
                  <div className="text-[14.5px] font-semibold text-ink-950 mt-0.5">{c.name}</div>
                  <p className="text-[12px] text-muted leading-snug mt-1">{c.desc}</p>
                </div>
              </div>
            )
          })}
          <div className="rounded-xl px-6 py-5 bg-ink-950 text-white flex items-start gap-4">
            <div className="size-10 rounded-xl bg-white/10 grid place-items-center shrink-0">
              <Sparkles className="size-4.5 text-white/80" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-[10.5px] font-bold tracking-[0.09em] uppercase text-white/50">Modular pricing</div>
              <p className="text-[12.5px] text-white/85 leading-relaxed mt-1">
                Licences are per facility, tiered by theatre count. Add or drop modules at renewal —
                no bundle lock-in. Indicative pricing shown; validated with pilot sites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
