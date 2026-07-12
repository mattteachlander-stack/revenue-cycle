# Benchmark source strategy (suggestion B6)

*The demo says "vs synthetic state medians". The funded build needs a lawful,
defensible replacement. This memo is the working strategy; competition-law
review is a gate on every stage.*

## The problem

Funds hold private, item-level benchmarks of every comparable facility's
negotiated rates. Hospitals hold nothing. CORE cannot fix this by pooling
customers' confidential rates — that is the cartel-risk path the platform is
architected to exclude. The benchmark must be built from sources a single
hospital could lawfully hold.

## Staged source stack

**Stage 1 — public cost anchors (build first, zero legal risk).**
- **IHACPA**: National Efficient Price determinations, AR-DRG cost weights and
  the National Hospital Cost Data Collection — the public backbone for
  "what does this episode cost to deliver" by DRG. A contracted case payment
  can be expressed as a multiple of NEP×cost-weight, giving every facility an
  identical, public yardstick without touching anyone's rates.
- **Second-tier default schedules**: funds publish second-tier benefit
  schedules; 100/85 × second-tier is a defensible floor-derived estimate of a
  fund's average contracted rate per classification — public by construction.
- **MBS fees + Prescribed List benefits** for component-level sanity checks.

**Stage 2 — own-tenant longitudinal benchmarks.**
Each customer's own remittance history vs its own contracts: indexation
realised vs CPI, effective rate drift, band mix shifts. No cross-tenant data;
enormously persuasive in a negotiation ("our effective rate fell 4.1% in real
terms over the term").

**Stage 3 — aggregate market indicators (legal-gated).**
Only with specific competition-law advice: opt-in, k-anonymised, delayed and
banded aggregates (e.g. "median indexation achieved across ≥20 consenting
facilities, ±0.5pt bands, 12-month lag") — the design goal is that no
participant can infer any other participant's position. If counsel can't get
comfortable, Stage 3 is dropped; Stages 1–2 already beat what a CEO has today.

**Never:** raw or reconstructable customer rates shown to any other customer;
any output that could coordinate pricing between competing hospitals.

## Action items (funded build, first 60 days)

1. Ingest IHACPA NEP + cost weights; map both synthetic HPPAs' schedules to
   DRG-anchored multiples as the proof-of-method.
2. Collect published second-tier schedules for the top 5 funds; build the
   ÷0.85 estimator with error bars.
3. Brief competition counsel on Stage 3's k-anonymity design before writing
   any code for it.
