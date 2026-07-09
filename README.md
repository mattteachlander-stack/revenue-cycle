# CORE — revenue cycle intelligence for Australian private & day hospitals

An AI-assisted negotiation and contract-intelligence platform concept for Australian
private hospitals — especially small independents and **day procedure centres** — that
negotiate **Hospital Purchaser–Provider Agreements (HPPAs)** with health funds without
dedicated contracting expertise.

Three deliverables live in this repo:

| Deliverable | Where | Status |
|---|---|---|
| Partner & investor brief (the deep artefact) | [`outline/partner-brief.md`](outline/partner-brief.md) | ✅ Phase 1 |
| Pilot-site pitch deck (day hospital CEOs) | [`deck/core-pilot-deck.pptx`](deck/) | ✅ Phase 2 |
| Working prototype (Negotiation Agent + Contract Agent) | [`prototypes/app/`](prototypes/app/) | ✅ Phase 4 |

Supporting material: research source map in [`outline/sources.md`](outline/sources.md),
synthetic demo data in [`prototypes/shared-data/`](prototypes/shared-data/), decision log in
[`DECISIONS.md`](DECISIONS.md), honest wrap-up in [`NEXT-STEPS.md`](NEXT-STEPS.md).

## The platform — CORE

**CORE** (by Counterpart Health) is four suites, each with modules beneath:
**C**ontracting (negotiation copilot + historical value realisation), **O**perational
(provisional DRG, AI coding, billing bots — concept previews), **R**evenue Integrity
(fund audit response live; proactive optimisation on the roadmap), and **E**nquiry
(cited, cross-contract Q&A). Licence all of it or only the strategic pieces.

### The two founding products

- **Negotiation Agent ("the copilot")** — a human-in-the-loop HPPA negotiation copilot:
  public-data benchmarking (APRA, Ombudsman, AIHW), contract digestion, positioning
  paper with target/anchor/walk-away and a modelled second-tier-default BATNA,
  choose-your-own-adventure strategy, drafted correspondence, fund-response analysis,
  and board-ready close-out. The human always decides; nothing is sent autonomously.
- **Contract Agent ("the oracle")** — staff-facing Q&A grounded in the organisation's
  executed HPPAs, the PHI legislative framework, and internal policy. Every answer
  cites its source and states confidence; where the contract is silent it says so and
  recommends escalation.

## Running the prototype

```bash
cd prototypes/app
npm install
npm run dev
```

The prototype is a **canned demo**: all "AI" outputs were authored at build time and
replayed with simulated streaming. It makes **no network calls and contains no API
key**. All facility, fund, and contract data (Bayview Day Surgery, AusCare Health, and
the sample HPPA) is **synthetic** — no real hospital or contract data exists in this
project. Nothing here is legal or financial advice.
