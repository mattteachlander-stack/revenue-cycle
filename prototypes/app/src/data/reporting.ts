/**
 * SYNTHETIC DATA — Contract reporting module (Operational suite). Reporting
 * obligations extracted from the two executed synthetic HPPAs. In production
 * these are scoured from every uploaded agreement by the same clause engine
 * that powers Clause intelligence.
 */

export type ObligationStatus = 'submitted' | 'ready' | 'collecting' | 'due-soon' | 'under-negotiation'

export interface Obligation {
  id: string
  contract: 'AusCare HPPA' | 'Federation HPPA'
  clause: string
  name: string
  what: string
  frequency: string
  nextDue: string      // display date
  dueInDays: number    // from demo "today" (6 Jul 2026)
  source: string       // where the data comes from
  status: ObligationStatus
  note?: string
}

export const obligations: Obligation[] = [
  {
    id: 'RPT-1', contract: 'AusCare HPPA', clause: 'cl. 17.2',
    name: 'Quarterly quality-data pack',
    what: 'Unplanned returns to theatre, unplanned transfers, post-op infection indicators and patient-reported measures for AusCare members.',
    frequency: 'Quarterly · 14 days after quarter end',
    nextDue: '14 Jul 2026', dueInDays: 8,
    source: 'Quality system + PAS (auto-collected)',
    status: 'ready',
    note: 'Q4 FY26 pack assembled — 4 of 4 datasets matched; awaiting sign-off.',
  },
  {
    id: 'RPT-2', contract: 'AusCare HPPA', clause: 'cl. 14.1',
    name: 'Monthly claims reconciliation file',
    what: 'Lodged claims vs remittances by band, flagging unpaid, short-paid and adjusted items.',
    frequency: 'Monthly · 10 business days after month end',
    nextDue: '14 Jul 2026', dueInDays: 8,
    source: 'PMS billing extract (auto-collected)',
    status: 'collecting',
    note: 'June file 80% assembled — 3 remittances outstanding from the fund.',
  },
  {
    id: 'RPT-3', contract: 'AusCare HPPA', clause: 'Sch. 3, item 6',
    name: 'Annual prostheses utilisation report',
    what: 'IOL and consumable utilisation by item code against the Prescribed List, with variance commentary.',
    frequency: 'Annually · by 31 Aug',
    nextDue: '31 Aug 2026', dueInDays: 56,
    source: 'Theatre stock system + sticker-sheet scans',
    status: 'collecting',
    note: 'Sticker-sheet digitisation (Nov 25 learning action) makes this a two-day job, not two weeks.',
  },
  {
    id: 'RPT-4', contract: 'AusCare HPPA', clause: 'cl. 16.4',
    name: 'Certificate of currency — insurances',
    what: 'Professional indemnity and public liability certificates for the coming policy year.',
    frequency: 'Annually · by 1 Oct',
    nextDue: '1 Oct 2026', dueInDays: 87,
    source: 'Broker (manual upload)',
    status: 'due-soon',
    note: 'Broker renewal meeting booked 2 Sep.',
  },
  {
    id: 'RPT-5', contract: 'AusCare HPPA', clause: 'proposed Sch. 4',
    name: 'Digital compliance attestation',
    what: 'Quarterly attestation against the fund’s provider digital-security baseline — introduced mid-negotiation, quarantined to a separate priced workstream.',
    frequency: 'Quarterly (proposed)',
    nextDue: 'TBC', dueInDays: 999,
    source: 'IT provider report',
    status: 'under-negotiation',
    note: 'Do not build the collection pipeline until the workstream prices and settles the schedule.',
  },
  {
    id: 'RPT-6', contract: 'Federation HPPA', clause: 'cl. 16.1',
    name: 'Quarterly clinical indicators',
    what: 'Federation’s indicator set: unplanned readmission within 28 days, day-of-surgery cancellations, VTE prophylaxis compliance.',
    frequency: 'Quarterly · 21 days after quarter end',
    nextDue: '21 Jul 2026', dueInDays: 15,
    source: 'Quality system (auto-collected)',
    status: 'collecting',
    note: 'Two of three indicators mapped automatically; cancellation reasons need theatre-list annotation.',
  },
  {
    id: 'RPT-7', contract: 'Federation HPPA', clause: 'cl. 9.4',
    name: 'Prostheses invoices on request',
    what: 'Supplier invoices for any prosthesis claim the fund queries — 10 business days to produce.',
    frequency: 'Ad hoc · on fund request',
    nextDue: 'On request', dueInDays: 998,
    source: 'AP system + theatre records',
    status: 'ready',
    note: '2 open requests this quarter, both served same-day from the digitised sticker archive.',
  },
  {
    id: 'RPT-8', contract: 'Federation HPPA', clause: 'cl. 15.2',
    name: 'Annual accreditation evidence',
    what: 'NSQHS accreditation certificate and any conditions imposed, within 14 days of reissue.',
    frequency: 'Annually · on reissue (next cycle Nov 2026)',
    nextDue: '~Nov 2026', dueInDays: 140,
    source: 'Accreditation file (manual)',
    status: 'due-soon',
  },
  {
    id: 'RPT-9', contract: 'Federation HPPA', clause: 'cl. 16.3',
    name: 'Half-yearly case-mix summary',
    what: 'Episode volumes by band and service line for Federation members, reconciled to claims.',
    frequency: 'Half-yearly · 30 days after period end',
    nextDue: '30 Jul 2026', dueInDays: 24,
    source: 'PAS extract (auto-collected)',
    status: 'submitted',
    note: 'H1 submitted 28 Jun — acknowledgement received.',
  },
]

export const statusMeta: Record<ObligationStatus, { label: string; tone: 'sage' | 'amber' | 'ink' | 'clay' }> = {
  submitted: { label: 'Submitted', tone: 'sage' },
  ready: { label: 'Ready to submit', tone: 'sage' },
  collecting: { label: 'Collecting data', tone: 'amber' },
  'due-soon': { label: 'Scheduled', tone: 'ink' },
  'under-negotiation': { label: 'Under negotiation', tone: 'clay' },
}
