"""Validate editorial data and attribution, without frontend test infrastructure."""

from datetime import date
import json
from pathlib import Path
import sys
import tomllib

ROOT = Path(__file__).resolve().parents[1]
MONTHS = list(range(1, 13))


def require(condition, message):
    if not condition:
        raise ValueError(message)


def read_json(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


def frontmatter(path):
    parts = path.read_text(encoding="utf-8").split("+++", 2)
    require(len(parts) == 3 and not parts[0].strip(), f"{path.name}: missing TOML frontmatter")
    return tomllib.loads(parts[1])


def check():
    config = tomllib.loads((ROOT / "zola.toml").read_text(encoding="utf-8"))
    sources = read_json("data/sources.json")
    months = read_json("data/months.json")
    assets = read_json("data/images.json")
    require([m["number"] for m in months] == MONTHS, "Month navigation must cover all twelve months in order")
    require(len({m["slug"] for m in months}) == 12, "Duplicate month URL")
    for month in months:
        page = frontmatter(ROOT / "content/sverige" / (month["slug"] + ".md"))
        require(page["extra"]["month"] == month["number"], f"Wrong month: {month['slug']}")
        require(page["title"] == month["name"], f"Wrong month title: {month['slug']}")

    require(assets["license"] == "CC0-1.0" and assets["license_url"].startswith("https://"), "Missing image licence")
    images = {image["ingredient"]: image for image in assets["images"]}
    require(len(images) == len(assets["images"]), "Duplicate image attribution")
    ids, weights = set(), set()
    for path in sorted((ROOT / "content/ravaror").glob("*.md")):
        if path.name == "_index.md":
            continue
        page = frontmatter(path)
        extra = page["extra"]
        identifier = extra["id"]
        require(identifier == path.stem and identifier not in ids, f"Invalid/duplicate ID: {identifier}")
        ids.add(identifier)
        require(page["title"].strip(), f"Missing title: {identifier}")
        require(type(page["weight"]) is int and page["weight"] not in weights, f"Invalid/duplicate sort weight: {identifier}")
        weights.add(page["weight"])
        require(extra["category"] in {"gronsaker", "frukt", "bar"}, f"Unknown category: {identifier}")
        require(identifier in images and images[identifier]["file"] == extra["image"], f"Missing image attribution: {identifier}")
        image = (ROOT / "static" / extra["image"]).resolve()
        require(image.is_relative_to(ROOT / "static") and image.is_file(), f"Missing local image: {identifier}")
        require(assets["commit"] in images[identifier]["upstream"], f"Unpinned image source: {identifier}")
        require(config["extra"]["country"] in extra["seasons"], f"Missing active country: {identifier}")

        for country, season in extra["seasons"].items():
            source_id = season["source"]
            require(source_id in sources, f"Unknown source: {identifier}/{source_id}")
            source = sources[source_id]
            require(source["country"] == country, f"Country/source mismatch: {identifier}")
            require(source["url"].startswith("https://"), f"Missing source URL: {source_id}")
            require(source["basis"] and source["coverage"], f"Undefined seasonal meaning: {source_id}")
            require(type(source["scope"]) is str, f"Missing source scope (use an empty string for none): {source_id}")
            date.fromisoformat(season["checked"])
            date.fromisoformat(source["checked"])
            require(season["reviewed_months"] == MONTHS, f"Incomplete annual review: {identifier}")
            listed = season["listed_months"]
            require(all(type(m) is int and m in MONTHS for m in listed), f"Invalid month: {identifier}")
            require(listed == sorted(set(listed)), f"Duplicate/unordered month: {identifier}")
            require(listed, f"Season must include at least one month: {identifier}")
            require("out_of_season_months" not in season, f"Redundant out-of-season months: {identifier}")
            require(season["source_terms"], f"Missing source locator terms: {identifier}")

    require(ids and ids == set(images), "Ingredient and image catalogues do not match")
    print(f"Content OK: {len(ids)} ingredients, 12 months, local images and source references.")


if __name__ == "__main__":
    try:
        check()
    except (ValueError, KeyError, TypeError, OSError) as error:
        sys.exit(f"Content check failed: {error}")
