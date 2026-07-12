# Partner & Investor Brief
## Private Hospital Revenue Cycle Intelligence — an AI negotiation & contract copilot for Australian day hospitals

*Prepared for prospective co-founders, partners, and investors. All market figures
are sourced to public data and cited with their reporting period (see
`outline/sources.md`). All facility-, fund-, and contract-level figures used in the
prototype (Bayview Day Surgery, AusCare Health, and the sample HPPA) are **synthetic
and labelled as such** — no real hospital or contract data exists in this project.*

---

## Executive summary

Australia's private hospitals negotiate their core revenue — the rates and terms in
their **Hospital Purchaser–Provider Agreements (HPPAs)** — against health funds that
hold overwhelming structural advantages: national scale, dedicated contracting teams,
proprietary benchmarking, and a legislated fallback (the **second-tier default
benefit**) that caps a hospital's downside from walking away at roughly *85% of the
average contracted charge*. For a large hospital group this is a fair fight. For a
**20-bed day hospital where the CEO or business manager negotiates the HPPA between
running the theatre list and the payroll**, it is not.

The consequences are visible in the national data. The Australian Government's own
**Private Hospital Sector Financial Health Check** (Oct/Nov 2024) examined ~**647
private hospitals** operating ~**36,000+ beds** (July 2024) and found **sector profit
margins collapsed from 5.1% (2020–21) to −0.1% (2023–24)** — costs rising faster than
revenue pushed the sector as a whole to below break-even. Meanwhile the funds are structurally
healthy: APRA's **December 2025 quarter** statistics show industry insurance revenue
of ~**$8.6 billion for the quarter**, an insurance service result of ~**$468 million**,
after-tax profit of ~**$417 million**, and net assets of ~**$13.1 billion**. The money
in the system is not the problem; the **allocation of bargaining power** is.

**The venture:** an AI-assisted platform that gives a small independent or day hospital
the negotiation and contract-compliance capability of a major group's contracting
team. The first tranche is two products:

- **The Negotiation Agent ("the copilot")** — a *human-in-the-loop* HPPA negotiation
  copilot. It ingests public industry intelligence and the hospital's own data, digests
  the current contract, produces a positioning paper and negotiation posture (target /
  anchor / walk-away, with the second-tier default scenario modelled as the BATNA), and
  runs the negotiation as a *choose-your-own-adventure*: at each step it presents
  options, risks, and likely fund responses; the human always decides; the agent drafts
  every letter but **sends nothing autonomously**.
- **The Contract Agent ("the oracle")** — a staff-facing Q&A agent grounded in the
  organisation's executed HPPAs, the relevant legislation (Private Health Insurance Act
  2007 and rules, second-tier provisions, informed financial consent), and internal
  policy. Every answer **cites its source and states confidence**; where the contract is
  silent it says so and recommends escalation rather than inventing an answer.

