#!/usr/bin/env python3
"""Build the Counterpart Health pilot-site pitch deck (16:9 pptx).

Audience: day hospital CEOs/owners considering a pilot. Design system matches
the prototype: ink-teal on warm paper, gold accent, serif display type.
Run:  python3 deck/build_deck.py   (from repo root; needs python-pptx + Pillow)
"""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, 'assets')
OUT = os.path.join(HERE, 'counterpart-pilot-deck.pptx')

# ---------- palette ----------
INK = RGBColor(0x10, 0x20, 0x1F)      # near-black teal
INK2 = RGBColor(0x1D, 0x40, 0x3E)     # deep teal
TEAL = RGBColor(0x33, 0x6C, 0x69)     # mid teal
PAPER = RGBColor(0xFA, 0xF9, 0xF6)    # warm paper
PANEL = RGBColor(0xFF, 0xFF, 0xFF)
HAIR = RGBColor(0xD3, 0xCE, 0xC1)     # hairline
MUTED = RGBColor(0x5D, 0x67, 0x63)
FAINT = RGBColor(0x8A, 0x93, 0x8E)
GOLD = RGBColor(0xC9, 0xA2, 0x27)
CLAY = RGBColor(0x9C, 0x3D, 0x2E)
SAGE = RGBColor(0x3E, 0x6B, 0x4F)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
W80 = RGBColor(0xD9, 0xE6, 0xE4)      # ink-100 for text on dark

SERIF = 'Georgia'
SANS = 'Calibri'

SW, SH = Inches(13.333), Inches(7.5)

prs = Presentation()
prs.slide_width = SW
prs.slide_height = SH
BLANK = prs.slide_layouts[6]


def slide(bg=PAPER):
    s = prs.slides.add_slide(BLANK)
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SW, SH)
    r.fill.solid(); r.fill.fore_color.rgb = bg
    r.line.fill.background()
    r.shadow.inherit = False
    return s


def box(s, x, y, w, h):
    tb = s.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    return tb, tf


def setp(p, text, size, color, font=SANS, bold=False, italic=False,
         align=PP_ALIGN.LEFT, space_after=6, space_before=0, line=None, tracking=None):
    p.text = text
    p.alignment = align
    p.space_after = Pt(space_after)
    p.space_before = Pt(space_before)
    if line:
        p.line_spacing = line
    fonts = [r.font for r in p.runs] if p.runs else [p.font]
    for f in fonts:
        f.size = Pt(size); f.color.rgb = color; f.name = font
        f.bold = bold; f.italic = italic
    return p


def add_par(tf, *args, **kw):
    p = tf.paragraphs[0] if (len(tf.paragraphs) == 1 and not tf.paragraphs[0].runs) else tf.add_paragraph()
    return setp(p, *args, **kw)


def kicker(s, text, x=Inches(0.75), y=Inches(0.55), color=TEAL, w=Inches(11)):
    _, tf = box(s, x, y, w, Inches(0.35))
    p = add_par(tf, text.upper(), 12, color, bold=True)
    p.runs[0].font._rPr.set('spc', '160')  # letter spacing


def title(s, text, x=Inches(0.72), y=Inches(0.92), size=33, color=INK, w=Inches(11.8)):
    _, tf = box(s, x, y, w, Inches(1.2))
    add_par(tf, text, size, color, font=SERIF, bold=True, line=1.05)


def rule(s, x, y, w, color=HAIR, h=Pt(1.2)):
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    r.fill.solid(); r.fill.fore_color.rgb = color
    r.line.fill.background(); r.shadow.inherit = False
    return r


def footer(s, n, dark=False):
    _, tf = box(s, Inches(0.75), Inches(7.06), Inches(11), Inches(0.3))
    add_par(tf, 'Counterpart Health — pilot briefing · demonstration uses synthetic data · not legal or financial advice',
            9, W80 if dark else FAINT)
    _, tf2 = box(s, Inches(12.35), Inches(7.06), Inches(0.6), Inches(0.3))
    add_par(tf2, f'{n:02d}', 9, W80 if dark else FAINT, align=PP_ALIGN.RIGHT)


