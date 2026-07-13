/**
 * SYNTHETIC DATA — Regulatory change intelligence (Operational suite).
 * External changes (MBS, banding, legislation, reform consultations) ingested
 * and assessed for materiality against the facility's own services, volumes
 * and rates. Changes and dates are illustrative.
 */

export type Materiality = 'Material' | 'Monitor' | 'Immaterial'
export type RegAction = 'Consultation response' | 'Update education' | 'Brief sites' | 'Negotiation input' | 'No action'
export type RegStatus = 'Decision needed' | 'Actioned' | 'Assessed — no action' | 'In consultation'

export interface RegChange {
  id: string
  source: string
  title: string
  what: string
  date: string          // effective or consultation-close date
  dateLabel: 'Effective' | 'Consultation closes' | 'Announced'
  exposure: string      // computed against facility data
  exposureBasis: string
  materiality: Materiality
  actions: RegAction[]
  recommendation: string
  status: RegStatus
  educationLink?: string // education artefact flagged for update
}

export const regChanges: RegChange[] = [
  {
    id: 'RC-1',
    source: 'MBS — Continuous Review',
    title: 'Colonoscopy item descriptor & frequency changes (32222–32228 group)',
    what: 'Revised descriptors tighten the clinical indications and surveillance intervals attached to colonoscopy items, with new compliance notes on documentation of indication.',
    date: '1 Nov 2026', dateLabel: 'Effective',
    exposure: '3,410 episodes/yr · $4.47m line',
    exposureBasis: 'Entire gastroenterology service line bills against this item group; banding in both HPPAs keys off the MBS item.',
    materiality: 'Material',
    actions: ['Update education', 'Brief sites'],
    recommendation: 'Update the endoscopy coding quick card and booking-form indication capture before 1 Nov; brief the gastro list coordinators. Failure mode to avoid: claims bounced for indication documentation, then appearing as "documentation" audit findings next quarter.',
    status: 'Decision needed',
    educationLink: 'Endoscopy coding & indication quick card',
  },
  {
    id: 'RC-2',
    source: 'Dept. of Health — banding review',
    title: 'Consultation: private hospital theatre banding classification reform',
    what: 'Proposed re-mapping of common day procedures across theatre bands, including several ophthalmic and arthroscopic item groups moving band.',
    date: '22 Aug 2026', dateLabel: 'Consultation closes',
    exposure: '≈ $8.3m of banded revenue',
    exposureBasis: 'Cataract (Band 2) and arthroscopy (Band 3) volumes are the facility’s two largest banded lines; both appear in the proposed re-mapping tables.',
    materiality: 'Material',
    actions: ['Consultation response', 'Negotiation input'],
    recommendation: 'Lodge a submission with episode-level cost evidence (the Annexure A pack is 80% reusable). Flag to Contracting: if the re-mapping lands mid-term, cl. 8.4-style re-banding clauses decide who wears it — a reason to hold the independent-expert term in the AusCare deal.',
    status: 'In consultation',
  },
  {
    id: 'RC-3',
    source: 'Prescribed List — reform tranche',
    title: 'Prescribed List benefit reductions — tranche 4 (ophthalmic devices)',
    what: 'Further staged reduction of listed benefits for intraocular lenses and ophthalmic consumables.',
    date: '1 Jan 2027', dateLabel: 'Effective',
    exposure: '2,880 IOL episodes/yr',
    exposureBasis: 'AusCare cl. 10.2 bundles the lens into the case payment — every listed-benefit reduction widens the gap the facility absorbs.',
    materiality: 'Material',
    actions: ['Negotiation input', 'Update education'],
    recommendation: 'Feed to Clause intelligence: the lens-cost review lever (parked in round 2) gains ~$9k/yr of value at tranche-4 rates — table it at the year-1 review. Update the theatre consumables purchasing guidance.',
    status: 'Decision needed',
    educationLink: 'Prostheses billing & sticker workflow',
  },
  {
    id: 'RC-4',
    source: 'PHI Rules amendment',
    title: 'Second-tier default benefit administration changes (consultation)',
    what: 'Proposed changes to how second-tier eligibility is administered and evidenced, including revised application timeframes.',
    date: '5 Sep 2026', dateLabel: 'Consultation closes',
    exposure: 'BATNA integrity — $2.65m floor',
    exposureBasis: 'The priced walk-away in every negotiation assumes current second-tier mechanics; administration changes alter the fallback’s reliability, not its rate.',
    materiality: 'Monitor',
    actions: ['Consultation response'],
    recommendation: 'Short submission via Day Hospitals Australia rather than solo — the ask (clear timeframes, deemed approval) is sector-wide. Re-check BATNA assumptions when the final rules land.',
    status: 'In consultation',
  },
  {
    id: 'RC-5',
    source: 'MBS — indexation',
    title: 'MBS fee indexation announcement (1 Jul 2026 round applied)',
    what: 'Annual indexation applied to general medical services fees.',
    date: '1 Jul 2026', dateLabel: 'Effective',
    exposure: 'Nil direct',
    exposureBasis: 'Facility revenue is contract- and band-based; MBS indexation moves the doctors’ fees, not the hospital case payment.',
    materiality: 'Immaterial',
    actions: ['No action'],
    recommendation: 'No facility action. Front-desk gap estimates refresh automatically from the fee file.',
    status: 'Assessed — no action',
  },
  {
    id: 'RC-6',
    source: 'MBS — anaesthesia schedule',
    title: 'Anaesthesia item renumbering (administrative)',
    what: 'Renumbering and consolidation of anaesthesia items with no fee or descriptor substance change.',
    date: '1 Nov 2026', dateLabel: 'Effective',
    exposure: 'Nil direct',
    exposureBasis: 'Anaesthetists bill these items; facility claims reference them only in IFC estimates.',
    materiality: 'Immaterial',
    actions: ['No action'],
    recommendation: 'Mapping table update happens inside the billing software release. Nothing to disseminate.',
    status: 'Assessed — no action',
  },
  {
    id: 'RC-7',
    source: 'Vic Health Services Act — regs',
    title: 'Day procedure centre staffing ratio guidance update',
    what: 'Updated guidance on recovery-stage staffing ratios for day procedure centres.',
    date: '1 Oct 2026', dateLabel: 'Effective',
    exposure: 'Recovery roster — 2nd-stage',
    exposureBasis: 'Current rosters already meet the revised ratios on all list types except Friday double ophthalmic lists.',
    materiality: 'Monitor',
    actions: ['Brief sites', 'Update education'],
    recommendation: 'Adjust the Friday roster template (one additional RN hour) and refresh the recovery-staffing education page; no capital or licensing impact.',
    status: 'Actioned',
    educationLink: 'Recovery staffing & escalation guide',
  },
]

export const materialityMeta: Record<Materiality, { tone: 'clay' | 'amber' | 'sage' }> = {
  Material: { tone: 'clay' },
  Monitor: { tone: 'amber' },
  Immaterial: { tone: 'sage' },
}
