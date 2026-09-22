# Nordic Feast

A small, Swedish-language seasonal produce calendar. Built with Zola; all pages and illustrations are local static files.

**Status: local prototype with fifty-nine reviewed ingredients.** Seasonal data uses a suitable source per ingredient. The current catalogue draws on ICA, Från Sverige, SydGrönt, Säsongens Bästa and Hebe. See the [source review](docs/source-decision.md) for evidence and source differences.

The first corrections add June for raspberries, May for carrots, and September for plums. Every month not listed for an ingredient is classified as out of season.

## Preview

On Windows with Python 3.11 or newer:

```powershell
.\scripts\preview.ps1
```

This validates the content, downloads a checksum-verified Zola 0.23.6 into the ignored `.tools` directory if needed, and serves the site at http://127.0.0.1:1111. Stop with Ctrl+C. Use `-Port 1112` if the default port is occupied.

With Zola 0.23.6 already installed, on any supported platform:

```sh
python scripts/check_content.py
zola serve
```

The home page selects the current month in Stockholm time using a small optional script. Without JavaScript it provides twelve month links. Month navigation, ingredient pages, images and source links work without JavaScript. Changing months never requires a rebuild.

Monthly pages and the full catalogue have an optional search field and category filters. Search ignores case and accents and combines with the selected category. Filter state is stored in the URL and carried through month navigation, the main menu, ingredient details and the About page. The home page and country redirects also preserve filters. Clearing a filter updates destination links immediately; browser history and links opened in new tabs retain their own selection. Returning from a detail restores the filters and, when session storage is available, the previous scroll position. Without JavaScript, the complete listing remains visible and inactive filter controls stay hidden.

Month cards include a `from-month` query parameter so the detail page's optional script can point the back link to that month, display its name and keep “Sverige” selected in the main navigation, even when referrer information is unavailable. Older links also support same-site month referrers with or without a trailing slash. Visits without a known month or without JavaScript keep the “Alla råvaror” fallback.

The back-link script is included directly in the generated HTML, immediately after the link. It runs during parsing without a separate download or waiting for deferred scripts, avoiding a visible change from the fallback label to the month name.

## Content

- `content/ravaror/`: one ingredient per Markdown file, with country-specific seasonal evidence in TOML frontmatter.
- `data/sources.json`: source provenance, meaning and checked dates.
- `data/images.json`: exact upstream image URLs, revision, licence and any modifications.
- `data/months.json`: Swedish month labels and URLs.
- `templates/` and `static/style.css`: the shared layout and visual design.

Source citations share `templates/partials/source.html`. Set `citation` to a record from `data/sources.json` and `citation_id` to a unique ID on the page; optionally set `citation_checked` to the ingredient's review date. The component uses a small, muted inline source link with a document icon and an assistive-text “Källa” label. Hovering or focusing the citation reveals the checked date and publisher; tapping the document icon also opens the information. The source link navigates normally; Escape and outside taps dismiss it. Without JavaScript the metadata stays visible. Used on ingredient pages and the about page's source list. Ingredient details use an open layout with the illustration beside the name and season summary. The source is an unbordered metadata line with a visible “Källa” label. Ingredient-specific notes sit below the labelled calendar; general guidance remains on the About page.

`listed_months` is the single source of truth for the binary season status. A listed month is **in season**; every other calendar month is **out of season**. The selected source can support the list through monthly guidance, a calendar or a stated range. `reviewed_months` records which months were assessed against that source. No separate negative-month list is stored, and no early, peak, late, harvest or storage periods are calculated. The detail summary groups consecutive listed months in calendar order and preserves gaps, for example “Juni, augusti–november”. Twelve listed months render as “Hela året”. This summary is rendered by `templates/partials/season-summary.html` without JavaScript.