def card(s, x, y, w, h, fill=PANEL, line_c=HAIR):
    c = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h)
    c.adjustments[0] = 0.045
    c.fill.solid(); c.fill.fore_color.rgb = fill
    c.line.color.rgb = line_c; c.line.width = Pt(1)
    c.shadow.inherit = False
    return c


def pic_card(s, img, x, y, w, caption=None):
    """Screenshot with hairline frame, preserving 1600:1000 aspect."""
    h = w * 1000 / 1600
    frame = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x - Emu(19050), y - Emu(19050),
                               w + Emu(38100), h + Emu(38100))
    frame.adjustments[0] = 0.02
    frame.fill.solid(); frame.fill.fore_color.rgb = PANEL
    frame.line.color.rgb = HAIR; frame.line.width = Pt(1.25)
    frame.shadow.inherit = False
    s.shapes.add_picture(os.path.join(ASSETS, img), x, y, width=w, height=h)
    if caption:
        _, tf = box(s, x, y + h + Inches(0.08), w, Inches(0.3))
        add_par(tf, caption, 10, FAINT, italic=True)
    return h


def bullets(tf, items, size=14, color=INK, gap=8, bold_lead=True, line=1.15):
    for lead, rest in items:
        p = tf.paragraphs[0] if (len(tf.paragraphs) == 1 and not tf.paragraphs[0].runs) else tf.add_paragraph()
        p.space_after = Pt(gap); p.line_spacing = line
        r1 = p.add_run(); r1.text = lead
        r1.font.size = Pt(size); r1.font.name = SANS; r1.font.bold = bold_lead; r1.font.color.rgb = color
        if rest:
            r2 = p.add_run(); r2.text = rest
            r2.font.size = Pt(size); r2.font.name = SANS; r2.font.color.rgb = MUTED


# ================================================================ 1 · title
s = slide(INK)
# gold hairline
rule(s, Inches(0.75), Inches(2.35), Inches(1.1), GOLD, Pt(3))
_, tf = box(s, Inches(0.72), Inches(2.6), Inches(11.5), Inches(1.9))
add_par(tf, 'Counterpart Health', 52, WHITE, font=SERIF, bold=True, space_after=10)
add_par(tf, 'The contracting team your day hospital never had.', 22, W80, font=SERIF, italic=True)
_, tf = box(s, Inches(0.75), Inches(4.7), Inches(11), Inches(0.9))
add_par(tf, 'AI-assisted HPPA negotiation and contract intelligence for Australian day hospitals and independent private hospitals.',
        14, W80, line=1.3)
_, tf = box(s, Inches(0.75), Inches(6.4), Inches(11.8), Inches(0.5))
add_par(tf, 'Briefing for prospective pilot sites · All product imagery from a working demonstration on synthetic data', 11, RGBColor(0x8A, 0xA5, 0xA2))
footer(s, 1, dark=True)

# ================================================================ 2 · the pain
s = slide()
kicker(s, 'The problem, from your chair')
title(s, 'The negotiation you dread arrives every three years')
_, tf = box(s, Inches(0.75), Inches(2.1), Inches(6.1), Inches(4.6))
bullets(tf, [
    ('The letter lands in June. ', 'Your HPPA expires in November. The fund invites "proposals", attaches nothing, and suggests your rates are already generous.'),
    ('You negotiate between theatre lists. ', 'No benchmarks, no contracting team, no time — against a national fund team that does this every day, with data on every comparable facility.'),
    ('The contract reads politely and bites quietly. ', '"CPI indexation" with a discretionary carve-out. Re-banding "alignments" that cut rates without a negotiation. A holdover clause that makes every month of delay free — for them.'),
    ('So you sign. ', 'And the gap compounds for three more years, on a facility already running at a 4–5% margin.'),
], size=15, gap=14)
c = card(s, Inches(7.3), Inches(2.1), Inches(5.3), Inches(4.45), fill=PANEL)
_, tf = box(s, Inches(7.65), Inches(2.4), Inches(4.6), Inches(3.9))
add_par(tf, 'Sound familiar?', 13, TEAL, bold=True, space_after=10)
add_par(tf, '“Our last renewal, the fund paid 1.9% indexation in a 3.4% CPI year — the contract let them. Then two ‘classification alignments’ moved our four best ophthalmic groups down a band. We found out what it cost us at year end.”',
        16, INK, font=SERIF, italic=True, line=1.35, space_after=10)
