#!/usr/bin/env python3
"""One-page leave-behind (HTML → print to PDF via chromium). Run from repo root:
python3 deck/build_onepager.py && node deck/print_onepager.mjs"""
import base64, io, os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
CH = os.path.join(HERE, 'assets', 'charts')

def uri(path, width=900, q=80):
    with Image.open(path) as im:
        if im.width > width:
            im = im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)
        if im.mode in ('RGBA', 'P'):
            bg = Image.new('RGB', im.size, (255, 255, 255))
            bg.paste(im.convert('RGBA'), mask=im.convert('RGBA').split()[-1]); im = bg
        b = io.BytesIO(); im.save(b, 'JPEG', quality=q, optimize=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()

margins = uri(os.path.join(CH, 'margins.png'))
leakage = uri(os.path.join(CH, 'leakage.png'))

html = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@page {{ size: A4; margin: 0 }}
* {{ margin:0; padding:0; box-sizing:border-box }}
body {{ font-family:'Segoe UI',Calibri,Arial,sans-serif; color:#081022; width:210mm; height:297mm; padding:11mm 13mm; display:flex; flex-direction:column }}
.top {{ display:flex; align-items:center; gap:6mm; padding-bottom:4mm; border-bottom:1.5px solid #cdd7e6 }}
.letters span {{ display:inline-grid; place-items:center; width:9mm; height:9mm; border-radius:2.2mm; color:#fff; font-weight:800; font-size:5mm; margin-right:1.2mm }}
h1 {{ font-size:7.4mm; letter-spacing:-.01em; line-height:1.1 }}
h1 em {{ font-style:normal; color:#2f6bf6 }}
.tag {{ font-size:3.4mm; color:#5a6784; margin-top:1mm }}
.grid {{ display:grid; grid-template-columns:1fr 1fr; gap:5mm; margin-top:5mm }}
.card {{ border:1px solid #cdd7e6; border-radius:2.5mm; padding:3.5mm }}
.card img {{ width:100% }}
h2 {{ font-size:3.6mm; text-transform:uppercase; letter-spacing:.08em; color:#2456d4; margin-bottom:1.6mm }}
p, li {{ font-size:3.3mm; line-height:1.45; color:#333f57 }}
ul {{ list-style:none }} li {{ margin-bottom:1.4mm; padding-left:3.5mm; position:relative }}
li:before {{ content:''; position:absolute; left:0; top:1.55mm; width:1.6mm; height:1.6mm; border-radius:.4mm; background:#2f6bf6 }}
.suites {{ display:grid; grid-template-columns:repeat(4,1fr); gap:2.5mm; margin-top:5mm }}
.suite {{ border-radius:2.5mm; padding:2.8mm; color:#fff }}
.suite b {{ font-size:3.5mm; display:block }} .suite span {{ font-size:2.9mm; opacity:.85; line-height:1.3; display:block; margin-top:.8mm }}
.foot {{ margin-top:auto; padding-top:3mm; border-top:1px solid #cdd7e6; display:flex; justify-content:space-between; font-size:2.9mm; color:#8b96af }}
.every {{ font-weight:700; font-size:3.6mm; margin-top:4mm }}
.every i {{ font-style:normal }} 
</style></head><body>
<div class="top">
  <div class="letters"><span style="background:#2456d4">C</span><span style="background:#0e7e99">O</span><span style="background:#4338ca">R</span><span style="background:#0c8577">E</span></div>
  <div>
    <h1>The contracting team your hospital never had. <em>Now it does.</em></h1>
    <div class="tag">CORE — commercial intelligence for Australian private &amp; day hospitals · by Counterpart Health</div>
  </div>
</div>
<div class="grid">
  <div class="card"><img src="{margins}"></div>
  <div class="card"><img src="{leakage}"></div>
  <div>
    <h2>The problem is structural</h2>
    <ul>
      <li>Sector profit margins fell from <b>5.1% to −0.1%</b> (2020–21 → 2023–24, Government Health Check) while insurers hold ~5% margins and $13bn net assets (APRA, Dec 2025).</li>
      <li>The top five funds hold ~80% of policies; a day hospital CEO negotiates alone, without benchmarks, against a national contracting team.</li>
      <li>"Standard terms" quietly leak 5–8% a year — discretionary indexation, unilateral re-banding, frozen holdovers, 24-month clawbacks.</li>
    </ul>
  </div>
  <div>
    <h2>What CORE does about it</h2>
    <ul>
      <li><b>Reads your contract like opposing counsel:</b> every clause classified, unfair terms flagged with reasons, and <b>valued in dollars</b> — with a human override and audit trail.</li>
      <li><b>Builds your leverage case:</b> fund dossiers, mutual-dependency modelling, and a fully decomposed Negotiation Leverage Index.</li>
      <li><b>Runs the negotiation with you:</b> strategy options, drafted letters, fund-reply trap detection, board-ready close-out. Nothing is ever sent without you.</li>
      <li><b>Defends the audit season:</b> fund file in → PAS-enriched workbench → Excel response out, with outcome dashboards.</li>
    </ul>
  </div>
</div>
<div class="suites">
  <div class="suite" style="background:#2456d4"><b>C · Contracting</b><span>Negotiation copilot · clause &amp; change intelligence · leverage · value realisation</span></div>
  <div class="suite" style="background:#0e7e99"><b>O · Operational</b><span>Provisional DRG · AI coding · billing bots (roadmap)</span></div>
  <div class="suite" style="background:#4338ca"><b>R · Revenue Integrity</b><span>Audit response today · proactive leakage detection next</span></div>
  <div class="suite" style="background:#0c8577"><b>E · Enquiry</b><span>Ask any contract — cited, confidence-scored, cross-contract</span></div>
</div>
<p class="every">Every <i style="color:#0c8577">Contract</i>. Every <i style="color:#0e7e99">Dollar</i>. Every <i style="color:#2f6bf6">Decision</i>. &nbsp;·&nbsp; Pilot slots: 2–3 facilities, renewal-date priority — free access, a real positioning paper for your live negotiation, founding-customer pricing.</p>
<div class="foot"><span>Pilot enquiries: [contact to be added]</span><span>Public figures cited to APRA, DoHAC, ACCC · product imagery is a working demo on synthetic data · not legal or financial advice</span></div>
</body></html>"""
open(os.path.join(HERE, 'onepager.html'), 'w').write(html)
print('onepager.html written')
