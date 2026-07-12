# DECISIONS.md

A running log of decisions taken while building this project, with rationale, so
they can be reviewed afterwards. Newest phase at the bottom.

## Ground rules carried across every phase
- **Australian framing only.** HPPA (Hospital Purchaser–Provider Agreement), health
  fund (not "payer"), day hospital / day procedure centre (not "ASC"), second-tier
  default benefit, second-tier eligibility, informed financial consent, Australian
  spelling. No US payer/provider language.
- **Public + synthetic data only.** Real figures are cited to a public source with a
  date. Synthetic figures (Bayview, AusCare, the sample HPPA) are always labelled
  synthetic and never presented as real.
- **Human-in-the-loop is a feature**, presented as such — the agent proposes, the
  human decides, nothing is ever sent autonomously.

## D0 — Repository & branch
- **Decision:** Build the whole project in the dedicated `mattteachlander-stack/revenue-cycle`
  repo, on `main`.
- **Why:** This healthcare product is unrelated to the Markable repo that the session
  opened in; the user explicitly created and pointed at `revenue-cycle`. It is a fresh
  solo repo initialised on `main`, so `main` is the natural trunk. Commit meaningfully
  at each phase (brief requirement).

## D1 — Canned demo mode (no API key)
- **Decision:** The prototype makes **no runtime model/API calls and contains no API
  key.** Every "AI" output is authored at build time and stored as content modules;
  the UI streams them with a simulated typing effect so the experience feels generated.
- **Why:** The user explicitly required this ("you author all AI outputs at build time,
  no API key exists in this project"). It **overrides the brief's line 78** ("use the
  Anthropic API"). Benefit: the demo is deterministic and cannot fail live in front of
  a board or investor; it also keeps the repo safe to share (no secrets, no egress).
- **Consequence:** `NEXT-STEPS.md` will be explicit that the live product replaces the
  canned content layer with a real, security-reviewed model integration over the
  organisation's confidential data.

## D2 — Phase 1 sourcing
- **Decision:** Ground the brief in a fixed set of authoritative public sources (APRA
  quarterly/annual PHI stats; Dept of Health & Aged Care Private Hospital Sector
  Financial Health Check; Commonwealth Ombudsman State of the Health Funds; AIHW; ACCC
  buying-group authorisations + small-business collective bargaining class exemption;
  APHA / Day Hospitals Australia; second-tier default rules; Healthscope sector news).
  Full list with URLs in `outline/sources.md`.
- **Why:** These are the canonical, defensible references a sophisticated health-sector
  investor would expect, and they map one-to-one onto the data the real Negotiation
  Agent would ingest.
- **Honesty note:** Some figures are the most recent published at time of writing
  (mid-2026) and are cited with their period. Where a precise number could not be
  independently reconfirmed, the brief states the figure as "reported/approx." rather
  than asserting false precision.

## D3 — Phase 1 verification pass (live web check of load-bearing figures)
- **Verified against live sources (July 2026):** APRA Dec 2025 quarter — insurance
  revenue $8.6bn, insurance service result $468m, NPAT $417m, net assets $13.1bn,
  PCA coverage ratio 2.51. Health Check — 647 hospitals / 36,000+ beds (Jul 2024);
  data from 243 hospitals (58% separations, 63% revenue); **profit margins 5.1%
  (2020–21) → −0.1% (2023–24)**; private hospitals deliver >40% of admissions and
  ~70% of elective surgery. Market shares (2025): Medibank 27.1% (incl. ahm), Bupa
  24.9%, HCF 12.5%, nib 9.6%, HBF 7.7% — top five ≈ 80%.
- **Corrections made:** (1) replaced the unverifiable "one-third of hospitals running
  at ongoing losses / 1–2% margins" claim with the verified margin trajectory
  (5.1% → −0.1%), which is stronger anyway; (2) fixed insurer ordering (nib > HBF,
  not the reverse); (3) benefit-ratio stated as a range (84–86%) rather than a point.
- **Why:** the brief must survive investor scrutiny; every load-bearing figure now
  traces to a regulator/government source checked this month. health.gov.au and
  apra.gov.au block direct fetches through the session proxy, so verification used
  search-indexed content of the same primary documents; sources.md lists the primary
  URLs.

## D4 — Phase 3 synthetic data pack design
- **Payer names:** all funds in Bayview's payer mix are fictional (Federation Health,
  Wattle Group, AusCare Health) rather than real fund names, to keep every synthetic
  number visibly synthetic. Real names appear only in the partner brief where they
  cite real public data.