add_par(tf, '— Composite scenario. The figures are from our synthetic demonstration facility; the mechanics are from real, common HPPA clauses.',
        10.5, FAINT, line=1.25)
footer(s, 2)

# ================================================================ 3 · asymmetry
s = slide()
kicker(s, 'The information asymmetry')
title(s, 'What the fund knows that you don’t')
_, tf = box(s, Inches(0.75), Inches(1.95), Inches(11.8), Inches(0.6))
add_par(tf, 'Public data alone shows how uneven this table is — and the funds also hold their private benchmarks of every comparable facility’s rates.',
        14, MUTED, line=1.25)
rows = [
    ('The counterparty', 'Their position', 'Source'),
    ('Health insurers, Dec 2025 quarter', '$8.6bn quarterly revenue · $417m net profit after tax · $13.1bn net assets', 'APRA quarterly PHI statistics'),
    ('Market concentration', 'Top five funds hold ~80% of policies; Medibank + Bupa alone ~52%; buying groups negotiate for dozens more insurers', 'APRA / ACCC'),
    ('Private hospitals, 2023–24', 'Sector profit margins fell from 5.1% (2020–21) to −0.1% — below break-even in aggregate', 'Private Hospital Sector Financial Health Check (2024)'),
    ('Your fallback if talks fail', 'Second-tier default: ~85% of the average contracted rate — a floor the fund can compute precisely, and you probably can’t', 'PHI (Benefit Requirements) Rules'),
]
ty = Inches(2.75)
col_x = [Inches(0.75), Inches(4.35), Inches(10.1)]
col_w = [Inches(3.4), Inches(5.55), Inches(2.5)]
for i, (a, b, c_) in enumerate(rows):
    hdr = i == 0
    yy = ty + Inches(0.0 if hdr else 0.52 + (i - 1) * 0.88)
    for j, txt in enumerate((a, b, c_)):
        _, tf = box(s, col_x[j], yy, col_w[j], Inches(0.85))
        add_par(tf, txt.upper() if hdr else txt,
                10.5 if hdr else (12.5 if j == 1 else 12),
                MUTED if hdr else (INK if j < 2 else FAINT),
                bold=hdr or j == 0, line=1.15)
    if not hdr:
        rule(s, Inches(0.75), yy - Inches(0.07), Inches(11.85))
_, tf = box(s, Inches(0.75), Inches(6.35), Inches(11.8), Inches(0.5))
add_par(tf, 'Every figure above is real, public, and current — and almost none of it reaches a day hospital CEO’s negotiation file today.',
        13, TEAL, font=SERIF, italic=True)
footer(s, 3)

# ================================================================ 4 · cost of a bad deal
s = slide()
kicker(s, 'What it costs · synthetic worked example')
title(s, 'A “standard terms” agreement quietly takes 5–8% a year')
_, tf = box(s, Inches(0.75), Inches(1.95), Inches(11.8), Inches(0.55))
add_par(tf, 'Bayview Day Surgery — our fictional but carefully realistic 4-theatre Melbourne facility ($14.2m revenue, 4.9% EBITDA). One fund, one agreement, three planted clauses of the kind we see in real HPPAs:',
        13.5, MUTED, line=1.25)
items = [
    ('cl. 12.3 · Discretionary indexation', '1.9% paid in a 3.4% CPI year — "portfolio affordability"', '≈ $45k / yr, compounding'),
    ('cl. 8.4 · Unilateral re-banding', '4 ophthalmic item groups moved down a band on 30 days’ notice', '≈ $95–120k / yr'),
    ('cl. 2.2 · Frozen holdover', 'Talks drift past expiry; rates freeze — delay is free for the fund', '≈ $8–11k / month'),
    ('cl. 14.5 · 24-month set-off', 'Fund can claw back "overpayments" for 2 years; you get 30 days to lodge a claim', 'audit-risk exposure'),
]
xw = Inches(2.98)
for i, (a, b, c_) in enumerate(items):
    x = Inches(0.75) + i * (xw + Inches(0.12))
    card(s, x, Inches(2.85), xw, Inches(2.5))
    _, tf = box(s, x + Inches(0.22), Inches(3.05), xw - Inches(0.44), Inches(2.2))
    add_par(tf, a, 12.5, TEAL, bold=True, space_after=6, line=1.1)
    add_par(tf, b, 11.5, MUTED, line=1.2, space_after=8)
    add_par(tf, c_, 15, CLAY, bold=True)
