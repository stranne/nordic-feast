# Accessibility

Aim for WCAG 2.2 AA while keeping the interface minimal. This is an implementation target, not a conformance claim.

## Season bars

- A card is one link and one tab stop. Its accessible name is the ingredient; its description gives all twelve month names and evidence states.
- Hovering a segment shows its month and status. Keyboard focus shows the annual summary. Tooltips persist while hovered and Escape dismisses them, following [W3C's guidance on hover/focus content](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html).
- The popup is a visual equivalent of the existing accessible description, so it is hidden from the accessibility tree to avoid duplicate announcements. It contains no controls.
- Touch opens the ingredient's labelled calendar directly. The labelled calendar and accessible descriptions work without JavaScript.
- Green fill and hatching distinguish listed and unknown months. Forced colours use solid and dashed marks. Missing evidence never means out of season.
- With enlarged text, the detail calendar wraps by whole quarters to preserve readable month labels.

## Verified locally, 2026-09-13

A one-off check in headless Microsoft Edge covered the catalogue, ingredient detail, monthly listing, about page and 404. Axe reported no automatic violations against its WCAG A/AA and best-practice checks. It could not assess the two arrow glyphs' contrast automatically; their foreground/background ratio was calculated as 10.70:1. Muted text is 5.15:1, accent against paper 7.85:1, and hatching against its background 3.61:1.

Browser checks passed for the skip link, keyboard focus summary, Escape, one tab stop per card, Enter navigation, all twelve hover labels, moving onto the tooltip, and closing on pointer exit. Chromium's accessibility tree exposes each card's ingredient name and full annual description. Touch and JavaScript-disabled navigation also passed.

The four content page layouts were checked at 320 CSS pixels with normal and 200% text, without horizontal page overflow. The detail calendar was visually checked under forced colours. The interface contains no animation or smooth scrolling.

The audit tools and scripts are local ignored files under `.cache/`, not application dependencies or a frontend test suite.

## Before release

Do a manual NVDA or VoiceOver pass, including reading order and verbosity, and check keyboard use, browser zoom, and tooltip behaviour with a screen magnifier. Automated checks and accessibility-tree inspection do not replace that review. Repeat the relevant short checks when changing navigation, season bars, or layout.