- **The planted unfavourable terms** (what the demo "finds"): cl. 12.3 discretionary
  indexation carve-out (already exercised: 1.9% paid vs 3.4% CPI), cl. 8.4 unilateral
  re-banding on 30 days' notice (already exercised: 4 ophthalmic item groups moved
  Band 2 → Band 1), cl. 14.5 24-month set-off/recovery paired with cl. 14.2's 30-day
  claim window, plus structural extras: asymmetric termination (fund 90 days /
  hospital 180 days, cl. 19.1), IOL bundled into the cataract case rate (cl. 10.2),
  no-indexation holdover (cl. 2.2), and KPI obligations with no upside (cl. 17.3).
  Deliberately more than the brief's 2–3 so the prototype can rank them.
- **Internal coherence:** the numbers reconcile — Bayview's AusCare revenue ($3.12m,
  1,690 episodes, $1,846 avg) is consistent with the Schedule 1 rates and case mix;
  the second-tier downside (~-15%) matches the 85% floor; EBITDA trend (7.8→6.1→4.9%)
  mirrors the sector squeeze in the Health Check. The app's fixtures mirror
  `bayview-financials.json`.
- **Demo "today":** July 2026; AusCare HPPA expires 30 Nov 2026; fund wants proposals
  by 31 Aug 2026 — gives the dashboard a live clock and urgency.

## D5 — Product identity
- **Decision:** the prototype presents as **"Counterpart Health — revenue cycle
  intelligence"**, with the negotiation flow as a stepped copilot ("the human always
  decides") and the Contract Agent as "Ask the contract".
- **Why:** the venture needed a name for the UI to feel like a funded product;
  "Counterpart" captures the thesis — the small facility becomes an equal counterparty.
  Trivially renameable.

## D6 — Prototype architecture & design choices
- **Stack:** Vite + React 19 + TypeScript + Tailwind v4 (custom token theme — no
  default component library anywhere), react-markdown for document rendering,
  lucide icons, self-hosted fonts (Inter for UI, Source Serif 4 for generated
  documents). Hash router so the built app also works from file-ish hosting.
- **Canned streaming:** `useStream` reveals pre-authored text in word chunks with
  variable cadence and paragraph pauses + a caret, with a visible "Skip animation"
  control. Every screen states "pre-authored / no live model calls" in the chrome.
- **Progression gating:** strategy unlocks after analysis; letter after posture;
  response after letter; close-out after counter — enforcing the choose-your-own-
  adventure spine in the demo itself. Changing posture re-drafts the letter and
  resets downstream steps.
- **Oracle free-text:** keyword-matches to the nearest canned answer; below a match
  threshold it returns an honest fallback explaining the demo boundary (never fakes
  an answer). One canned question deliberately demonstrates "the contract is silent
  — escalate" (Saturday lists), and one demonstrates the competition-law refusal
  (rate sharing with another facility).
- **Verification:** production build compiles clean; full flow driven end-to-end in
  headless Chromium (screenshots in `deck/assets/`, reused for the Phase 2 deck).

## D7 — Phase 2 deck (built after the prototype, deliberately)
- **Order swap:** the brief numbers the deck Phase 2, but it explicitly allows
  building the prototype first for screenshots. Did that: Phases 1 → 3 → 4 → 2 → 5.
  Slides 5–10 use real captures of the working demo, which is the deck's core
  credibility claim ("everything shown is working today").
