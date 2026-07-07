/**
 * SYNTHETIC DATA — mirrors prototypes/shared-data/bayview-financials.json.
 * Fictional facility and fund; no real hospital, insurer, contract, or person.
 */
export const facility = {
  name: 'Bayview Day Surgery',
  legal: 'Bayview Day Surgery Pty Ltd',
  type: 'Day procedure centre',
  location: 'Cheltenham VIC',
  theatres: 4,
  procedureRooms: 2,
  fte: 41,
  year: 'FY2025–26',
  revenue: 14_190_000,
  ebitda: 690_000,
  ebitdaMarginPct: 4.9,
  episodes: 7_820,
  marginTrend: [
    { year: 'FY24', pct: 7.8 },
    { year: 'FY25', pct: 6.1 },
    { year: 'FY26', pct: 4.9 },
  ],
  serviceLines: [
    { name: 'Gastroenterology', episodes: 3410, revenue: 4_470_000 },
    { name: 'Ophthalmology', episodes: 2880, revenue: 6_110_000 },
    { name: 'Orthopaedics (day)', episodes: 890, revenue: 2_210_000 },
    { name: 'Plastics & derm', episodes: 640, revenue: 1_400_000 },
  ],
  payerMix: [
    { payer: 'Federation Health', pct: 24, focus: false },
    { payer: 'AusCare Health', pct: 22, focus: true },
    { payer: 'Wattle Group', pct: 19, focus: false },
    { payer: 'AHSA-aligned funds', pct: 17, focus: false },
    { payer: 'DVA / TAC / WorkSafe', pct: 8, focus: false },
    { payer: 'Self-funded / other', pct: 10, focus: false },
  ],
}

export const negotiation = {
  fund: 'AusCare Health',
  fundShort: 'AusCare',
  revenueAtStake: 3_120_000,
  episodes: 1_690,
  contractSigned: '1 Dec 2023',
  contractExpires: '30 Nov 2026',
  proposalsDue: '31 Aug 2026',
  today: '6 Jul 2026', // fixed demo date
  daysToProposals: 56,
  daysToExpiry: 147,
  secondTier: { revenue: 2_650_000, delta: -470_000, deltaPct: -15.1 },
  ratePosition: [
    { line: 'Cataract & IOL (Band 2)', vsMarketPct: -7.2, share: 'high' },
    { line: 'Colonoscopy (Band 1)', vsMarketPct: -3.8, share: 'high' },
    { line: 'Knee arthroscopy (Band 3)', vsMarketPct: -5.5, share: 'growing' },
    { line: 'Plastics (Bands 2–4)', vsMarketPct: 0.0, share: 'modest' },
  ],
  flaggedClauses: [
    {
      ref: 'cl. 12.3',
      name: 'Discretionary indexation carve-out',
      severity: 'high' as const,
      note: 'Fund may pay below-CPI indexation "in its discretion". Exercised FY25: 1.9% paid vs 3.4% CPI.',
    },
    {
      ref: 'cl. 8.4',
      name: 'Unilateral re-banding',
      severity: 'high' as const,
      note: 'Fund may move procedures between bands on 30 days’ notice, no consent. 4 ophthalmic groups moved Band 2 → 1 in FY26.',
    },
    {
      ref: 'cl. 14.5 / 14.2',
      name: 'Set-off & recovery vs 30-day lodgement',
      severity: 'medium' as const,
      note: 'Fund can claw back "overpayments" for 24 months by set-off; hospital gets only 30 days to lodge a claim.',
    },
    {
      ref: 'cl. 19.1',
      name: 'Asymmetric termination',
      severity: 'medium' as const,
      note: 'Fund exits on 90 days’ notice; hospital must give 180.',
    },
    {
      ref: 'cl. 2.2',
      name: 'Frozen holdover',
      severity: 'medium' as const,
      note: 'If renewal talks run past expiry, rates continue with no indexation — delay costs the hospital, not the fund.',
    },
  ],
}

export const fmtM = (n: number) => `$${(n / 1_000_000).toFixed(2)}m`
export const fmtK = (n: number) => `$${Math.round(n / 1000)}k`
