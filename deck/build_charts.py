#!/usr/bin/env python3
"""Render the deck's data graphics as high-DPI PNGs in the deck palette.

Run:  python3 deck/build_charts.py   → writes deck/assets/charts/*.png
Real figures are cited on the slides; Bayview figures are synthetic and the
charts say so in their footnotes. NB: literal dollar signs must be escaped
(\\$) or matplotlib treats them as mathtext delimiters.
"""
import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'assets', 'charts')
os.makedirs(OUT, exist_ok=True)

# CORE brand palette
INK = '#0B1730'          # navy ink
INK2 = '#122244'
TEAL = '#2F6BF6'         # brand blue (primary series)
TEAL_SOFT = '#8FB0F9'
HAIR = '#CDD7E6'
MUTED = '#5A6784'
FAINT = '#8B96AF'
GOLD = '#0899B8'         # brand cyan (highlight)
GOLD_D = '#0E7E99'
CLAY = '#CC3A4E'         # adverse
CLAY_D = '#B52E40'

plt.rcParams.update({
    'font.family': 'DejaVu Sans',
    'text.color': INK,
    'axes.edgecolor': HAIR,
    'axes.labelcolor': MUTED,
    'xtick.color': MUTED,
    'ytick.color': MUTED,
    'figure.facecolor': 'none',
    'axes.facecolor': 'none',
    'savefig.facecolor': 'none',
})

DPI = 300


def strip(ax, x=False, y=False):
    for s in ('top', 'right', 'left', 'bottom'):
        ax.spines[s].set_visible(False)
    if not x:
        ax.set_xticks([])
    if not y:
        ax.set_yticks([])


def chrome(fig, title, foot, title_size=13, top=0.86, bottom=0.14,
           left=0.02, right=0.98):
    """Figure-level left-aligned title + wrapped footnote (never clips)."""
    fig.text(0.01, 0.955, title, fontsize=title_size, fontweight='bold',
             color=INK, ha='left', va='top')
    fig.text(0.01, 0.012, foot, fontsize=6.8, color=FAINT, ha='left',
             va='bottom', linespacing=1.4)
    fig.subplots_adjust(top=top, bottom=bottom, left=left, right=right)


# ---------------------------------------------------------------- 1 · margins
fig, ax = plt.subplots(figsize=(5.6, 3.35))
cats = ['Private hospitals\n2020–21', 'Private hospitals\n2023–24', 'Health insurers\nDec 2025 qtr*']
vals = [5.1, -0.1, 5.4]
cols = [TEAL_SOFT, CLAY, TEAL]
bars = ax.bar(cats, vals, width=0.56, color=cols, zorder=3)
ax.axhline(0, color=INK, lw=1.1, zorder=4)
for b, v in zip(bars, vals):
    ax.annotate(f'{v:+.1f}%', (b.get_x() + b.get_width() / 2, v),
                xytext=(0, 7 if v >= 0 else -16), textcoords='offset points',
                ha='center', fontsize=13, fontweight='bold',
                color=CLAY_D if v < 0 else INK)
ax.set_ylim(-1.7, 7.0)
strip(ax, x=True)
ax.tick_params(axis='x', labelsize=9.5, length=0, pad=6)
chrome(fig, 'Profit margin — the two sides of the table',
       'Hospitals: sector profit margin, Private Hospital Sector Financial Health Check (2024).\n'
       '*Insurers: insurance service result ÷ insurance revenue, APRA quarterly statistics, December 2025.',
       top=0.84, bottom=0.24)
fig.savefig(f'{OUT}/margins.png', dpi=DPI)
plt.close(fig)

# ------------------------------------------------------- 2 · concentration bar
fig, ax = plt.subplots(figsize=(5.6, 2.6))
funds = [('Medibank', 27.1, INK2, 'w'), ('Bupa', 24.9, TEAL, 'w'),
         ('HCF', 12.5, '#4F46E5', 'w'), ('nib', 9.6, TEAL_SOFT, 'w'),
         ('HBF', 7.7, '#A5C0FB', None), ('≈20 smaller\nfunds · 18%', 18.2, HAIR, INK)]
