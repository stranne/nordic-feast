"""Check that cited sources and image credits still respond. Requires network access.

Zola only checks links in Markdown content, and the citations live in data/.
"""

import json
from pathlib import Path
import sys
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
USER_AGENT = "Mozilla/5.0 (compatible; nordic-feast-link-check; +https://github.com/stranne/nordic-feast)"


def read_json(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


def cited_urls():
    sources = read_json("data/sources.json")
    images = read_json("data/images.json")
    # Upstream image files are pinned to a commit, so only the project and licence pages can move.
    return sorted({source["url"] for source in sources.values()} | {images["url"], images["license_url"]})


def status(url):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status
    except urllib.error.HTTPError as error:
        return error.code


def check():
    failures = []
    urls = cited_urls()
    for url in urls:
        try:
            code = status(url)
        except (urllib.error.URLError, TimeoutError) as error:
            failures.append(f"{url}: {error}")
            continue
        if code >= 400:
            failures.append(f"{url}: HTTP {code}")
    if failures:
        # A failure can be a moved source or a site that is temporarily unavailable.
        sys.exit("Link check failed. Inspect each source before changing its citation:\n" + "\n".join(failures))
    print(f"Links OK: {len(urls)} cited URLs respond.")


if __name__ == "__main__":
    check()
