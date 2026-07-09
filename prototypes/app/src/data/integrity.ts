/**
 * SYNTHETIC DATA — Revenue Integrity module. Mirrors the mock fund audit
 * files in prototypes/shared-data/audits/. No real patient, claim, fund or
 * hospital data. PAS details are canned to demonstrate the enrichment step.
 */

export type Fund = 'AusCare Health' | 'Federation Health'
export type Category =
  | 'Coding / item mismatch'
  | 'Unbundling'
  | 'Prostheses'
  | 'Same-day classification'
  | 'Documentation'
  | 'Eligibility / OEC'
  | 'Duplicate claim'
  | 'Rate application'

export type Outcome = 'overturned' | 'upheld' | 'partial'
export type Decision = 'dispute' | 'accept' | 'partial'

export const CATEGORIES: Category[] = [
  'Coding / item mismatch', 'Unbundling', 'Prostheses', 'Same-day classification',
  'Documentation', 'Eligibility / OEC', 'Duplicate claim', 'Rate application',
]

export interface PasRecord {
  patient: string // initials only
  urn: string
  surgeon: string
  anaesthetist: string
  theatre: string
  admitted: string
  discharged: string
  losMins: number
  note: string
}

export interface Comment { author: string; when: string; text: string }

export interface AuditItem {
  id: string
  batchId: string
  claimId: string
  memberNo: string
  admissionDate: string
  items: string
  band: string
  paidAmount: number
  atRisk: number
  category: Category
  assertion: string
  requestedAction: string
  pas: PasRecord
  suggested: { decision: Decision; note: string }
  comments: Comment[]
  documents: string[]
}

export interface AuditBatch {
  id: string
  fund: Fund
  name: string
  fileName: string
  received: string
  due: string
  daysLeft: number
  status: 'awaiting import' | 'in review' | 'responded'
}

// ---------------------------------------------------------------- batches
export const federationBatch: AuditBatch = {
  id: 'fed-pr-2026',
  fund: 'Federation Health',
  name: 'Prostheses audit — H2 FY26',
  fileName: 'Federation_Prostheses_Audit_FY26.csv',
  received: '24 Jun 2026',
  due: '21 Aug 2026',
  daysLeft: 46,
  status: 'in review',
}

export const auscareBatch: AuditBatch = {
  id: 'ac-q4-2026',
  fund: 'AusCare Health',
  name: 'Claims audit — Q4 FY26',
  fileName: 'AusCare_Audit_Q4_FY26.csv',
  received: '3 Jul 2026',
  due: '7 Aug 2026',
  daysLeft: 32,
  status: 'awaiting import',
}

// ---------------------------------------------------------------- open items
const pas = (patient: string, urn: string, surgeon: string, theatre: string,
             admitted: string, discharged: string, losMins: number, note: string): PasRecord => ({
  patient, urn, surgeon, anaesthetist: 'Dr T. Okonkwo', theatre, admitted, discharged, losMins, note,
})