c = card(s, Inches(0.75), Inches(5.7), Inches(11.85), Inches(0.95), fill=RGBColor(0xF3, 0xF0, 0xE8), line_c=HAIR)
_, tf = box(s, Inches(1.05), Inches(5.88), Inches(11.3), Inches(0.65))
add_par(tf, 'On the demo facility this one agreement leaks ≈ $175k/yr in rates alone — most of a year’s EBITDA. A 1% improvement across a facility’s fund revenue is worth ~$100k+ a year, every year.',
        14, INK, font=SERIF, italic=True, line=1.25)
footer(s, 4)

# ================================================================ 5 · copilot intro + dashboard
s = slide()
kicker(s, 'Product 1 · the negotiation copilot')
title(s, 'Walk in with a contracting team behind you', size=30)
_, tf = box(s, Inches(0.75), Inches(1.9), Inches(4.5), Inches(4.7))
bullets(tf, [
    ('Reads your contract like opposing counsel. ', 'Every adverse clause found, priced, and explained.'),
    ('Benchmarks your position. ', 'Public industry data (APRA, Ombudsman, AIHW) + your own case mix and financials.'),
    ('Prices your walk-away. ', 'The second-tier default scenario modelled in dollars, not vibes.'),
    ('Then runs the negotiation with you. ', 'Options at every decision point — you choose, it drafts, you send.'),
], size=13.5, gap=10)
pic_card(s, '01-dashboard.png', Inches(5.5), Inches(1.95), Inches(7.1),
         caption='The renewal, at a glance — live demo, synthetic data')
footer(s, 5)

# ================================================================ 6 · positioning paper
s = slide()
kicker(s, 'Step 1 · analyse position')
title(s, 'A positioning paper a major group would recognise', size=30)
pic_card(s, '03-positioning-done.png', Inches(0.75), Inches(1.95), Inches(7.1),
         caption='Streamed, exportable, board-ready — demo output')
_, tf = box(s, Inches(8.25), Inches(2.1), Inches(4.35), Inches(4.5))
bullets(tf, [
    ('Where you stand. ', 'Rate position by service line, volume-weighted, with the dollar impact.'),
    ('What the terms have cost. ', 'The carve-out, the re-bandings, the holdover — quantified over the current term.'),
    ('Your BATNA, priced. ', 'Second-tier default modelled against your actual case mix.'),
    ('Targets set. ', 'Target / anchor / walk-away for every element — rates and terms.'),
], size=13.5, gap=10)
footer(s, 6)

# ================================================================ 7 · strategy
s = slide()
kicker(s, 'Step 2 · choose your posture')
title(s, 'Choose your own adventure — you stay in command', size=30)
pic_card(s, '04-strategy.png', Inches(3.35), Inches(1.82), Inches(8.3))
_, tf = box(s, Inches(0.75), Inches(2.1), Inches(2.35), Inches(4.6))
bullets(tf, [
    ('Options, ', 'not orders.'),
    ('Risks ', 'stated up front.'),
    ('Fund’s likely response ', 'predicted for each path.'),
    ('Change course ', 'any time — everything re-drafts.'),
    ('', 'Three internally consistent strategies — working demo.'),
], size=12.5, gap=10)
footer(s, 7)

# ================================================================ 8 · letters
s = slide()
kicker(s, 'Step 3 · correspondence')
title(s, 'It drafts every letter. You edit. You send.', size=30)
pic_card(s, '05-letter.png', Inches(0.75), Inches(1.95), Inches(7.1),
         caption='Opening letter for the chosen posture — demo output')
_, tf = box(s, Inches(8.25), Inches(2.1), Inches(4.35), Inches(4.5))
bullets(tf, [
    ('Fund-appropriate register. ', 'Professional, firm, precise — the letter a contracting team would write.'),
    ('Your asks, structured. ', 'Rates and terms held together as one package, with deadlines attached.'),
    ('Nothing sent autonomously. ', 'The copilot has no send button. Ever. That is a design principle, not a disclaimer.'),
], size=13.5, gap=12)
footer(s, 8)