**Why now:** the AI capability inflection makes document-grounded reasoning reliable
enough to be genuinely useful; the sector's financial stress makes even a **1–3%
uplift on contracted rates** existential for a small facility; and regulators are
actively engaged in fund–hospital contracting (ACCC buying-group authorisations; the
Government's Health Check). The wedge is the **Negotiation Agent for day hospitals**,
sold through **Day Hospitals Australia and APHA channels**, priced as an annual SaaS
subscription tiered by theatre count with an optional advisory layer.

**The ask:** a technical/commercial co-founder, 2–3 friendly pilot day hospitals, and
seed capital to convert this prototype into a security-reviewed product operating on
real, confidential hospital data. A 90-day plan is set out in §11.

> **Legal-review flag (raised early, on purpose):** the product helps a *single*
> hospital negotiate with a fund. It must **never** become a channel for competing
> hospitals to coordinate prices — that would engage cartel provisions of the
> Competition and Consumer Act. This is a first-order design constraint, revisited in
> §9. The ACCC small-business collective bargaining class exemption permits *collective
> bargaining with a counterparty* under conditions; it does **not** permit price-fixing
> among competitors, and the product will be architected to make the former possible
> and the latter impossible.

---

## 1. Market context

### 1.1 The sector, quantified
- **Private hospitals:** ~**647** facilities providing ~**36,000 beds** as at July 2024;
  ~83% metropolitan, ~9% regional, ~8% rural (*Private Hospital Sector Financial Health
  Check, 2024*).
- **Day hospitals (day procedure centres):** **300+ standalone day hospitals** (peak
  body **Day Hospitals Australia**), spanning ophthalmology, gastroenterology,
  endoscopy, plastics/dermatology, IVF, pain, and a growing set of orthopaedic and other
  day-case procedures. Same-day activity is the structural growth edge of private
  hospital care even as overnight volumes stagnate (*AIHW hospital activity*).
- **Financial state:** the Health Check (data from 243 of 647 hospitals, covering 58% of
  separations and 63% of sector revenue) found **profit margins fell from 5.1% in
  2020–21 to −0.1% in 2023–24** — the sector in aggregate now operates at around
  break-even or below, with costs (nursing, agency staffing, consumables) persistently
  rising faster than revenue. This is despite private hospitals delivering **>40% of
  all admissions and ~70% of elective surgery** — the system depends on facilities that
  are, in aggregate, not covering their cost of capital.

### 1.2 Insurer concentration — the other side of the table
The buyer side is highly concentrated. On APRA/market data:
- **Medibank ~27%** (incl. ahm) and **Bupa ~25%** of the market — together **~52%.**
- **HCF ~12.5%, nib ~9.6%, HBF ~7.7%** (2025 figures). The **top five funds hold ~80%
  of all policies**; the remainder is spread across ~20+ small funds, most below 1% share.
- Beyond the individual majors, hospitals also face **buying groups** that contract on
  behalf of multiple funds: the **Australian Health Service Alliance (AHSA)** (~**27
  insurers**), the **Australian Regional Health Group (ARHG)** (~**4 insurers**), and
  the ACCC-authorised **Honeysuckle Health / nib** group. So a single day hospital may
  be negotiating against a counterparty that effectively represents **dozens of funds
  and a large fraction of the insured population.**

### 1.3 The funds are not the ones under financial stress
APRA's **December 2025 quarter** data: ~**$8.6bn** quarterly insurance revenue, ~**$468m**
insurance service result, ~**$417m** net profit after tax, ~**$13.1bn** net assets, and a
prescribed-capital coverage ratio of ~**2.51** (well capitalised). Industry-wide, roughly
**84–86% of premiums are returned to members as benefits** (Ombudsman *State of the
Health Funds*), varying meaningfully by fund — a spread that is itself negotiation
intelligence. The point for a hospital CEO: **the counterparty
is profitable and heavily capitalised; the hospital is not.** That asymmetry is the market.

### 1.4 The structural fallback is weak — the second-tier default
If a hospital has **no** agreement with a fund, the fund must still pay the **second-tier
default benefit**: at least **85% of the average charge** the fund pays comparable
hospitals (same state, same second-tier category) under its *negotiated* agreements
(*Dept of Health, second-tier default rules*). This is the hospital's **BATNA** — and it
is deliberately unattractive: it pegs the walk-away outcome to *other hospitals' already-
negotiated rates minus 15%*, and it requires second-tier eligibility (accreditation).
Funds know this floor precisely; most small hospitals do not model it. Quantifying the
second-tier scenario is one of the sharpest things the copilot does.

### 1.5 Current viability pressure is not theoretical
The stress is now spilling into public contract breakdowns. In 2024–25 **Healthscope**
— a major operator — **terminated its agreements with Bupa and the AHSA funds** over
what it described as chronic underfunding, and subsequently entered **receivership
(2025)**. When the largest players are terminating contracts and failing, the smallest
players — with none of the leverage — are the most exposed. This is the burning platform.

---

## 2. The problem — from the day hospital CEO's chair

Picture the owner-CEO of a four-theatre day hospital. Every 2–3 years each HPPA comes up
for renewal. On the other side of the table sits a national fund's contracting team:
full-time professionals with a benchmarking database of what every comparable facility is
paid, a modelled view of this hospital's walk-away position (they can compute the
second-tier default better than the hospital can), template wording refined across
hundreds of negotiations, and no deadline pressure — *time is on the fund's side.*

The CEO, by contrast:
- **has no benchmark** — no idea whether the offered per-case rate for a cataract or a
  colonoscopy is generous, market, or 8% under;
- **has no time** — the negotiation competes with running theatre lists, rostering
  nurses, and managing the P&L;
