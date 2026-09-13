# Swedish source decision and gap review

Reviewed 2026-09-13. This review covers the ten existing ingredients and source selection. The corrections below have been applied to the prototype.

## Recommendation

Use **one primary reference per ingredient**, with corroborating evidence and unresolved differences recorded in the editorial review. The current data structure already allows different ingredients to use different sources. A single publisher should not become the authority for every ingredient simply because its calendar is convenient to extract.

Use published evidence directly, with attribution. Permission enquiries and absent open licences are not project gates; discuss source-use restrictions only if a concrete issue is discovered. Från Sverige's posters remain positive examples, not a complete availability dataset. Do not automatically combine the two calendars or replace one with the other.

For an ingredient with an explicit Swedish season range from a grower or producer organisation, prefer that evidence when its scope matches the application. A producer's extended season does not establish peak quality, low prices, low emissions, or availability in every Swedish shop.

## Candidate assessment

| Source | Useful for | Limitation found in this review |
| --- | --- | --- |
| [ICA calendar](https://www.ica.se/artikel/svenska-gronsaker-och-frukt-i-sasong/) | Easily inspected monthly examples; explicitly includes stored Swedish produce | Missing months cannot establish season boundaries; publication date unconfirmed |
| [Från Sverige guides](https://fransverige.se/om-fran-sverige/sasongsguider/) | Swedish-origin monthly guidance | All twelve current posters were inspected. They omit some established availability and contain no plums. They are not a complete replacement dataset |
| [SydGrönt product calendar](https://sydgront.se/upload/produktkalender/produktkalender-2025-staende-med-bilder.pdf) | Explicit monthly supply ranges from a Swedish producer organisation | Supplier scope; the linked file is labelled 2025. Its plum and asparagus ranges require clarification, so it should not be imported wholesale |
| [Säsongens Bästa](https://sasongensbasta.se/om-oss/) | Ingredient explanations published by the growers' industry through LRF Trädgård | Some season descriptions are qualitative, with no exact month boundaries |

## Complete comparison of the existing sample

These are **positive listings**, not proposed final seasons. Unlisted months remain unknown. January–April Från Sverige files are named 2027; May–December files are named 2026. This mixed edition is what the live index currently provides, not an observed harvest year.

| Ingredient | ICA calendar | Från Sverige posters |
| --- | --- | --- |
| Gurka | Mar–Sep | Mar–Nov |
| Hallon | Jul–Aug | Jun–Aug |
| Jordgubbar | Jun–Aug | May–Aug |
| Morot | Jan–Apr, Jun–Dec | Jan–Oct, Dec |
| Palsternacka | Jan–Feb, Sep–Nov | Jan–Apr, Oct–Nov |
| Plommon | Aug | Not listed in any of the twelve posters |
| Päron | Aug–Oct | Sep–Oct |
| Sparris | May–Jun | Apr–Jun |
| Vitkål | Jan–Feb, Jun–Dec | Jan–Mar, Nov–Dec |
| Äpple | Jan–Dec | Jan–Apr, Sep–Dec |

The [review data](evidence/source-comparison-2026-09-13.json) records these observations, differences, exact PDF URLs and SHA-256 hashes. All twelve poster images were inspected visually; no OCR result was accepted as evidence. Raw documents and renderings remain in ignored `.cache/source-review/`.

This comparison establishes different coverage, not ten disagreements about agricultural facts. For example, Från Sverige includes carrots in May but omits them in November. Swapping sources would move the gap.

## What the gaps now mean

| Question | Additional evidence | Editorial conclusion |
| --- | --- | --- |
| Are Swedish raspberries possible in June? | [Hallands Bär](https://hallandsbar.se/odling/) describes tunnel-grown raspberry harvesting from June through October. The June poster explicitly includes raspberries | June has direct supporting evidence. ICA's omission is not a negative claim. This does not establish the typical national start date or peak |
| Are carrots missing in May? | Från Sverige's May poster lists them; SydGrönt's calendar marks carrots throughout the year | The May gap is an evidence gap in the chosen ICA page. A corrected record needs the supporting reference, not an inferred bridge between April and June |
| Are plums limited to August? | [Hebe](https://www.hebe.se/aktuellt/svenska-paron/) and [Grönsakshallen Sorunda](https://www.gronsakshallen.se/ravarukunskap/stenfrukter) explicitly describe Swedish plums in August–September. [ICA's fruit article](https://www.ica.se/artikel/frukt/) also gives August–September | September is supported. SydGrönt's calendar instead gives June–July: do not add those months or silently label the source a typo. Clarify the discrepancy |
| What about parsnip gaps? | March and April appear in Från Sverige's posters. SydGrönt gives a year-spanning range; [Säsongens Bästa](https://sasongensbasta.se/vegetables/palsternacka/) describes a late-spring/early-summer interruption | March–April have explicit support. The spring/summer boundary remains unresolved for a general Swedish calendar; qualitative wording must not become invented dates |
| Is white cabbage absent in spring? | Från Sverige includes March. SydGrönt marks all months; [Säsongens Bästa](https://sasongensbasta.se/vegetables/vitkal/) explains its long storage availability | There is support for wider availability, including storage. Do not confuse pointed cabbage with white cabbage or invent separate storage dates |
| Should asparagus extend beyond May–June? | [Säsongens Bästa](https://sasongensbasta.se/vegetables/sparris-2/) explicitly gives May–June. Från Sverige includes April, while SydGrönt gives June–July | Keep the existing supported May–June proposal; clarify the shoulders before extending it |

The other sample entries also have different coverage in the table above. Longer cucumber and strawberry seasons may reflect protected cultivation and producer supply. This review does not settle their national boundaries, pear cultivars, or summer stored-apple availability.

## Applied corrections

| Ingredient | Current months | Primary reference | Change |
| --- | --- | --- | --- |
| Hallon | Jun-Aug | Fran Sverige posters | June added; all twelve posters reviewed. Grower evidence also supports June, but the poster source does not establish September-October |
| Morot | Jan-Dec | SydGront 2025 product calendar, pages 1-2 | May added; stored availability included |
| Plommon | Aug-Sep | Hebe, Swedish plum section | September added; supplier explicitly names both months |

Each ingredient page now links its own primary reference. Other ingredient records retain their existing evidence. Unresolved boundaries remain unknown; no unsupported months are filled by interpolation.

## Next content pass

Review the remaining seven ingredients against precise Swedish evidence, then expand the catalogue in a small batch. Prioritise useful coverage and traceable month ranges. Do not add statuses or product features to compensate for missing evidence.

## Catalogue expansion, 2026-09-13

Added ten everyday vegetables, bringing the catalogue to twenty. Existing ingredient records are unchanged. All twelve months were assessed for each addition; unsupported months remain unknown.

| Addition | Supported months | Primary evidence |
| --- | --- | --- |
| Blomkål | Jun–Nov | SydGrönt, grid p. 1 and range p. 2 |
| Broccoli | Jun–Oct | SydGrönt, pp. 1–2 |
| Gul lök | Jan–Apr, Jul–Dec | SydGrönt, pp. 1–2; excludes separate bunch onions |
| Potatis | Jan–Dec | SydGrönt, pp. 1–2; includes storage |
| Purjolök | Jul–Dec | SydGrönt, pp. 1–2 |
| Rödbeta | Jan–Dec | SydGrönt, pp. 1 and 3; includes storage |
| Rödkål | Jan, Jun–Dec | SydGrönt, pp. 1 and 3 |
| Spenat | May–Oct | SydGrönt, grid p. 1; baby spinach p. 3 |
| Tomat | Apr–Oct | ICA's twelve monthly lists |
| Zucchini | Jul–Sep | ICA's twelve monthly lists |

The SydGrönt PDF was visually inspected. These are supplier availability ranges, not national harvest boundaries. ICA corroborates the broccoli and cauliflower ranges. Its February red-cabbage listing falls outside the selected producer range; it is not silently merged. Tomato uses ICA's narrower monthly guidance; SydGrönt instead lists year-round supply. Zucchini uses ICA because SydGrönt's grid says June–September while its illustrated range says June–December. These differences remain unresolved.

Each addition uses an unmodified CC0 Open Crop Icons illustration pinned in `data/images.json`. The potato image is illustrative, not a cultivar claim.

## Second catalogue expansion, 2026-09-13

Added ten ingredients, bringing the catalogue to thirty. Reviewed all twelve monthly lists in [ICA's Swedish seasonal calendar](https://www.ica.se/artikel/svenska-gronsaker-och-frukt-i-sasong/) for these additions. The table records positive listings; omissions remain unknown, including gaps between listed months. Existing seasonal records are unchanged.

| Addition | Supported months | Source locator |
| --- | --- | --- |
| Blåbär | Jul–Aug | Blåbär |
| Bondböna | Jul–Aug | Bondböna |
| Brysselkål | Jan, Sep–Dec | Brysselkål |
| Fänkål | Jul–Sep | Fänkål |
| Isbergssallad | May–Sep | Isbergssallad |
| Kålrabbi | Sep–Oct | Kålrabbi |
| Kålrot | Jan–Mar, Jun–Dec | Kålrot |
| Majs | Aug–Sep | Majskolv in August; Majs in September |
| Pumpa | Aug–Nov | Pumpa |
| Rotselleri | Jan–Apr, Sep–Dec | Rotselleri; January's duplicate counts once |

ICA explicitly includes stored Swedish produce. These observations do not distinguish harvest from storage or establish complete national season boundaries. Each addition has an unmodified CC0 illustration from the same pinned Open Crop Icons revision, recorded in `data/images.json`. Illustrations do not establish a particular cultivar or species. Sort weights now leave gaps between names in Swedish alphabetical order for future additions.

## Three season states, 2026-09-14

The interface now distinguishes months outside documented source ranges from missing evidence. This supersedes the earlier blanket unknown treatment for unlisted months in explicit ranges. Ingredient records explicitly store `out_of_season_months`; the UI never derives negative evidence from an omission.

Applied the complement of the selected SydGrönt ranges to its nine ingredient records and of Hebe's August–September range to plums, with two exceptions from the review above: February red cabbage and June–July plums remain unknown because sources conflict. Year-round ranges have no out-of-season months. ICA and Från Sverige monthly examples retain unknown omissions, including internal gaps.

These statuses describe the cited source's season, not guaranteed nationwide availability. Detail pages with out-of-season months explain that scope. No new agricultural evidence was collected for this interface change; source checked dates are unchanged.
