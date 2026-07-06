# Claude Code Project Brief — Private Hospital Revenue Cycle Intelligence (Australia)

## Role and mission

You are acting as a combined product strategist, healthcare revenue-cycle domain analyst, and full-stack prototype engineer. Your mission in this project is to produce three deliverables:

1. **A detailed business brief for potential partners/co-founders and investors** — thorough, evidence-based, readable as a standalone document.
2. **A pitch deck aimed at potential pilot hospital sites** — persuasive, visual, written for a day hospital CEO/owner, answering "what's in it for my facility and what does a pilot involve".
3. **One working prototype with a clean, highly professional UI** — a polished demo that could credibly be shown to a hospital board or an investor without apology.

## Working style — run autonomously

Work through all phases end-to-end without stopping for approval. Make sensible decisions yourself and record them in a `DECISIONS.md` file as you go so I can review your reasoning afterwards. Only stop if you hit a genuine blocker (something you cannot resolve or a choice that would fundamentally fork the project). At the end, give me a single consolidated summary of everything produced, key decisions taken, and what you'd recommend changing.

## The business concept

Australian private hospitals — especially small independents and day hospitals (day procedure centres) — negotiate Hospital Purchaser Provider Agreements (HPPAs) with private health insurers. In small organisations this is typically done by the CEO or a business manager without dedicated contracting expertise, without market benchmarking, and without time. The result is suboptimal rates, weak indexation clauses, unfavourable commercial terms, and unnoticed revenue leakage. The venture's thesis: an AI-assisted platform can give a 20-bed day surgery the negotiation and contract-compliance capability of a major hospital group's contracting team.

The long-term product family covers the complete revenue cycle: rate negotiation, commercial/contractual term optimisation, and revenue-leakage prevention via audit. The first tranche is two products:

### Product 1 — Negotiation Agent ("the copilot")

A human-in-the-loop negotiation copilot for HPPA negotiations with health funds. It must:

- **Ingest public industry intelligence**: APRA quarterly PHI statistics (membership, benefits paid, gross margins, management expense ratios), annual premium round approvals per fund, fund annual reports, Commonwealth Ombudsman State of the Health Funds data (complaints, benefit ratios), AIHW hospital activity data, second-tier default benefit rates as the structural fallback/BATNA.
- **Ingest confidential hospital data** (in the real product; synthetic in the prototype): financial performance, case mix / DRG profile, service line volumes, payer mix, cost per episode, capacity and growth plans.
- **Digest the current contract**: parse the existing HPPA — rates schedules, indexation, exclusions, banding, case payment vs per diem structures, quality/KPI clauses, termination and dispute provisions.
- **Produce a positioning paper and negotiation posture**: where the hospital sits vs market, fund-specific leverage points, target/anchor/walk-away rates, and risk assessment including the second-tier default scenario.
- **Run as a "choose your own adventure"**: at every decision point, present the human negotiator with options, risks, and likely fund responses. The human always chooses; the agent never sends anything autonomously.
- **Generate all correspondence**: opening letters, counter-offer emails, escalation letters — in a professional, fund-appropriate register.
- **Digest fund responses**: summarise what the fund's letter actually means, flag traps in proposed wording, suggest next moves and draft replies, and pivot strategy when the fund's posture changes.
- **Produce close-out materials**: board-ready presentation of the agreed outcome, financial impact modelling, and internal staff communications on operational changes.

### Product 2 — Contract Agent ("the oracle")

A staff-facing Q&A agent, bespoke to each organisation, answering compliance and interpretation questions grounded in: (1) the organisation's executed HPPAs, (2) wider legislation — Private Health Insurance Act 2007, PHI (Benefit Requirements) Rules, PHI (Accreditation) Rules, second-tier default provisions, informed financial consent obligations — and (3) internal decisions and policies. Every answer cites its source and states confidence; where the contract is silent, it says so and recommends escalation rather than inventing an answer.

## Phase 1 — Research and detailed partner brief

Use web research to ground everything in current, real Australian data. Key sources: APRA PHI statistics, Department of Health and Aged Care (including the Private Hospital Sector Financial Health Check), the Commonwealth Ombudsman's State of the Health Funds report, AIHW, APHA and Day Hospitals Australia, ACCC (buying-group authorisations for AHSA and Honeysuckle Health, and the collective bargaining class exemption for small businesses), and recent sector news on private hospital viability (e.g. the Healthscope receivership and fund–hospital contract disputes) as evidence of the market pain.

Produce `outline/partner-brief.md` — a **detailed** document (this is the deep artefact; the pitch deck will be the light one) covering:

1. **Market context** — sector size, number of private hospitals and day hospitals, insurer concentration (Bupa, Medibank, HCF, nib, HBF plus the AHSA and Honeysuckle Health buying groups), the structural power imbalance, second-tier default as the weak fallback, and current viability pressures. Quantify with cited public data.
2. **The problem** — told from the perspective of a small day hospital CEO negotiating against a national fund's contracting team.
3. **The solution** — both products, described concretely with example workflows.
4. **Why now** — AI capability inflection, sector financial stress, regulatory attention on fund–hospital contracting.
5. **Market sizing** — TAM/SAM/SOM with stated assumptions; be honest about uncertainty.
6. **Business model** — evaluate annual SaaS per facility, per-negotiation engagement pricing, tiered by theatre/bed count, and hybrid software + advisory; recommend one with rationale and indicative pricing.
7. **Go-to-market** — pilot strategy, channels (Day Hospitals Australia, APHA, health consultants, accountants serving day hospitals), reference-customer flywheel.
8. **Competitive landscape** — existing health contracting consultants, benchmarking services, generic AI tools; our differentiation and defensibility.
9. **Risks and mitigations** — data confidentiality (Privacy Act/APPs), "not legal advice" positioning and professional indemnity, fund hostility, hallucination risk in contract interpretation, and a prominent flag for legal review: the product must never facilitate price coordination between competing hospitals (competition law).
10. **Roadmap** — Tranche 1 (these two products), Tranche 2 (revenue-leakage audit: claims-vs-contract reconciliation, underpayment detection), Tranche 3 (full revenue-cycle suite).
11. **The ask and 90-day plan** — what we want from partners, investors, and pilot sites respectively.

Include an executive summary up front. Depth is welcome here — this document should survive scrutiny from a sophisticated health-sector investor.

## Phase 2 — Pilot-site pitch deck

Produce a slide deck aimed at **potential pilot hospitals** (day hospital CEOs/owners). Use the pptx skill and make it visually professional — consistent design system, restrained palette, no clip-art defaults. Roughly 12–16 slides:

- The pain, in their language (one negotiation cycle story).
- What the fund knows that you don't (the information asymmetry, with real public data points).
- The two products, shown via screenshots from the prototype (build the prototype first if needed, or add screenshots as a final pass).
- What a pilot involves: duration, their commitment, data handling and confidentiality, what they get (e.g. free/discounted access, a positioning paper for their next negotiation).
- Security and "human in the loop" as trust features.
- Who we are / the ask / next step.

## Phase 3 — Synthetic data pack

Create `prototypes/shared-data/`:
- A fictional facility: "Bayview Day Surgery" — a 4-theatre day hospital in suburban Melbourne with ophthalmology, gastroenterology, orthopaedic day cases, and plastics. Realistic synthetic P&L, case mix, volumes, payer mix.
- A fictional fund: "AusCare Health" — mid-tier insurer with realistic synthetic figures loosely modelled on public APRA aggregates.
- A synthetic current HPPA between them (10–15 pages): rate schedules by band/procedure group, CPI-linked indexation with a discretionary carve-out, exclusions, a 90-day termination clause, and 2–3 deliberately unfavourable terms for the agent to find and surface in the demo.

## Phase 4 — Prototype

Build **one** polished prototype in `prototypes/app/` — a single web application with the **Negotiation Agent as the hero experience** and the Contract Agent included as a second section/tab if it can be done without diluting polish. It must run locally with `npm install && npm run dev` and use the Anthropic API for the intelligence layer.

**UI quality is a first-class requirement.** Before writing any frontend code, read and apply the frontend-design skill. Target the aesthetic of premium health/fintech SaaS: a deliberate design system (typography, spacing, colour tokens), a restrained professional palette, real information hierarchy, considered empty/loading states, and streamed AI output that renders as well-formatted documents — not raw markdown dumps. It should look like a funded product, not a hackathon demo. No default component-library styling left visibly untouched.

Demo flow (Negotiation Agent):
1. Dashboard: facility profile, contract summary, key dates, headline "position vs market" indicators.
2. "Analyse position" → generates the positioning paper and negotiation posture (streamed, beautifully formatted, exportable).
3. Strategy screen: 3 posture options (e.g. collaborative uplift / assertive re-band / restructure to case payments), each with risk and likely-fund-response notes — the choose-your-own-adventure spine.
4. Correspondence generator: opening letter to the fund based on the chosen posture.
5. "Fund response" step: paste or pick a canned fund reply → the agent digests it, flags traps in the wording, proposes next moves and a draft counter.
6. Close-out: board pack summary of a hypothetical agreed outcome.

Contract Agent tab (if included): chat with RAG over the synthetic HPPA, curated public legislation extracts, and a synthetic internal decisions register; every answer cites clause/source; ambiguity produces an explicit "the contract is silent — escalate" answer; 8–10 suggested example questions on the landing screen.

Everything visibly (but tastefully) marked as a demo on synthetic data, and a persistent "not legal or financial advice" note in the footer.

## Phase 5 — Wrap-up

Produce `NEXT-STEPS.md`: honest assessment of what the prototype proves and doesn't, the path from prototype to pilot (real data access needed, security work required before touching real hospital data), suggested pilot structure (2–3 friendly day hospitals, success metrics), and a 90-day action plan. Finish with the consolidated summary described under "Working style".

## Constraints

- **Public and synthetic data only.** No real hospital or contract data exists in this project yet. Never present synthetic figures as real; label them.
- **Australian context throughout** — terminology (HPPA, second-tier default, health fund, day procedure centre), Australian spelling, legislation, and market structure. Do not drift into US payer/provider framing.
- **Human-in-the-loop is a design principle**, not a disclaimer, and the partner brief and deck should present it as a feature.
- Commit meaningfully at each phase; keep a clean root README explaining the repo and how to run the prototype.
- If a phase is ballooning, cut scope yourself in favour of polish on what remains, and note the cut in `DECISIONS.md`.