export const auscareItems: AuditItem[] = [
  {
    id: 'AC-01', batchId: 'ac-q4-2026', claimId: 'BV-88231', memberNo: 'XXXX2214',
    admissionDate: '4 Mar 2026', items: '42702 + 42719', band: 'Band 2', paidAmount: 1782, atRisk: 312,
    category: 'Coding / item mismatch',
    assertion: 'Item 42719 billed with 42702; fund considers 42719 not separately payable for this episode.',
    requestedAction: 'Repay $312 or provide operative report supporting separate service.',
    pas: pas('M.T.', 'URN-40311', 'Dr H. Vieira', 'Theatre 2', '07:12', '11:40', 268,
      'Operative report documents discrete second procedure (anterior vitrectomy) — supports separate item.'),
    suggested: { decision: 'dispute', note: 'Operative report supports 42719 as a distinct service. Attach report; cite MBS item descriptor.' },
    comments: [],
    documents: [],
  },
  {
    id: 'AC-02', batchId: 'ac-q4-2026', claimId: 'BV-88402', memberNo: 'XXXX8371',
    admissionDate: '11 Mar 2026', items: '32222 + 32228', band: 'Band 1', paidAmount: 1184, atRisk: 652,
    category: 'Unbundling',
    assertion: 'Combined gastroscopy + colonoscopy billed as two Band 1 episodes rather than the combined rate.',
    requestedAction: 'Repay $652 (difference vs combined rate).',
    pas: pas('J.K.', 'URN-40388', 'Dr S. Renner', 'Theatre 1', '08:05', '10:55', 170,
      'Single anaesthetic episode. Billing system split claim in error — combined rate applies.'),
    suggested: { decision: 'accept', note: 'PAS confirms single episode. Billing error — accept adjustment and log root cause for claims-lodgement training.' },
    comments: [{ author: 'Finance Manager', when: '4 Jul 2026', text: 'Checked ECLIPSE remittance — this was the split-claim glitch from the March PMS update.' }],
    documents: [],
  },
  {
    id: 'AC-03', batchId: 'ac-q4-2026', claimId: 'BV-88476', memberNo: 'XXXX0968',
    admissionDate: '18 Mar 2026', items: '42698', band: 'Band 2', paidAmount: 1782, atRisk: 0,
    category: 'Prostheses',
    assertion: 'Premium IOL charge identified on patient invoice; fund asserts IOL is bundled per cl. 10.2.',
    requestedAction: 'Confirm no fund-payable prosthesis claimed; provide IFC documentation.',
    pas: pas('R.D.', 'URN-40412', 'Dr H. Vieira', 'Theatre 2', '12:20', '15:44', 204,
      'Toric lens upgrade. Signed IFC on file dated 9 Mar (9 days pre-admission) — meets DR-2024-07.'),
    suggested: { decision: 'dispute', note: 'No prosthesis was claimed from the fund. Upgrade charged to patient with compliant IFC (DR-2024-07). Attach IFC.' },
    comments: [],
    documents: ['IFC-BV88476.pdf'],
  },
  {
    id: 'AC-04', batchId: 'ac-q4-2026', claimId: 'BV-88519', memberNo: 'XXXX4407',
    admissionDate: '2 Apr 2026', items: '49561', band: 'Band 3', paidAmount: 2290, atRisk: 2290,
    category: 'Same-day classification',
    assertion: 'Episode records 6h52m recovery; fund queries same-day appropriateness vs transfer obligation.',
    requestedAction: 'Provide discharge summary and recovery observations.',
    pas: pas('L.W.', 'URN-40460', 'Dr P. Marsh', 'Theatre 3', '07:30', '17:58', 412,
      'Extended second-stage recovery post-block; discharged same day, criteria met, obs charted 15-min.'),
    suggested: { decision: 'dispute', note: 'Same-day discharge criteria documented as met. Attach discharge summary + obs chart; note cl. 9 not triggered (no transfer).' },
    comments: [],
    documents: [],
  },
  {
    id: 'AC-05', batchId: 'ac-q4-2026', claimId: 'BV-88544', memberNo: 'XXXX9152',
    admissionDate: '9 Apr 2026', items: '32090 + 32084', band: 'Band 1', paidAmount: 918, atRisk: 176,
    category: 'Coding / item mismatch',
    assertion: 'Polypectomy item billed; histology report not evidencing polyp retrieval.',
    requestedAction: 'Provide histology report or repay $176 difference.',
    pas: pas('A.N.', 'URN-40501', 'Dr S. Renner', 'Theatre 1', '09:15', '11:32', 137,
      'Histology report received 14 Apr from external lab — confirms two polyps retrieved.'),
    suggested: { decision: 'dispute', note: 'Histology confirms polypectomy. Attach lab report; flag lab-report lag as recurring documentation gap.' },
    comments: [],
    documents: ['Histology-BV88544.pdf'],
  },
  {
    id: 'AC-06', batchId: 'ac-q4-2026', claimId: 'BV-88602', memberNo: 'XXXX3320',
    admissionDate: '16 Apr 2026', items: '42702', band: 'Band 2', paidAmount: 1782, atRisk: 1782,
    category: 'Duplicate claim',
    assertion: 'Claim appears duplicated against BV-88598 (same member, same date, same item).',
    requestedAction: 'Confirm distinct episodes or void duplicate.',
    pas: pas('E.S.', 'URN-40548', 'Dr H. Vieira', 'Theatre 2', '13:05', '16:20', 195,
      'PAS shows one admission only. BV-88598 was rejected pre-payment and resubmitted as BV-88602.'),
    suggested: { decision: 'dispute', note: 'Not a duplicate — resubmission of a rejected claim. Attach ECLIPSE rejection + resubmission trail.' },
    comments: [],
    documents: [],
  },
  {
    id: 'AC-07', batchId: 'ac-q4-2026', claimId: 'BV-88650', memberNo: 'XXXX7789',
    admissionDate: '30 Apr 2026', items: '45201', band: 'Band 4', paidAmount: 2455, atRisk: 2455,
    category: 'Documentation',
    assertion: 'Operative report not received with claim; complexity of flap repair unverified.',
    requestedAction: 'Provide operative report.',
    pas: pas('B.H.', 'URN-40590', 'Dr C. Aldous', 'Theatre 4', '08:40', '13:15', 275,
      'Operative report in PAS, dictated 30 Apr — was not attached at lodgement.'),
    suggested: { decision: 'dispute', note: 'Report exists; attach it. Root cause: plastics claims lodged without auto-attachment — add to lodgement checklist.' },
    comments: [],
    documents: ['OpReport-BV88650.pdf'],
  },
  {
    id: 'AC-08', batchId: 'ac-q4-2026', claimId: 'BV-88691', memberNo: 'XXXX5546',
    admissionDate: '7 May 2026', items: '49557', band: 'Band 3', paidAmount: 2290, atRisk: 2290,
    category: 'Eligibility / OEC',
    assertion: 'Member cover suspended at admission date per fund records; OEC timestamp requested.',
    requestedAction: 'Provide OEC confirmation or repay episode.',
    pas: pas('D.F.', 'URN-40633', 'Dr P. Marsh', 'Theatre 3', '10:10', '15:05', 295,
      'OEC run 5 May 14:32 returned "eligible — no excess". Reference OEC-778102 stored.'),
    suggested: { decision: 'dispute', note: 'OEC returned eligible pre-admission (ref OEC-778102). Attach OEC receipt; fund-side suspension postdates check.' },
    comments: [],
    documents: [],
  },
]

