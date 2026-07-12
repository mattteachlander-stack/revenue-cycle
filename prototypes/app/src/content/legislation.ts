/**
 * CANNED DEMO CONTENT — Ask legislation (Enquiry suite). Curated summaries of
 * Australian private health insurance and Medicare benefit law, authored at
 * build time. Answers are general summaries for demonstration — production
 * grounds every answer in the current consolidated text on legislation.gov.au
 * and flags amendments since last review. Not legal advice.
 */

export interface LegisCitation {
  source: string
  ref: string
  quote: string
}

export interface LegisQA {
  id: string
  question: string
  answer: string
  realTerms: string
  citations: LegisCitation[]
  confidence: 'High' | 'Moderate'
}

export const legisCorpus: LegisQA[] = [
  {
    id: 'second-tier',
    question: 'What are we entitled to be paid if we have no agreement with a fund?',
    answer: `Where an eligible private hospital has **no contract** with an insurer, the insurer must still pay at least the **second-tier default benefit** for hospital treatment provided to its members: **85% of the average charge** under that insurer's negotiated agreements for **comparable facilities in the same state**. The facility must be accredited and apply for second-tier eligibility; basic default benefits (a lower floor set by the Minister) apply where second-tier status doesn't.`,
    realTerms: `This is the floor under every negotiation — walking away doesn't mean zero, it means roughly 85 cents in the contracted dollar. That's why CORE prices the walk-away at −$470k/yr rather than treating it as unthinkable: the number is knowable, and a fund that believes you know it negotiates differently.`,
    citations: [
      { source: 'PHI (Benefit Requirements) Rules', ref: 'Sch. 5 (second-tier default benefits)', quote: '…85% of the average charge for that treatment under the applicable agreements…' },
      { source: 'Legislation', ref: 'Private Health Insurance Act 2007, s 72-1', quote: 'complying health insurance policies must meet the benefit requirements…' },
    ],
    confidence: 'High',
  },
  {
    id: 'clinical-categories',
    question: 'A member has Silver cover — are they covered for cataract surgery here?',
    answer: `Cover for hospital treatment is set by **clinical categories** under the product-tier reforms: every complying policy is Gold, Silver, Bronze or Basic, and each tier **must** cover a defined list of categories. **Cataracts is a Gold-tier category** — Silver policies are not required to cover it, though "Silver Plus" products may add it voluntarily. The answer for any individual member therefore depends on their specific product, not the tier name alone — always confirm with an **eligibility check (OEC)** before admission.`,
    realTerms: `"Silver" on the card does not mean "covered" for your highest-value procedure line. For an ophthalmology-heavy facility, the practical rule is: run the OEC on every booking, and train front desk that Cataracts, joint replacements and dialysis are the categories where tier assumptions burn patients — and your bad-debt ledger.`,
    citations: [
      { source: 'PHI (Complying Product) Rules', ref: 'Sch. 5 (clinical categories by tier)', quote: 'Cataracts… Gold' },
      { source: 'Legislation', ref: 'Private Health Insurance Act 2007, s 63-10', quote: 'rules may specify requirements for complying health insurance products…' },
    ],
    confidence: 'High',
  },
  {
    id: 'waiting-periods',
    question: 'What waiting periods can a fund lawfully impose?',
    answer: `Maximum waiting periods are capped by the Act: **12 months for pre-existing conditions**, **12 months for obstetrics**, and **2 months for everything else** (including psychiatric care, rehabilitation and palliative care — though the 2-month psychiatric wait can be upgraded around once via the mental-health waiver). A fund cannot refuse benefits for a served waiting period, and whether a condition is "pre-existing" is assessed by the fund's medical practitioner against signs and symptoms in the **6 months before joining or upgrading**.`,
    realTerms: `For a day facility the live issue is upgrades: a member who upgraded 4 months ago for a knee scope may still be inside the pre-existing window. The OEC will say "benefit payable subject to waiting periods" — that phrase is the trigger to get informed financial consent signed before the list, not after the claim bounces.`,
    citations: [
      { source: 'Legislation', ref: 'Private Health Insurance Act 2007, s 75-1', quote: 'the maximum permitted waiting periods…' },
    ],
    confidence: 'High',
  },
  {
    id: 'prostheses',
    question: 'What must the fund pay for the lens (IOL) we implant?',
    answer: `For a member with cover for the treatment, insurers **must pay at least the benefit listed on the Prescribed List of Medical Devices and Human Tissue Products** for a listed device used as part of hospital treatment. Suppliers cannot charge above the listed benefit for no-gap devices in the private system; the list and its benefits are remade periodically, and benefits have been **reduced in stages** under recent reforms.`,
    realTerms: `The lens is paid separately from the case payment *unless your contract bundles it* — which is exactly what AusCare's cl. 10.2 does, converting a legislated pass-through into your commercial risk as list benefits fall. When a fund proposes "bundling", this Rule is the baseline you're giving up; price the transfer before agreeing.`,
    citations: [
      { source: 'PHI (Medical Devices and Human Tissue Products List) Rules', ref: 'Sch. 1 (listed benefits)', quote: 'the benefit payable in respect of a listed product…' },
      { source: 'Legislation', ref: 'Private Health Insurance Act 2007, s 72-10', quote: 'benefit requirements for medical devices and human tissue products…' },
    ],
    confidence: 'High',
  },
  {
    id: 'mbs-split',
    question: 'How do Medicare and the fund split the doctors’ fees for an in-hospital procedure?',
    answer: `For professional (medical) services provided to a private in-hospital patient, **Medicare pays 75% of the MBS fee** under the Health Insurance Act 1973, and the insurer pays **at least the remaining 25%** — more where the doctor participates in the fund's **gap-cover scheme**. Any charge above the scheme's cap becomes the patient's out-of-pocket gap. The **hospital's case payment is entirely separate**: it comes from the HPPA (or the second-tier default), not the MBS.`,
    realTerms: `Three invoices leave a theatre: the surgeon's and anaesthetist's (MBS + gap rules) and yours (contract rates). Front desk needs to explain that split in one sentence, because "but I have Gold cover" complaints are almost always about a doctor's gap — not your bill — and the Enquiry suite should keep those answers cited and consistent.`,
    citations: [
      { source: 'Legislation', ref: 'Health Insurance Act 1973, s 10 (Medicare benefit)', quote: '…75% of the Schedule fee for a professional service rendered to a hospital patient…' },
      { source: 'Legislation', ref: 'Private Health Insurance Act 2007, s 72-1 & gap cover schemes', quote: '…benefits for the balance of the Schedule fee…' },
    ],
    confidence: 'High',
  },
  {
    id: 'ifc',
    question: 'Are we legally required to get informed financial consent before admission?',
    answer: `There is **no single statutory IFC provision** for hospitals — the obligation is assembled from several sources: accreditation standards, the fund's HPPA (most, including your AusCare agreement at cl. 6.3, make IFC a contractual condition of payment), Medicare billing rules for medical services, and Australian Consumer Law's prohibitions on misleading conduct. The Commonwealth's IFC framework and the AMA/industry codes set the expected practice: written estimates of out-of-pockets **before** treatment wherever practicable.`,
    realTerms: `Treat IFC as contractually mandatory even though no Act says "thou shalt": a missing IFC is one of the first things a fund audit reaches for to deny or claw back a claim — it appears in your own Revenue Integrity categories. The estimate template should cover your fee, known device gaps, and point to the doctors for theirs.`,
    citations: [
      { source: 'Internal register', ref: 'AusCare HPPA cl. 6.3', quote: 'the Hospital must obtain the member’s informed financial consent prior to admission…' },
      { source: 'Guidance', ref: 'Commonwealth IFC framework / NSQHS Standard 1', quote: 'patients should receive clear information about likely out-of-pocket costs…' },
    ],
    confidence: 'Moderate',
  },
  {
    id: 'portability',
    question: 'A patient switched funds two weeks ago — do their waiting periods start again?',
    answer: `No — **portability** rules require the new insurer to recognise waiting periods **already served for an equivalent level of cover**. On transfer, the old fund issues a transfer certificate; waits apply only to the extent cover was *upgraded* (the higher benefit is subject to the unserved wait, with the old level payable meanwhile). The member must generally transfer within a set gap (commonly 30 days from ceasing the old policy) to keep continuity.`,
    realTerms: `A fund switch mid-referral is not a booking blocker — run the OEC against the new fund and it will apply the served waits. The trap is upgrades-disguised-as-switches: same tier name, different clinical categories. If the procedure's category wasn't on the old policy, the pre-existing clock may be live.`,
    citations: [
      { source: 'Legislation', ref: 'Private Health Insurance Act 2007, s 78-1 & PHI (Complying Product) Rules (portability)', quote: '…must not apply a waiting period the insured has already served under the previous policy for an equivalent benefit…' },
    ],
    confidence: 'High',
  },
]

