/**
 * CANNED DEMO CONTENT — authored at build time. Interim board packs for each
 * stage of the negotiation. Boards meet monthly; the negotiation doesn't wait
 * for close-out — so a pack can be generated at any point, reflecting exactly
 * what has (and hasn't) happened yet. Figures reconcile with the positioning
 * paper, the lever register and the close-out pack.
 */

export type BoardStage = 'briefing' | 'opening' | 'round1' | 'round2'

export const stageMeta: Record<BoardStage, { label: string; meeting: string; desc: string }> = {
  briefing: {
    label: 'Pre-negotiation briefing',
    meeting: 'July board meeting',
    desc: 'Position analysed, strategy not yet chosen — the pack a board needs before authorising an approach.',
  },
  opening: {
    label: 'Opening position lodged',
    meeting: 'August board meeting',
    desc: 'The opening letter is with the fund; the pack records what was asked, why, and what happens next.',
  },
  round1: {
    label: 'Round 1 assessed & countered',
    meeting: 'August board meeting',
    desc: 'The fund has replied once; the pack scores the movement, names the traps declined, and sets the mandate question.',
  },
  round2: {
    label: 'Settlement in reach',
    meeting: '2 September board meeting',
    desc: 'Round 2 is in: the structure is conceded and ~$52k/yr of gaps remain. The board decides the closing mandate.',
  },
}

