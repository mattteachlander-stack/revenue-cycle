# Shared synthetic data pack

**Everything in this folder is synthetic.** Bayview Day Surgery, AusCare Health, the
HPPA between them, the internal decisions register, and every figure in these files
were invented for this prototype. They are *loosely modelled on* public aggregates
(APRA industry statistics, the Private Hospital Sector Financial Health Check) so they
feel realistic, but they describe no real hospital, fund, contract, or person. Do not
quote any number in this folder as a real market fact.

| File | What it is | Used by |
|---|---|---|
| `bayview-profile.md` | Facility profile: services, theatres, volumes, case mix, payer mix, P&L | Dashboard, positioning paper |
| `bayview-financials.json` | Machine-readable core figures (mirrored in the app's fixtures) | Prototype data layer |
| `auscare-profile.md` | The counterparty fund: scale, margins, benefit ratio, negotiation behaviour | Positioning paper, strategy screen |
| `hppa-2023-bayview-auscare.md` | The current (synthetic) HPPA — the contract the copilot digests | Contract summary, trap-flagging, Contract Agent |
| `internal-decisions-register.md` | Synthetic internal policy decisions | Contract Agent grounding |
| `legislation-extracts.md` | Curated plain-language summaries of the real public legal framework | Contract Agent grounding |

The three **deliberately unfavourable terms** planted in the HPPA for the demo to
find: the discretionary indexation carve-out (cl. 12.3), the unilateral re-banding
right (cl. 8.4), and the 24-month set-off/recovery right paired with a 30-day claim
lodgement window (cl. 14.5 / 14.2). The asymmetric termination notice (cl. 19: fund
90 days, hospital 180 days) is a fourth, structural one.
