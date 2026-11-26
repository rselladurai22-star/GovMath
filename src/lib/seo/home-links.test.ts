import { describe, expect, it } from "vitest";
import { homeCrumbs, homeFor } from "./home-links";

const HOME = { href: "/", label: "Home" };

describe("home links", () => {
  it("sends each section's pages to their own home and shared pages to the site's home", () => {
    expect(homeFor("/uk/benefits/universal-credit-taper")).toBe("/uk");
    expect(homeFor("/uk")).toBe("/uk");
    expect(homeFor("/blog/100k-tax-trap")).toBe("/");
    expect(homeFor("")).toBe("/");
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
      homeCrumbs([HOME, { href: "/uk", label: "UK calculators" }, { href: "/uk/students", label: "Students" }]),
    ).toEqual([
      { href: "/uk", label: "Home" },
      { href: "/uk/students", label: "Students" },
    ]);
  });

  it("keeps the hub's own name on the hub page", () => {
    expect(homeCrumbs([HOME, { href: "/uk", label: "UK calculators" }])).toEqual([{ href: "/uk", label: "UK calculators" }]);
  });

  it("keeps a shared page's Home on the site's home page", () => {
    expect(homeCrumbs([HOME, { href: "/about", label: "About" }, { href: "#", label: "How we check" }])).toEqual([
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "#", label: "How we check" },
    ]);
  });

  it("sends no country page's Home to the site's home page", () => {
    expect(homeCrumbs([HOME, { href: "/uk", label: "UK" }, { href: "/uk/property", label: "Renting" }]).some((c) => c.href === "/")).toBe(false);
  });

  it("does nothing to a breadcrumb that has already been through it", () => {
    const once = homeCrumbs([HOME, { href: "/uk", label: "UK calculators" }, { href: "/uk/benefits", label: "Benefits" }]);
    expect(homeCrumbs(once)).toEqual(once);
  });
});
