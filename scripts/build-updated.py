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
    "/tax-and-salary/salary-calculator": "src/gm/pages/salary.json",
    "/property/mortgage-repayment": "src/gm/pages/mortgage.json",
}


def last_change(path: str) -> str:
    out = subprocess.run(
        ["git", "log", "-1", "--format=%cs", "--", path], cwd=ROOT, capture_output=True, text=True, check=True
    ).stdout.strip()
    # A new page not yet committed is dated today.
    return out or datetime.date.today().isoformat()


dates = {}
for page in glob.glob(os.path.join(ROOT, "src/app/*/*/page.tsx")):
    folder = os.path.relpath(os.path.dirname(page), ROOT)
    url = "/" + os.path.relpath(folder, "src/app")
    if "[" in url or url in PACKAGE:
        continue
    dates[url] = last_change(folder)
for url, path in PACKAGE.items():
    dates[url] = last_change(path)

with open(os.path.join(ROOT, "src/gm/updated.json"), "w") as f:
    json.dump(dict(sorted(dates.items())), f, indent=2)
    f.write("\n")
print(f"src/gm/updated.json: {len(dates)} pages")
