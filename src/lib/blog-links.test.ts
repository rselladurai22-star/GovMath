import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { RELATED_POSTS } from "./blog-links";
import { BLOG_POSTS } from "./blog";

describe("RELATED_POSTS", () => {
  const slugs = new Set(BLOG_POSTS.map((p) => p.slug));
  it("points only at articles that exist", () => {
    for (const [path, posts] of Object.entries(RELATED_POSTS)) {
      for (const s of posts) expect(slugs.has(s), `${path} → ${s}`).toBe(true);
    }
  });
  it("uses calculator paths that exist as pages", () => {
    for (const path of Object.keys(RELATED_POSTS)) {
      expect(existsSync(join(process.cwd(), "src/app/(site)", path, "page.tsx")), path).toBe(true);
    }
  });
  it("gives every article at least three calculators that link to it", () => {
    const count = new Map<string, number>();
    for (const posts of Object.values(RELATED_POSTS)) for (const s of posts) count.set(s, (count.get(s) ?? 0) + 1);
    for (const s of slugs) expect(count.get(s) ?? 0, s).toBeGreaterThanOrEqual(3);
  });
});