# ================================================================ 9 · fund reply digestion
s = slide()
kicker(s, 'Step 4 · the fund replies')
title(s, 'It reads their letter for the traps you’d miss', size=30)
pic_card(s, '07-digest.png', Inches(3.35), Inches(1.82), Inches(8.3))
_, tf = box(s, Inches(0.75), Inches(2.1), Inches(2.35), Inches(4.6))
bullets(tf, [
    ('“Warm” ≠ movement. ', 'The digest scores real concessions.'),
    ('Wording traps flagged. ', 'e.g. a “floor” that legalises 50% indexation.'),
    ('Counter drafted ', 'within the strategy you chose.'),
    ('', 'Line-by-line digest and movement scorecard — working demo.'),
], size=12.5, gap=10)
footer(s, 9)

# ================================================================ 10 · oracle
s = slide()
kicker(s, 'Product 2 · the contract oracle')
title(s, 'Your whole team can finally ask the contract', size=30)
pic_card(s, '10-oracle-answer.png', Inches(0.75), Inches(1.95), Inches(7.1),
         caption='Every answer cites clause and source, and states confidence — demo')
_, tf = box(s, Inches(8.25), Inches(2.1), Inches(4.35), Inches(4.5))
bullets(tf, [
    ('Grounded, cited, scored. ', 'Answers come from your executed HPPAs, the legislation, and your own policy register — with clause-level citations and a confidence rating.'),
    ('Honest about silence. ', 'Where the contract doesn’t answer, it says so and recommends escalation. It never invents a clause.'),
    ('Front desk to theatre. ', 'Excess collection, IFC, lens upgrades, transfer rules, audit notices — answered in seconds, consistently.'),
], size=13.5, gap=12)
footer(s, 10)

# ================================================================ 11 · trust
s = slide(INK)
kicker(s, 'Why you can trust it', color=GOLD)
title(s, 'Human-in-the-loop isn’t a disclaimer.\nIt’s the architecture.', color=WHITE, size=30)
cols = [
    ('You decide, always', 'Every action is proposed, never taken. The copilot cannot send, agree, or concede anything. The audit trail shows a human choice at every step.'),
    ('Your data stays yours', 'Strict per-facility isolation. Your rates and financials are never used to benchmark, train, or inform any other customer. Benchmarks come from public data only.'),
    ('Built for a regulated sector', 'Privacy Act / APP-aligned handling, Australian data residency, security review before any real data is touched. Decision support — not legal or financial advice, and it says so on every page.'),
]
for i, (h, b) in enumerate(cols):
    x = Inches(0.75) + i * Inches(4.05)
    rule(s, x, Inches(3.0), Inches(0.6), GOLD, Pt(2.5))
    _, tf = box(s, x, Inches(3.2), Inches(3.7), Inches(3.2))
    add_par(tf, h, 17, WHITE, font=SERIF, bold=True, space_after=8)
    add_par(tf, b, 12.5, W80, line=1.35)
_, tf = box(s, Inches(0.75), Inches(6.45), Inches(11.8), Inches(0.4))
add_par(tf, 'And one bright line: the platform serves one hospital against its fund. It will never share or align rates between competing hospitals.',
        13, RGBColor(0xE8, 0xC9, 0x6A), font=SERIF, italic=True)
footer(s, 11, dark=True)

