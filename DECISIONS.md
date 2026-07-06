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