export const federationItems: AuditItem[] = [
  {
    id: 'FED-01', batchId: 'fed-pr-2026', claimId: 'BV-87102', memberNo: 'FXXX1190',
    admissionDate: '13 Jan 2026', items: '42702 · IOL-MONO-STD', band: 'Band 2', paidAmount: 1655, atRisk: 26,
    category: 'Prostheses',
    assertion: 'Prosthesis billed above current Prescribed List benefit ($386 from 1 Jan 2026).',
    requestedAction: 'Adjust $26 or evidence supply date pre-change.',
    pas: pas('G.M.', 'URN-39882', 'Dr H. Vieira', 'Theatre 2', '07:45', '11:02', 197,
      'Lens from December consignment stock — supplied before list change.'),
    suggested: { decision: 'dispute', note: 'Supply date precedes 1 Jan list change; attach consignment record.' },
    comments: [{ author: 'Theatre coordinator', when: '26 Jun 2026', text: 'Consignment paperwork located for Dec batch — both lenses.' }],
    documents: ['Consignment-Dec25.pdf'],
  },
  {
    id: 'FED-02', batchId: 'fed-pr-2026', claimId: 'BV-87241', memberNo: 'FXXX4523',
    admissionDate: '27 Jan 2026', items: '42702 · IOL-MONO-STD', band: 'Band 2', paidAmount: 1655, atRisk: 26,
    category: 'Prostheses',
    assertion: 'As FED-2026-PR-01 (same list change).',
    requestedAction: 'Adjust $26 or evidence supply date.',
    pas: pas('P.O.', 'URN-39920', 'Dr H. Vieira', 'Theatre 2', '09:30', '12:38', 188,
      'Same December consignment batch.'),
    suggested: { decision: 'dispute', note: 'Same consignment evidence covers this item.' },
    comments: [],
    documents: ['Consignment-Dec25.pdf'],
  },
  {
    id: 'FED-03', batchId: 'fed-pr-2026', claimId: 'BV-87355', memberNo: 'FXXX8834',
    admissionDate: '10 Feb 2026', items: '42698 · IOL-TORIC', band: 'Band 2', paidAmount: 1655, atRisk: 335,
    category: 'Prostheses',
    assertion: 'Toric lens billed; clinical indication (astigmatism ≥1.5D) documentation requested.',
    requestedAction: 'Provide biometry report.',
    pas: pas('K.C.', 'URN-39967', 'Dr H. Vieira', 'Theatre 2', '11:20', '14:41', 201,
      'Biometry: corneal astigmatism 2.1D documented pre-op — indication met.'),
    suggested: { decision: 'dispute', note: 'Biometry confirms indication. Attach report.' },
    comments: [],
    documents: ['Biometry-BV87355.pdf'],
  },
  {
    id: 'FED-04', batchId: 'fed-pr-2026', claimId: 'BV-87590', memberNo: 'FXXX2011',
    admissionDate: '5 Mar 2026', items: '49561 · ANCHOR-SUT ×2', band: 'Band 3', paidAmount: 2364, atRisk: 322,
    category: 'Prostheses',
    assertion: 'Two suture anchors billed; operative report indicates single anchor deployed.',
    requestedAction: 'Repay $322 or provide corrected operative report.',
    pas: pas('T.J.', 'URN-40122', 'Dr P. Marsh', 'Theatre 3', '08:00', '13:26', 326,
      'Prosthesis stickers show two anchors opened; op report narrative mentions one. Surgeon confirms second anchor deployed after first mis-set.'),
    suggested: { decision: 'partial', note: 'Two anchors used but one mis-set and discarded per surgeon. Offer corrected op report; expect partial adjustment on the discarded unit depending on fund policy.' },
    comments: [{ author: 'CEO', when: '30 Jun 2026', text: 'Ask Dr Marsh to addend the op report before we respond.' }],
    documents: [],
  },
  {
    id: 'FED-05', batchId: 'fed-pr-2026', claimId: 'BV-87663', memberNo: 'FXXX6647',
    admissionDate: '19 Mar 2026', items: '49557 · ANCHOR-SUT ×3', band: 'Band 3', paidAmount: 2364, atRisk: 966,
    category: 'Prostheses',
    assertion: 'Three anchors billed; imaging suggests two. Clarification requested.',
    requestedAction: 'Provide operative report and prosthesis stickers.',
    pas: pas('W.B.', 'URN-40170', 'Dr P. Marsh', 'Theatre 3', '12:45', '17:20', 275,
      'Sticker sheet shows three anchors; post-op imaging captures two in the repair plane, third is extra-articular.'),
    suggested: { decision: 'dispute', note: 'Stickers + op report document three deployed. Attach both; explain imaging plane.' },
    comments: [],
    documents: ['Stickers-BV87663.pdf', 'OpReport-BV87663.pdf'],
  },
  {
    id: 'FED-06', batchId: 'fed-pr-2026', claimId: 'BV-87801', memberNo: 'FXXX9958',
    admissionDate: '14 Apr 2026', items: '45203 · MESH-DERM', band: 'Band 4', paidAmount: 2505, atRisk: 1204,
    category: 'Prostheses',
    assertion: 'Dermal matrix item not on Prescribed List for this procedure code.',
    requestedAction: 'Repay $1,204 or evidence alternative listing.',
    pas: pas('S.V.', 'URN-40233', 'Dr C. Aldous', 'Theatre 4', '08:15', '13:50', 335,
      'Product billed under superseded billing code; current Prescribed List carries it under a new code at $1,168.'),
    suggested: { decision: 'partial', note: 'Item is listed under its successor code — expect re-code and a $36 adjustment rather than full repayment.' },
    comments: [],
    documents: [],
  },
]

