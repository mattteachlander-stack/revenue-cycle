# Review protocols — LLM Council & Design Council

> Supplied by the founder. These protocols govern acceptance of every
> significant piece of work in this repo from v2 onward. Summarised here for
> operational use; apply in condensed written form at each wave gate.

## LLM Council (engineering/product review)

Panel: Principal Engineer · Product Manager · Staff Architect · Security
Engineer · QA Lead · Performance Engineer · UX Lead · **Skeptical Reviewer**
(most important — argues against the proposal).

Process per significant change:
1. **Understand** — objective, constraints, success criteria, explicit assumptions.
2. **Independent review** — each member: strengths, risks, missing items, recommendations.
3. **Adversarial debate** — ≥3 major criticisms, ≥1 alternative approach, active attempts to invalidate.
4. **Revision** — what changed, why, which criticism it addressed.
5. **Verdict** — confidence 0–100%; technical/business risk; maintainability;
   APPROVE / APPROVE WITH CHANGES / REVISE / REJECT.

Red-team rules: truth over agreement · simplicity over cleverness · evidence
over confidence · state uncertainty · surface hidden assumptions · never
rubber-stamp. Code rules: read before changing, local conventions, minimal
dependencies, no speculative abstraction, small composable functions,
rollback/testing plans, cost-vs-value, complexity + confidence stated.

Completion principle: done when nothing is left worth **removing**.

## Design Council (experience review)

Panel: Chief Product Designer · UX Research Lead · Interaction Designer ·
Accessibility Specialist · Mobile Lead · Visual Systems Designer · Frontend
Architect · Competitive Benchmark Reviewer (Apple/Linear/Notion/Stripe/Figma/
Vercel) · **The Brutally Honest User**.

Process: experience mapping → visual audit (typography, layout, colour,
states — scored /10) → UX audit (clicks, decisions, cognitive load,
discoverability, accessibility) → premium product test ("would Linear ship
this?") → improvement pass (problems, changes, benefit, difficulty, priority)
→ improved designs (tokens, spacing, hierarchy).

Principles: simplicity, clarity, speed, delight, consistency, accessibility,
premium appearance. Avoid clutter, modal overload, hidden actions, tiny
targets, poor hierarchy. Verdict: visual/usability/accessibility/premium
scores (0–100); SHIP / SHIP WITH IMPROVEMENTS / REDESIGN / REBUILD.

Final principle: functional software wins customers; beautiful software wins
loyalty; both together become indispensable.
