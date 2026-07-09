/**
 * SYNTHETIC DATA — Contracting suite · Historical module.
 * Tracks negotiation outcomes over time and the realisation of negotiated
 * value through each contract period. All fictional.
 */

export interface NegotiationEvent {
  agreement: string
  cycle: string
  concluded: string
  approach: string
  headline: string
  outcomePct: string
  outcomeTone: 'good' | 'ok' | 'poor' | 'live'
  note: string
}

export const negotiationHistory: NegotiationEvent[] = [
  {
    agreement: 'AusCare Health',
    cycle: 'FY27 renewal',
    concluded: 'In progress',
    approach: 'Assertive re-band (copilot-prepared)',
    headline: 'Live — proposals due 31 Aug 2026',
    outcomePct: '—',
    outcomeTone: 'live',
    note: 'Target package ≈ +$205–240k/yr. Positioning paper tabled; opening letter sent 6 Jul.',
  },
  {
    agreement: 'AHSA-aligned funds',
    cycle: 'FY26 group renewal',
    concluded: 'Feb 2026',
    approach: 'Group agreement — limited negotiation',
    headline: '+2.9% blended uplift',
    outcomePct: '+2.9%',
    outcomeTone: 'ok',
    note: 'CPI-minus settlement; plastics re-band request lapsed unanswered — logged for FY27.',
  },
  {
    agreement: 'Federation Health',
    cycle: 'FY25 renewal',
    concluded: 'Jun 2025',
    approach: 'Collaborative uplift',
    headline: '+3.4% blended + quality loading + terms reset',
    outcomePct: '+3.4%',
    outcomeTone: 'good',
    note: 'Secured full-CPI indexation, symmetric 60-day exit, mutual-consent banding, 0.5% quality loading.',
  },
  {
    agreement: 'Wattle Group',
    cycle: 'FY25 mid-term review',
    concluded: 'Nov 2024',
    approach: 'Rate schedule pass-through',
    headline: 'CPI applied in full',
    outcomePct: '+3.6%',
    outcomeTone: 'ok',
    note: 'No terms movement; termination and audit clauses unchanged — review at FY27 expiry.',
  },
  {
    agreement: 'AusCare Health',
    cycle: '2023 agreement',
    concluded: 'Dec 2023',
    approach: 'Accepted "standard terms" (pre-platform)',
    headline: 'Baseline of the current problem',
    outcomePct: '−5.6% vs mkt',
    outcomeTone: 'poor',
    note: 'Signed without benchmarking: indexation carve-out, unilateral re-banding, frozen holdover. The FY27 renewal exists to fix this.',
  },
]

/** Indexation realised in FY26 vs CPI (3.4%) — the "did the contract deliver" view. */
export const indexationRealised = [
  { fund: 'Federation Health', contracted: 'Full CPI + quality loading', realisedPct: 3.9, cpiPct: 3.4, tone: 'good' as const },
  { fund: 'Wattle Group', contracted: 'CPI', realisedPct: 3.4, cpiPct: 3.4, tone: 'ok' as const },
  { fund: 'AHSA-aligned funds', contracted: 'Negotiated 2.9%', realisedPct: 2.9, cpiPct: 3.4, tone: 'ok' as const },
  { fund: 'AusCare Health', contracted: 'CPI capped 4% + carve-out', realisedPct: 1.9, cpiPct: 3.4, tone: 'poor' as const },
]

export interface RealisationLine {
  item: string
  negotiated: number // $/yr
  realised: number   // $/yr to date (annualised)
  status: 'on track' | 'captured' | 'behind' | 'at risk'
  note: string
}

/** Federation FY25 deal — value realisation through the contract period. */
export const federationRealisation: RealisationLine[] = [
  { item: 'Blended rate uplift (+3.4%)', negotiated: 118_000, realised: 118_000, status: 'captured', note: 'Applied to schedule from 1 Jul 2025 — verified against remittances.' },
  { item: 'Full-CPI indexation (1 Jul 2026)', negotiated: 41_000, realised: 41_000, status: 'captured', note: '3.4% applied on time; no dispute.' },
  { item: 'Quality loading (+0.5%)', negotiated: 17_000, realised: 17_000, status: 'captured', note: 'Top-quartile KPIs sustained 4 quarters — loading confirmed May 2026.' },
  { item: 'Ortho growth volumes to Federation', negotiated: 62_000, realised: 24_000, status: 'behind', note: 'New surgeon list ramped slower than plan; 39% of modelled volume to date.' },
  { item: 'Terms value (set-off cap, indexed holdover)', negotiated: 18_000, realised: 0, status: 'on track', note: 'Risk-avoidance value — no trigger events this period (that is the point).' },
]

export interface Opportunity {
  id: string
  agreement: string
  opportunity: string
  valuePerYear: number
  status: 'captured' | 'in negotiation' | 'lapsed' | 'identified'
  when: string
}

export const opportunityRegister: Opportunity[] = [
  { id: 'OP-01', agreement: 'AusCare', opportunity: 'Cataract Band 2 gap to market (−7.2%)', valuePerYear: 88_000, status: 'in negotiation', when: 'FY27 renewal — anchor tabled' },
  { id: 'OP-02', agreement: 'AusCare', opportunity: 'Restore 4 re-banded ophthalmic groups', valuePerYear: 108_000, status: 'in negotiation', when: 'FY27 renewal — evidence pack attached' },
  { id: 'OP-03', agreement: 'AusCare', opportunity: 'Delete indexation carve-out (cl. 12.3)', valuePerYear: 45_000, status: 'in negotiation', when: 'FY27 renewal — condition of term' },
  { id: 'OP-04', agreement: 'Federation', opportunity: 'Quality loading eligibility (0.5%)', valuePerYear: 17_000, status: 'captured', when: 'Confirmed May 2026' },
  { id: 'OP-05', agreement: 'Federation', opportunity: 'Ortho band recalibration on new item groups', valuePerYear: 24_000, status: 'captured', when: 'Applied Apr 2026' },
  { id: 'OP-06', agreement: 'AHSA', opportunity: 'Plastics re-band request', valuePerYear: 19_000, status: 'lapsed', when: 'FY26 round closed — resubmit FY27 with data pack' },
  { id: 'OP-07', agreement: 'Wattle', opportunity: 'Prostheses handling aligned to Federation model', valuePerYear: 31_000, status: 'identified', when: 'FY27 expiry — on the prep list' },
]