- **Tooling:** no pptx skill exists in this environment, so the deck is generated
  with python-pptx from `deck/build_deck.py` — same design tokens as the app.
  Georgia/Calibri instead of Inter/Source Serif for cross-machine portability of
  the .pptx (embedded webfonts aren't reliable in PowerPoint).
- **Verification:** LibreOffice's pptx import is broken in this container, so the
  deck was verified structurally (python-pptx lint: shape bounds, run styling)
  rather than visually; two layout bugs found and fixed that way (multi-line dark
  title styling; screenshot overflow on slides 7/9).
- **Honesty rails:** every slide footer carries the synthetic-data + not-advice
  line; slide 3 uses only verified public figures (same set as the brief); slide 4
  is explicitly framed as a synthetic worked example; contact on slide 14 is a
  placeholder for the user to fill.

## D8 — Phase 5 wrap-up stance
- **Decision:** NEXT-STEPS.md leads with what the prototype does *not* prove
  (generated-output quality on real contracts; a lawful benchmark source;
  willingness to pay) and defines pilot kill criteria, rather than selling forward.
- **Why:** the brief demands an honest assessment; a sophisticated partner will
  trust the whole repo more if the wrap-up names the two venture-deciding risks
  plainly. The synthetic data pack is positioned as the seed of the future
  evaluation harness so Phase 3's effort compounds.

## D9 — Deck polish pass (user-requested)
- **Data graphics:** six charts rendered by `deck/build_charts.py` (matplotlib,
  deck palette, 300 dpi, transparent background): sector-vs-insurer margins;
  market-concentration bar with top-five bracket; clause-leakage bars; second-tier
  walk-away comparison; Bayview margin trend; demo-settlement build-up. Real
  figures carry their sources in chart footnotes; synthetic charts say "synthetic"
  in the title and footnote.
- **Layout upgrades:** title slide now carries a framed hero crop of the live
  dashboard; slide 3's table replaced by the two market charts; slide 4's four
  text cards replaced by leakage + walk-away charts; new slide 10 (close-out value:
  settlement chart + board-pack screenshot); pilot slide gained a 3-phase timeline
  strip. Deck is now 15 slides.
- **Chart QA:** every chart visually inspected; fixed matplotlib mathtext eating
  literal "$" (escaped), clipped titles/footnotes (figure-level chrome helper),
  and label collisions (HBF leader label, leakage annotations, walk-away delta).
  pptx re-linted: no out-of-bounds shapes, no unstyled runs.

## D10 — Zero-install distribution of the prototype (user has no dev tools)
- **Decision:** ship a **single self-contained `prototypes/counterpart-demo.html`**
  (1.7 MB, all JS/CSS/fonts inlined via vite-plugin-singlefile) that runs by
  double-click in any browser — no Node, no server, no internet. Committed to the
  repo and buildable via `npm run build:single`. The from-source path (Node ≥18)
  stays as option B for anyone who wants to edit it.
- **Why:** the user needs to open and show the demo on a device without developer
  tools. A double-click HTML file is the lowest-friction possible delivery and, being
  offline and pre-authored, still can't fail live.
- **Verified:** built file loads over `file://` in headless Chromium with zero
  console/page errors and the negotiation flow is interactive (positioning paper
  generates on click).

## D10 — Modular platform refinement (user-directed)
- **Second contract:** Federation Health HPPA added (`shared-data/hppa-2025-bayview-federation.md`)
  written to contrast AusCare on every comparable axis (60-day symmetric termination vs
  90/180; 14-day payment vs 15 business days; 60-day lodgement vs 30; mutual-consent
  re-banding vs unilateral; full-CPI indexation vs carve-out). Kept AusCare unchanged so
  the negotiation storyline stays intact; the user's 14-vs-20-day payment example is
  expressed as 14 days vs 15 business days (≈21 calendar) — same contrast, internally
  consistent.
- **Oracle:** four portfolio-comparison Q&As (termination, payment/lodgement, indexation,
  re-banding) rendered as side-by-side tables with per-contract citation chips
  (AusCare teal, Federation blue) and a "Portfolio comparison · 2 contracts" badge.
- **Modular purchasing:** new landing page ("One platform. Three modules.") with module
  identity colours — Negotiation Agent blue, Contract Oracle green, Revenue Integrity
  violet — licence status chips, indicative modular pricing, and two roadmap slots
  (Benchmarking & Analytics, Contract Lifecycle). Sidebar restructured into
  colour-dotted module sections.
- **Revenue Integrity module** (informed by a market scan of MDaudit, Beamtree PICQ,
  MRO, SAI360 — features adopted: centralised audit inbox with due-date countdowns,
  status pipeline, root-cause categorisation feeding a learning-actions register,
  outcome/overturn-rate/impact dashboards by payer, category and time):
  · Inbox: import the fund's audit CSV → parse → PAS enrichment animation → workbench.
  · Workbench: per-item fund assertion vs PAS record, copilot-suggested response
    (human decides: dispute/accept/partial), comments & document trail, and a real
    .xlsx response export built from the decisions (SheetJS).
  · Dashboard: KPI row, monthly outcome chart, defended-vs-conceded by category,
    fund split, and the learning-actions loop; fund/period filters recompute live.
  · Mock audit files in `shared-data/audits/` mirror the in-app data.
- **Verification:** full flow driven headless over file:// in the standalone build —
  import, workbench decision, and xlsx download all confirmed; no console errors.

## D11 — CORE suite architecture (user-directed)
- **The platform framework is now "CORE"** — four suites, each with modules beneath:
  · **C — Contracting** (blue): Negotiation module (live negotiations) + Historical
    module (negotiation performance over time and value realisation through each
    contract period — new screen with negotiation history, FY26 indexation-realised
    view, the Federation FY25 realisation tracker, and a value-opportunity register).
  · **O — Operational** (ochre): roadmap modules — provisional DRG allocation, AI
    coding assistant, billing bots.
  · **R — Revenue Integrity** (violet): fund audit response (live) + proactive
    optimisation / claims-vs-contract reconciliation (roadmap).
  · **E — Enquiry** (green): Ask the contract (live) + future enquiry surfaces.
- Landing rebuilt around the CORE letterforms; sidebar reorganised into lettered,
  colour-coded suite sections with suite-coloured active rails; comprehensive-or-
  bespoke licensing message on the landing pricing strip.
- Historical-module numbers reconcile with the rest of the demo (AusCare 1.9% vs
  3.4% CPI ≈ $45k/yr; the three in-negotiation opportunities are the same three
  asks in the live copilot flow).

## D12 — CORE productisation + deck rebuild (user-directed)
- **Branding:** the product is **CORE** (by Counterpart Health): app titlebar,
  sidebar wordmark (four suite letterforms), footers and docs updated. Company
  remains Counterpart Health.
- **Product completed as a demo:** Operational suite gained a concept-preview
  screen (provisional DRG allocation with confidence + est. payment, AI coding
  assistant with coder accept/reject, billing bots with pre-lodgement checks) —
  clearly badged "Concept preview · roadmap", synthetic examples throughout, so
  all four suites now show something concrete.
- **Deck rebuilt** as `deck/core-pilot-deck.pptx` (16 slides): pain → asymmetry →
  cost (charts) → the CORE framework slide (four suite cards) → suite-by-suite
  walkthrough with suite-lettered kickers and fresh CORE-branded screenshots
  (C: copilot + historical; O: previews; R: workbench + outcomes dashboard;
  E: cross-contract comparison) → trust → pilot (timeline) → ask → close.
  Old counterpart-pilot-deck.pptx removed; build scripts remain the source of truth.
- **Verification:** pptx lint clean (bounds + styling); standalone single-file
  demo rebuilt and smoke-tested over file:// (landing + operational previews).

## D13 — Deck as a combined single HTML file
- **Decision:** the pitch deck now also ships as `deck/core-pilot-deck.html` —
  one self-contained file (~2.2MB) with all screenshots and charts embedded as
  data URIs, scroll-snap slides, keyboard/click navigation, and print-to-PDF.
  Built by `deck/build_deck_html.py`; the pptx remains for anyone who wants to
  edit in PowerPoint.
- **Why:** the user's device has no developer tools and possibly no PowerPoint;
  an HTML deck opens anywhere the demo file already opens. Verified over
  file:// in headless Chromium (title, framework, and suite slides; no console
  errors).

