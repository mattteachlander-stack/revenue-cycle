/**
 * SYNTHETIC DATA — Education library (Enquiry suite). Documented education
 * disseminated across the organisation: searchable, versioned, and flagged
 * for update when other CORE modules change the facts it teaches.
 */

export type EduStatus = 'Current' | 'Update required' | 'In revision'

export interface EduItem {
  id: string
  title: string
  audience: string
  format: string
  owner: string
  version: string
  updated: string
  status: EduStatus
  summary: string
  trigger?: { module: string; change: string; to: string } // why an update is required
}

export const eduItems: EduItem[] = [
  {
    id: 'EDU-1',
    title: 'AusCare claims, lodgement & quality reporting pack',
    audience: 'Front office · finance',
    format: 'Slide pack + quick card',
    owner: 'Finance manager',
    version: 'v3.1', updated: '14 Mar 2026',
    status: 'Update required',
    summary: 'Lodgement windows, banding table, quality-data obligations and escalation contacts for AusCare claims.',
    trigger: {
      module: 'Change intelligence',
      change: 'Renewal settles new terms: 14-day lodgement now contractual, carve-out deleted, quality incentive (cl. 17.4 pack) proposed',
      to: 'Re-issue as v4 on execution — every rate and window on the card changes 1 Dec 2026',
    },
  },
  {
    id: 'EDU-2',
    title: 'Endoscopy coding & indication quick card',
    audience: 'Coders · gastro list coordinators',
    format: 'Quick card',
    owner: 'HIM lead',
    version: 'v2.0', updated: '2 May 2026',
    status: 'Update required',
    summary: 'Item selection, combined-procedure rules and indication documentation for colonoscopy/gastroscopy.',
    trigger: {
      module: 'Regulatory change',
      change: 'MBS colonoscopy descriptor & frequency changes effective 1 Nov 2026 (RC-1, assessed Material)',
      to: 'Add surveillance-interval prompts and indication capture to the card and the booking form before 1 Nov',
    },
  },
  {
    id: 'EDU-3',
    title: 'Combined endoscopy billing — split-claim prevention',
    audience: 'Billing team',
    format: 'One-pager + PMS checklist',
    owner: 'Revenue integrity lead',
    version: 'v1.0', updated: '20 Feb 2026',
    status: 'Current',
    summary: 'Created from the February audit learning: combined gastro/colonoscopy episodes bill the combined rate; end-of-day reconciliation check.',
  },
  {
    id: 'EDU-4',
    title: 'Prostheses billing & sticker workflow',
    audience: 'Theatre · billing',
    format: 'Workflow poster + LMS module',
    owner: 'Theatre manager',
    version: 'v2.2', updated: '11 Nov 2025',
    status: 'Update required',
    summary: 'Sticker capture on day of surgery, scanning to PAS, and Prescribed List benefit checks.',
    trigger: {
      module: 'Regulatory change',
      change: 'Prescribed List tranche-4 benefit reductions for ophthalmic devices from 1 Jan 2027 (RC-3)',
      to: 'Refresh benefit tables and the bundled-lens note (AusCare cl. 10.2 interaction) in the LMS module',
    },
  },
  {
    id: 'EDU-5',
    title: 'OEC & informed financial consent script',
    audience: 'Front office',
    format: 'Script + FAQ',
    owner: 'Practice manager',
    version: 'v4.3', updated: '9 Jun 2026',
    status: 'Current',
    summary: 'Eligibility checks, waiting-period language, tier/clinical-category traps (cataracts on Silver), and the three-invoice explanation.',
  },
  {
    id: 'EDU-6',
    title: 'Recovery staffing & escalation guide',
    audience: 'Nursing — recovery',
    format: 'Guide + roster template',
    owner: 'DON',
    version: 'v1.4', updated: '3 Jul 2026',
    status: 'In revision',
    summary: 'Second-stage recovery ratios, escalation triggers and the Friday double-list roster.',
    trigger: {
      module: 'Regulatory change',
      change: 'Vic day-procedure staffing ratio guidance update effective 1 Oct 2026 (RC-7, actioned)',
      to: 'v1.5 in draft with the amended Friday template — publish by 15 Sep',
    },
  },
  {
    id: 'EDU-7',
    title: 'Plastics operative report standards',
    audience: 'Surgeons · theatre',
    format: 'Standard + exemplar',
    owner: 'Medical advisory committee',
    version: 'v1.1', updated: '18 May 2026',
    status: 'Current',
    summary: 'Complexity documentation standards that ended the flap-repair audit cycle — created from the May 2026 learning action.',
  },
]

export const eduStatusMeta: Record<EduStatus, { tone: 'sage' | 'clay' | 'amber' }> = {
  Current: { tone: 'sage' },
  'Update required': { tone: 'clay' },
  'In revision': { tone: 'amber' },
}
