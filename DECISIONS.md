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