// ------------------------------------------------- finalised history (FY26)
// [monthIdx Jul25=0 .. Jun26=11, fund, category, atRisk, outcome, defended]
type Hist = [number, Fund, Category, number, Outcome, number]
const H: Hist[] = [
  [0, 'AusCare Health', 'Coding / item mismatch', 310, 'overturned', 310],
  [0, 'Federation Health', 'Prostheses', 240, 'upheld', 0],
  [0, 'AusCare Health', 'Documentation', 1650, 'overturned', 1650],
  [1, 'AusCare Health', 'Unbundling', 590, 'upheld', 0],
  [1, 'Federation Health', 'Coding / item mismatch', 205, 'overturned', 205],
  [1, 'AusCare Health', 'Same-day classification', 2180, 'overturned', 2180],
  [1, 'Federation Health', 'Documentation', 2310, 'partial', 1160],
  [2, 'AusCare Health', 'Prostheses', 410, 'upheld', 0],
  [2, 'AusCare Health', 'Coding / item mismatch', 176, 'overturned', 176],
  [2, 'Federation Health', 'Rate application', 830, 'overturned', 830],
  [3, 'AusCare Health', 'Eligibility / OEC', 2140, 'overturned', 2140],
  [3, 'AusCare Health', 'Duplicate claim', 1782, 'overturned', 1782],
  [3, 'Federation Health', 'Prostheses', 322, 'partial', 160],
  [3, 'AusCare Health', 'Documentation', 2290, 'upheld', 0],
  [4, 'Federation Health', 'Coding / item mismatch', 240, 'overturned', 240],
  [4, 'AusCare Health', 'Unbundling', 652, 'upheld', 0],
  [4, 'AusCare Health', 'Same-day classification', 2290, 'overturned', 2290],
  [5, 'Federation Health', 'Prostheses', 1204, 'partial', 940],
  [5, 'AusCare Health', 'Coding / item mismatch', 312, 'overturned', 312],
  [5, 'AusCare Health', 'Rate application', 1105, 'overturned', 1105],
  [5, 'Federation Health', 'Documentation', 2364, 'upheld', 0],
  [6, 'AusCare Health', 'Prostheses', 335, 'overturned', 335],
  [6, 'AusCare Health', 'Coding / item mismatch', 176, 'upheld', 0],
  [6, 'Federation Health', 'Eligibility / OEC', 1655, 'overturned', 1655],
  [7, 'AusCare Health', 'Unbundling', 590, 'partial', 295],
  [7, 'Federation Health', 'Prostheses', 412, 'overturned', 412],
  [7, 'AusCare Health', 'Documentation', 2455, 'overturned', 2455],
  [7, 'AusCare Health', 'Same-day classification', 2290, 'upheld', 0],
  [8, 'Federation Health', 'Coding / item mismatch', 205, 'overturned', 205],
  [8, 'AusCare Health', 'Duplicate claim', 918, 'overturned', 918],
  [8, 'AusCare Health', 'Prostheses', 721, 'partial', 360],
  [9, 'Federation Health', 'Rate application', 1240, 'overturned', 1240],
  [9, 'AusCare Health', 'Coding / item mismatch', 312, 'overturned', 312],
  [9, 'AusCare Health', 'Eligibility / OEC', 2290, 'upheld', 0],
  [9, 'Federation Health', 'Documentation', 1655, 'overturned', 1655],
  [10, 'AusCare Health', 'Unbundling', 652, 'upheld', 0],
  [10, 'Federation Health', 'Prostheses', 966, 'overturned', 966],
  [10, 'AusCare Health', 'Same-day classification', 2180, 'overturned', 2180],
  [10, 'AusCare Health', 'Coding / item mismatch', 176, 'overturned', 176],
  [11, 'Federation Health', 'Prostheses', 322, 'upheld', 0],
  [11, 'AusCare Health', 'Documentation', 2455, 'partial', 1230],
  [11, 'AusCare Health', 'Coding / item mismatch', 312, 'overturned', 312],
  [11, 'Federation Health', 'Eligibility / OEC', 1786, 'overturned', 1786],
  [11, 'AusCare Health', 'Rate application', 940, 'overturned', 940],
]

