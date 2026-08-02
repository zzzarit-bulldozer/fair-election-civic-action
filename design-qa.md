# Design QA

- Source visual truth: `/var/folders/pl/w3zs5sd10wd56dnb0l7vzpf80000gn/T/codex-clipboard-228b4291-8cae-4eea-926a-c67ab0f381fa.png`
- Implementation screenshot: `/Users/jangdongjae/Documents/GitHub/gjsg/.omx/tmp/home-principles-restored.png`
- Viewport: 1720 × 1000 CSS px, desktop
- Source pixels: 3024 × 1964, macOS Retina capture with Arc chrome
- Implementation pixels: 1703 × 990, density 1 browser capture
- Normalization: compared the identity-section content region and proportions; excluded source browser chrome and unrelated copy changes
- State: home page scrolled to the identity section

## Full-view comparison evidence

The current section retains the reference composition: left section index, centered kicker, oversized black statement, supporting copy below, and right-aligned detail link on the warm paper background.

## Focused region comparison evidence

The requested statement uses the exact historical markup from commit `f8c75a1`: one naturally wrapping heading with `em` around `원칙`, `대안`, and `행동`. The existing lime highlight token and underline block are visible behind all three emphasized words. Forced line wrappers were removed.

## Required fidelity surfaces

- Fonts and typography: existing display family, weight, size, line height, and natural wrapping preserved.
- Spacing and layout rhythm: identity grid, heading width, supporting-copy offset, and link alignment preserved.
- Colors and visual tokens: paper background, ink text, and lime highlight token preserved.
- Image quality and asset fidelity: no image assets occur in the compared identity section.
- Copy and content: requested sentence matches exactly; highlighted words are `원칙`, `대안`, `행동`.

## Findings

No actionable P0, P1, or P2 mismatch in the requested identity statement.

## Comparison history

- Earlier implementation forced each phrase into a separate nowrap span, drifting from the historical natural wrapping and highlight behavior.
- Fix: restored the single flowing heading and historical emphasis markup from `f8c75a1`.
- Post-fix evidence: all three lime highlights render, the heading wraps naturally, and no horizontal overflow is present at the checked mobile width.

## Verification

- Primary interaction checked: home navigation and identity-section rendering.
- Browser console errors: none.
- Automated tests: 23 passed.
- Production build: passed.

final result: passed