Monthly listings show unboxed illustrations and names, with four columns on desktop and two on narrow screens. Annual bars are omitted because the selected month already establishes season status. The full catalogue places the name above a text-free annual bar: twelve segments, with larger gaps between quarters. Solid green means in season; an empty outlined segment means out of season. Ingredient pages use the same bar with January–December labels and a two-state legend. Both views share `templates/partials/season-bar.html` and expose a full month-by-month text alternative to assistive technology. The bars need no JavaScript. The optional `static/season-tooltips.js` adds month/status tooltips on hover and a full-year summary on keyboard focus. Escape dismisses them; moving onto the tooltip keeps it open. Hover tooltips close when the pointer leaves the bar and tooltip, including when it moves onto the rest of the card. Cards remain a single tab stop, and touch users open the labelled detail page normally.

Accessibility is a design requirement: Swedish document language, landmarks, skip link, visible keyboard focus, descriptive navigation, patterned season states, and Windows high-contrast styles. Ingredient links sit directly on the page, with a visible focus outline and an underlined name on hover. Selected months and categories use underlines, and controls retain their 44px height. Supporting browsers crossfade page content over 180ms while keeping the header and month controls steady; reduced-motion preferences disable transitions. Other browsers use normal navigation. There is no smooth scrolling. Diagonal arrows identify external links only. After UI changes, check keyboard-only navigation (including skip link, tooltip focus/Escape and Enter), narrow/zoomed layouts, forced colours, reduced motion, and the JavaScript-disabled detail view. A manual screen-reader pass with NVDA or VoiceOver is still needed before claiming accessibility conformance; automated checks alone are insufficient.

On listing pages, the first keyboard shortcut, “Till råvarorna”, focuses the first visible ingredient with Tab then Enter. Tab twice then Enter activates “Till sök och filter”. Both shortcuts appear together on keyboard focus. With JavaScript disabled, the food shortcut focuses the results region; another Tab reaches its first link. Empty filtered results send the shortcut to “Rensa filter”. The month page keeps previous/next links and groups the twelve month links inside the native “Välj månad” disclosure, opened with Enter or Space. Search and results have named landmarks for assistive navigation. Ingredient links retain their normal Tab and Enter behaviour.

See the [accessibility review](docs/accessibility.md) for verified behaviour and remaining release checks.

Keep source data local. Do not introduce a live scraper, API or AI generation into the build. Review changes against the source, update the checked date, and record disagreements in the evidence review. The validator checks structure and references; it cannot verify agricultural facts. Use different sources where appropriate. Raise concrete source-use restrictions if discovered; permission enquiries and missing open licences are not blanket project gates.

Restart `zola serve` after changing files in `data/`; that directory is outside Zola's default watched content paths. The normal content, template and CSS edits reload automatically.

The sources do not separate storage and greenhouse production consistently. Country means the origin of the produce, not the visitor's location. The data structure keeps countries separate; additional country views should only be added with their own reviewed records.

## Checks

```sh
python scripts/check_content.py
zola check
zola build
```

Run the browser accessibility regression check against the local preview with Chrome installed:

```sh
npm install --prefix .cache/a11y-tools --no-audit --no-fund playwright axe-core
node scripts/check_accessibility.cjs
```

Set `PREVIEW_URL` for another preview address or `BROWSER_CHANNEL=msedge` to use Edge. The optional tools stay in the ignored cache and are not build dependencies. The check covers keyboard navigation, filtering and return focus, axe checks, enlarged text, forced colours, reduced motion and JavaScript-disabled navigation. No snapshot or visual regression suite is installed. `zola check` also checks external links and can fail when a source site is temporarily unavailable; inspect that failure rather than deleting the citation.

## GitHub Pages

The site supports a project subpath through Zola's `base_url`; templates resolve assets and internal links with Zola. For example:

```sh
zola build --base-url https://OWNER.github.io/nordic-feast
```

There is no deployment workflow yet. When preparing a release, run the checks above, configure the public `base_url`, and set `publication_ready = true` to allow search-engine indexing. The preview currently includes `noindex`; the flag does not deploy anything.

GitHub Actions can build Zola and publish `public/` with GitHub's Pages artifact workflow. See [Zola's deployment documentation](https://www.getzola.org/documentation/deployment/github-pages/).

## Images

The fifty-nine illustrations are unmodified [Open Crop Icons](https://github.com/openfarmcc/open-crop-icons), licensed CC0. See [third-party notices](THIRD_PARTY_NOTICES.md). They are reference illustrations, not claims about a particular cultivar.