export interface HistoryRecord {
  month: string
  monthIdx: number
  fund: Fund
  category: Category
  atRisk: number
  outcome: Outcome
  defended: number
}

export const MONTHS = ['Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25',
  'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26']

export const history: HistoryRecord[] = H.map(([m, fund, category, atRisk, outcome, defended]) => ({
  month: MONTHS[m], monthIdx: m, fund, category, atRisk, outcome, defended,
}))

// ---------------------------------------------------------- learning actions
export const learningActions = [
  {
    when: 'May 2026', category: 'Documentation' as Category,
    action: 'Plastics operative reports now auto-attach at claim lodgement (PMS rule).',
    trigger: 'Three documentation audits on flap repairs in 12 months — all defensible, all avoidable.',
  },
  {
    when: 'Apr 2026', category: 'Coding / item mismatch' as Category,
    action: 'Polypectomy claims held until histology received (7-day internal window still met).',
    trigger: 'Recurring "histology not evidencing" queries; every one overturned on the report.',
  },
  {
    when: 'Feb 2026', category: 'Unbundling' as Category,
    action: 'Combined endoscopy rate check added to end-of-day billing reconciliation.',
    trigger: 'Split-claim errors after the March PMS update — both upheld against us.',
  },
  {
    when: 'Nov 2025', category: 'Prostheses' as Category,
    action: 'Prosthesis sticker sheets scanned to PAS on the day of surgery.',
    trigger: 'Anchor-count queries taking 3+ hours each to evidence from paper records.',
  },
]

export const fundTone: Record<Fund, { text: string; bg: string }> = {
  'AusCare Health': { text: 'text-ink-700', bg: 'bg-ink-50' },
  'Federation Health': { text: 'text-neg-700', bg: 'bg-neg-50' },
}
