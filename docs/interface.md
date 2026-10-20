# Interface behaviour

How the site behaves, for anyone changing templates, scripts or styles. The [accessibility review](accessibility.md) records what has been verified in a browser.

Keep basic features visible and directly usable. Do not add an expand step to month navigation, search or filters. Every page must remain complete without JavaScript; scripts only add convenience.

## Months and the home page

The home page selects the current month in Stockholm time using a small optional script, `static/current-month.js`. Without JavaScript it provides twelve month links. Month navigation, ingredient pages, images and source links work without JavaScript. Changing months never requires a rebuild. The home page opts out of page transitions because its redirect starts before the first render.

The same script marks the current month in the catalogue header, as a column in the catalogue, and in the labels of an ingredient's calendar. The marker is a visual reference only. Month pages carry the same information for assistive technology.

The month page keeps previous/next links and all twelve month links immediately visible for direct selection. Month links show full names when the navigation is at least 58rem wide and abbreviations otherwise. Because rem follows the root font size, enlarged text switches to abbreviations before names overflow. The visible text is always the link's accessible name, so speech-input users can say what they see (WCAG 2.5.3).

## Search and filters

Monthly pages and the full catalogue have an optional search field and category filters. Search ignores case and accents and combines with the selected category. Filter state is stored in the URL and carried through month navigation, the main menu, the footer, ingredient details and the About page. The home page and country redirects also preserve filters. Clearing a filter updates destination links immediately; browser history and links opened in new tabs retain their own selection. Returning from a detail restores the filters and, when session storage is available, the previous scroll position. Without JavaScript, the complete listing remains visible and inactive filter controls stay hidden.

## Returning from an ingredient

Month cards include a `from-month` query parameter so the detail page's optional script can point the back link to that month, display its name and keep “Sverige” selected in the main navigation, even when referrer information is unavailable. Older links also support same-site month referrers with or without a trailing slash. Visits without a known month or without JavaScript keep the “Alla råvaror” fallback.

The back-link script is included directly in the generated HTML, immediately after the link. It runs during parsing without a separate download or waiting for deferred scripts, avoiding a visible change from the fallback label to the month name.

## Season status and summaries

`listed_months` is the single source of truth for the binary season status. A listed month is **in season**; every other calendar month is **out of season**. The selected source can support the list through monthly guidance, a calendar or a stated range. `reviewed_months` records which months were assessed against that source. No separate negative-month list is stored, and no early, peak, late, harvest or storage periods are calculated.

The detail summary groups consecutive listed months in calendar order and preserves gaps, for example “Juni, augusti–november”. Twelve listed months render as “Hela året”. `templates/partials/season-range.html` renders this text without JavaScript, for both the visible summary and the page description.

## Listings and calendars

Monthly listings show unboxed illustrations and names, with four columns on desktop and two on narrow screens. Annual bars are omitted because the selected month already establishes season status.

The full catalogue uses calendar rows with an illustration, name and annual bar aligned under one sticky month header. Solid green bars mark in-season months; thin neutral tracks mark the rest. Month initials replace abbreviations on narrow screens. At enlarged text sizes, names move above the bars while the shared month scale stays aligned. Empty searches hide the calendar header.

Ingredient pages retain their labelled, quarter-grouped bars and two-state legend. Both views share `templates/partials/season-bar.html` and expose a full month-by-month text alternative to assistive technology. The bars need no JavaScript. Hovering an ingredient subtly highlights the row and underlines its name; season bars show no popups on hover or keyboard focus. Each ingredient remains a single tab stop, and touch users open the labelled detail page normally.

## Citations

Source citations share `templates/partials/source.html`. Set `citation` to a record from `data/sources.json` and `citation_id` to a unique ID on the page; optionally set `citation_checked` to the ingredient's review date. The component uses a small, muted inline source link with a document icon and an assistive-text “Källa” label. Hovering or focusing the citation reveals the checked date and publisher; tapping the document icon also opens the information. The source link navigates normally; Escape and outside taps dismiss it. Without JavaScript the metadata stays visible. It is used on ingredient pages and the About page's source list.

Ingredient details use an open layout with the illustration beside the name and season summary. The source is an unbordered metadata line with a visible “Källa” label. The ingredient's `note`, followed by its source's `scope`, sits below the labelled calendar. The scope explains periods that include storage or protected cultivation. General guidance remains on the About page.

## Keyboard shortcuts

On listing pages, the first keyboard shortcut, “Till råvarorna”, focuses the first visible ingredient with Tab then Enter. Tab twice then Enter activates “Till sök och filter”. Both shortcuts appear together on keyboard focus. With JavaScript disabled, the food shortcut focuses the results region; another Tab reaches its first link. Empty filtered results send the shortcut to “Rensa filter”. Search and results have named landmarks for assistive navigation. Ingredient links retain their normal Tab and Enter behaviour.

## Accessibility and motion

Accessibility is a design requirement: Swedish document language, landmarks, skip link, visible keyboard focus, descriptive navigation, patterned season states, and Windows high-contrast styles. Ingredient links sit directly on the page, with a visible focus outline and an underlined name on hover. Selected months and categories use underlines, and controls retain their 44px height. Supporting browsers crossfade page content over 180ms while keeping the header and month controls steady; reduced-motion preferences disable transitions. Other browsers use normal navigation. There is no smooth scrolling. Diagonal arrows identify external links only.

After UI changes, check keyboard-only navigation (including skip link, visible ingredient focus and Enter), narrow/zoomed layouts, forced colours, reduced motion, and the JavaScript-disabled detail view. A manual screen-reader pass with NVDA or VoiceOver is still needed before claiming accessibility conformance; automated checks alone are insufficient.

## Page metadata

Each template sets `meta_title` and `meta_description` in its `meta` block and includes `templates/partials/meta.html`, which adds the canonical URL and sharing tags. Ingredient descriptions reuse the season summary, for example “Hallon är i säsong i Sverige juni–augusti.” All pages share `static/social-card.png` as their preview image; `npm run social-card` renders it from `scripts/social-card.html`. Zola generates `sitemap.xml` and `robots.txt`. Setting `publication_ready = false` in `zola.toml` adds `noindex` to every page.