export const interimPacks: Record<BoardStage, string> = {
  briefing: `
# Board pack — AusCare HPPA renewal: pre-negotiation briefing

**For:** Board of Directors, Bayview Day Surgery · **From:** CEO · **Status:** *before opening correspondence (interim — demo)*

## 1. Why this negotiation matters

The AusCare agreement covers **≈ $3.12m of annual revenue (22% of the facility)** and expires **30 November 2026**. The current contract has drifted materially against us: effective rates have fallen ≈ 4.1% in real terms over the term, the FY26 re-bandings removed ≈ $95–120k/yr, and the indexation carve-out (cl. 12.3) has been exercised against us once already.

## 2. Where we stand

| Signal | Reading |
|---|---|
| Negotiation leverage index | **6.2 / 10** — stronger than instinct suggests (catchment position, clean audit record, fund's local reliance 31%) |
| Priced opportunity on the table | **≈ $333k/yr** across 8 identified levers |
| Recommended package | Ask **$285k/yr**; probability-weighted value **$174k/yr** |
| BATNA | Second-tier default ≈ 85% of current effective rates — painful but survivable for 6–9 months; priced, not brandished |
| Flagged clauses | 5 adverse terms, led by the indexation carve-out (cl. 12.3, ≈ $45k/yr) and unilateral re-banding (cl. 8.4) |

## 3. What the board is asked to decide

1. **Endorse the negotiation objective:** restore classification integrity, delete the indexation carve-out, and reprice ophthalmology — in that order of priority.
2. **Authorise the CEO** to open correspondence on the recommended posture (to be selected at Step 3 with the copilot's three modelled options).
3. **Note the calendar:** the fund's own process invites responses by 8 July; our growth-volume offer is designed to lapse 30 September to keep the fund honest on timing.

## 4. Risks at this stage

- **Delay is the fund's cheapest tactic** (holdover freezes rates under cl. 2.2) — mitigated by the lapse-date structure.
- **A warm opening from the fund is likely** and means nothing; round 1 concessions are typically the items that cost the fund nothing.

---
*Interim pack authored for demonstration on synthetic data — regenerate at any stage as the negotiation progresses. Decision support — not legal or financial advice.*
`,

  opening: `
# Board pack — AusCare HPPA renewal: opening position lodged

**For:** Board of Directors, Bayview Day Surgery · **From:** CEO · **Status:** *opening letter sent 6 July; awaiting fund response (interim — demo)*

## 1. What was asked, and why

Our opening letter of 6 July put the endorsed package to AusCare:

| Ask | Value/yr | Basis |
|---|---|---|
| Cataract schedule +7.0%, FY26 re-bandings restored | ≈ $88k + $95–120k | Episode-level evidence pack (Annexure A); lens-cost movement |
| Indexation carve-out (cl. 12.3) deleted | ≈ $45k expected value | FY25 precedent: fund applied CPI −1.5pts |
| Re-banding (cl. 8.4) to mutual consent / independent expert | risk control | Classification integrity — the term that protects every other term |
| Set-off window 24 → 12 months, disputes excluded | risk control | Clean audit history |
| Colonoscopy +4.0% · arthroscopy +5.5% | ≈ $46k | At/below catchment benchmarks |
| **Our gives:** 14-day lodgement, quality-data reporting, growth volumes (lapse 30 Sep) | — | Cheap for us, valuable to the fund |

## 2. What happens next

The fund's response is expected within 3–4 weeks. The copilot will digest it line-by-line — the risk is never the rates in the reply, it's the **wording**: reworded clauses that legalise what was previously discretionary. Nothing is agreed, conceded or sent without CEO sign-off.

## 3. What the board is asked to decide

1. **Note** the opening position and calendar (fund deadline pressure begins ~18 August).
2. **Confirm the walk-away minimums** previously endorsed: cataract +5.5%, carve-out deleted or fully floored, re-banding adjudication independent.
3. **No mandate change requested** at this stage.

---
*Interim pack authored for demonstration on synthetic data — regenerate at any stage as the negotiation progresses. Decision support — not legal or financial advice.*
`,

  round1: `
# Board pack — AusCare HPPA renewal: round 1 assessed and countered

**For:** Board of Directors, Bayview Day Surgery · **From:** CEO · **Status:** *fund replied 1 Aug; counter sent 8 Aug (interim — demo)*

## 1. The fund's first response, in one paragraph

A warm letter that conceded the two items that cost the fund nothing (our 14-day lodgement offer; receiving our quality data) and defended every item that costs it money — offering **+2.5% across all bands** and introducing **two traps**: a reworded indexation clause that would *contractualise* under-indexation at 50% of CPI, and a fund-internal committee dressed as independent adjudication. Movement offered: ≈ $40k/yr from our walk-away minimums. Round-one behaviour, not a final position.

## 2. What we did

The counter of 8 August (copy at Annexure B) held the package together:

- **Declined both traps in writing** — the 50%-of-CPI "floor" and the fund-only committee — while accepting their *shape* (a floor structure; committee as first instance with an independent expert binding on appeal).
- **Tabled the evidence:** episode-level ophthalmic analysis (Annexure A) the fund's clinical advisers must now engage with.
- **Quarantined Schedule 4** (their new unpriced compliance obligation) into a separate priced workstream.
- **Re-anchored the calendar:** growth-volume offer lapses 30 September; meeting accepted for week of 18 August.

## 3. Movement scorecard

| Element | We sought | Round 1 offered | Status |
|---|---|---|---|
| Cataract | +7.0% + re-bands | +2.5%, re-bands refused | Held — evidence now tabled |
| Indexation (cl. 12.3) | Deleted | 50%-of-CPI trap | **Trap declined** |
| Re-banding (cl. 8.4) | Independent expert | Fund committee | Structure countered |
| Set-off (cl. 14.5) | 12 months | 24 retained | Held |
| Schedule 4 | — (new) | Introduced unpriced | Quarantined |

## 4. What the board is asked to decide

1. **Endorse the counter as sent** (within existing mandate — no walk-away crossed).
2. **Note the meeting** of 19 August; CEO attends with the talking-points pack.
3. **Contingency:** if round 2 concedes structure but shorts the quantities, the CEO will bring a settlement-mandate question to the 2 September meeting rather than free-lancing the close.

---
*Interim pack authored for demonstration on synthetic data — regenerate at any stage as the negotiation progresses. Decision support — not legal or financial advice.*
`,

  round2: `
# Board pack — AusCare HPPA renewal: settlement in reach

**For:** Board of Directors, Bayview Day Surgery · **From:** CEO · **Status:** *round 2 received 26 Aug; closing mandate sought (interim — demo)*

## 1. Where the negotiation now stands

The evidence pack worked. AusCare's letter of 26 August concedes the **architecture of every major ask**: cataract moved **+2.5% → +4.9%**, the indexation carve-out **deleted**, a **jointly appointed independent expert whose determination binds**, Schedule 4 quarantined, disputes excluded from set-off. Movement from round 1 ≈ **+$182k/yr**. We are inside settlement range.

## 2. What remains — ≈ $52k/yr across five quantities

| Gap | They offer | We close at | Worth/yr |
|---|---|---|---|
| Cataract | +4.9% | +5.8% (evidence supports) | ≈ $16k |
| Re-banded groups restored | 2 of 4 | 3 of 4 (concede minor strabismus) | ≈ $22k |
| Indexation cap | 4.0% | 4.25% (current) | ≈ $6k EV |
| Set-off window | 18 months | 12 months | risk |
| Holdover / termination | 75% CPI / 150d | Full CPI / 120d symmetric | ≈ $8k + risk |

## 3. The mandate question

**Recommendation:** authorise the CEO to send a closing letter (draft at Annexure C) accepting the round-2 structure and pressing the five quantities above, with authority to concede **up to two** of them (not cataract) to secure execution by **25 September**. The alternative — another full round — risks the 30 September lapse date working against us as much as them.

## 4. If the board says yes

Heads of agreement targeted 25 September; executed agreement commences 1 December. The close-out pack (sought vs settled, financial impact, implementation plan) will be generated for the September meeting. Projected outcome on current positions: **≈ +$289k/yr**, FY27 EBITDA margin 4.9% → ≈ 6.8%.

---
*Interim pack authored for demonstration on synthetic data — regenerate at any stage as the negotiation progresses. Decision support — not legal or financial advice.*
`,
}
