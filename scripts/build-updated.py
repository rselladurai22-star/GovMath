#!/usr/bin/env python3
"""Write src/gm/updated.json: the date each calculator page last changed.

The "Updated" date in each calculator's trust line comes from this file.
Re-run it before committing changes to a calculator page:

    python3 scripts/build-updated.py
"""
import datetime
import glob
import json
import os
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Calculators built from the design package's pages.
PACKAGE = {
    "/uk/tax-and-salary/salary-calculator": "src/gm/pages/salary.json",
    "/uk/property/mortgage-repayment": "src/gm/pages/mortgage.json",
}


# Commits that only moved or renamed pages (the October 2026 move to
# sumatlas.com and /uk/) carry this marker and do not count as an update.
MOVE_MARKER = "[site-move]"


def last_change(*paths: str) -> str:
    out = subprocess.run(
        ["git", "log", "-1", "--format=%cs", "--fixed-strings", "--invert-grep", f"--grep={MOVE_MARKER}", "--", *paths],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=True,
    ).stdout.strip()
    # A new page not yet committed is dated today.
    return out or datetime.date.today().isoformat()


dates = {}
for page in glob.glob(os.path.join(ROOT, "src/app/uk/*/*/page.tsx")):
    folder = os.path.relpath(os.path.dirname(page), ROOT)
    url = "/" + os.path.relpath(folder, "src/app")
    if "[" in url or url in PACKAGE:
        continue
    # Before October 2026 the UK pages lived at src/app/<topic>/<page>.
    dates[url] = last_change(folder, folder.replace("src/app/uk/", "src/app/", 1))
for url, path in PACKAGE.items():
    dates[url] = last_change(path)

with open(os.path.join(ROOT, "src/gm/updated.json"), "w") as f:
    json.dump(dict(sorted(dates.items())), f, indent=2)
    f.write("\n")
print(f"src/gm/updated.json: {len(dates)} pages")