# ================================================================ 12 · the pilot
s = slide()
kicker(s, 'The pilot')
title(s, 'What a pilot involves — and what you get', size=30)
c = card(s, Inches(0.75), Inches(1.95), Inches(5.75), Inches(4.55))
_, tf = box(s, Inches(1.05), Inches(2.2), Inches(5.15), Inches(4.1))
add_par(tf, 'Your commitment', 15, TEAL, bold=True, space_after=8)
bullets(tf, [
    ('12 weeks, ', 'timed to your next HPPA renewal window.'),
    ('Your documents: ', 'the expiring HPPA, 12–24 months of billing/case-mix extracts, your P&L. Under NDA, with agreed handling and deletion terms.'),
    ('2–3 hours a fortnight ', 'from you or your business manager — the negotiation is still yours.'),
    ('Candour: ', 'tell us what’s wrong, what’s missing, what you wouldn’t pay for.'),
], size=12.5, gap=8)
c = card(s, Inches(6.85), Inches(1.95), Inches(5.75), Inches(4.55))
_, tf = box(s, Inches(7.15), Inches(2.2), Inches(5.15), Inches(4.1))
add_par(tf, 'What you get', 15, TEAL, bold=True, space_after=8)
bullets(tf, [
    ('Free pilot access ', 'to both products for the duration.'),
    ('A real positioning paper ', 'for your live negotiation — clause analysis, benchmarks, priced walk-away, targets.'),
    ('Drafted correspondence ', 'through your actual negotiation rounds.'),
    ('First-customer pricing ', 'locked in if you continue — and a real say in the roadmap.'),
], size=12.5, gap=8)
footer(s, 12)

# ================================================================ 13 · who / ask
s = slide()
kicker(s, 'Who we are & what we’re asking')
title(s, 'We’re recruiting 2–3 founding pilot sites', size=30)
_, tf = box(s, Inches(0.75), Inches(2.05), Inches(6.0), Inches(4.4))
add_par(tf, 'Who we are', 15, TEAL, bold=True, space_after=8)
add_par(tf, 'A venture in formation: product and AI engineering with health-sector revenue-cycle domain input, building in the open with Day Hospitals Australia and APHA networks. The prototype behind every screenshot in this deck is working today — on synthetic data, by design: no real hospital data will be touched before independent security review.',
        13, MUTED, line=1.35, space_after=14)
add_par(tf, 'Why now', 15, TEAL, bold=True, space_after=8)
add_par(tf, 'Sector margins are at break-even, contracting disputes are national news, and AI can finally read a 40-page HPPA reliably enough to matter — with a human deciding every step.',
        13, MUTED, line=1.35)
c = card(s, Inches(7.3), Inches(2.05), Inches(5.3), Inches(4.4), fill=INK2, line_c=INK2)
_, tf = box(s, Inches(7.65), Inches(2.35), Inches(4.6), Inches(3.9))
add_par(tf, 'The ask', 15, GOLD, bold=True, space_after=10)
bullets_dark = [
    ('One conversation ', 'about your next renewal date and your last negotiation.'),
    ('One document ', '— your expiring HPPA — under NDA, when you’re ready.'),
    ('One pilot slot ', '— 2–3 facilities, first come, renewal-date priority.'),
]
for lead, rest in bullets_dark:
    p = tf.add_paragraph(); p.space_after = Pt(10); p.line_spacing = 1.3
    r1 = p.add_run(); r1.text = lead
    r1.font.size = Pt(13.5); r1.font.name = SANS; r1.font.bold = True; r1.font.color.rgb = WHITE
    r2 = p.add_run(); r2.text = rest
    r2.font.size = Pt(13.5); r2.font.name = SANS; r2.font.color.rgb = W80
footer(s, 13)

# ================================================================ 14 · close
s = slide(INK)
rule(s, Inches(0.75), Inches(2.7), Inches(1.1), GOLD, Pt(3))
_, tf = box(s, Inches(0.72), Inches(2.95), Inches(11.8), Inches(1.6))
add_par(tf, 'Next step: a 30-minute demo,\non your numbers-shaped problem.', 34, WHITE, font=SERIF, bold=True, line=1.15)
_, tf = box(s, Inches(0.75), Inches(4.9), Inches(11), Inches(0.9))
add_par(tf, 'We’ll walk the full negotiation flow live — dashboard to board pack — and leave you the positioning-paper sample.',
        15, W80, line=1.3)
_, tf = box(s, Inches(0.75), Inches(6.3), Inches(11.8), Inches(0.4))
add_par(tf, 'Counterpart Health · pilot enquiries — [contact to be added] · This deck’s product imagery is a working demo on synthetic data; public figures cited to APRA, DoHAC, ACCC and the PHI Rules.',
        10.5, RGBColor(0x8A, 0xA5, 0xA2))
footer(s, 14, dark=True)

prs.save(OUT)
print(f'wrote {OUT} ({len(prs.slides.slides if hasattr(prs.slides, "slides") else prs.slides._sldIdLst)} slides)')
