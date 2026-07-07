/**
 * CANNED DEMO CONTENT — authored at build time. Contract Agent Q&A corpus.
 * Every answer cites its grounding source(s) and carries a confidence level;
 * where the contract is silent the agent says so and recommends escalation.
 */
export interface Citation {
  source: 'HPPA' | 'Legislation' | 'Internal register'
  ref: string
  quote: string
}

export interface OracleQA {
  id: string
  question: string
  confidence: 'High' | 'Moderate' | 'Low — escalate'
  answer: string
  citations: Citation[]
}

export const oracleCorpus: OracleQA[] = [
  {
    id: 'overnight',
    question: 'A cataract patient can’t be safely discharged this evening. Can we keep her overnight and bill AusCare for the extra care?',
    confidence: 'High',
    answer:
      'No. Bayview is contracted as a day facility and the agreement pays a single bundled case payment per episode — if the patient cannot be discharged, the pathway is **transfer to an overnight facility**, and AusCare pays the receiving facility separately. Bayview receives only the normal case payment, with **no additional amount for extended recovery before transfer**. Note also the internal position: the Board decided in 2025 that Bayview absorbs extended-recovery costs and does **not** bill the patient any additional amount, even where informed financial consent might technically permit it. Follow the transfer protocol and document clinical reasons.',
    citations: [
      { source: 'HPPA', ref: 'cl. 9.1', quote: 'the Fund pays the Hospital the applicable Case Payment… No additional amount is payable to the Hospital for extended recovery prior to transfer.' },
      { source: 'HPPA', ref: 'cl. 1.2', quote: 'No benefits are payable under this Agreement for overnight accommodation except as expressly provided in clause 9.' },
      { source: 'Internal register', ref: 'DR-2025-06', quote: 'Bayview absorbs the extended-recovery cost and does not bill the patient any additional amount.' },
    ],
  },
  {
    id: 'premium-iol',
    question: 'A surgeon wants to use a premium multifocal lens for an AusCare patient. Who pays the difference?',
    confidence: 'High',
    answer:
      'The patient may — but **only with signed informed financial consent at least 5 business days before admission**; otherwise the case must be rescheduled. Under the AusCare agreement the cataract case payment is **inclusive of the intraocular lens regardless of the lens selected** (this is one of the contract’s bundled-cost clauses), so any premium-lens cost above the standard lens is entirely Bayview’s unless it is disclosed, consented and charged to the patient in line with the internal rule. IFC obligations also apply as a matter of law and fund rules, not just contract.',
    citations: [
      { source: 'HPPA', ref: 'cl. 10.2', quote: 'the Case Payment is inclusive of the intraocular lens and all associated consumables… regardless of the lens selected.' },
      { source: 'Internal register', ref: 'DR-2024-07', quote: 'patient pays the difference… only with signed IFC at least 5 business days pre-admission; otherwise reschedule.' },
      { source: 'Legislation', ref: 'L5 — Informed financial consent', quote: 'failure to obtain IFC generally means the facility cannot recover the amount from the patient.' },
    ],
  },
  {
    id: 'lodgement',
    question: 'We found an AusCare claim from 26 days ago that never went out. Is it too late?',
    confidence: 'High',
    answer:
      '**Lodge it today — it is inside the contractual window, but only just.** The agreement requires lodgement within **30 days of discharge**; a late claim can be rejected outright and the shortfall **cannot be recovered from the patient**. Internally this is a known failure mode: after two write-offs in FY25, the standing instruction is lodgement within **7 days**, so a 26-day-old claim should also be flagged to the finance manager as a process breach.',
    citations: [
      { source: 'HPPA', ref: 'cl. 14.2', quote: 'A claim must be lodged within 30 days of the date of discharge. The Fund may reject a claim lodged after that period, and the Hospital must not recover the shortfall from the patient.' },
      { source: 'Internal register', ref: 'DR-2025-09', quote: 'Claims must be lodged within 7 days of discharge (internal standard)… Two claims missed the 30-day window in FY25 ($4.1k written off).' },
    ],
  },
  {
    id: 'rebanding-notice',
    question: 'AusCare has emailed a “classification alignment notice” moving two procedures to a lower band. Do we just update the billing system?',
    confidence: 'High',
    answer:
      '**No — stop.** Under the current agreement the fund can re-band on 30 days’ notice without consent, so the clock matters, but the standing internal rule is that **any re-banding notice goes to the CEO within 2 business days** and new bandings are **not** applied to bookings until CEO sign-off. This rule exists because a previous notice was actioned by admin staff unreviewed, at a cost of ≈ $18k. The CEO may challenge the classification (and should model the revenue effect first); once a renewed agreement is in place, the referral path may differ — check the current contract version before responding to the fund.',
    citations: [
      { source: 'HPPA', ref: 'cl. 8.4', quote: 'The Fund may reassign any Recognised Procedure to a different Band by giving the Hospital 30 days’ written notice… does not require the Hospital’s consent.' },
      { source: 'Internal register', ref: 'DR-2025-02', quote: 'escalated to the CEO within 2 business days… must not apply new bandings to bookings until CEO sign-off.' },
    ],
  },
  {
    id: 'excess',
    question: 'A patient’s eligibility check says an excess is payable but she wants to pay after the procedure. OK?',
    confidence: 'High',
    answer:
      'No. Where the online eligibility check returns “excess payable”, the excess is collected **on admission, not on discharge**. This is a Board-level decision made after bad-debt write-offs, and front-desk discretion was explicitly removed. Eligibility verification itself is a contractual obligation before admission, so the OEC check and the excess conversation both belong at the front of the pathway.',
    citations: [
      { source: 'Internal register', ref: 'DR-2024-03', quote: 'must pay the excess on admission, not on discharge… front-desk discretion removed.' },
      { source: 'HPPA', ref: 'cl. 5.1', quote: 'The Hospital must verify each patient’s eligibility through the Fund’s online eligibility system (OEC) prior to admission.' },
    ],
  },
  {
    id: 'second-tier',
    question: 'If we ended up with no AusCare contract at all, what would they have to pay us?',
    confidence: 'High',
    answer:
      'As an accredited, **second-tier eligible** facility, Bayview would be entitled to the **second-tier default benefit**: at least **85% of the average amount AusCare pays comparable private day facilities in Victoria under its negotiated agreements** for the equivalent episode. Practical notes: it is a floor pegged to *other* hospitals’ negotiated rates minus 15%; patients face greater gap uncertainty, which affects referrals; and eligibility must be maintained through accreditation. Current modelling puts the facility-level effect at roughly **−15% on AusCare revenue**. Any decision engaging this scenario is a Board matter.',
    citations: [
      { source: 'Legislation', ref: 'L3 — Second-tier default benefit', quote: 'at least 85% of the average amount that fund pays for the equivalent episode under its negotiated agreements with comparable private hospitals in the same state.' },
      { source: 'HPPA', ref: 'cl. 19.3', quote: 'benefits… are payable at the rates… applicable to a facility without an agreement (including any applicable second-tier default benefit).' },
    ],
  },
  {
    id: 'rate-sharing',
    question: 'The CEO of another day surgery asked what rates we get from AusCare so we can compare. Can I send her our Schedule 1?',
    confidence: 'High',
    answer:
      '**No — twice over.** First, the agreement’s confidentiality clause expressly prohibits disclosing Schedule 1 rates to any other hospital or day procedure centre. Second, and more seriously, **competition law**: exchanging or aligning negotiated prices with a competing facility can engage the cartel provisions of the Competition and Consumer Act, regardless of intent. There is a lawful path for small businesses to bargain *collectively with a fund* under the ACCC class exemption, but that is a formal, conditions-based framework — not an informal rate swap. Decline, and refer any collective-bargaining interest to the CEO for legal advice. *(This assistant will not compare confidential rates across facilities.)*',
    citations: [
      { source: 'HPPA', ref: 'cl. 20.1', quote: 'The Hospital must not disclose the rates in Schedule 1 to any other hospital or day procedure centre, or to any person acting for one.' },
      { source: 'Legislation', ref: 'L6 — Competition law boundary', quote: 'hospitals must not exchange or align their negotiated rates with competing hospitals outside such a framework.' },
    ],
  },
  {
    id: 'weekend-list',
    question: 'Can we run a Saturday operating list for AusCare patients, and is there a penalty rate or loading in the contract?',
    confidence: 'Low — escalate',
    answer:
      '**The contract is silent on this — escalate rather than assume.** The agreement pays a flat case payment per episode and says nothing about days of operation, weekend loadings, or after-hours surcharges: no clause prohibits a Saturday list, and equally no clause provides any additional payment for one. The staffing cost differential (weekend penalty rates under the applicable awards) would be entirely Bayview’s. Before scheduling, this needs a CEO decision on the economics, and possibly written clarification with the fund so a claim from a Saturday episode is not disputed as outside ordinary arrangements. I can draft that clarification request if asked.',
    citations: [
      { source: 'HPPA', ref: 'cl. 6.1 (and absence elsewhere)', quote: 'All Episodes are remunerated by Case Payment… — no provision addresses days of operation or weekend loadings.' },
      { source: 'Internal register', ref: '(no entry)', quote: 'No internal decision covers weekend lists.' },
    ],
  },
  {
    id: 'audit-notice',
    question: 'AusCare says it will audit our claims next week and wants clinical records. Do we have to say yes?',
    confidence: 'Moderate',
    answer:
      'Broadly yes, but **check the mechanics before agreeing to the date**. The fund has an audit right, but it requires **10 business days’ notice**, is limited to records relevant to Episodes, and is capped at twice per year absent reasonable suspicion of systematic error. “Next week” is inside the notice period — you may (politely) require the full 10 business days. Costs: Bayview bears its own; if the audit finds net overpayment above 2% of the sample, Bayview also pays the fund’s costs. One flow-on to watch: audit findings can trigger the 24-month set-off/recovery right, so the CEO should be told before the audit starts, and any adverse finding should be reviewed against the dispute clause rather than auto-accepted.',
    citations: [
      { source: 'HPPA', ref: 'cl. 15.1–15.2', quote: 'audit… on 10 business days’ notice, no more than twice per year… Where an audit identifies a net overpayment exceeding 2%… the Hospital must also pay the Fund’s reasonable audit costs.' },
      { source: 'HPPA', ref: 'cl. 14.5', quote: 'the Fund may recover the overpayment at any time within 24 months of payment, including by set-off.' },
    ],
  },
  {
    id: 'ifc-excluded',
    question: 'A patient is booked for a cosmetic procedure that isn’t MBS-listed. What do we need to do about payment?',
    confidence: 'High',
    answer:
      'That procedure is an **excluded service** — no benefit is payable by AusCare under Schedule 2 — so it proceeds, if at all, on a **self-funded basis with informed financial consent**. Practically: quote the full facility fee in writing before booking confirmation, obtain signed IFC, and collect in line with the self-funded payment policy. Do not lodge a claim to the fund for an excluded service. If there is any doubt whether the specific item is MBS-listed (some plastics items are), confirm the item number first — the exclusion turns on MBS listing, not on the word “cosmetic”.',
    citations: [
      { source: 'HPPA', ref: 'Schedule 2', quote: 'No benefit is payable… for: cosmetic procedures without MBS item… Excluded services may be provided on a self-funded basis with informed financial consent.' },
      { source: 'Legislation', ref: 'L5 — Informed financial consent', quote: 'Patients must be given clear information about out-of-pocket costs before treatment wherever practicable.' },
    ],
  },
]

export const suggestedQuestions = oracleCorpus.map((q) => ({ id: q.id, text: q.question }))

export const fallbackAnswer = {
  confidence: 'Low — escalate' as const,
  answer:
    'This demo answers a fixed set of questions grounded in the synthetic Bayview–AusCare contract pack — free-form retrieval is switched off because no live model is attached. In the production Contract Agent, your question would be answered against the executed HPPAs, current legislation, and your internal decisions register, with citations and a confidence level — and where the sources are silent, it would say exactly that and recommend escalation rather than guess. Try one of the suggested questions to see the pattern.',
}
