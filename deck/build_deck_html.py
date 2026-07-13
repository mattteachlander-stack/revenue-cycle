#!/usr/bin/env python3
"""Build the CORE pitch deck as ONE self-contained HTML file.

Every image (screenshots + charts) is resized and embedded as a base64 data
URI, so `deck/core-pilot-deck.html` opens by double-click in any browser with
no PowerPoint, no install, no internet. Navigate with arrow keys / PgDn /
click / scroll; Ctrl+P prints one slide per page for a PDF.

Run (from repo root):  python3 deck/build_deck_html.py
"""
import base64
import io
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, 'assets')
V = os.path.join(A, 'v2')
CH = os.path.join(A, 'charts')
OUT = os.path.join(HERE, 'core-pilot-deck.html')


def uri(path, width=1400, quality=82):
    """Resize and embed as JPEG data URI (white background under any alpha)."""
    with Image.open(path) as im:
        if im.width > width:
            im = im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)
        if im.mode in ('RGBA', 'P'):
            bg = Image.new('RGB', im.size, (255, 255, 255))
            bg.paste(im.convert('RGBA'), mask=im.convert('RGBA').split()[-1])
            im = bg
        buf = io.BytesIO()
        im.save(buf, 'JPEG', quality=quality, optimize=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()


IMG = {
    'hero': uri(os.path.join(V, '30-core-landing.png')),
    'dashboard': uri(os.path.join(A, '01-dashboard.png')),
    'positioning': uri(os.path.join(A, '03-positioning-done.png')),
    'digest': uri(os.path.join(A, '07-digest.png')),
    'performance': uri(os.path.join(V, '31-performance.png')),
    'operational': uri(os.path.join(V, '33-operational.png')),
    'workbench': uri(os.path.join(V, '26-ri-workbench.png')),
    'ridash': uri(os.path.join(V, '23-ri-dashboard.png')),
    'compare': uri(os.path.join(V, '22-oracle-compare-termination.png')),
    'fundintel': uri(os.path.join(V, '40-fund-intel.png')),
    'clausehitl': uri(os.path.join(V, '42-clauses-hitl.png')),
    'margins': uri(os.path.join(CH, 'margins.png'), width=1100),
    'concentration': uri(os.path.join(CH, 'concentration.png'), width=1100),
    'leakage': uri(os.path.join(CH, 'leakage.png'), width=1200),
    'secondtier': uri(os.path.join(CH, 'second-tier.png'), width=1000),
    'trend': uri(os.path.join(CH, 'bayview-trend.png'), width=800),
}

CSS = """
:root{
  --ink:#081022; --ink2:#101f3c; --teal:#2456d4; --paper:#f6f8fc; --panel:#fff;
  --hair:#cdd7e6; --muted:#5a6784; --faint:#8b96af; --gold:#14b8d4; --gold-soft:#2ee6c9;
  --c:#2456d4; --o:#0e7e99; --r:#4338ca; --e:#0c8577;
  --cl:#dbe6fd; --ol:#d3f0f7; --rl:#e3e1fb; --el:#d6f3ef;
  --mist:#8a9abf; --w80:#c6d2e8; --clay:#b52e40; --sage:#0d9488;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-snap-type:y mandatory}
body{font-family:'Segoe UI',Calibri,'Helvetica Neue',Arial,sans-serif;color:var(--ink);background:#050b18}
.slide{min-height:100vh;scroll-snap-align:start;display:flex;align-items:center;justify-content:center;
  background:var(--paper);position:relative;padding:4.5vh 4vw 6vh}
.slide.dark{background:var(--ink);color:#fff}
.inner{width:min(1220px,100%)}
.serif{font-family:Verdana,Geneva,sans-serif}
.kicker{display:flex;align-items:center;gap:.55rem;font-size:.72rem;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:var(--teal);margin-bottom:.7rem}
.dark .kicker{color:var(--gold)}
.chip{display:inline-grid;place-items:center;width:1.5rem;height:1.5rem;border-radius:.4rem;color:#fff;
  font-family:Verdana,Geneva,sans-serif;font-size:.95rem;font-weight:700}
h1{font-family:Verdana,Geneva,sans-serif;font-weight:700;font-size:clamp(1.6rem,3.4vw,2.5rem);line-height:1.08;letter-spacing:-.01em;margin-bottom:1rem}
.lede{font-size:clamp(.85rem,1.25vw,1rem);color:var(--muted);line-height:1.45;max-width:72ch;margin-bottom:1.4rem}
.dark .lede{color:var(--w80)}
.cols{display:grid;gap:1.4rem;align-items:start}
.c2{grid-template-columns:5fr 7fr}.c2r{grid-template-columns:7fr 5fr}.c3{grid-template-columns:1fr 1fr 1fr}
.c4{grid-template-columns:repeat(4,1fr)}
.shot{width:100%;border:1px solid var(--hair);border-radius:.7rem;box-shadow:0 8px 30px -12px rgba(22,48,47,.25);display:block}
.cap{font-size:.72rem;color:var(--faint);font-style:italic;margin-top:.45rem}
ul.b{list-style:none;display:flex;flex-direction:column;gap:.75rem;font-size:clamp(.8rem,1.15vw,.95rem);line-height:1.4}
ul.b b{color:var(--ink)} ul.b span{color:var(--muted)}
.dark ul.b b{color:#fff}.dark ul.b span{color:var(--w80)}
.card{background:var(--panel);border:1px solid var(--hair);border-radius:.8rem;padding:1.15rem 1.3rem}
.quote{font-family:Verdana,Geneva,sans-serif;font-style:italic;font-size:.95rem;line-height:1.4;color:var(--ink)}
.small{font-size:.7rem;color:var(--faint);margin-top:.5rem}
.punch{font-family:Verdana,Geneva,sans-serif;font-style:italic;font-size:clamp(.85rem,1.2vw,1rem);color:var(--teal);margin-top:1.2rem}
.dark .punch{color:var(--gold-soft)}
.corebar{display:flex;gap:.5rem;margin-bottom:1.1rem}
.corebar .l{display:grid;place-items:center;width:3.4rem;height:3.4rem;border-radius:.8rem;color:#fff;
  font-family:Verdana,Geneva,sans-serif;font-size:1.7rem;font-weight:700}
.suite{background:var(--panel);border:1px solid var(--hair);border-radius:.8rem;overflow:hidden;display:flex;flex-direction:column}
.suite .bar{height:4px}
.suite .pad{padding:1rem 1.1rem}
.suite h3{font-family:Verdana,Geneva,sans-serif;font-size:1.05rem;margin:.4rem 0 .1rem}
.suite .strap{font-size:.62rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
.suite ul{list-style:none;margin-top:.6rem;display:flex;flex-direction:column;gap:.35rem;font-size:.76rem;color:var(--muted)}
.foot{position:absolute;left:4vw;right:4vw;bottom:1.4vh;display:flex;justify-content:space-between;
  font-size:.65rem;color:var(--faint)}
.foot span:last-child{margin-right:5.6rem}
.dark .foot{color:var(--w80);opacity:.75}
.nav{position:fixed;right:1.1rem;bottom:1.1rem;z-index:9;display:flex;gap:.4rem}
.nav button{width:2.3rem;height:2.3rem;border-radius:.6rem;border:1px solid rgba(255,255,255,.25);
  background:rgba(16,32,31,.85);color:#fff;font-size:1rem;cursor:pointer}
.nav button:hover{background:rgba(16,32,31,1)}
.timeline{display:flex;gap:.5rem;margin-top:1rem}
.timeline .seg{border-radius:999px;color:#fff;padding:.55rem .9rem;font-size:.72rem;line-height:1.25}
.timeline b{font-size:.78rem}
table.cmp{width:100%;border-collapse:collapse;font-size:.85rem}
table.cmp th{text-align:left;font-size:.62rem;letter-spacing:.07em;text-transform:uppercase;color:var(--muted);
  padding:.45rem .6rem .45rem 0;border-bottom:1.5px solid var(--hair)}
table.cmp td{padding:.5rem .6rem .5rem 0;border-bottom:1px solid var(--hair);vertical-align:top}
@media print{
  html{scroll-snap-type:none}
  .slide{page-break-after:always;min-height:auto;height:100vh}
  .nav{display:none}
}
@media (max-width:820px){
  .c2,.c2r,.c3,.c4{grid-template-columns:1fr}
}
"""

JS = """
const slides=[...document.querySelectorAll('.slide')];let i=0;
const go=n=>{i=Math.max(0,Math.min(slides.length-1,n));slides[i].scrollIntoView({behavior:'smooth'})};
addEventListener('keydown',e=>{
  if(['ArrowDown','ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(i+1)}
  if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(i-1)}
  if(e.key==='Home')go(0); if(e.key==='End')go(slides.length-1);
});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)i=slides.indexOf(e.target)}),{threshold:.6});
slides.forEach(s=>io.observe(s));
document.getElementById('prev').onclick=()=>go(i-1);
document.getElementById('next').onclick=()=>go(i+1);
"""


def chip(letter, color):
    return f'<span class="chip" style="background:var(--{color})">{letter}</span>'


def foot(n=0, total=0):
    return ('<div class="foot"><span>CORE by Counterpart Health — pilot briefing · synthetic data · '
            'not legal or financial advice</span><span>@@N@@ / @@T@@</span></div>')


slides = []

# 1 · title
slides.append(f"""
<section class="slide dark"><div class="inner">
  <div class="corebar">
    <span class="l" style="background:var(--c)">C</span><span class="l" style="background:var(--o)">O</span>
    <span class="l" style="background:var(--r)">R</span><span class="l" style="background:var(--e)">E</span>
  </div>
  <div class="cols c2r">
    <div>
      <h1 style="font-size:clamp(2rem,4vw,3rem)">The full revenue cycle.<br>
      <span style="color:var(--gold-soft)">Or just the piece you need.</span></h1>
      <p class="lede" style="color:var(--mist)">CORE — Contracting · Operational · Revenue Integrity · Enquiry.
      Modular revenue-cycle intelligence for Australian day hospitals and independent private hospitals.</p>
      <p style="font-size:.85rem;color:var(--w80)">By Counterpart Health · Briefing for prospective pilot sites</p>
    </div>
    <div><img class="shot" src="{IMG['hero']}" alt="CORE platform home">
      <div class="cap" style="color:var(--mist)">The working platform — synthetic data</div></div>
  </div>
</div>{foot(1)}</section>""")

# 2 · pain
slides.append(f"""
<section class="slide"><div class="inner">
  <div class="kicker">The problem, from your chair</div>
  <h1>The negotiation you dread arrives every three years</h1>
  <div class="cols c2">
    <ul class="b">
      <li><b>The letter lands in June.</b> <span>Your HPPA expires in November. The fund invites “proposals”, attaches nothing, and suggests your rates are already generous.</span></li>
      <li><b>You negotiate between theatre lists.</b> <span>No benchmarks, no contracting team, no time — against a national fund team that does this every day.</span></li>
      <li><b>The contract bites quietly for three years.</b> <span>“CPI” with a discretionary carve-out. Re-banding “alignments” that cut rates without a negotiation. Then the audit letters start arriving.</span></li>
      <li><b>And nobody ever checks</b> <span>whether the value you did negotiate actually landed.</span></li>
    </ul>
    <div>
      <div class="card"><p class="quote">“Our last renewal, the fund paid 1.9% indexation in a 3.4% CPI year —
      the contract let them. We found out what it cost us at year end.”</p>
      <p class="small">— Composite scenario; clause mechanics from real, common HPPA terms.</p></div>
      <img class="shot" style="margin-top:1rem;max-width:24rem" src="{IMG['trend']}" alt="Bayview EBITDA margin trend">
    </div>
  </div>
</div>{foot(2)}</section>""")

# 3 · asymmetry
slides.append(f"""
<section class="slide"><div class="inner">
  <div class="kicker">The information asymmetry</div>
  <h1>What the fund knows that you don’t</h1>
  <p class="lede">Public data alone shows how uneven the table is — and the funds also hold private benchmarks of every comparable facility’s negotiated rates.</p>
  <div class="cols c2" style="grid-template-columns:1fr 1fr">
    <div class="card"><img style="width:100%" src="{IMG['margins']}" alt="Profit margins chart"></div>
    <div class="card"><img style="width:100%" src="{IMG['concentration']}" alt="Market concentration chart"></div>
  </div>
  <p class="punch">Every figure above is real and public — and almost none of it reaches a day hospital CEO’s negotiation file today.</p>
</div>{foot(3)}</section>""")

# 4 · cost
slides.append(f"""
<section class="slide"><div class="inner">
  <div class="kicker">What it costs · synthetic worked example</div>
  <h1>A “standard terms” agreement quietly takes 5–8% a year</h1>
  <div class="cols" style="grid-template-columns:11fr 8fr">
    <div class="card"><img style="width:100%" src="{IMG['leakage']}" alt="Clause leakage chart"></div>
    <div class="card"><img style="width:100%" src="{IMG['secondtier']}" alt="Second-tier walk-away chart"></div>
  </div>
  <p class="punch">And the fallback if you walk away — the second-tier default — is a floor the fund computes precisely. Most facilities never model it. CORE always does.</p>
</div>{foot(4)}</section>""")

# 5 · CORE framework
suite_cards = ''
for letter, color, light, name, strap, mods in [
    ('C', 'c', 'cl', 'Contracting', 'Win the renewal, then verify the value lands',
     ['Negotiation — round-by-round copilot', 'Board packs at any stage', 'Historical — value realisation']),
    ('O', 'o', 'ol', 'Operational', 'The revenue day-to-day, automated with review',
     ['Regulatory change — MBS/reform materiality', 'Contract reporting — obligations & timelines', 'DRG · coding · billing bots (previews)']),
    ('R', 'r', 'rl', 'Revenue Integrity', 'Audit management in both directions',
     ['Fund audit response — import → respond → export', 'Proactive optimisation — find leakage first', 'Clinical documentation improvement (roadmap)']),
    ('E', 'e', 'el', 'Enquiry', 'Ask anything, get citations',
     ['Ask the contract — cited Q&amp;A', 'Compare contracts — side-by-side', 'Ask legislation — PHI rules in real terms', 'Education library — flagged current']),
]:
    lis = ''.join(f'<li style="color:var(--muted)"><span style="color:var(--{color})">■</span>  {m}</li>' for m in mods)
    suite_cards += f"""
    <div class="suite"><div class="bar" style="background:var(--{color})"></div><div class="pad">
      <span class="chip" style="background:var(--{color});width:2.2rem;height:2.2rem;font-size:1.3rem;border-radius:.55rem">{letter}</span>
      <div class="strap" style="color:var(--{color});margin-top:.5rem">{strap}</div>
      <h3>{name} suite</h3><ul style="list-style:none">{lis}</ul>
    </div></div>"""
slides.append(f"""
<section class="slide"><div class="inner">
  <div class="kicker">The platform</div>
  <h1>CORE — four suites, buy what you need</h1>
  <div class="cols c4">{suite_cards}</div>
  <p class="punch">Comprehensive for a group that wants the full treatment — bespoke for a facility that wants only the pieces strategic to its business. Per-facility licences, tiered by theatres; add or drop modules at renewal.</p>
</div>{foot(5)}</section>""")


def shot_slide(n, letter, color, kick, heading, img, cap, items, flip=False):
    lis = ''.join(f'<li><b>{b}</b> <span>{t}</span></li>' for b, t in items)
    imgcol = f'<div><img class="shot" src="{img}" alt=""><div class="cap">{cap}</div></div>'
    txtcol = f'<ul class="b">{lis}</ul>'
    cols = (imgcol + txtcol) if not flip else (txtcol + imgcol)
    grid = 'grid-template-columns:8fr 4fr' if not flip else 'grid-template-columns:4fr 8fr'
    return f"""
<section class="slide"><div class="inner">
  <div class="kicker" style="color:var(--{color})">{chip(letter, color)} {kick}</div>
  <h1>{heading}</h1>
  <div class="cols" style="{grid}">{cols}</div>
</div>{foot(n)}</section>"""


# 6 · C copilot
slides.append(shot_slide(6, 'C', 'c', 'Contracting suite · Negotiation module',
  'Walk into the renewal with a contracting team', IMG['dashboard'],
  'The renewal, at a glance — live demo, synthetic data', [
    ('Reads your contract like opposing counsel.', 'Every adverse clause found, priced, and explained.'),
    ('Benchmarks your position.', 'Public industry data plus your own case mix and financials.'),
    ('Prices your walk-away.', 'The second-tier default scenario modelled in dollars, not vibes.'),
    ('Runs the negotiation with you.', 'Options at every decision point — you choose, it drafts, you send.'),
  ], flip=True))

# 7 · C paper→outcome
slides.append(f"""
<section class="slide"><div class="inner">
  <div class="kicker" style="color:var(--c)">{chip('C', 'c')} Contracting suite · Negotiation module</div>
  <h1>From positioning paper to signed outcome</h1>
  <div class="cols" style="grid-template-columns:1fr 1fr">
    <div><img class="shot" src="{IMG['positioning']}" alt=""><div class="cap">Positioning paper: rate gaps, priced BATNA, targets — streamed &amp; exportable</div></div>
    <div><img class="shot" src="{IMG['digest']}" alt=""><div class="cap">The fund’s reply, digested: traps flagged, counter drafted</div></div>
  </div>
  <p class="lede" style="margin-top:1rem;margin-bottom:0">Three strategy postures, drafted correspondence, a board pack at close — and nothing is ever sent without you. The demo settlement lands ≈ +$289k/yr on the synthetic facility.</p>
</div>{foot(7)}</section>""")

# 8 · C historical
slides.append(shot_slide(8, 'C', 'c', 'Contracting suite · Historical module',
  'Did the value you negotiated actually land?', IMG['performance'],
  'Negotiation history · indexation realised vs CPI · value-opportunity register', [
    ('Every negotiation, on the record.', 'Cycle, approach, settlement — and what it looks like three years later.'),
    ('Realisation, not just agreement.', 'The Federation deal tracked line by line: 78% of negotiated value landed — and the platform knows which lines are behind.'),
    ('An opportunity register.', '$332k/yr identified across the portfolio — captured, in negotiation, or lapsed with a reason.'),
  ]))

# 8b · intelligence layer
slides.append(f"""
<section class="slide"><div class="inner">
  <div class="kicker" style="color:var(--c)">{chip('C', 'c')} Contracting suite · negotiation intelligence engine</div>
  <h1>It reasons like a fund contract executive</h1>
  <div class="cols" style="grid-template-columns:1fr 1fr">
    <div><img class="shot" src="{IMG['fundintel']}" alt=""><div class="cap">The Negotiation Leverage Index — every factor weighted, evidenced, explained</div></div>
    <div><img class="shot" src="{IMG['clausehitl']}" alt=""><div class="cap">Every clause classified, unfair terms flagged, valued — overridable, with an audit trail</div></div>
  </div>
  <p class="lede" style="margin-top:1rem;margin-bottom:0">Fund profiles, mutual dependency, and a priced register of every negotiation lever — public data plus your own history, never other hospitals' terms.</p>
</div>{foot()}</section>""")

# 9 · O previews
slides.append(shot_slide(9, 'O', 'o', 'Operational suite · roadmap previews',
  'Next: the revenue day-to-day, automated with review', IMG['operational'],
  'Concept previews — provisional DRG, AI coding, billing bots (synthetic)', [
    ('Provisional DRG allocation.', 'Tomorrow’s list with a revenue forecast before the episode happens.'),
    ('AI coding assistant.', 'Draft ICD-10-AM / ACHI codes with confidence — the coder decides.'),
    ('Billing bots.', 'Pre-lodgement checks against contract and policy; failures held with reasons, not lodged and hoped for.'),
  ]))

# 10 · R workbench
slides.append(shot_slide(10, 'R', 'r', 'Revenue Integrity suite · fund audit response',
  'When the audit letter arrives, you’re already ready', IMG['workbench'],
  'Fund spreadsheet in → PAS-enriched workbench → Excel response out', [
    ('Import the fund’s file.', 'Every queried claim parsed and enriched from your patient administration system.'),
    ('Respond with a record.', 'Suggested responses, your decision per item, comments, documents — an audit trail of the audit.'),
    ('Export back to the fund.', 'One click builds the Excel response from your decisions.'),
    ('Next: proactive optimisation.', 'The same engine, pointed at your own claims — find leakage before anyone audits you.'),
  ]))

# 11 · R dashboard
slides.append(shot_slide(11, 'R', 'r', 'Revenue Integrity suite · outcomes',
  'Prove improvement, don’t just respond', IMG['ridash'],
  'Outcomes by fund, category and time — with a learning loop', [
    ('61% overturned', 'on the synthetic year — $32.9k defended of $48.6k challenged.'),
    ('By fund, category, time.', 'Who audits you, for what, with what result — filters recompute everything.'),
    ('A learning loop.', 'Every category feeds a process fix so the same finding doesn’t come back.'),
  ]))

# 12 · E enquiry
slides.append(shot_slide(12, 'E', 'e', 'Enquiry suite · ask the contract',
  'Your whole team can finally ask the contracts', IMG['compare'],
  'One question, every agreement answered side by side — with clause citations', [
    ('Grounded, cited, scored.', 'Answers from your executed HPPAs, the legislation, and your own policy register.'),
    ('Compares across contracts.', 'Termination 60 vs 90 days; payment 14 vs ~21; indexation strong vs weak — instantly, with citations.'),
    ('Honest about silence.', 'Where the contracts don’t answer, it says so and recommends escalation. It never invents a clause.'),
  ]))

# 13 · trust (dark)
slides.append(f"""
<section class="slide dark"><div class="inner">
  <div class="kicker">Why you can trust it</div>
  <h1>Human-in-the-loop isn’t a disclaimer.<br>It’s the architecture.</h1>
  <div class="cols c3" style="margin-top:1.6rem">
    <div><div style="width:2.4rem;height:3px;background:var(--gold);margin-bottom:.8rem"></div>
      <h3 class="serif" style="font-size:1.1rem;margin-bottom:.5rem">You decide, always</h3>
      <p style="font-size:.85rem;color:var(--w80);line-height:1.45">Every action is proposed, never taken. CORE cannot send, agree, code, lodge, or concede anything on its own. The audit trail shows a human choice at every step.</p></div>
    <div><div style="width:2.4rem;height:3px;background:var(--gold);margin-bottom:.8rem"></div>
      <h3 class="serif" style="font-size:1.1rem;margin-bottom:.5rem">Your data stays yours</h3>
      <p style="font-size:.85rem;color:var(--w80);line-height:1.45">Strict per-facility isolation. Your rates and financials are never used to benchmark, train, or inform any other customer. Benchmarks come from public data only.</p></div>
    <div><div style="width:2.4rem;height:3px;background:var(--gold);margin-bottom:.8rem"></div>
      <h3 class="serif" style="font-size:1.1rem;margin-bottom:.5rem">Built for a regulated sector</h3>
      <p style="font-size:.85rem;color:var(--w80);line-height:1.45">Privacy Act / APP-aligned handling, Australian data residency, security review before any real data is touched. Decision support — not legal or financial advice, and it says so on every page.</p></div>
  </div>
  <p class="punch">And one bright line: CORE serves one hospital against its funds. It will never share or align rates between competing hospitals.</p>
</div>{foot(13)}</section>""")

# 14 · pilot
slides.append(f"""
<section class="slide"><div class="inner">
  <div class="kicker">The pilot</div>
  <h1>What a pilot involves — and what you get</h1>
  <div class="cols" style="grid-template-columns:1fr 1fr">
    <div class="card">
      <h3 class="serif" style="color:var(--teal);font-size:1rem;margin-bottom:.6rem">Your commitment</h3>
      <ul class="b" style="font-size:.85rem">
        <li><b>12 weeks,</b> <span>timed to your next HPPA renewal window.</span></li>
        <li><b>Your documents</b> <span>(expiring HPPA, billing extracts, P&amp;L) under NDA, with agreed handling and deletion terms.</span></li>
        <li><b>2–3 hours a fortnight</b> <span>from you or your business manager.</span></li>
        <li><b>Candour:</b> <span>what’s wrong, what’s missing, what you wouldn’t pay for.</span></li>
      </ul>
    </div>
    <div class="card">
      <h3 class="serif" style="color:var(--teal);font-size:1rem;margin-bottom:.6rem">What you get</h3>
      <ul class="b" style="font-size:.85rem">
        <li><b>Free pilot access</b> <span>to the Contracting, Revenue Integrity and Enquiry suites.</span></li>
        <li><b>A real positioning paper</b> <span>for your live negotiation — clause analysis, benchmarks, priced walk-away, targets.</span></li>
        <li><b>Your audit season, managed</b> <span>through the Revenue Integrity workbench.</span></li>
        <li><b>Founding-customer pricing</b> <span>locked in if you continue — and a real say in the roadmap.</span></li>
      </ul>
    </div>
  </div>
  <div style="font-size:.7rem;font-weight:700;letter-spacing:.09em;color:var(--muted);margin-top:1.2rem">PILOT TIMELINE</div>
  <div class="timeline">
    <div class="seg" style="background:var(--ink2);flex:2.9"><b>Weeks 1–2</b> · Onboard under NDA · digest your HPPAs</div>
    <div class="seg" style="background:var(--teal);flex:5.9"><b>Weeks 3–10</b> · Live negotiation support · audit responses · staff using Enquiry</div>
    <div class="seg" style="background:#4e8b87;flex:3"><b>Weeks 11–12</b> · Measure the outcome · decide together</div>
  </div>
</div>{foot(14)}</section>""")

# 15 · who / ask
slides.append(f"""
<section class="slide"><div class="inner">
  <div class="kicker">Who we are &amp; what we’re asking</div>
  <h1>We’re recruiting 2–3 founding pilot sites</h1>
  <div class="cols" style="grid-template-columns:6fr 5fr">
    <div>
      <h3 class="serif" style="color:var(--teal);font-size:1rem;margin-bottom:.4rem">Who we are</h3>
      <p style="font-size:.88rem;color:var(--muted);line-height:1.5;margin-bottom:1rem">Counterpart Health — a venture in formation: product and AI engineering with health-sector revenue-cycle domain input, building in the open with Day Hospitals Australia and APHA networks. Everything pictured in this deck is the working CORE platform today — on synthetic data, by design: no real hospital data will be touched before independent security review.</p>
      <h3 class="serif" style="color:var(--teal);font-size:1rem;margin-bottom:.4rem">Why now</h3>
      <p style="font-size:.88rem;color:var(--muted);line-height:1.5">Sector margins are at break-even, contracting disputes are national news, and AI can finally read a 40-page HPPA reliably enough to matter — with a human deciding every step.</p>
    </div>
    <div class="card" style="background:var(--ink2);border-color:var(--ink2);color:#fff">
      <h3 class="serif" style="color:var(--gold);font-size:1rem;margin-bottom:.7rem">The ask</h3>
      <ul class="b" style="font-size:.9rem">
        <li><b style="color:#fff">One conversation</b> <span style="color:var(--w80)">about your next renewal date, your audit season, and your last negotiation.</span></li>
        <li><b style="color:#fff">One document</b> <span style="color:var(--w80)">— your expiring HPPA — under NDA, when you’re ready.</span></li>
        <li><b style="color:#fff">One pilot slot</b> <span style="color:var(--w80)">— 2–3 facilities, first come, renewal-date priority.</span></li>
      </ul>
    </div>
  </div>
</div>{foot(15)}</section>""")

# 16 · close
slides.append(f"""
<section class="slide dark"><div class="inner">
  <div class="corebar">
    <span class="l" style="background:var(--c);width:2.6rem;height:2.6rem;font-size:1.3rem">C</span>
    <span class="l" style="background:var(--o);width:2.6rem;height:2.6rem;font-size:1.3rem">O</span>
    <span class="l" style="background:var(--r);width:2.6rem;height:2.6rem;font-size:1.3rem">R</span>
    <span class="l" style="background:var(--e);width:2.6rem;height:2.6rem;font-size:1.3rem">E</span>
  </div>
  <h1 style="font-size:clamp(1.8rem,3.6vw,2.7rem)">Next step: a 30-minute walkthrough,<br>on your renewal timeline.</h1>
  <p class="lede" style="color:var(--w80)">We’ll run CORE end to end — renewal dashboard to board pack, audit inbox to Excel response — and leave you the positioning-paper sample.</p>
  <p style="font-size:.75rem;color:var(--mist)">CORE by Counterpart Health · pilot enquiries — [contact to be added] · Product imagery is the working demo on synthetic data; public figures cited to APRA, DoHAC, ACCC and the PHI Rules.</p>
</div>{foot(16)}</section>""")

html = f"""<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CORE — pilot briefing · by Counterpart Health</title>
<style>{CSS}</style>
</head>
<body>
{''.join(slides)}
<div class="nav"><button id="prev" title="Previous slide">↑</button><button id="next" title="Next slide">↓</button></div>
<script>{JS}</script>
</body>
</html>"""

total = len(slides)
for i in range(total):
    slides[i] = slides[i].replace('@@N@@', f'{i + 1:02d}').replace('@@T@@', str(total))
html = f"""<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CORE — pilot briefing · by Counterpart Health</title>
<style>{CSS}</style>
</head>
<body>
{''.join(slides)}
<div class="nav"><button id="prev" title="Previous slide">↑</button><button id="next" title="Next slide">↓</button></div>
<script>{JS}</script>
</body>
</html>"""
with open(OUT, 'w') as f:
    f.write(html)
print(f'wrote {OUT} ({os.path.getsize(OUT) / 1e6:.1f} MB, {len(slides)} slides)')