left = 0.0
for name, share, colr, txtc in funds:
    ax.barh(0, share, left=left, height=0.52, color=colr, zorder=3)
    cx = left + share / 2
    if txtc:  # label inside
        lbl = name if '\n' in name else f'{name}\n{share:.0f}%'
        ax.text(cx, 0, lbl, ha='center', va='center',
                fontsize=8.6, fontweight='bold',
                color='white' if txtc == 'w' else txtc)
    else:     # label below with leader
        ax.annotate(f'{name} {share:.0f}%', xy=(cx, -0.27), xytext=(cx, -0.52),
                    ha='center', fontsize=8.6, fontweight='bold', color=MUTED,
                    arrowprops=dict(arrowstyle='-', color=FAINT, lw=0.9))
    left += share
ax.annotate('', xy=(0, 0.46), xytext=(81.8, 0.46),
            arrowprops=dict(arrowstyle='-', color=GOLD, lw=2.2))
ax.text(40.9, 0.58, 'top five funds ≈ 80% of all policies', ha='center',
        fontsize=10.5, fontweight='bold', color=GOLD_D)
ax.set_xlim(0, 100)
ax.set_ylim(-0.75, 0.88)
strip(ax)
chrome(fig, 'Hospital-cover market share, 2025',
       'APRA statistics / market reporting, 2025. Buying groups (AHSA, ARHG, Honeysuckle\n'
       'Health) negotiate on behalf of dozens of the smaller funds.',
       top=0.82, bottom=0.20)
fig.savefig(f'{OUT}/concentration.png', dpi=DPI)
plt.close(fig)

# ---------------------------------------------------------- 3 · leakage bars
fig, ax = plt.subplots(figsize=(6.1, 3.6))
items = [
    ('Rates below market\n(volume-weighted −5.6%)', 175, 'per year'),
    ('Re-banding, 4 ophthalmic\ngroups (cl. 8.4, FY26)', 108, 'per year, midpoint'),
    ('Below-CPI indexation\n(cl. 12.3, exercised FY25)', 45, 'per year, compounding'),
    ('Frozen holdover\n(cl. 2.2)', 10, 'per month of delay'),
]
labels = [i[0] for i in items][::-1]
vals = [i[1] for i in items][::-1]
notes = [i[2] for i in items][::-1]
cols = [CLAY if v == max(vals) else '#DB6E7E' for v in vals]
bars = ax.barh(labels, vals, height=0.6, color=cols, zorder=3)
for b, v, n in zip(bars, vals, notes):
    yc = b.get_y() + b.get_height() / 2
    ax.text(v + 5, yc + 0.06, f'\\${v}k', va='bottom', fontsize=12.5,
            fontweight='bold', color=CLAY_D)
    ax.text(v + 5, yc - 0.04, n, va='top', fontsize=8.2, color=FAINT)
ax.set_xlim(0, 230)
strip(ax, y=True)
ax.tick_params(axis='y', labelsize=9.3, length=0, pad=8)
chrome(fig, 'What “standard terms” leak — Bayview (synthetic)',
       'Synthetic worked example — fictional 4-theatre day hospital: \\$14.2m revenue, \\$690k\n'
       'EBITDA. Clause mechanics modelled on common real HPPA terms.',
       title_size=12.5, top=0.87, bottom=0.17, left=0.29)
fig.savefig(f'{OUT}/leakage.png', dpi=DPI)
plt.close(fig)

# ------------------------------------------------- 4 · second-tier walk-away
fig, ax = plt.subplots(figsize=(5.0, 2.9))
scen = ['Current agreement', 'Walk-away:\nsecond-tier default']
vals = [3.12, 2.65]
bars = ax.bar(scen, vals, width=0.5, color=[TEAL, CLAY], zorder=3)
for b, v in zip(bars, vals):
    ax.annotate(f'\\${v:.2f}m', (b.get_x() + b.get_width() / 2, v),
                xytext=(0, 6), textcoords='offset points', ha='center',
                fontsize=13, fontweight='bold', color=INK)
