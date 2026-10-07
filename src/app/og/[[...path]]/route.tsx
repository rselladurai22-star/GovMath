import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import { getAllPosts } from "@/lib/blog";
import { categoryLabel } from "@/gm/catalog";

/**
 * Share images (Open Graph, 1200 × 630), one per page: /og for the site,
 * /og/<topic> for a topic page, /og/<topic>/<calculator> for a calculator and
 * /og/blog/<slug> for an article. All are built at build time.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { path: [] },
    ...CATEGORIES.map((c) => ({ path: [c.slug] })),
    ...CALCULATORS.map((c) => ({ path: c.href.slice(1).split("/") })),
    ...getAllPosts().map((p) => ({ path: ["blog", p.slug] })),
  ];
}

function card(path: string): { kicker: string; title: string; text: string } {
  const calc = CALCULATORS.find((c) => c.href === path);
  if (calc) return { kicker: categoryLabel(calc.category), title: calc.title, text: calc.blurb };
  const cat = CATEGORIES.find((c) => c.href === path);
  if (cat) return { kicker: "Free calculators", title: `${categoryLabel(cat.slug)} calculators`, text: cat.tagline };
  const post = getAllPosts().find((p) => `/blog/${p.slug}` === path);
  if (post) return { kicker: "Guide", title: post.seoTitle ?? post.title, text: post.description };
  return {
    kicker: "Free UK calculators",
    title: "Tax, salary, mortgage and benefits calculators",
    text: `${CALCULATORS.length} free calculators with plain-English guides, for 2026/27.`,
  };
}

export async function GET(_req: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params;
  const { kicker, title, text } = card(path?.length ? `/${path.join("/")}` : "/");
  const badge = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/gm/govmath-badge-512.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", background: "#ffffff", color: "#282828" }}>
        <div style={{ height: 18, width: "100%", background: "#8c1d40", display: "flex" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px" }}>
          <div style={{ fontSize: 30, color: "#8c1d40", fontWeight: 700, marginBottom: 22, display: "flex" }}>{kicker}</div>
          <div style={{ fontSize: title.length > 40 ? 66 : 78, fontWeight: 800, lineHeight: 1.1, marginBottom: 28, display: "flex" }}>{title}</div>
          <div style={{ fontSize: 32, color: "#6e6e6e", lineHeight: 1.4, display: "flex" }}>{text.length > 120 ? `${text.slice(0, 117)}…` : text}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "26px 80px", background: "#f1f4f7", fontSize: 28 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={badge} width={72} height={72} alt="" />
            <span style={{ fontWeight: 800, color: "#8c1d40" }}>GovMath</span>
          </span>
          <span style={{ color: "#6e6e6e" }}>govmath.co.uk · Free, no sign-up · Independent</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
