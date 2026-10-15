import { describe, expect, it } from "vitest";
import { homeCrumbs, homeFor } from "./home-links";

const HOME = { href: "/", label: "Home" };

describe("home links", () => {
  it("sends each section's pages to their own home and shared pages to the default country", () => {
    expect(homeFor("/uk/benefits/universal-credit-taper")).toEqual({ href: "/uk", shared: false });
    expect(homeFor("/us/taxes")).toEqual({ href: "/us", shared: false });
    expect(homeFor("/us")).toEqual({ href: "/us", shared: false });
    expect(homeFor("/everyday/bmi-calculator")).toEqual({ href: "/uk", shared: true });
    expect(homeFor("")).toEqual({ href: "/uk", shared: true });
  });

  it("points a UK calculator's Home at /uk", () => {
    expect(
      homeCrumbs([HOME, { href: "/uk/benefits", label: "Benefits" }, { href: "/uk/benefits/lha", label: "LHA" }]),
    ).toEqual([
      { href: "/uk", label: "Home" },
      { href: "/uk/benefits", label: "Benefits" },
      { href: "/uk/benefits/lha", label: "LHA" },
    ]);
  });

  it("merges Home with the country hub that follows it", () => {
    expect(
      homeCrumbs([HOME, { href: "/us", label: "US calculators" }, { href: "/us/taxes", label: "Taxes and pay" }]),
    ).toEqual([
      { href: "/us", label: "Home" },
      { href: "/us/taxes", label: "Taxes and pay" },
    ]);
  });

  it("keeps the hub's own name on the hub page", () => {
    expect(homeCrumbs([HOME, { href: "/us", label: "US calculators" }])).toEqual([{ href: "/us", label: "US calculators" }]);
  });

  it("marks a shared page's Home so the browser can point it at the visitor's country", () => {
    expect(homeCrumbs([HOME, { href: "/about", label: "About" }, { href: "#", label: "How we check" }])).toEqual([
      { href: "/uk", label: "Home", shared: true },
      { href: "/about", label: "About" },
      { href: "#", label: "How we check" },
    ]);
  });

  it("never links to the root, which redirects by location", () => {
    for (const items of [[HOME, { href: "/everyday", label: "Everyday" }], [HOME, { href: "/uk", label: "UK" }, { href: "/uk/life", label: "Life" }]]) {
      expect(homeCrumbs(items).some((c) => c.href === "/")).toBe(false);
    }
  });

  it("does nothing to a breadcrumb that has already been through it", () => {
    const once = homeCrumbs([HOME, { href: "/us", label: "US calculators" }, { href: "/us/loans", label: "Loans" }]);
    expect(homeCrumbs(once)).toEqual(once);
  });
});
