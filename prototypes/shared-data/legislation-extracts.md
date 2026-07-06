# Legal framework — curated plain-language extracts

> These are **plain-language summaries of real, public Australian law and rules**,
> curated as grounding material for the Contract Agent prototype. They are
> paraphrases, not the legal text; always consult the current instruments on
> legislation.gov.au and health.gov.au. **Not legal advice.**

## L1 — Private Health Insurance Act 2007 (Cth) — structure
The PHI Act governs complying health insurance products, insurer conduct, and the
benefit framework. Hospital purchaser–provider agreements (HPPAs) sit within this
framework: where a hospital and insurer have an agreement, benefits are payable per
that agreement; where they do not, the default benefit arrangements in the Benefit
Requirements Rules apply.

## L2 — PHI (Benefit Requirements) Rules — default benefits
Where no HPPA exists, insurers must still pay minimum default benefits for hospital
treatment. For eligible facilities this includes the **second-tier default benefit**.

## L3 — Second-tier default benefit
A hospital that is accredited and **second-tier eligible** must be paid, for an
episode with a fund it has no agreement with, **at least 85% of the average amount
that fund pays for the equivalent episode under its negotiated agreements with
comparable private hospitals in the same state**. Practical consequences:
- It is a *floor*, pegged to other hospitals' negotiated outcomes minus 15% — it
  moves when the market moves, and the fund can compute it precisely.
- Eligibility is not automatic: it requires accreditation and registration through
  the applicable process, renewed on the required cycle.
- For a day procedure centre, second-tier is the realistic BATNA in any HPPA
  negotiation; episodes also expose patients to gap risk, which drives complaints
  and member churn — a cost to the fund, not only the hospital.

## L4 — PHI (Accreditation) Rules
Set the accreditation requirements private hospitals must meet (NSQHS Standards
assessment) — a precondition both for licensing arrangements and second-tier
eligibility.

## L5 — Informed financial consent (IFC)
Patients must be given clear information about out-of-pocket costs before treatment
wherever practicable. For a day facility this covers excesses, excluded services
(HPPA Schedule 2 items), and any agreed upgrades (e.g. premium lenses). Industry
codes and fund rules impose documentation expectations; failure to obtain IFC
generally means the facility cannot recover the amount from the patient.

## L6 — Competition law boundary (Competition and Consumer Act 2010)
Cartel provisions prohibit competitors agreeing on prices. A hospital may lawfully
negotiate its own rates with a fund, and small businesses may collectively bargain
with a counterparty under the ACCC's **collective bargaining class exemption**
(subject to its conditions and notification) — but hospitals must not exchange or
align their negotiated rates with competing hospitals outside such a framework.
The Contract Agent must refuse to facilitate rate comparison with other named
hospitals' confidential terms.

## L7 — Privacy Act 1988 (Cth) & APPs
Hospital financials and contracts are commercially sensitive; patient data is
health information (sensitive information) under the APPs. Any real deployment
requires privacy-by-design, Australian data residency by preference, and strict
per-organisation isolation. The prototype contains only synthetic data.