ax.annotate('', xy=(1.36, 2.65), xytext=(1.36, 3.12),
            arrowprops=dict(arrowstyle='->', color=CLAY_D, lw=1.8))
ax.text(1.46, 2.885, '−\\$470k/yr\n(−15%)', fontsize=10.5, fontweight='bold',
        color=CLAY_D, va='center', ha='left')
ax.set_ylim(0, 3.8)
ax.set_xlim(-0.55, 2.05)
strip(ax, x=True)
ax.tick_params(axis='x', labelsize=9.5, length=0, pad=6)
chrome(fig, 'AusCare revenue if talks fail (synthetic)',
       'Second-tier default ≈ 85% of average comparable contracted rates. The fund can\n'
       'compute this floor precisely; most small facilities cannot.',
       top=0.84, bottom=0.24)
fig.savefig(f'{OUT}/second-tier.png', dpi=DPI)
plt.close(fig)

# --------------------------------------------------- 5 · Bayview margin trend
fig, ax = plt.subplots(figsize=(3.6, 2.6))
yrs = ['FY24', 'FY25', 'FY26']
vals = [7.8, 6.1, 4.9]
ax.plot(yrs, vals, color=CLAY, lw=2.4, marker='o', markersize=6,
        markerfacecolor=CLAY, zorder=4)
ax.fill_between(yrs, vals, 0, color=CLAY, alpha=0.08, zorder=2)
for x, v in zip(yrs, vals):
    ax.annotate(f'{v}%', (x, v), xytext=(0, 8), textcoords='offset points',
                ha='center', fontsize=11, fontweight='bold', color=CLAY_D)
ax.set_ylim(0, 10)
ax.margins(x=0.12)
strip(ax, x=True)
ax.tick_params(axis='x', labelsize=9.5, length=0, pad=5)
chrome(fig, 'Bayview EBITDA margin (synthetic)',
       'Wages +6.2%/yr and consumables +5.4%/yr vs blended\n'
       'rate indexation of +2.6%/yr.',
       title_size=11.5, top=0.82, bottom=0.26)
fig.savefig(f'{OUT}/bayview-trend.png', dpi=DPI)
plt.close(fig)

# ------------------------------------------------------ 6 · settlement value
fig, ax = plt.subplots(figsize=(5.6, 3.1))
comp = [('Rate uplifts', 168, TEAL), ('Re-banding\nrestored', 74, '#4F46E5'),
        ('Indexation\nintegrity', 47, TEAL_SOFT)]
xpos = [0, 1, 2, 3.15]
cum = 0
for (name, v, colr), x in zip(comp, xpos[:3]):
    ax.bar(x, v, bottom=cum, width=0.58, color=colr, zorder=3)
    ax.text(x, cum + v / 2, f'+\\${v}k', ha='center', va='center',
            fontsize=10.5, fontweight='bold', color='white')
    ax.text(x, -26, name, ha='center', va='top', fontsize=9, color=MUTED)
    cum += v
ax.bar(xpos[3], cum, width=0.58, color=GOLD, zorder=3)
ax.text(xpos[3], cum + 10, f'≈ +\\${cum}k / yr', ha='center', fontsize=12.5,
        fontweight='bold', color=GOLD_D)
ax.text(xpos[3], -26, 'Year-1 value\n(demo settlement)', ha='center', va='top',
        fontsize=9, color=MUTED)
for i in range(2):
    ax.plot([xpos[i] + 0.29, xpos[i + 1] - 0.29],
            [sum(c[1] for c in comp[:i + 1])] * 2, color=HAIR, lw=1, ls=':')
ax.set_xlim(-0.6, 3.85)
ax.set_ylim(-100, 360)
strip(ax)
chrome(fig, 'What the demo negotiation settled for (synthetic)',
       'Hypothetical settled outcome from the demonstration flow; terms value (set-off\n'
       'narrowed, holdover indexed, symmetric exit) additional.',
       title_size=12.5, top=0.86, bottom=0.16)
fig.savefig(f'{OUT}/settlement.png', dpi=DPI)
plt.close(fig)

print('wrote 6 charts →', OUT)