## D14 — Brand adoption (user-supplied logo & colours)
- **Brand:** hexagonal gradient "C" mark (aqua→cyan→blue→indigo), deep navy,
  geometric caps, tagline "Every Contract. Every Dollar. Every Decision.",
  descriptor "Commercial intelligence for healthcare".
- **Applied everywhere:** app design tokens rebuilt (navy chrome, cool light
  surfaces, brand-gradient CTAs, suite colours re-derived from the gradient
  family: C blue, O cyan, R indigo, E aqua/teal); logo recreated as crisp SVG
  in-app and transparent PNG for decks; Montserrat display type for headings
  and wordmark (Inter body; generated documents keep their serif face —
  they are documents); charts re-paletted; both deck formats re-paletted with
  the mark and tagline on title/close slides; all screenshots re-taken.
- **Semantic colours kept:** adverse/success/warn stay rose/teal/amber for
  legibility — brand colours carry identity, semantic colours carry meaning.
- **Verification:** full app flow reshoot clean (no console errors); pptx lint
  clean; HTML deck + standalone demo verified over file://.

## D15 — v2 extension adopted; roadmap agreed (planning turn, no build yet)
- Captured the founder's CORE Build Extension Prompt (v2) and the two council
  review protocols into `docs/`; wired into CLAUDE.md so no session loses them.
