# Accessibility

Aim for WCAG 2.2 AA while keeping the interface minimal. This is an implementation target, not a conformance claim.

## Season bars

- A card is one link and one tab stop. Its accessible name is the ingredient; its description gives all twelve month names and evidence states.
- Hovering a segment shows its month and status. Keyboard focus shows the annual summary. Tooltips persist while hovered and Escape dismisses them, following [W3C's guidance on hover/focus content](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html).
- The popup is a visual equivalent of the existing accessible description, so it is hidden from the accessibility tree to avoid duplicate announcements. It contains no controls.
- Touch opens the ingredient's labelled calendar directly. The labelled calendar and accessible descriptions work without JavaScript.
- Green fill and empty outlined segments distinguish in-season and out-of-season months. Forced colours preserve the filled and outlined marks.
- With enlarged text, the detail calendar wraps by whole quarters to preserve readable month labels.

## Verified locally, 2026-09-13

A one-off check in headless Microsoft Edge covered the catalogue, ingredient detail, monthly listing, about page and 404. Axe reported no automatic violations against its WCAG A/AA and best-practice checks. It could not assess the two arrow glyphs' contrast automatically; their foreground/background ratio was calculated as 10.70:1. Muted text is 5.15:1 and accent against paper is 7.85:1.

Browser checks passed for the skip link, keyboard focus summary, Escape, one tab stop per card, Enter navigation, all twelve hover labels, moving onto the tooltip, and closing on pointer exit. Chromium's accessibility tree exposes each card's ingredient name and full annual description. Touch and JavaScript-disabled navigation also passed.

The four content page layouts were checked at 320 CSS pixels with normal and 200% text, without horizontal page overflow. The detail calendar was visually checked under forced colours. These checks preceded the card and page-transition update below.

## Cards and page transitions

Ingredient links have a light card surface, rounded border and visible focus outline. Diagonal arrows are reserved for external links. A 180ms native page-content crossfade and subtle card hover transitions are enabled only with `prefers-reduced-motion: no-preference`. The header and month controls remain steady. Browsers without cross-document view transitions retain normal navigation, including when JavaScript is disabled. There is no smooth scrolling.

Verified in headless Edge: native navigation ran the 180ms fade; reduced motion disabled page and hover transitions; skip-link/card keyboard navigation, tooltip dismissal and JavaScript-disabled detail navigation passed. Catalogue, detail and month layouts had no horizontal overflow at 320, 375, 760 and 1280 CSS pixels. The catalogue also passed at 320px with 200% text, with screenshots inspected in normal and forced colours. Axe reported no automatic violations on the five previously audited pages. The older full audit stopped on a stale first-ingredient assumption; the focused card check used the current catalogue order.

The audit tools and scripts are local ignored files under `.cache/`, not application dependencies or a frontend test suite.

## Search, filters and compact details, 2026-09-22

Search has an accessible label. Category buttons expose their pressed state, with an underline as well as a background change. Result counts are announced after a short delay; zero results expose a reset button that returns focus to search. Hidden cards leave the tab order. The controls appear only when their script initializes.

Browser checks passed for combined search/category filtering, case and accent matching, empty results, reset focus, keyboard activation, Escape, existing card tooltips, URL reload, browser Back and the detail back link. Return-scroll verification covered reordered URL parameters. Catalogue and detail pages had no horizontal overflow at 320, 390, 760 and 1280 CSS pixels, including 200% text at 320px. Forced-colour checks preserved the selected filter underline and focus outline. JavaScript-disabled listing and detail navigation passed. Desktop and mobile screenshots were inspected for the filter row and reduced detail illustration and spacing.

Filter navigation was also checked across month arrows and tabs, the catalogue, ingredient details, About, and the home/country redirects. Search and category survived reload and new-tab navigation; Back and Forward restored each page's selection. Empty months retained the filters, and reset cleared destination links. Keyboard month navigation and the filtered layout at 390px passed.

## Before release

Do a manual NVDA or VoiceOver pass, including reading order and verbosity, and check keyboard use, browser zoom, and tooltip behaviour with a screen magnifier. Automated checks and accessibility-tree inspection do not replace that review. Repeat the relevant short checks when changing navigation, season bars, or layout.
