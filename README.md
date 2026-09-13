# Nordic Feast

A small, Swedish-language seasonal produce calendar. Built with Zola; all pages and illustrations are local static files.

**Status: local prototype with twenty reviewed ingredients.** Seasonal data uses a suitable source per ingredient. The current catalogue draws on ICA, Från Sverige, SydGrönt and Hebe. See the [source review](docs/source-decision.md) for evidence and remaining coverage gaps.

The first corrections add June for raspberries, May for carrots, and September for plums. Unknown months remain unknown until supported by evidence.

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

## Content

- `content/ravaror/`: one ingredient per Markdown file, with country-specific seasonal evidence in TOML frontmatter.
- `data/sources.json`: source provenance, meaning and checked dates.
- `data/images.json`: exact upstream image URLs, revision, licence and any modifications.
- `data/months.json`: Swedish month labels and URLs.
- `templates/` and `static/style.css`: the shared layout and visual design.

`listed_months` means the source explicitly supports the ingredient in those months, through a monthly list, calendar or stated range. Other months mean **unknown**, never automatically out of season. `reviewed_months` records which months were assessed against that source; an explicit range can be assessed across all twelve months. No early, peak, late, harvest or storage periods are calculated.

Cards show a text-free annual bar: twelve segments, with larger gaps between quarters. Solid green means listed; hatching means unknown. Ingredient pages use the same bar with January–December labels and a legend. Both views share `templates/partials/season-bar.html` and expose a full month-by-month text alternative to assistive technology. The bars need no JavaScript. The optional `static/season-tooltips.js` adds month/status tooltips on hover and a full-year summary on keyboard focus. Escape dismisses them; moving onto the tooltip keeps it open. Hover tooltips close when the pointer leaves the bar and tooltip, including when it moves onto the rest of the card. Cards remain a single tab stop, and touch users open the labelled detail page normally.

Accessibility is a design requirement: Swedish document language, landmarks, skip link, visible keyboard focus, descriptive navigation, patterned season states, and Windows high-contrast styles. There is no animation or smooth scrolling. After UI changes, check keyboard-only navigation (including skip link, tooltip focus/Escape and Enter), narrow/zoomed layouts, forced colours, and the JavaScript-disabled detail view. A manual screen-reader pass with NVDA or VoiceOver is still needed before claiming accessibility conformance; automated checks alone are insufficient.

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

No frontend unit, snapshot or visual regression test suite. Use a short manual check of month navigation, narrow screens, keyboard focus, images and JavaScript-disabled navigation after interface changes. `zola check` also checks external links and can fail when a source site is temporarily unavailable; inspect that failure rather than deleting the citation.

## GitHub Pages

The site supports a project subpath through Zola's `base_url`; templates resolve assets and internal links with Zola. For example:

```sh
zola build --base-url https://OWNER.github.io/nordic-feast
```

There is no deployment workflow yet. When preparing a release, run the checks above, configure the public `base_url`, and set `publication_ready = true` to allow search-engine indexing. The preview currently includes `noindex`; the flag does not deploy anything.

GitHub Actions can build Zola and publish `public/` with GitHub's Pages artifact workflow. See [Zola's deployment documentation](https://www.getzola.org/documentation/deployment/github-pages/).

## Images

The twenty illustrations are unmodified [Open Crop Icons](https://github.com/openfarmcc/open-crop-icons), licensed CC0. See [third-party notices](THIRD_PARTY_NOTICES.md). They are reference illustrations, not claims about a particular cultivar.