- Ran the spec through a condensed LLM-Council pass. Five criticisms changed
  the plan: (1) the Leverage Index ships only fully decomposed and
  evidence-linked — never a bare score; (2) the intelligence engine's data
  policy is public sources + the customer's own history, per tenant —
  cross-customer intelligence architecturally excluded (competition-law bright
  line); (3) Workspace V2's 14 stages fold into the existing 6-step spine
  rather than multiplying nav; (4) the three valuation methods are one
  `Valuation` interface with method/confidence/provenance + override audit
  trail; (5) data-dense v2 screens use progressive disclosure and existing
  tokens — no new colours, minimal new nav.
- Verdict on the refined spec: APPROVE WITH CHANGES, confidence 80%.
- Agreed waves: W1 clause intelligence + valuation + lever register + AusCare
  fund profile + Leverage Index + dependency visual → W2 package optimiser +
  commercial dashboard → W3 change intelligence (version compare, change
  register, hospital-proposed clause builder, scenario modelling) → W4 board
  outputs + landing/deck/brief refresh. Each wave gates through council
  review, design pass, verification, renders, demo rebuild.
- Prototype remains canned/synthetic: demo the outputs, architect the inputs
  (typed data contracts with evidence/confidence/provenance, fixtures today,
  pipelines in the funded build).

