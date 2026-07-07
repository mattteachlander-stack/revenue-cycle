import type { PostureId } from '../state'

/**
 * CANNED DEMO CONTENT — authored at build time (see content/positioning.ts note).
 */
export interface Posture {
  id: PostureId
  name: string
  tagline: string
  recommended?: boolean
  summary: string
  asks: string[]
  gives: string[]
  risk: { level: 'Lower' | 'Moderate' | 'Higher'; note: string }
  fundResponse: string
  bestWhen: string
}

export const postures: Posture[] = [
  {
    id: 'collaborative',
    name: 'Collaborative uplift',
    tagline: 'Partnership frame, CPI-anchored, terms tidied',
    summary:
      'Open as a valued long-term partner seeking a fair reset: across-the-board uplift near the top of the defensible range, restoration of full CPI indexation, and “modernisation” of the harshest terms — presented as housekeeping, not grievance.',
    asks: [
      'Blended +4.5% rate uplift across Bands 1–3',
      'Indexation: CPI floor, carve-out (cl. 12.3) removed',
      'Holdover indexed at CPI (fix cl. 2.2)',
      'Set-off window cut to 12 months, disputed claims excluded',
    ],
    gives: [
      '3-year term with early-renewal option',
      'Quarterly quality-data pack in the fund’s preferred format',
    ],
    risk: {
      level: 'Lower',
      note: 'Low escalation risk, but under-prices the cataract gap — likely leaves $80–110k/yr of identified value unclaimed. Re-banding right probably survives.',
    },
    fundResponse:
      'Most likely: warm acknowledgement, counter at CPI-flat with token band corrections, silence on cl. 12.3. Settles in 2 rounds near +3% with partial terms relief.',
    bestWhen: 'Relationship capital matters more than this cycle’s dollars — e.g. you need the fund’s cooperation on an imminent service expansion.',
  },
  {
    id: 'assertive',
    name: 'Assertive re-band',
    tagline: 'Evidence-led challenge to the ophthalmic mechanics',
    recommended: true,
    summary:
      'Put the fund’s own conduct at the centre: the FY26 re-bandings and the IOL bundle have produced a cataract line ~7% under market at the area’s highest-volume, best-quality provider. Demand restoration and re-pricing of the ophthalmic schedule, with the indexation carve-out deleted as a condition of any multi-year term.',
    asks: [
      'Cataract Band 2 +7%; FY26 re-banded item groups restored to Band 2',
      'cl. 8.4 amended: re-banding only by mutual consent or independent expert',
      'Indexation: CPI floor, cl. 12.3 deleted — non-negotiable for a 3-year term',
      'Colonoscopy +4%, arthroscopy +5.5%',
      'IOL bundle (cl. 10.2): annual lens-cost review mechanism',
    ],
    gives: [
      '3-year term',
      'Prospective commitment of ortho growth volumes (~420 episodes/yr)',
      'Earlier claims lodgement (internal 7-day standard made contractual at 14 days)',
    ],
    risk: {
      level: 'Moderate',
      note: 'Fund may slow-walk to exploit the frozen holdover; mitigated by opening early and hanging the growth-volume offer on a September signature. Small risk of a hard “standard terms” stance requiring a second escalation letter.',
    },
    fundResponse:
      'Most likely: defends re-banding as “classification alignment”, counters cataract at +3–4%, offers CPI with a “modified” carve-out. The counter-draft trap to watch: carve-out reworded, not removed. Settles in 2–3 rounds near cataract +5–6% with consent-based re-banding.',
    bestWhen: 'The evidence strongly favours you and you can invest 6–10 weeks of disciplined correspondence — your situation, on this paper’s analysis.',
  },
  {
    id: 'restructure',
    name: 'Restructure to case-mix payments',
    tagline: 'Change the game: reprice the schedule around episode economics',
    summary:
      'Propose replacing the four-band schedule with a case-mix–calibrated payment model (complexity-weighted case payments with an annual recalibration mechanism), using your cost-per-episode data as the foundation. Ambitious: converts an adversarial rate haggle into a joint pricing design — and makes unilateral re-banding structurally impossible.',
    asks: [
      'Complexity-weighted case payments calibrated to audited cost-per-episode',
      'Joint annual recalibration replacing both indexation and re-banding clauses',
      'Transition floor: no line paid below current rate +2% in year 1',
    ],
    gives: [
      '5-year term (the fund’s prize: long certainty)',
      'Full cost-transparency pack under confidentiality',
      'All growth volumes contracted',
    ],
    risk: {
      level: 'Higher',
      note: 'Longest path and highest analytical burden; the fund’s systems may genuinely not support it, converting the negotiation into a pilot. Sharing cost data changes your information position permanently.',
    },
    fundResponse:
      'Most likely: genuine interest at analyst level, hesitancy at decision level; counter-offer of a “pilot” confined to ophthalmology with the old schedule elsewhere. Timeline extends past expiry — the holdover fix becomes critical before anything else is agreed.',
    bestWhen: 'You have 6+ months of runway, robust costing data, and appetite to be the fund’s reference site for a new payment model.',
  },
]

export const postureById = (id: PostureId) => postures.find((p) => p.id === id)!
