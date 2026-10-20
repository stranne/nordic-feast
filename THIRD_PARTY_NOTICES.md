# Third-party material

The project's own code and content are licensed under the [MIT licence](LICENSE). The material below keeps its own licence.

## Open Crop Icons

Files: `static/images/crops/*.svg`. Six of the icons also appear in `static/social-card.png`, the share image rendered from `scripts/social-card.html`.

Project: https://github.com/openfarmcc/open-crop-icons

Revision: `d41f1197a14bb82f12037dc47585152ae1e3074f`

Licence: **CC0 1.0 Universal**. The upstream README explicitly releases the icons under CC0:

https://github.com/openfarmcc/open-crop-icons/blob/d41f1197a14bb82f12037dc47585152ae1e3074f/README.md#license

Licence text: https://creativecommons.org/publicdomain/zero/1.0/legalcode

The icons were downloaded unmodified. Local filenames identify the ingredient; `data/images.json` records the exact original file for each image. Attribution is included in the website even though CC0 does not require it.

## Lucide

Navigation and external-link icons: `templates/partials/icon.html` (`arrow-left`, `arrow-right`, `arrow-up-right`). SVG paths are unchanged; shared template markup adds sizing and accessibility attributes.

Project: https://github.com/lucide-icons/lucide

Revision: `a79b2d131dab2bf20cb224bd0937b439a9c4fa99`

Licence: ISC, with the upstream MIT notice for icons derived from Feather. The complete upstream notices are included in `static/licenses/lucide.txt` and copied to the built site.

## Lora and Source Sans 3

Self-hosted Latin font files, downloaded unmodified from Google Fonts on 2026-09-22. Both include Swedish characters. Lora supplies regular headings and the wordmark; Source Sans 3 supplies normal text with variable weights 400–700.

- `static/fonts/lora-latin-400.woff2`: https://fonts.gstatic.com/s/lora/v37/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkq0.woff2
- `static/fonts/source-sans-3-latin-variable.woff2`: https://fonts.gstatic.com/s/sourcesans3/v19/nwpStKy2OAdR1K-IwhWudF-R3w8aZQ.woff2

Projects: https://github.com/cyrealtype/Lora-Cyrillic and https://github.com/adobe-fonts/source-sans.

Licence: **SIL Open Font License 1.1**. Complete copyright and licence notices are included in `static/licenses/lora.txt` and `static/licenses/source-sans-3.txt`, copied from the corresponding `ofl/lora/OFL.txt` and `ofl/sourcesans3/OFL.txt` files in `google/fonts` at revision `e44c4b011a820c2cbe2fd2cfa8052037d7edb571`.

## Seasonal references

The in-season months are this project's own summary of the months each source lists for an ingredient. Every ingredient page names and links its source, and `data/sources.json` records how each source was reviewed. The MIT licence covers this project's selection and presentation. It does not cover the source publications, which remain with their publishers.

No source photographs, poster artwork, full source articles or origin-certification logos are included.
