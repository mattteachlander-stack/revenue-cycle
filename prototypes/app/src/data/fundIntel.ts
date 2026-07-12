/**
 * SYNTHETIC DATA — Negotiation Intelligence Engine fixtures (Wave 1–2).
 * In production these profiles are maintained from public sources (APRA, ABS,
 * AIHW, IHACPA, DoH, ACCC, annual reports, announcements) plus the customer's
 * OWN contract/negotiation history. Data policy (competition-law bright line):
 * public sources + the tenant's own history only — never other customers'
 * confidential terms. Every datum carries evidence.
 */

export interface Series { year: string; value: number }

export const ausCareIntel = {
  fund: 'AusCare Health',
  updated: '6 Jul 2026',
  financial: {
    premiumIncreases: [
      { year: '2022', value: 2.9 }, { year: '2023', value: 3.1 }, { year: '2024', value: 3.4 },
      { year: '2025', value: 3.7 }, { year: '2026', value: 3.85 },
    ] as Series[],
    cpiComparator: [
      { year: '2022', value: 6.1 }, { year: '2023', value: 5.4 }, { year: '2024', value: 3.6 },
      { year: '2025', value: 3.4 }, { year: '2026', value: 3.2 },
    ] as Series[],
    benefitRatioPct: 83.1,
    industryBenefitRatioPct: 85.0,
    netMarginPct: 5.6,
    managementExpensePct: 9.4,
    industryMExpensePct: 8.6,
    membershipGrowthPct: 1.8,
    capitalCoverage: 2.3,
    claimsInflationPct: 4.1,
    hospitalBenefitsPaid: '$1.02bn',
    policies: '~610,000 (≈4.7% share)',
  },
  commercial: {
    priorities: [
      'Portfolio affordability narrative into the 2027 premium round',
      'No-Gap expansion in ophthalmology and endoscopy (announced Mar 2026)',
      'Bundled-care pilots in orthopaedics (two public pilots, NSW/VIC)',
      'Digital claims straight-through processing target: 85% by FY28',
    ],
    positioning: 'Mid-tier challenger; markets on value-for-money and "no surprises" member experience.',
    publicCommitments: [
      '"Members will see us hold insurers\' share of every premium dollar flat" — CEO, FY25 results call (synthetic)',
      'Reconfirmed second-tier participation and provider-partnership language, Apr 2026 investor pack (synthetic)',
    ],
  },
  behaviour: {
    posture: 'Opens CPI-minus citing affordability; long response cycles; re-banding used as quiet rate management.',
    concessions: [
      'Historically settles at/near CPI when facing credible walk-away modelling (2 of 3 recent Bayview-comparable cycles — own-history inference)',
      'Has traded terms (recovery windows) to protect headline rate optics',
    ],
    commonRequests: ['Multi-year terms', 'Quality addenda without rates attached', 'Expanded data provisions', 'Digital compliance schedules'],
    riskAppetite: 'Avoids public disputes with high-quality facilities while sector contracting is politically visible.',
    relationship: [
      { when: 'Dec 2023', event: 'Current HPPA signed on fund standard terms (pre-platform).' },
      { when: 'Jul 2025', event: 'cl. 12.3 exercised — 1.9% indexation against 3.4% CPI.' },
      { when: 'Feb–May 2026', event: 'Two re-banding notices; four ophthalmic groups moved Band 2 → 1.' },
      { when: 'Jun 2026', event: 'Renewal invitation issued; proposals due 31 Aug 2026.' },
    ],
  },
  evidence: [
    'APRA quarterly PHI statistics (synthetic mirror)', 'Premium round approvals 2022–26 (synthetic)',
    'AusCare annual report FY25 (synthetic)', 'Own contract & remittance history (Bayview tenant data)',
  ],
}

// ------------------------------------------------- Negotiation Leverage Index
export interface LeverageFactor {
  name: string
  direction: 'up' | 'down'   // up = increases Bayview's leverage
  score: number               // 0–10 contribution strength
  weight: number              // relative weight, sums ~1
  evidence: string
}