export const legisFallback = {
  answer: `That question is **outside the demo's curated corpus**. The production module answers from the current consolidated text of the Act and Rules on legislation.gov.au (and the MBS online), cites the provision, and flags any amendment since the corpus was last reviewed — and where the law is genuinely unsettled, it says so and recommends escalation to your health lawyer rather than guessing.`,
  realTerms: `No answer is better than a confident wrong one — the same escalation principle as Ask the contract.`,
  confidence: 'Moderate' as const,
}

export const suggestedCorpus = [
  { name: 'Private Health Insurance Act 2007 + Rules', status: 'In demo corpus', detail: 'Benefit Requirements, Complying Product, Prescribed List (devices) — product compliance and benefit rules.' },
  { name: 'Health Insurance Act 1973 + MBS', status: 'In demo corpus', detail: 'Medicare benefits for professional services; the 75/25 in-hospital split; MBS item interpretive notes.' },
  { name: 'PHI (Accreditation) Rules 2011', status: 'Proposed', detail: 'Second-tier eligibility mechanics — directly feeds the BATNA calculation.' },
  { name: 'State health services / day-procedure licensing', status: 'Proposed', detail: 'Vic Health Services Act & equivalents: licensing conditions that HPPAs cross-reference.' },
  { name: 'Privacy Act 1988 (APPs) + My Health Records Act', status: 'Proposed', detail: 'Health information handling — what fund auditors may lawfully request and how to respond.' },
  { name: 'National Health Act 1953', status: 'Proposed', detail: 'Nursing-home-type patient provisions and residual benefit rules that surface in long-stay disputes.' },
  { name: 'Australian Consumer Law (misleading conduct, unfair terms)', status: 'Proposed', detail: 'The unfair-contract-terms regime now covering standard-form small-business contracts — relevant to HPPA clauses.' },
]
