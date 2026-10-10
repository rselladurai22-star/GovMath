import { describe, expect, it } from "vitest";
import { CALCULATORS } from "./calculators";
import { EMBEDS, embedCode } from "./embeds";

describe("embeds", () => {
  it("only lists real calculators", () => {
    const hrefs = new Set(CALCULATORS.map((c) => c.href));
    for (const e of EMBEDS) expect(hrefs.has(e)).toBe(true);
  });

  it("hands out a frame, a visible credit link and the height script", () => {
    const code = embedCode("/uk/life/pro-rata-rent", 'Rent "calc" & more');
    expect(code).toContain('src="https://sumatlas.com/embed/uk/life/pro-rata-rent"');
    expect(code).toContain('<a href="https://sumatlas.com/uk/life/pro-rata-rent">SumAtlas</a>');
    expect(code).toContain("https://sumatlas.com/embed.js");
    expect(code).toContain('title="Rent &quot;calc&quot; &amp; more"');
  });
});