## D16 — v2 Waves 1–4 built (council gates, condensed)
- **Wave 1 (clause + fund intelligence).** Clause Intelligence Engine over both
  HPPAs: 18 clause records classified across the category set, unfair/penalty
  terms flagged with reasons, plain-English readings, burden/complexity/risk
  ratings. Valuation as one `Valuation` interface (automated-from-PAS,
  rules-based, manual) with **working human-in-the-loop overrides + audit trail**
  (verified by driving an override headlessly). Negotiation lever register
  (8 levers, positions/fallbacks/dependencies/evidence). AusCare fund profile
  (financial/commercial/behaviour), decomposed **Negotiation Leverage Index**
  (12 weighted, evidenced factors → 6.2/10 with posture + raises/lowers), and
  the mutual-dependency visual (Bayview 22% dependent; AusCare 31% locally
  reliant). *Council gate:* skeptic satisfied — the score is presented as the
  summary of the factor table, methodology labelled illustrative; competition
  rail stated on-screen ("never other customers' terms"). APPROVE.
- **Wave 2 (optimiser + commercial dashboard).** Package optimiser with live
  lever selection, three preset packages aligned to the postures, asked vs
  likelihood-weighted totals, trade lists and sequencing; commercial dashboard
  with total opportunity, flags, burden/complexity, category risk heatmap,
  top-10 priorities and change progress. Hospital-intelligence panel added to
  fund intelligence. *Council gate:* PM confirmed no new top-level nav beyond
  the three Contracting entries; heatmap uses progressive disclosure via
  tooltips-by-title. APPROVE.
