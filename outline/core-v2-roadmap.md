# CORE v2 roadmap — refined plan and next steps

*The v2 extension (`docs/core-extension-v2.md`) reviewed under the council
protocols (`docs/review-protocols.md`) and turned into a sequenced build plan.
Status: agreed direction; Wave 1 ready to start on the founder's go.*

---

## 1. What we're building (in one paragraph)

CORE evolves from contract intelligence into the **commercial intelligence
layer between Australian private hospitals and health funds** — reasoning like
an experienced fund contract executive: researching, benchmarking, valuing,
recommending and explaining, with evidence attached to everything. The
Negotiation Agent stays the flagship; every v2 capability exists to make the
next negotiation stronger.

## 2. The one structural decision (made now, saves pain later)

**Demo the outputs, architect the inputs.** The prototype remains a canned,
synthetic, no-network demo — so we do not build fake ingestion plumbing.
Instead every v2 capability is expressed as a **typed data contract**
(fund profile, hospital profile, clause record, lever, change item — each with
`evidence[]`, `confidence`, `provenance`, `method`) populated from synthetic
fixtures today and from real pipelines (APRA/ABS/AIHW/IHACPA/DoH/ACCC, PAS,
uploads) in the funded build. The contracts are the product architecture; the
fixtures are the demo.

## 3. Council review of the v2 spec (condensed, per protocol)

**Assumptions surfaced:** (1) demo remains canned/synthetic; (2) the audience
for v2 screens is CEO/board-level, same as v1; (3) "continuously gather"
describes the real product, not the prototype; (4) AusCare remains the demo's
live negotiation.

**Adversarial round — the criticisms that changed the plan:**

1. **Skeptical Reviewer — the Leverage Index could be a vibes number.** A
   composite score presented as objective truth is exactly the kind of AI
   output a fund's team would shred in a real negotiation. *Resolution:* the
   index ships only as a fully decomposed instrument — every factor visible,
   weighted, evidence-linked, with "what raises / what lowers" and an explicit
   methodology note; the demo labels the methodology itself as illustrative.
   The score is the summary of an argument, never a substitute for one.
2. **Skeptical Reviewer + Security — competition-law bright line under
   pressure.** "Historical negotiation behaviour" and "external benchmarking"
   drift toward pooling confidential outcomes across customers. *Resolution:*
   the Intelligence Engine's stated data policy is public sources + the
   customer's own history, per-tenant, full stop. Cross-customer intelligence
   is architecturally excluded, not just policy-excluded. This goes in the
   data contracts and the partner brief.
3. **Product Manager — the 14-step Workspace V2 would kill the demo's best
   asset.** The current 6-step copilot is legible to a CEO in one sitting;
   fourteen nav steps is a project-management tool. *Resolution:* keep the
   6-step spine; the new stages become **richer content inside existing
   steps** (research/fund/hospital/benchmark/risks/opportunities/leverage all
   surface inside "Analyse position" as an Intelligence tab set; scenarios
   inside Strategy; board outputs inside Close-out). Fold, don't multiply.
4. **Architect — three valuation methods are one interface.** Automated,
   rules-based and human-in-the-loop valuation differ by `method`, `inputs`
   and `confidence`, not by shape. One `Valuation` type with an override
   history gives the audit trail for free and stops three parallel UIs.
5. **Design Council — data-dense ≠ dense UI.** Clause registers, heatmaps and
   change registers invite table sprawl. *Resolution:* progressive disclosure
   (register rows → drawer detail, as the RI workbench already does), no new
   top-level nav beyond one "Intelligence" entry per existing suite section,
   and the existing token system covers everything — no new colours.

**Verdict on the v2 spec as refined: APPROVE WITH CHANGES** (the five above).
Confidence 80% · technical risk Low (demo) / Medium (real build) · business
risk Low — the extension strengthens the wedge rather than diluting it.

## 4. The build waves

