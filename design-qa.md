# Design QA

- Source visual truth: `/Users/jangdongjae/Desktop/의견_경우청 (1).pdf`, pages 4-6
- Reference captures: `.omx/tmp/feedback-home/reference-4.png`, `reference-5.png`, `reference-6.png`
- Implementation captures: `.omx/tmp/feedback-home/news-desktop.png`, `journey-desktop.png`, `news-mobile.png`, `journey-mobile.png`
- Desktop viewport: 1440 × 1000 CSS px; capture: 1426 × 990 px; density 1
- Mobile viewport: 390 × 844 CSS px; capture: 386 × 835 px; density 1
- Reference captures: 1867 × 1050 px per PDF page
- Normalization: compared the same home-page regions rather than the PDF annotation canvas and speech bubbles
- State: home page scrolled to the press/action, journey, and join sections

## Full-view comparison evidence

The implementation restores the requested sequence and hierarchy: `현장의 기록`, a prominent civic-action report, a large lime `올공두컷` feature with photography, a dark `OUR JOURNEY` block, and the lime `JOIN US` block. The established paper/ink/lime palette, oversized Korean display type, asymmetric grid, and index rail remain consistent with the reference.

## Focused region comparison evidence

- Press/action: `공정선거시민행동` and `올공두컷` are distinct, bold sections with real source images and working article links.
- Journey: the reference layout and highlighted headline are preserved; stale sample numbers are replaced with verified current totals: 8 sessions, 51 photos, and 18 posters.
- Join: `JOIN US`, the outlined emphasis treatment, parent-brand footer, current participation status, and internal participation CTA render correctly.
- Mobile: the two project features stack without horizontal overflow; the journey metrics and join headline remain legible.

## Required fidelity surfaces

- Fonts and typography: existing display family, heavy weight, tight heading rhythm, outlined join emphasis, and monospace metadata preserved.
- Spacing and layout rhythm: reference section index, wide desktop content track, stacked mobile cards, and dark-to-lime transition preserved.
- Colors and visual tokens: paper, ink, lime, gray metadata, borders, and monochrome press-image treatment use existing tokens.
- Image quality and asset fidelity: all visible report images are existing credited source assets; no placeholders or code-drawn substitutes were introduced.
- Copy and content: requested project grouping, `OUR JOURNEY`, and `JOIN US` copy are present; current verified totals and participation route replace stale mock values.

## Findings

No actionable P0, P1, or P2 mismatch remains.

## Comparison history

- Before: the home page had a two-card evidence preview, no large `올공두컷` feature, no `OUR JOURNEY` section, and `NEXT ACTION` instead of `JOIN US`.
- Fix: restored the richer feedback-driven press/action layout, the two project identities, the journey block, and the join label while retaining current data and routes.
- Post-fix evidence: desktop and mobile captures match the intended hierarchy; no horizontal overflow or console errors were found.

## Verification

- Primary interactions: the journey CTA navigates to `/history/`; the featured civic-action article is a unique external link opening in a new tab.
- Browser console errors: none.
- Automated tests: 24 passed.
- Production build: passed.
- Visual verdict: 95/100, passed.

final result: passed