- **cannot read the contract adversarially** — indexation that reads as "CPI" but carries
  a discretionary carve-out; banding that quietly reclassifies high-value procedures into
  lower-paying groups; exclusions that shift cost to the facility; termination and dispute
  clauses that favour the fund;
- **cannot model the downside** — what actually happens to revenue if this fund's patients
  drop to second-tier default, or if the fund re-bands three procedure groups;
- **accepts "standard terms"** because contesting them feels futile and expensive.

The result is **suboptimal rates, weak indexation, unfavourable commercial terms, and
unnoticed revenue leakage** — compounding every year across every fund. On a facility
already at or near break-even, a few points of under-negotiated rate is the difference between
viability and loss. **This is a capability gap, not an information gap that a spreadsheet
fixes** — it needs benchmarking, contract analysis, financial modelling, negotiation
strategy, and professional drafting, on demand, at a price a small facility can afford.

---

## 3. The solution

Two products, one thesis: **give a 20-bed day surgery the contracting capability of a
major group — as software.**

### 3.1 Product 1 — Negotiation Agent ("the copilot")
A human-in-the-loop copilot for HPPA negotiations. Concretely, it:

1. **Ingests public industry intelligence** — APRA per-fund margins, benefit ratios and
   management-expense ratios; Ombudsman complaints/benefit data; AIHW activity/case-mix;
   the second-tier default as the structural BATNA; premium-round approvals.
2. **Ingests confidential hospital data** (real product; synthetic in the prototype) —
   P&L, case mix / DRG profile, service-line volumes, payer mix, cost per episode,
   capacity and growth plans.
3. **Digests the current contract** — parses the existing HPPA: rate schedules,
   indexation, exclusions, banding, case-payment vs per-diem structure, quality/KPI
   clauses, termination and dispute provisions.
4. **Produces a positioning paper and negotiation posture** — where the hospital sits vs
   market, fund-specific leverage points, **target / anchor / walk-away** rates, and a
   risk assessment that explicitly models the **second-tier default scenario.**
5. **Runs choose-your-own-adventure** — at every decision point it presents options,
   risks, and likely fund responses. *The human always chooses; the agent never sends.*
6. **Generates all correspondence** — opening letters, counter-offer emails, escalation
   letters, in a professional, fund-appropriate register.
7. **Digests fund responses** — summarises what a fund's letter actually means, flags
   traps in proposed wording, suggests next moves, drafts replies, and pivots strategy
   when the fund's posture changes.
8. **Produces close-out materials** — a board-ready presentation of the agreed outcome,
   financial-impact modelling, and internal staff comms on operational changes.

*Example workflow (mirrored in the prototype):* the CEO uploads last year's P&L, case
mix, and the current AusCare HPPA. The copilot returns a positioning paper: "You are
~7% below the state median case rate for cataract (Band 2); AusCare's benefit ratio and
margin suggest headroom; your walk-away to second-tier default would cost ~$X on this
service line, so your BATNA is weak on cataract but stronger on gastro where you are a
high-volume, low-complication provider." It offers three postures; the CEO picks
"assertive re-band"; the copilot drafts the opening letter; the CEO edits and sends it
*themselves.* When AusCare replies, the copilot flags that the fund's proposed indexation
wording reintroduces the discretionary carve-out, and drafts a counter.

### 3.2 Product 2 — Contract Agent ("the oracle")
A staff-facing Q&A agent, bespoke to each organisation, that answers day-to-day
compliance and interpretation questions grounded in: (1) the organisation's **executed
HPPAs**, (2) the **wider legal framework** — Private Health Insurance Act 2007, PHI
(Benefit Requirements) Rules, PHI (Accreditation) Rules, second-tier default provisions,
informed-financial-consent obligations — and (3) **internal decisions and policies.**
*"Does our AusCare contract cover an overnight stay if a cataract patient can't be
discharged?"* → an answer that cites the specific clause, states confidence, and — where
the contract is silent — **says so explicitly and recommends escalation** rather than
guessing. This turns a filing cabinet of contracts into an institutional memory the front
desk and theatre coordinator can actually query.

