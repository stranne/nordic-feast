# Contributing

Corrections and improvements are welcome. The most useful contribution is a season correction backed by a source: open a [season correction](https://github.com/stranne/nordic-feast/issues/new?template=season-correction.yml) issue, or send a pull request that follows the steps below. Swedish or English is fine.

## Principles

- **Evidence first.** Every in-season month comes from the source named on the ingredient page. Review a change against that source, update the checked date, and record disagreements between sources in the [source review](docs/source-decision.md). Different ingredients may use different sources.
- **Local, reviewed data.** Keep source data in the repository. Do not add a live scraper, API or AI generation to the build.
- **The validator checks structure, not facts.** `scripts/check_content.py` catches broken references and malformed months. It cannot tell whether a month is right.
- **Sources and permissions.** Attribute every source. Raise a concrete source-use restriction if you find one; a missing open licence or an unanswered permission enquiry does not block a change on its own.
- **Country means origin.** A country view shows produce grown in that country, not the visitor's location. Add a country only with its own reviewed records.
- **Simple, accessible interface.** Keep features visible and usable without JavaScript. See [interface behaviour](docs/interface.md) and the [accessibility review](docs/accessibility.md).

## Correct a season

1. Open the ingredient's file in `content/ravaror/`. The season lives under `[extra.seasons.se]`.
2. Change `listed_months` to the months the source lists, in calendar order.
3. Set `checked` to the date you reviewed the source.
4. If the ingredient should use a different source, set `source` to its key in `data/sources.json` and update `source_terms` with the words that locate the ingredient in that source.
5. Use `note` for a short Swedish clarification readers need, such as “Lagrade morötter ingår.”

## Add an ingredient

1. Create `content/ravaror/<id>.md`, using an existing ingredient as a template. The file name and `id` must match. `weight` sets the sort order and must be unique.
2. Set `category` to `gronsaker`, `frukt` or `bar`.
3. Add an unmodified icon from [Open Crop Icons](https://github.com/openfarmcc/open-crop-icons) at the revision in `data/images.json` as `static/images/crops/<id>.svg`.
4. Add the icon to `data/images.json` with its exact upstream URL.
5. Fill in the season as described above. All twelve months must be reviewed.

## Add a source

Add a record to `data/sources.json` with the source's name, publisher, URL, checked date, `basis`, `coverage` and a `review_note` describing what you reviewed. Set `scope` to a short Swedish sentence when the source's periods include storage or protected cultivation, otherwise to an empty string. Ingredient pages show it below the calendar.

## Check your change

```sh
python scripts/check_content.py
zola check --skip-external-links
```

For template, script or style changes, also run the browser checks against a running preview (Chrome or Edge required):

```sh
npm ci
npm run check:a11y
```

Restart `zola serve` after changing files in `data/`; Zola does not watch that directory. Content, template and CSS edits reload automatically.
