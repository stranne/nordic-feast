# Accessibility

Aim for WCAG 2.2 AA while keeping the interface minimal. This is an implementation target, not a conformance claim.

## Season bars

- A card is one link and one tab stop. Its accessible name is the ingredient. Full-catalogue links also describe all twelve month names and evidence states; monthly links omit the redundant annual bar and description.
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

Search has an accessible label. Category buttons expose selection through an underline and their accessible pressed state. Result counts are announced after a short delay; zero results expose a reset button that returns focus to search. Hidden cards leave the tab order. The controls appear only when their script initializes.

Browser checks passed for combined search/category filtering, case and accent matching, empty results, reset focus, keyboard activation, Escape, existing card tooltips, URL reload, browser Back and the detail back link. Return-scroll verification covered reordered URL parameters. Catalogue and detail pages had no horizontal overflow at 320, 390, 760 and 1280 CSS pixels, including 200% text at 320px. Forced-colour checks preserved the selected filter underline and focus outline. JavaScript-disabled listing and detail navigation passed. Desktop and mobile screenshots were inspected for the filter row and reduced detail illustration and spacing.

Filter navigation was also checked across month arrows and tabs, the catalogue, ingredient details, About, and the home/country redirects. Search and category survived reload and new-tab navigation; Back and Forward restored each page's selection. Empty months retained the filters, and reset cleared destination links. Keyboard month navigation and the filtered layout at 390px passed.

## Open listing layout, 2026-09-22

The monthly grid now uses unboxed illustrations and names; the full catalogue retains annual bars below names. Header and control spacing is reduced. Month links and category buttons identify selection with underlines. Mobile months form two rows of six, and ingredient links retain visible focus outlines.

Checks passed for month/catalogue layout at 320, 390, 760 and 1280 CSS pixels, including 200% text at 320px without horizontal overflow. Search with accent matching, category filtering, empty/reset focus, detail/back filter preservation, catalogue focus tooltips and Escape, forced-colour selection underlines, reduced-motion animation removal, and JavaScript-disabled month-to-detail navigation passed. Content validation, Zola check and build passed. The separate detail-page design study is a local proposal, not part of this implementation.

## Open ingredient details, 2026-09-22

The ingredient name and a plain-language season summary lead the unboxed detail layout. The labelled calendar and its two-state legend remain; ingredient notes and the source follow them. General availability guidance stays on the About page. The source label is visible on details and retains the existing tooltip and keyboard behaviour.

All 59 rendered summaries were expanded back into month lists and matched against their source data, including year-round seasons, isolated months and gaps. Content validation, Zola check and build passed. Detail layouts for Plommon, Äpple, Persilja and Isbergssallad had no horizontal overflow at 320, 390, 760 and 1280 CSS pixels, including 200% text at 320px. Source focus/click, Escape and outside-click dismissal passed. Keyboard back navigation preserved the month and category; the summary, twelve calendar labels and source metadata remained available without JavaScript.

## Homepage keyboard review, 2026-09-22

The homepage redirects to the current Swedish month. The review covered that listing, the no-JavaScript month chooser and the shared catalogue controls.

Findings and fixes:

- Search required 20 Tab presses from a fresh page. A second skip link now reaches it with Tab, Tab, Enter. The original main-content skip link remains. Skip links stay inside the viewport when focused and are fully offscreen otherwise; the filter shortcut is hidden without JavaScript.
- At 320px with 200% text, several abbreviated months overflowed their cells and the no-JavaScript chooser expanded the page to 429px. Both grids now reflow according to text size. The same cases fit within 320px.
- Search relied on a disappearing placeholder and a faint bottom border. It now has a persistent visible label and a darker enclosing border. Keyboard focus uses a 3px outline on the homepage's links, search and filter buttons, consistent with [W3C's focus-visible guidance](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible).
- Month arrows now announce both direction and destination. Filter status includes the query and category as well as the result count, so different selections with equal counts produce distinct status text.

`node scripts/check_accessibility.cjs` passed in headless Chrome: both skip links, typing and Escape, empty-result reset, Space activation, hidden-card exclusion, Enter to details, return-focus/filter restoration and reverse Tab. It also passed no-JavaScript month-to-detail navigation, normal and 200% text at 320/390/760/1280px, forced-colour focus and reduced motion. Axe found zero violations and zero incomplete checks on September, the catalogue and the Hallon detail page. Desktop and mobile renders were visually inspected. Content validation, Zola check and an isolated production build passed.

These checks verify the exercised browser behaviour; they do not establish full WCAG conformance.

## Shorter routes to food and search, 2026-09-22

The earlier two-Tab search claim described activating a shortcut, not the ordinary Tab sequence. After that change, the monthly page still required 21 sequential Tabs to reach search. The main-content shortcut also stopped above the month controls instead of reaching the food.

Listing pages now offer two shortcuts together when either receives focus. “Till råvarorna” is first and focuses the first visible food link. It focuses the reset button when filters have no matches. “Till sök och filter” is second and focuses search. Without JavaScript, the food shortcut uses a native fragment to focus the named results region, with the next Tab reaching the first food link. Other pages retain their main-content shortcut. This follows the [W3C bypass-block technique](https://www.w3.org/WAI/WCAG21/Techniques/general/G1): a shortcut must move focus, not just scroll.

The twelve month links are inside a native details/summary disclosure. Previous/next links remain beside the page heading. Closed month links are absent from the Tab sequence; Enter or Space opens the chooser. The search controls and food results have separately named landmarks. All foods remain ordinary links, preserving native navigation and browser commands.

Verified with `BROWSER_CHANNEL=msedge node scripts/check_accessibility.cjs`: from a fresh listing, Tab then Enter focuses the first food, and Tab twice then Enter focuses search. Without activating shortcuts, search takes 10 Tabs on September and 7 on the catalogue. All 44 September links and 59 catalogue links received visible focus in sequence. The check also covered month selection with retained filters, empty-result reset focus, detail navigation and return focus, no-JavaScript navigation, 200% text, narrow layouts, forced colours and reduced motion. Axe reported no violations on the three audited routes. Desktop and mobile layouts were inspected with the chooser closed and open.

## Before release

Do a manual NVDA or VoiceOver pass, including reading order and verbosity, and check keyboard use, browser zoom, and tooltip behaviour with a screen magnifier. Automated checks and accessibility-tree inspection do not replace that review. Repeat the relevant short checks when changing navigation, season bars, or layout.
