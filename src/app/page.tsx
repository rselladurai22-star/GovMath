import type { Metadata } from "next";
import type { CategorySlug } from "@/lib/calculators";
import AdSlot from "@/components/AdSlot";
import HomeDirectory, {
  type DirectorySection,
  type DirectoryTool,
} from "@/components/HomeDirectory";
import {
  CATEGORIES,
  CALCULATORS,
  getCategory,
  getCalculatorsByCategory,
} from "@/lib/calculators";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "GovMath — 100 free UK calculators, all in plain English",
    description:
      "Free UK tax, salary, mortgage, benefits and pension calculators. 2025/26 rates, no sign-up, with the maths shown step by step.",
    url: "/",
  },
};

/**
 * Per-category visual identity for the directory home. Icon paths are the
 * established 24×24 line icons; colours come from the redesign tokens.
 * `size: "big"` categories get the two-column card with POPULAR pills; the
 * rest render as compact single-column cards with TOP badges.
 */
const CATEGORY_STYLE: Record<
  CategorySlug,
  { id: string; color: string; tint: string; edge: string; iconPath: string; size: "big" | "small" }
> = {
  "tax-and-salary": {
    id: "tax",
    color: "#1e5c45",
    tint: "#eef6f1",
    edge: "#c4ddd0",
    iconPath: "M9 7h6m-6 4h6m-4 4h4M6 3h12a1 1 0 011 1v16l-3-2-2 2-2-2-2 2-2-2-3 2V4a1 1 0 011-1z",
    size: "big",
  },
  property: {
    id: "property",
    color: "#2d5a80",
    tint: "#eef4f9",
    edge: "#c3d6e5",
    iconPath: "M3 10.5L12 3l9 7.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5M9.5 21v-6h5v6",
    size: "big",
  },
  business: {
    id: "business",
    color: "#8a5a24",
    tint: "#f9f4ec",
    edge: "#e2d2ba",
    iconPath: "M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-9 0h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2zm0 4h16",
    size: "big",
  },
  benefits: {
    id: "benefits",
    color: "#9a3f52",
    tint: "#faf0f2",
    edge: "#e6c6cd",
    iconPath: "M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z",
    size: "big",
  },
  investing: {
    id: "investing",
    color: "#5b4a8a",
    tint: "#f3f0f9",
    edge: "#d3cbe6",
    iconPath: "M4 19h16M4 19V5m4 14v-6m4 6V9m4 10V7m4 12V11",
    size: "small",
  },
  vehicles: {
    id: "vehicles",
    color: "#22697a",
    tint: "#edf6f8",
    edge: "#c1dde4",
    iconPath: "M5 16l1.5-5A2 2 0 018.4 9.6h7.2a2 2 0 011.9 1.4L19 16m-14 0h14m-14 0v2.5a.5.5 0 00.5.5h2a.5.5 0 00.5-.5V16m11 0v2.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V16M7.5 13h.01M16.5 13h.01",
    size: "small",
  },
  students: {
    id: "students",
    color: "#3f6a9a",
    tint: "#eff4f9",
    edge: "#c8d8e8",
    iconPath: "M12 4L2 9l10 5 10-5-10-5zm0 5v8m6-5.5V17a6 3 0 01-12 0v-4.5",
    size: "small",
  },
  life: {
    id: "life",
    color: "#7a4a7a",
    tint: "#f8f0f8",
    edge: "#e0c9e0",
    iconPath: "M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z",
    size: "small",
  },
};

/** Drop a trailing period so the coloured tagline reads as a label. */
const asLabel = (s: string) => s.replace(/\.$/, "");

function buildSection(slug: CategorySlug): DirectorySection {
  const cat = getCategory(slug);
  const style = CATEGORY_STYLE[slug];
  const calcs = getCalculatorsByCategory(slug);
  const asTool = (popular?: boolean) => (c: (typeof calcs)[number]): DirectoryTool => ({
    name: c.title,
    href: c.href,
    popular: popular ?? c.popular,
  });

  // Big cards surface up to three popular tools as pills, then list the rest.
  const top: DirectoryTool[] =
    style.size === "big"
      ? calcs.filter((c) => c.popular).slice(0, 3).map(asTool(true))
      : [];
  const topHrefs = new Set(top.map((t) => t.href));
  const tools =
    style.size === "big"
      ? calcs.filter((c) => !topHrefs.has(c.href)).map(asTool())
      : calcs.map(asTool());

  return {
    id: style.id,
    slug,
    title: cat.title,
    tagline: asLabel(cat.tagline),
    count: calcs.length,
    color: style.color,
    tint: style.tint,
    edge: style.edge,
    iconPath: style.iconPath,
    categoryHref: cat.href,
    top,
    tools,
  };
}

export default function Home() {
  const sections = CATEGORIES.map((c) => buildSection(c.slug));
  const bigSections = sections.filter(
    (s) => CATEGORY_STYLE[s.slug].size === "big"
  );
  const smallSections = sections.filter(
    (s) => CATEGORY_STYLE[s.slug].size === "small"
  );

  return (
    <div
      className="rk"
      style={{ background: "#ffffff", fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
    >
      <HomeDirectory
        bigSections={bigSections}
        smallSections={smallSections}
        totalCount={CALCULATORS.length}
        topicCount={CATEGORIES.length}
      />

      {/* Ad — keep the CLS-reserved slot pattern */}
      <section style={{ maxWidth: 1200 }} className="mx-auto px-7 mt-7">
        <AdSlot size="leaderboard" className="!max-w-none !h-24" />
      </section>

      {/* Why band */}
      <section style={{ maxWidth: 1200 }} className="mx-auto px-7 mt-9">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
            gap: 18,
          }}
        >
          <div
            style={{
              background: "#0f1a15",
              color: "#eef4ef",
              borderRadius: 14,
              padding: 26,
            }}
          >
            <div
              className="rk-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8fd6b1",
              }}
            >
              Why GovMath
            </div>
            <div
              className="rk-serif"
              style={{ fontSize: 23, fontWeight: 600, marginTop: 10 }}
            >
              The maths, shown.
            </div>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "#8fa397",
              }}
            >
              Every result comes with a step-by-step ledger — see exactly what
              was added, taxed and taken.
            </p>
          </div>
          {[
            {
              eyebrow: "Always current",
              title: "2025/26 rates, checked.",
              body: "Aligned with published HMRC and DWP figures. When rates change, the tools change the same week.",
            },
            {
              eyebrow: "Plain English",
              title: "No jargon, ever.",
              body: "Rules explained the way you’d explain them to a friend — with the traps flagged.",
            },
          ].map((c) => (
            <div
              key={c.eyebrow}
              style={{
                background: "#fff",
                border: "1px solid #e4e9e5",
                borderRadius: 14,
                padding: 26,
              }}
            >
              <div
                className="rk-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#1e5c45",
                }}
              >
                {c.eyebrow}
              </div>
              <div
                className="rk-serif"
                style={{ fontSize: 23, fontWeight: 600, marginTop: 10 }}
              >
                {c.title}
              </div>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: "#5b645e",
                }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 8 }} />
    </div>
  );
}