- **Wave 3 (change intelligence).** Version compare (7 tracked changes incl.
  the fund reply's 50%-CPI trap and Schedule 4), change register with owners/
  status/decision history, hospital-proposed clause builder (quality-incentive
  worked example: drafted wording, rationale, objections with responses,
  alternatives, strategy), scenario modelling (accept/partial/reject/counter
  with likelihoods and next responses) for CH-2 and CH-6. *Council gate:* QA
  noted scenario likelihoods are authored, not modelled — labelled "synthetic"
  on-screen. APPROVE.
- **Wave 4 (board outputs + story).** Close-out gains downloadable risk
  register and meeting talking points; both deck formats gained an
  intelligence-layer slide (now 17 slides, footers auto-numbered); partner
  brief §3.3 states the v2 positioning incl. the competition rail; README
  updated. APPROVE.
- All numbers reconcile with the existing demo narrative (the $45k/$108k/$30k
  clause values are the same figures the positioning paper and charts use).

## D17 — Suggestions register built (A1–A5, B6, C11–C13, D14–D15)

**Date:** 2026-07-12 · **Trigger:** founder — "Build all and combine into one
html and new PPT."

Everything actionable in `outline/suggestions.md` built in one batch; C10
(contact details) remains blocked on the founder.

- **A1 Federation profile + fund switcher.** `fundIntel.ts` gains
  `federationIntel` (benefit ratio 86.2%, no active negotiation, agreement to
  30 Jun 2028). Fund intelligence switches funds; the leverage index renders
  only for the active AusCare negotiation — a leverage score against a fund
  you're not negotiating with would be noise, so Federation shows a
  "benchmark relationship" banner instead. *Council gate:* domain expert
  confirmed the asymmetry is a feature, not a gap.
- **A2 Cross-suite links.** Oracle citations whose source is an HPPA navigate
  to `/clauses`; the clause drawer offers "Ask the contract about this
  clause" → `/oracle`. Chosen over a shared modal to keep suites' code
  independent (routing is the only coupling).
- **A3 Registers export .xlsx.** `exportLevers()` and `exportChanges()` reuse
  the RI workbench's SheetJS path; real files, verified via headless download
  events previously — buttons verified present this build.
- **A4 Presenter mode.** `components/Presenter.tsx` — 14 steps with speaker
  notes, floating control, no route hijacking (navigates via the same hash
  router the user would click through).
- **A5 Session persistence + Reset demo.** `lib/persist.ts` (sessionStorage)
  hydrates all three contexts; explicit "Reset demo" in the sidebar clears
  and reloads. sessionStorage over localStorage so a closed tab still starts
  clean for the next meeting.
- **B6 Benchmark strategy memo** (`docs/benchmark-strategy.md`): staged
  IHACPA/second-tier → own-tenant → legal-gated aggregates; "never" list is
  explicit.
- **C11 One-pager**: `deck/build_onepager.py` → `deck/onepager.html` →
  `deck/core-onepager.pdf` (A4, embedded charts). Playwright print scripts
  must run from `prototypes/app` (module resolution) — recorded for future
  turns.
- **C12 LOI template**: `outline/pilot-loi-template.md`.
- **C13 Walkthrough recording**: `deck/core-demo-walkthrough.webm` (~100 s,
  1280×800, silent) captured with Playwright `recordVideo` over the
  standalone file — first cut for email follow-ups.
- **D14/D15 story upkeep**: partner brief prices the modular suites and adds
  platform-breadth differentiation; NEXT-STEPS success metrics gain 3a
  (clause-intelligence quality) and 3b (leverage-index credibility).
- **Deliverables rebuilt:** `prototypes/core-demo.html` (single file, 2.9 MB,
  verified over file:// with zero console errors incl. fund switcher), pptx +
  HTML decks (17 slides, lint clean; fund-intel screenshot reshot at viewport
  size after the switcher changed the screen — fullPage shot broke slide 9
  bounds, caught by lint). Inline SVG favicon added (kills the benign 404).

## D18 — Iterative negotiation, board packs at any stage, CDI roadmap, Enquiry split, RI dashboard v2

**Date:** 2026-07-12 · **Trigger:** founder — multi-round fund interactions,
board packs throughout the negotiation, CDI on the RI roadmap, Ask/Compare as
separate Enquiry modules; plus (mid-turn) RI dashboard status counts
(outstanding / in progress / finalised), a time-frame selector, and a historic
view by category.

- **Multi-round loop (Step 5).** `fundReply2.ts` authors round 2: AusCare's
  26 Aug letter (+2.5% → +4.9%, carve-out deleted, binding joint expert),
  digest with a round-1 → round-2 movement scorecard (+$182k/yr), and a
  closing letter. The upload affordance is honest about the demo ("loads a
  canned round-2 letter"); rounds stack top-to-bottom as a correspondence
  trail. Round-2 numbers were authored *backwards from the close-out pack* so
  the fund's "moved from +2.5% to +4.9% in one round" line and the settled
  table stay literally true.
- **Board packs at any stage (/boardpack).** Four authored interim packs
  (briefing / opening lodged / round 1 / settlement mandate) gated by actual
  progress — you can't generate a pack for a stage the negotiation hasn't
  reached, and earlier stages stay regenerable (boards ask for what changed
  since last month). Close-out (Step 6) remains the final sought-vs-settled
  pack; each interim pack ends on the decision the board is being asked to
  make, not a status recap.
- **CDI (roadmap) in RI.** `/integrity/cdi` concept preview: three discharge
  documentation queries (specificity, consistency, comorbidity capture) and a
  learning-loop table showing CDI focus areas derived from recorded audit
  outcomes + clause intelligence. Clinician-only record changes stated
  on-screen.
- **Enquiry split.** One `Oracle` component, `mode: 'ask' | 'compare'`; routes
  `/oracle` and `/compare`; question corpus and free-text matching scoped per
  module with cross-pointer cards. Chosen over duplicating the screen — the
  split is a product/navigation statement, not a code fork.
- **RI dashboard v2.** Status trio (outstanding / in progress / finalised)
  computed live from workbench state (outstanding includes the
  awaiting-import batch); time-frame selector gains "Last quarter"; new
  historic-by-category table: quarter-by-quarter counts with defended-share
  bars and an H2-vs-H1 trend chip, annotated so rising categories point at
  the learning actions and CDI.
- Landing, sidebar, Presenter (16 steps) and both deck framework slides
  updated to the new module structure. All flows verified headlessly over the
  preview server and the standalone file — zero console errors.