### Wave 1 — Contract Clause Intelligence + Fund Intelligence (the founder's ask, first)
*The highest-value extension of what exists; directly powers the flagship.*

- **Clause Intelligence Engine (demo):** every clause of both synthetic HPPAs
  classified (14 categories), risk-rated, burden-rated, plain-English
  explained; **unfair/arduous/penalty clauses flagged with reasons** — the
  five already-planted AusCare terms become the worked examples, joined by a
  fuller register.
- **Clause Valuation:** one `Valuation` interface, three methods — automated
  (wired to the synthetic PAS/activity data), rules-based, and
  **human-in-the-loop** (annual value, negotiation value, strategic
  importance, confidence, rationale — editable in the UI with an override
  audit trail).
- **Negotiation Lever Register:** per contract — issue, why it matters, value,
  ease, likelihood, recommended + fallback positions, dependencies, evidence.
  Feeds Strategy directly.
- **AusCare fund intelligence profile page:** financial / commercial /
  negotiation-behaviour intelligence (synthetic, APRA-shaped) + **Negotiation
  Leverage Index** with full decomposition and posture recommendation.
- **Dependency visual:** Bayview↔fund dependency (revenue share vs local
  alternatives vs service uniqueness) on the profile page.

### Wave 2 — Package Optimiser + Commercial Dashboard
- **Package Optimiser:** select levers → bundled packages (must-have vs
  tradeable), concession strategy, sequencing, **total commercial opportunity**
  figure; scenario presets aligned to the three existing postures.
- **Commercial Dashboard:** total opportunity, high-risk clauses, clause risk
  heatmap, burden + complexity + readiness scores, top-ten priorities,
  progress tracking. Extends the existing dashboard patterns.
- Hospital intelligence panel (catchment, competitors, capacity — synthetic).

### Wave 3 — Contract Change Intelligence
- **Version comparison:** AusCare's proposed renewal draft vs current contract
  (the fund-reply traps — the 50%-CPI rewording, Schedule 4 — become tracked
  change items), visual diff with per-change impact, favourability, value and
  priority.
- **Negotiation Change Register:** originator, status, owner, value, decision
  history, final position, implementation actions — the negotiation's central
  working document.
- **Hospital-proposed clause builder:** one polished worked example (a quality
  incentive clause: AI-drafted wording, rationale, impact, predicted fund
  objections, fallback drafting).
- **Scenario modelling:** accept / partial / reject / counter outcomes per
  proposal with recommended next responses.

### Wave 4 — Board outputs + platform story
- Board-output pack completion: risk register, talking points, implementation
  plan variants from Close-out (the CEO brief, board paper and exec summary
  patterns already exist).
- Landing + sidebar: fold new screens under existing suites (Contracting gains
  "Fund intelligence" and "Levers"; no sprawl); future-agents map on the
  landing roadmap row and in the deck.
- Partner brief v2 + deck refresh: "commercial intelligence platform"
  positioning, Leverage Index and clause-valuation as headline features; both
  deck formats and the standalone demo rebuilt.

**Every wave gates through:** condensed LLM Council review → Design Council
pass on new screens → full-flow verification → renders to the founder →
rebuilt `core-demo.html` → commit/push.

## 5. What stays out of the prototype (real-build backlog, by design)

Live APRA/ABS/AIHW/IHACPA ingestion and news monitoring · real PAS
integration · actual LLM reasoning pipelines with citation verification ·
cross-document retrieval at scale · authentication/tenancy/security hardening
· the nine future agents beyond naming. These are architecture-shaped in the
data contracts and priced into the funded build — faking them in a canned demo
would weaken, not strengthen, the pitch.

## 6. Sequencing rationale

Wave 1 is first because it is (a) the founder's explicit ask (unfair-clause
identification + valuation as negotiation levers), (b) the shortest path to a
visibly smarter flagship, and (c) the foundation the Optimiser (W2) and Change
Engine (W3) both consume — levers must exist before they can be bundled or
tracked through a negotiation.