### 3.3 The intelligence layer (current build direction — v2)
Both products now sit on a **Negotiation Intelligence Engine**: per-fund profiles
(financial, commercial and negotiation-behaviour intelligence from public sources
plus the hospital's own history), hospital and catchment intelligence, mutual
dependency modelling, and a fully **decomposed Negotiation Leverage Index** — a
score that summarises an evidenced argument rather than replacing one. A
**Contract Clause Intelligence Engine** classifies every clause, flags unfair,
arduous and penalty-based terms with reasons, and **values each one** (automated
from PAS/revenue data, rules-based, or human-assigned with a full override audit
trail), feeding a negotiation lever register, a package optimiser and a contract
change engine that tracks every proposed amendment from first draft to final
position. Competition-law rail, architecturally enforced: public data + the
customer's own history, per tenant — never other hospitals' confidential terms.

### 3.4 Why these two first
The Negotiation Agent captures value at the single highest-leverage moment (contract
renewal); the Contract Agent captures value every day in between and creates the daily
habit that retains the account. Together they are the front half of the long-term
**revenue-cycle** family (rate negotiation → term optimisation → leakage prevention).

---

## 4. Why now

- **AI capability inflection.** Document-grounded reasoning — parsing a 40-page HPPA,
  reconciling it against legislation, drafting fund-appropriate correspondence — has only
  recently become reliable enough to trust in a human-in-the-loop workflow. Two years ago
  the drafting was too generic and the contract reading too unreliable; that has changed.
- **Sector financial stress.** With sector margins at −0.1% in 2023–24 (§1), a **1–3%
  rate improvement is not a nice-to-have — it is survival.**
  Willingness to pay for negotiation help has never been higher.
- **Regulatory attention.** The Government commissioned the Health Check; the ACCC is
  actively adjudicating buying-group power (Honeysuckle authorisation with conditions);
  Healthscope's terminations and receivership have made fund–hospital contracting a
  national story. The environment is primed for a tool that rebalances the table — as
  long as it stays scrupulously on the right side of competition law (§9).

---

## 5. Market sizing (assumptions stated; uncertainty acknowledged)

Bottom-up, deliberately conservative. **These are estimates built on public counts and
explicit assumptions, not measured demand.**

- **TAM — all Australian private + day hospitals.** ~647 private hospitals incl. 300+ day
  hospitals. If the *addressable* platform value (negotiation + contract intelligence)
  is ~**$25–60k per facility per year** blended across sizes, TAM ≈ **$16–39m/yr** on
  ~647 facilities. (Small denominator — this is a *focused* market, and the product is
  priced accordingly.)
- **SAM — independents and day hospitals without in-house contracting.** The subset that
  lacks a dedicated contracting team — realistically the ~300+ day hospitals plus smaller
  independents, call it **~400 facilities.** At ~**$20–35k/yr** each → SAM ≈ **$8–14m/yr.**
- **SOM — 3-year reachable.** Capturing **10–15%** of SAM via Day Hospitals Australia /
  APHA channels → **~40–60 facilities**, ≈ **$1–2m ARR**, plus per-negotiation advisory
  upside.

**Honesty about uncertainty:** the per-facility price is the sensitive variable and is
unproven; willingness to pay is asserted from the economics of a 1–3% rate uplift, not
yet observed. The pilots (§7, §11) exist precisely to measure realised uplift and
therefore defensible pricing. Expansion beyond the wedge (larger independents, group
contracting support, the Tranche 2 leakage-audit product) is upside not counted above.

---

## 6. Business model

**Options evaluated:**

| Model | Pros | Cons |
|---|---|---|
| Annual SaaS per facility | Predictable ARR; low friction; daily Contract-Agent use justifies it | Must show value between negotiations |
| Per-negotiation engagement | Aligns price to the high-value moment; easy ROI story | Lumpy; no retention between cycles; feels like consulting |
| Tiered by theatre/bed count | Fair scaling small→large; land-and-expand | Requires clean tiering |
| Hybrid software + advisory | Higher ACV; hand-holding for first negotiation builds trust | Services don't scale; margin drag; risks "consultant not product" |

**Recommendation — modular suite licensing (the CORE model): annual SaaS per
facility, tiered by theatre count, with suites licensed independently and an
optional per-negotiation advisory add-on.** Rationale: the **Contract Agent creates continuous
value** that justifies a subscription between negotiation cycles, so the platform isn't
dormant; **tiering by theatres** matches price to facility size and ability to pay; the
**advisory add-on** monetises the first, highest-stakes negotiation and builds trust
without making services the core business. Indicative pricing (to be validated in pilots):

- **Contracting suite (the wedge):** ~**$18–28k/yr** for a 2–4-theatre day
  hospital; ~$35–60k/yr for larger independents.
- **Enquiry suite:** +~$6k/yr · **Revenue Integrity suite:** +~$9k/yr ·
  **Operational modules** priced as released.
- **Per-negotiation advisory add-on:** ~**$8–15k** per negotiated agreement.
- Comprehensive (all suites) or bespoke (strategic modules only); add or drop
  at renewal — no bundle lock-in.

The pitch is trivially ROI-positive: on a facility with even $8–12m of fund revenue, a
**1% rate improvement returns $80–120k a year** — multiples of the subscription.

---

## 7. Go-to-market

- **Wedge:** the **Negotiation Agent for day hospitals** — the segment with the sharpest
  capability gap and the clearest ROI.
- **Pilot-led entry:** 2–3 friendly day hospitals (§11) get discounted/free access plus a
  real positioning paper for their next negotiation, in exchange for feedback and a
  reference. Measure **realised rate uplift and terms improved** — that becomes the sales
  asset.
- **Channels:** **Day Hospitals Australia** and **APHA** (peak bodies — conferences,
  member comms, credibility); **health-sector consultants and accountants** who serve day
  hospitals (referral partners who currently do this work manually and can resell/refer);
  direct outreach to owner-operators.
- **Reference-customer flywheel:** each pilot's quantified uplift ("Facility X improved
  its next HPPA by N%") de-risks the next sale; peak-body endorsement compounds it. In a
  market of only ~400 relevant facilities, **reputation travels fast** — a double-edged
  sword that rewards getting the first few right.

---

## 8. Competitive landscape

- **Health contracting consultants / ex-fund advisers.** Deep expertise but **expensive,
  scarce, and episodic** — a day hospital can't retain them year-round, and their
  knowledge leaves with them. We productise their method at a fraction of the cost, always
  on. (Many are potential *channel partners*, not just competitors — §7.)
- **Benchmarking / data services.** Provide numbers but **not strategy, drafting, or
  contract reading** — a benchmark without a negotiation plan is inert.
- **Generic AI tools (ChatGPT et al.).** A CEO can paste a contract in, but gets no
  grounded benchmarking, no second-tier BATNA modelling, no fund-specific playbook, no
  audit trail, no confidence/citation discipline, and real hallucination risk on clauses.
- **In-house teams at the majors (Ramsay, Healthscope, etc.).** The capability we're
  democratising — but structurally unavailable to independents.

**Differentiation & defensibility:** (1) **Australian-specific depth** — HPPA structures,
second-tier default mechanics, the PHI Act and rules, the buying-group landscape; (2) the
**human-in-the-loop, cite-everything discipline** that makes output trustworthy in a
regulated, high-stakes setting; (3) **platform breadth as a moat** — the same intelligence
layer powers negotiation, clause valuation, change tracking, audit defence and staff
enquiry, so every module deepens the value of the others (§3.3); (4) a **domain-tuned
corpus and playbook library** that compounds with every negotiation and contract seen
(with strict per-customer data isolation — §9); (5) **channel and reference lock-in**
through the peak bodies. The moat
is less any single model and more the **accumulated Australian contracting know-how,
trust, and distribution.**

---

## 9. Risks and mitigations

| Risk | Mitigation |
|---|---|
| **Competition law — price coordination (highest-priority flag).** A tool touching many hospitals' rates could be misused to align prices between competitors — engaging cartel provisions of the CCA. | **Architected out:** strict per-customer data isolation; benchmarks derived only from *public* aggregates (APRA/Ombudsman), never one customer's confidential rates surfaced to another; no cross-customer rate sharing; product frames every engagement as a *single hospital vs a fund.* The ACCC small-business collective-bargaining class exemption permits collective bargaining *with a counterparty* under conditions — **not** competitor price-fixing; any collective-bargaining feature will be gated behind legal sign-off and the exemption's conditions. Independent competition-law review before any multi-facility feature ships. |
| **Data confidentiality (Privacy Act 1988 / APPs).** Hospital financials and contracts are highly sensitive. | Privacy-by-design; encryption in transit and at rest; per-tenant isolation; least-privilege access; clear data-handling terms; Australian data residency; security review before touching real data (see `NEXT-STEPS.md`). *The prototype holds only synthetic data and makes no network calls.* |
| **"Not legal/financial advice" & professional indemnity.** The tool drafts letters and reads contracts. | Positioned explicitly as **decision support, not legal or financial advice**; human-in-the-loop by design; persistent disclaimer; recommend users retain their own legal/financial advisers for execution; carry professional indemnity cover; the Contract Agent **escalates rather than guesses** when the contract is silent. |
| **Fund hostility.** Funds may resist a tool that strengthens hospitals. | The tool operates entirely on the hospital's side of a lawful, individual negotiation; it improves the *quality and professionalism* of correspondence (funds prefer well-formed counterparties); nothing about it is improper. Public-interest framing: rebalancing an acknowledged asymmetry in an at-risk sector. |
| **Hallucination in contract interpretation.** A wrong clause reading is dangerous. | Retrieval-grounded answers with **mandatory citation to clause/source**; explicit **confidence** on every answer; "the contract is silent — escalate" as a first-class output; human review before any action; evaluation harness over the synthetic corpus before real deployment. |
| **Key-person / expertise dependence.** Domain depth is the moat and the risk. | Encode the playbook and legal framework into the product and evaluation suite; build advisory relationships with ex-fund contractors; document the method so it lives in the system, not one founder's head. |

---

## 10. Roadmap

- **Tranche 1 (now — shipped as the CORE Contracting + Enquiry suites, with the
  Revenue Integrity audit-response module already demonstrable):** win the negotiation
  moment, the daily contract-query habit, and the audit season.
- **Tranche 2: Revenue-leakage audit.** Claims-vs-contract reconciliation and underpayment
  detection — reconcile what the fund *actually paid* against what the executed HPPA
  *entitled* the hospital to, and surface systematic underpayments. High, recurring,
  measurable ROI; natural expansion of the same contract-intelligence core.
- **Tranche 3: Full revenue-cycle suite.** Rate negotiation + commercial-term optimisation
  + leakage prevention, plus forecasting and payer-mix analytics — the complete revenue
  cycle for independent private and day hospitals.

Each tranche reuses the same spine (contract parsing, public-data ingestion, grounded
generation with citations, human-in-the-loop), so the roadmap is **additive, not a
series of rebuilds.**

---

## 11. The ask and 90-day plan

**What we want:**
- **From a co-founder / partner:** a technical-commercial partner to build the product and
  the go-to-market, and/or a health-sector operator with contracting credibility and
  peak-body relationships.
- **From investors:** seed capital to move from prototype to a security-reviewed product on
  real hospital data, fund the pilots, and stand up privacy/security infrastructure.
- **From pilot sites:** 2–3 friendly day hospitals willing to share (under strict
  confidentiality) real data and an upcoming negotiation, in exchange for discounted/free
  access and a professional positioning paper for that negotiation.

**90-day plan:**
- **Days 0–30:** finalise the prototype and this brief; recruit the co-founder; sign 2–3
  pilot LOIs via Day Hospitals Australia / APHA warm intros; scope the security/privacy
  work required before any real data is touched.
- **Days 31–60:** onboard pilot data under confidentiality; run a real positioning paper
  for one pilot's live negotiation; stand up per-tenant isolation and the evaluation
  harness; obtain competition-law and PI-insurance sign-off on the operating model.
- **Days 61–90:** support pilots through negotiation rounds; **measure realised rate/terms
  uplift**; convert one pilot into a paying reference; use quantified results to validate
  pricing and open the seed raise.

**Success = a reference day hospital that can say, on the record, "this measurably improved
our next HPPA," and a defensible price derived from that measured uplift.**

---

*Sources: see `outline/sources.md`. Real figures cited to APRA, the Department of Health &
Aged Care, the Commonwealth Ombudsman, AIHW, the ACCC, APHA and Day Hospitals Australia,
and public sector reporting. Bayview Day Surgery, AusCare Health, and the sample HPPA are
synthetic and used only to demonstrate the product. This document is decision-support
material, not legal or financial advice.*
