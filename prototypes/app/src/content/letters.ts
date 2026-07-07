import type { PostureId } from '../state'

/**
 * CANNED DEMO CONTENT — authored at build time. Opening letters per posture.
 */
const common = {
  from: `**Bayview Day Surgery Pty Ltd**
12 Marriott Parade, Cheltenham VIC 3192

6 July 2026

Provider Contracting — Southern Region
AusCare Health Limited
By email`,
  sign: `Yours sincerely,

**Margaret Ellery**
Chief Executive Officer, Bayview Day Surgery

*cc: Board of Directors, Bayview Day Surgery Pty Ltd*`,
}

export const openingLetters: Record<PostureId, string> = {
  collaborative: `${common.from}

**Re: Hospital Purchaser–Provider Agreement — renewal proposal**

Dear AusCare Contracting Team,

Thank you for your letter of 12 June inviting proposals for renewal of our Agreement, which expires on 30 November 2026. Bayview values its relationship with AusCare and writes in a spirit of continuing partnership: our facility treated 1,690 AusCare members last year with an unplanned transfer rate of 0.21% and same-day discharge failure of 0.4%, well inside the Schedule 3 benchmarks.

We propose renewal on the following basis:

1. **Rates.** A blended uplift of 4.5% across Bands 1–3, reflecting movement in award wages and consumables since the current schedule was set, and the below-median position of several of our high-volume item groups.

2. **Indexation.** Restoration of full CPI indexation. We ask that clause 12.3 be removed: its exercise in FY2025 (1.9% against CPI of 3.4%) sits awkwardly with a premium round settlement of 3.85%, and its removal would let both parties plan with confidence.

3. **Housekeeping of terms.** We propose that any holdover period under clause 2.2 carry CPI indexation, and that the recovery window in clause 14.5 be aligned at twelve months with disputed amounts excluded from set-off, matching the symmetry we believe both parties intend.

In return we offer a three-year term and a quarterly quality-data pack in your preferred format.

We would welcome a meeting in the week commencing 21 July and ask for your response by **8 August 2026** so that a renewed agreement can be settled comfortably before expiry.

${common.sign}`,

  assertive: `${common.from}

**Re: Hospital Purchaser–Provider Agreement — renewal proposal and ophthalmic schedule**

Dear AusCare Contracting Team,

Thank you for your letter of 12 June inviting proposals for renewal of our Agreement, which expires on 30 November 2026. We intend to reach a renewed agreement well before that date, and this letter sets out the basis on which Bayview is prepared to contract.

**The ophthalmic schedule requires correction, not indexation.** Over the current term, four ophthalmic item groups were reassigned from Band 2 to Band 1 under clause 8.4, and the intraocular lens remains bundled within a cataract case payment that has been indexed below CPI. The combined effect is that AusCare now remunerates the highest-volume, lowest-complication ophthalmic day facility in this catchment approximately seven per cent below the prevailing market for its principal procedure. We do not regard this as a sustainable basis for renewal.

Our proposal:

1. **Cataract (Band 2):** an uplift of 7%, and restoration of the four item groups re-banded in FY2026 to Band 2.
2. **Gastroenterology and orthopaedics:** colonoscopy +4%; knee arthroscopy +5.5%.
3. **Clause 8.4:** re-banding to occur only by mutual written consent or, failing agreement, determination by an independent clinical coding expert.
4. **Indexation:** CPI as a floor, with clause 12.3 deleted. We are unable to commit to a multi-year term while indexation remains discretionary.
5. **Clause 10.2:** an annual lens-cost review so that the bundled cataract payment tracks actual prosthesis economics.

In return, Bayview offers a **three-year term**, contractual claims lodgement at 14 days (against the current 30), and — on execution by 30 September 2026 — a prospective commitment of our orthopaedic growth volumes, currently modelled at approximately 420 additional AusCare episodes per year.

We have modelled the alternative under the second-tier default framework and are prepared for that outcome; we would regard it as a poor result for both parties and for your members in this catchment, who currently enjoy the area's shortest ophthalmic and endoscopy waiting times without gap uncertainty.

We ask for your substantive response by **8 August 2026**. Our proposal of growth-volume commitment lapses if a renewed agreement is not executed by 30 September 2026.

${common.sign}`,

  restructure: `${common.from}

**Re: Hospital Purchaser–Provider Agreement — proposal to restructure the payment model**

Dear AusCare Contracting Team,

Thank you for your letter of 12 June inviting proposals for renewal of our Agreement, which expires on 30 November 2026.

Rather than exchange percentage positions over a banding schedule that has served neither party well — as evidenced by two re-banding notices and a below-CPI indexation event during the current term — Bayview proposes that we jointly design a **case-mix–calibrated payment model** for the renewed agreement:

1. **Complexity-weighted case payments** calibrated against audited cost-per-episode data, which we are prepared to share under appropriate confidentiality;
2. **A joint annual recalibration mechanism** replacing both the indexation machinery (clauses 12.1–12.4) and unilateral re-banding (clause 8.4);
3. **A transition floor** so that no item group is paid below its current rate plus 2% in the first year.

In return we offer a **five-year term**, full cost transparency, and commitment of our contracted growth volumes — including an orthopaedic pipeline modelled at approximately 420 additional AusCare episodes per year.

We recognise this is an ambitious proposal and are ready to resource it: our data pack is prepared, and we can convene a joint working session in the week commencing 21 July. Given the design work involved, we also ask — as a good-faith interim measure — that the parties agree now that any holdover period under clause 2.2 carries CPI indexation, so that neither party is advantaged by the calendar.

We ask for your response by **8 August 2026**.

${common.sign}`,
}