export const leverageFactors: LeverageFactor[] = [
  { name: 'Fund benefit ratio below industry (83.1% vs ~85%)', direction: 'up', score: 7, weight: 0.11, evidence: 'APRA-shaped fund financials — headroom exists and is documentable.' },
  { name: 'Premium increases outpacing indexation paid (3.85% vs 1.9%)', direction: 'up', score: 8, weight: 0.12, evidence: 'Premium round approvals vs FY25 indexation notice.' },
  { name: 'Fund profitability & capital strength (5.6% margin, 2.3× PCA)', direction: 'up', score: 6, weight: 0.08, evidence: 'Fund financials — affordability narrative is contestable.' },
  { name: 'Quality record: top-quartile KPIs, 8 straight quarters', direction: 'up', score: 8, weight: 0.10, evidence: 'Schedule 3 reporting; already monetised by Federation.' },
  { name: 'Local capacity position: shortest ophthalmic/endoscopy waits in catchment', direction: 'up', score: 7, weight: 0.10, evidence: 'Synthetic catchment wait-time comparison.' },
  { name: 'Member-abrasion cost of second-tier for the fund (complaints over-indexed)', direction: 'up', score: 6, weight: 0.08, evidence: 'Ombudsman-shaped complaint share vs policy share.' },
  { name: 'Growth volumes to offer (ortho pipeline ~420 episodes/yr)', direction: 'up', score: 6, weight: 0.07, evidence: 'Theatre-4 utilisation headroom + surgeon recruitment.' },
  { name: 'Documented fund conduct to anchor on (carve-out + re-bandings)', direction: 'up', score: 8, weight: 0.09, evidence: 'Own contract history — the strongest card.' },
  { name: 'Revenue dependence on AusCare (22% of facility revenue)', direction: 'down', score: 7, weight: 0.11, evidence: 'Payer mix — walk-away costs most of EBITDA.' },
  { name: 'Weak BATNA: second-tier ≈ −15% on AusCare revenue', direction: 'down', score: 7, weight: 0.08, evidence: 'Second-tier modelling vs current schedule.' },
  { name: 'Local competition: two comparable day facilities within 12km', direction: 'down', score: 5, weight: 0.04, evidence: 'Synthetic catchment competitor scan.' },
  { name: 'Frozen holdover hands the fund the calendar (cl. 2.2)', direction: 'down', score: 6, weight: 0.02, evidence: 'Current contract term — mitigable by early opening (done 6 Jul).' },
]

export function leverageScore(): number {
  // weighted mean of signed contributions, scaled to 0–10
  let s = 0
  for (const f of leverageFactors) s += (f.direction === 'up' ? f.score : 10 - f.score) * f.weight
  return Math.round(s * 10) / 10
}

export const leverageReading = {
  posture: 'Assertive, evidence-led — the fund’s own conduct is the anchor.',
  summary:
    'Bayview holds more leverage than a 22%-dependent facility normally would: the fund’s financial headroom is documentable, the quality and capacity story is real, and the two exercised clauses (carve-out, re-banding) give the negotiation a factual spine the fund cannot dispute. Leverage is capped — not erased — by revenue dependence and the second-tier floor: do not bluff a walk-away; price it.',
  raises: ['Table the FY26 re-banding evidence pack early', 'Hold growth volumes as a prospective, dated offer', 'Fix the holdover clause first — it protects every other lever'],
  lowers: ['Threatening exit (the fund can model your BATNA too)', 'Letting talks drift past 30 Sep', 'Accepting rate-only offers that leave cl. 12.3 / 8.4 intact'],
}

// ---------------------------------------------------------- dependency (W1)
export interface Dependency {
  fund: string
  revenueSharePct: number      // of Bayview revenue
  fundLocalReliancePct: number // of the fund's catchment day-surgery admissions at Bayview
  alternatives: string
  uniqueness: string
}

export const dependencies: Dependency[] = [
  { fund: 'Federation Health', revenueSharePct: 24, fundLocalReliancePct: 22, alternatives: '2 comparable facilities, both >30-day ophthalmic waits', uniqueness: 'Shortest cataract pathway in catchment' },
  { fund: 'AusCare Health', revenueSharePct: 22, fundLocalReliancePct: 31, alternatives: '2 facilities; neither offers combined endoscopy lists', uniqueness: 'Only same-week gastro recall provider locally' },
  { fund: 'Wattle Group', revenueSharePct: 19, fundLocalReliancePct: 14, alternatives: '3 facilities incl. overnight private', uniqueness: 'Price-competitive plastics day cases' },
  { fund: 'AHSA-aligned funds', revenueSharePct: 17, fundLocalReliancePct: 18, alternatives: '2 facilities', uniqueness: 'Group agreement covers niche item groups' },
]

// ------------------------------------------------- hospital intelligence (W2)
export const hospitalIntel = {
  catchment: {
    name: 'Bayside–Kingston (synthetic)',
    population: '412,000',
    over65Pct: 19.4,
    growthPct: 1.6,
    phiCoveragePct: 58,
    notes: 'Ageing, high-PHI catchment; cataract and endoscopy demand growing ~4%/yr.',
  },
  competitors: [
    { name: 'Sandbelt Day Surgery (synthetic)', distance: '8 km', theatres: 3, overlap: 'Ophthalmology, plastics', position: 'Longer waits; no gastro' },
    { name: 'Kingston Private (synthetic)', distance: '12 km', theatres: '6 + overnight', overlap: 'Ortho, gastro', position: 'Higher-acuity focus; day-case rates above market' },
    { name: 'Peninsula Eye Centre (synthetic)', distance: '15 km', theatres: 2, overlap: 'Ophthalmology only', position: 'Single-specialty; no AusCare agreement' },
  ],
  capacity: { theatres: 4, utilisationPct: 78, theatre4Pct: 61, headroom: '~1,400 episodes/yr without capex' },
  strengths: ['Quality record (top-quartile, 8 quarters)', 'Shortest ophthalmic + endoscopy waits', 'Multi-specialty day-case mix', 'Growth headroom without capital'],
  weaknesses: ['Payer concentration (top 2 funds = 46%)', 'Thin margin (4.9% EBITDA)', 'No overnight capability (transfer dependency)', 'Single-site exposure'],
}
