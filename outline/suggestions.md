# Suggestions register — recommended next moves

*Maintained by the build agent; founder decides. Prioritised within each group.
Status: proposed unless marked otherwise.*

## A. Demo-level quick wins (hours each, strengthen the pitch now)

1. **Federation fund-intelligence profile + fund switcher.** Fund intelligence
   currently profiles AusCare only. A second profile makes the "every fund gets
   a dossier" claim visibly true and sets up the Aug-2027 Federation renewal
   story already used in Historical.
2. **Cross-suite links.** The Enquiry suite's comparison answers should link
   each cited clause straight into Clause intelligence (and vice versa: the
   clause drawer's "ask about this clause" → oracle). Makes the suites feel
   like one platform, not four apps.
3. **Excel export for the lever + change registers.** The RI workbench already
   exports .xlsx; boards will want the lever register and change register the
   same way. Reuses the existing SheetJS path.
4. **Presenter mode.** A subtle guided-tour overlay stepping through the
   10-minute demo path (the sequence currently lives in chat/README). Keeps a
   nervous first-time presenter on rails.
5. **Session persistence toggle.** Valuation overrides and package selection
   reset on refresh (deliberate between demos). Add an explicit "reset demo"
   button instead, so an accidental refresh mid-meeting doesn't wipe the
   override you just performed.

## B. Real-build de-riskers (the two venture-deciding risks, made concrete)

6. **Benchmark source strategy.** The demo's "vs synthetic state medians" line
   must become a lawful, defensible source. Candidate stack: IHACPA/AR-DRG
   public cost weights + published second-tier schedules + (later) opt-in
   de-identified aggregates gated by competition-law advice. This is the single
   highest-value research task before the seed conversation.
7. **Evaluation harness before any live model.** The synthetic pack (two
   HPPAs, planted traps, known-correct comparisons) is the seed corpus; build
   the harness and score generated clause analysis against the hand-authored
   bar in this repo. Target: zero confidently-wrong clause readings.
8. **PAS integration spike.** One pilot site, one PMS, flat extracts first
   (episode/billing CSVs) before any HL7/FHIR ambition — the RI import flow
   already defines the data shape needed.
9. **Security/tenancy baseline** (per NEXT-STEPS) before any real document.

## C. Go-to-market assets (cheap, high-leverage)

10. **Fill the deck's contact placeholder** (slide 17) — still outstanding.
11. **One-page PDF leave-behind** generated from deck slides 3–5 (asymmetry,
    cost, CORE framework) for post-meeting follow-up.
12. **Pilot LOI template** (one page: scope, data handling, NDA reference,
    success metrics from NEXT-STEPS) so a warm "yes" can be captured on the
    spot.
13. **3-minute screen recording** of the demo path for email follow-ups —
    the standalone HTML makes this trivial to capture.

## D. Story upkeep

14. **Partner brief full v2 pass.** Only §3.3 carries the commercial-
    intelligence positioning; sections 5–8 (sizing, model, GTM, competition)
    still tell the two-product story and undersell the platform.
15. **NEXT-STEPS refresh** to v2 reality (the "what the prototype doesn't
    prove" list is still accurate, but the pilot structure should now include
    the clause-valuation and leverage-index features in its success metrics).

---

### Founder suggestions — status ledger

| Suggestion (founder) | Status |
|---|---|
| Side-by-side contract comparison in Ask the Contract (termination 60 vs 90, payment 14 vs 20) | **Built** — Enquiry suite portfolio comparisons (tables + per-contract citations); adapted payment example to 14 days vs 15 business days (≈21 calendar) to keep the AusCare storyline intact (D10) |
| Cross-contract clause pull-out with valuation as negotiation levers | **Built** — Clause intelligence register + lever register (W1) |
| Modular purchasing (suites/modules) | **Built** — CORE landing + licensing strip |
| CORE suite architecture (C/O/R/E) | **Built** |
| Revenue Integrity audit platform (import → PAS → respond → Excel → dashboards) | **Built** |
| Brand adoption (hex-C, navy/cyan/blue) | **Built** |
| v2 extension (intelligence engines, leverage index, optimiser, change engine) | **Built** (waves 1–4) |
