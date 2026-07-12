# NEXT-STEPS — honest assessment and the path to a pilot

## What the prototype proves — and what it doesn't

**Proves:**
- **The product shape works.** The stepped copilot (position → posture → letter →
  digest → counter → board pack) is legible to a non-specialist in one sitting, and
  the "choose your own adventure with a human veto" spine holds up as UX, not just
  as a slogan.
- **The domain content is the product.** The most persuasive screens are the ones
  where the *analysis* is sharp — the trap-flagging in the fund's reply, the priced
  second-tier BATNA, the sought-vs-settled board table. That content was authored by
  hand for this demo; the venture's real job is producing it reliably from live data.
- **The trust furniture matters.** Citations with clause references, confidence
  ratings, the explicit "the contract is silent — escalate" answer, and the
  competition-law refusal all demo well and differentiate from generic AI tools.
- **A credible look is achievable cheaply.** The design system (tokens, serif
  documents, restrained palette) reads as a funded product.

**Does not prove:**
- **That a model can generate this quality from real inputs.** Every output was
  authored at build time. Nothing here demonstrates real HPPA parsing accuracy,
  benchmark computation, or drafting quality on unseen contracts. That is the core
  technical risk, and it is untested by design (no API key in this project).
- **That the synthetic numbers reflect real negotiation dynamics.** Bayview,
  AusCare, the rate gaps and the settlement are invented. Real rate benchmarking
  needs real (or properly licensed) comparator data — which mostly does not exist
  publicly at item-group level. Building a defensible benchmark source is an open
  product problem, with competition-law constraints on how it can ever be built.
- **Willingness to pay.** The ROI story is arithmetic, not evidence.
- **Data access and security.** No real hospital data has been touched, so nothing
  about ingestion, PMS/ECLIPSE integration, or de-identification is validated.

## From prototype to pilot — the gate is security and legal, not features

Before any real hospital document enters the system:
1. **Security baseline:** per-tenant isolation, encryption in transit/at rest,
   Australian data residency, access logging, deletion guarantees; independent
   security review of the stack. (The prototype is local-only and makes no network
   calls — production is a different animal.)
2. **Privacy:** Privacy Act/APP mapping, a data-handling agreement template for
   pilots, and a position on de-identified patient-level extracts (HCP-style data
   is sensitive even de-identified).
3. **Legal rails:** competition-law review of the benchmarking design (public
   aggregates only; no cross-customer rate exposure); "not legal/financial advice"
   positioning reviewed; professional indemnity cover quoted.
4. **Model pipeline with evaluation:** replace the canned content layer with a
   retrieval-grounded generation pipeline, and build the evaluation harness *first*
   — the synthetic pack in `prototypes/shared-data/` is deliberately reusable as
   its seed corpus (known-correct answers, planted traps).

## Suggested pilot structure

- **Sites:** 2–3 friendly day hospitals, selected by renewal date (an HPPA
  expiring in 4–9 months), ideally via Day Hospitals Australia / APHA warm intros.
- **Duration:** 12 weeks per site, timed to the live negotiation.
- **The deal:** free access + a real positioning paper and drafted correspondence
  for their live renewal, in exchange for data access under NDA, fortnightly
  feedback, and (on success) a referenceable outcome.
- **Success metrics, agreed up front:**
  1. Realised rate/terms movement vs the fund's opening offer (primary);
  2. CEO-assessed quality of the positioning paper and letters (would they have
     paid? how much?);
  3. Contract Agent answer accuracy on a held-out question set built from their
     own HPPA (target: zero confidently-wrong answers; "silent → escalate"
     behaviour verified);
  3a. Clause-intelligence quality: unfair-clause flags and valuations reviewed
     by the CEO against their own agreement (target: no material clause missed;
     valuations defensible enough to table);
  3b. Leverage-index credibility: the decomposed factor table survives the
     CEO's — and ideally an ex-fund adviser's — scrutiny;
  4. Time actually spent by the CEO vs their last negotiation.
- **Kill criteria (honesty forcing-function):** if the copilot's analysis finds
  nothing a competent reading wouldn't, or model outputs need so much correction
  that the pilot is really a consulting engagement, say so and rethink before
  raising.

## 90-day action plan

**Days 0–30 — credibility and recruitment**
- Fill the deck's contact placeholder; register the venture identity.
- 10 discovery conversations with day hospital CEOs/owners (DHA/APHA networks);
  demo at the end, not the start.
- Sign 2–3 pilot LOIs keyed to renewal dates; engage a health-sector lawyer on
  the NDA/data-handling template and the competition-law rails.
- Begin the co-founder search in earnest (health contracting operator or senior
  AI engineer, whichever the founder isn't).

**Days 31–60 — build the real spine**
- Stand up the secure ingestion + retrieval pipeline (one tenant, one contract).
- Build the evaluation harness on the synthetic pack; extend it with the first
  pilot's (redacted) HPPA once the NDA is in place.
- Reproduce the demo's positioning paper from *generated* output for the pilot
  site; measure the gap to the hand-authored bar.

**Days 61–90 — prove it in one live negotiation**
- Support pilot #1 through at least one full correspondence round.
- Capture the success metrics; write the case study with the site's sign-off.
- Use measured outcomes to set pricing and open the seed conversation.

## Consolidated recommendation

The wedge is right (day hospitals, negotiation moment), the trust architecture is
right (human-in-the-loop, cite-everything, escalate-on-silence, override-with-audit-
trail), and the demo — now the full CORE platform with clause valuation, leverage
decomposition, package optimisation and change tracking — is strong enough to open
doors. See docs/benchmark-strategy.md for the benchmark-source plan (the largest
open product risk) and outline/pilot-loi-template.md for pilot capture. The two things that decide whether this becomes a
company are **generated-output quality on real contracts** and **a lawful,
defensible benchmark source** — spend the next 90 days de-risking exactly those
two, and let everything else stay as light as it is now.
