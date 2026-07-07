# Counterpart Health — prototype app

A polished, **fully offline** demo of the Negotiation Agent (hero flow) and the
Contract Agent, for Australian day hospitals negotiating HPPAs with health funds.

```bash
npm install
npm run dev
```

## Canned demo mode

There is **no API key and no network call anywhere in this app**. Every "AI"
output — the positioning paper, postures, letters, the fund-reply digest, the
counter, the board pack, and all Contract Agent answers — was authored at build
time in `src/content/` and is replayed through a simulated streaming engine
(`src/lib/stream.ts`). This makes the demo deterministic: it cannot fail in
front of a board. In production, the content layer is replaced by a live,
security-reviewed model pipeline over the organisation's real data.

## Map

| Path | What |
|---|---|
| `src/content/` | The authored intelligence layer (canned outputs) |
| `src/data/facility.ts` | Synthetic Bayview/AusCare figures (mirrors `../shared-data/`) |
| `src/lib/stream.ts` | Simulated streaming |
| `src/screens/` | Dashboard → Analyse → Strategy → Correspondence → Fund response → Close-out, plus Oracle |
| `src/index.css` | Design tokens + generated-document typography |

Demo flow: Dashboard → **Analyse position** (positioning paper) → **Strategy**
(choose one of three postures) → **Correspondence** (opening letter per posture)
→ **Fund response** (digest AusCare's reply, see the traps, draft the counter)
→ **Close-out** (board pack). The **Ask the contract** tab answers staff
questions with clause-level citations and confidence, including a deliberate
"the contract is silent — escalate" case (ask about a Saturday operating list).

All data synthetic; not legal or financial advice.
