# CORE pilot-site pitch deck

Two formats, same 16 slides, aimed at day hospital CEOs/owners:

- **`core-pilot-deck.html`** — one self-contained file (all images embedded).
  Double-click to open in any browser; arrow keys / clicks to present;
  Ctrl+P → PDF. No PowerPoint needed. Rebuilt by `build_deck_html.py`.
- **`core-pilot-deck.pptx`** — the PowerPoint original,
built programmatically by `build_deck.py` (python-pptx) so the design system
stays consistent with the prototype (ink-teal/paper/gold palette, Georgia
display + Calibri body — fonts chosen for portability across machines).

`assets/` holds the high-DPI screenshots captured from the working prototype in
headless Chromium; slides 5–10 use them directly, so what the deck shows is what
the demo does.

Rebuild after changing screenshots or copy:

```bash
pip install python-pptx
python3 deck/build_deck.py
```

Arc: the pain (1–2) → the information asymmetry with real public data (3) → the
cost of standard terms, synthetic worked example (4) → the copilot walkthrough
(5–9) → the contract oracle (10) → human-in-the-loop & security as trust
features (11) → what a pilot involves / what you get (12) → who we are & the
ask (13) → next step (14). All product imagery is a working demo on synthetic
data and the deck says so on every slide footer.
