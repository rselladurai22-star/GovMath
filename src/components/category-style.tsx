import type React from "react";
import type { CategorySlug } from "@/lib/calculators";

/** Line-icon path library (24×24, stroke). Shared by home + category pages. */
export const ICON = {
  receipt:
    "M9 7h6m-6 4h6m-4 4h4M6 3h12a1 1 0 011 1v16l-3-2-2 2-2-2-2 2-2-2-3 2V4a1 1 0 011-1z",
  house: "M3 10.5L12 3l9 7.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5M9.5 21v-6h5v6",
  briefcase:
    "M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-9 0h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2zm0 4h16",
  bars: "M4 19h16M4 19V5m4 14v-6m4 6V9m4 10V7m4 12V11",
  heart: "M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z",
  car: "M5 16l1.5-5A2 2 0 018.4 9.6h7.2a2 2 0 011.9 1.4L19 16m-14 0h14m-14 0v2.5a.5.5 0 00.5.5h2a.5.5 0 00.5-.5V16m11 0v2.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V16M7.5 13h.01M16.5 13h.01",
  cap: "M12 4L2 9l10 5 10-5-10-5zm0 5v8m6-5.5V17a6 3 0 01-12 0v-4.5",
  calendar:
    "M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z",
  grid: "M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 15h6v4h-6z",
  percent: "M19 5L5 19M7 5.5a1.5 1.5 0 100 3 1.5 1.5 0 100-3zM17 15.5a1.5 1.5 0 100 3 1.5 1.5 0 100-3z",
  pound: "M6 20h11M8.5 20V9a4 4 0 018 0M6.5 13h7",
  calculator:
    "M7 3h10a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zm1.5 4h7M8.5 11h1m3 0h1m2 0h.01M8.5 14.5h1m3 0h1m2 0h.01M8.5 18h1m3 0h1",
  doc: "M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zm7 0v5h5",
  pie: "M12 3v9h9a9 9 0 10-9-9zM20 15a8 8 0 11-8-8",
  trendingUp: "M3 17l6-6 4 4 8-8m0 0h-5m5 0v5",
  scale: "M12 3v18M6 8l-3 6a3 3 0 006 0L6 8zm12 0l-3 6a3 3 0 006 0l-3-6zM7 8h10",
  coins: "M4 7c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3zm0 0v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7M4 12c0 1.7 3.1 3 7 3s7-1.3 7-3",
  shield: "M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3zM9 12l2 2 4-4",
} as const;

export type CatMeta = {
  label: string;
  short: string;
  /** Short descriptor line used on topic tabs and panels. */
  desc: string;
  color: string;
  tint: string;
  icon: string;
};

/** Category glyphs from the brand icon set (24×24, stroke). */
const CAT_ICON = {
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2V3z M9 7h6M9 11h6M9 15h3",
  home: "m3 11 9-8 9 8M5 10v11h14V10M9 21v-8h6v8",
  briefcase: "M8 7V4h8v3M3 7h18v14H3V7zM3 12h18M10 12v3h4v-3",
  chart: "M4 3v17h17M8 16v-5M13 16V7M18 16V4",
  heart: "M12 21 3 12C-2 4 8 0 12 7c4-7 14-3 9 5l-9 9z",
  car: "m5 4-2 8v7h3v-3h12v3h3v-7l-2-8H5zM3 12h18M6 13v1M18 13v1",
  school: "m2 8 10-5 10 5-10 5L2 8zM6 10v7l6 4 6-4v-7M22 8v8",
  calendar: "M4 5h16v16H4V5zM8 3v4M16 3v4M4 10h16M8 14h2M14 14h2M8 17h2",
} as const;

// One brand colour for every topic: identity comes from the icon and name,
// never from a rainbow of accents (clearer, calmer, more premium).
const BRAND = "var(--blue)";
const TINT = "var(--ice-blue)";

/** Per-category identity (real GovMath categories). */
export const CAT: Record<CategorySlug, CatMeta> = {
  "tax-and-salary": { label: "Tax & salary", short: "Tax & Salary", desc: "Pay, deductions & tax", color: BRAND, tint: TINT, icon: CAT_ICON.receipt },
  property: { label: "Mortgages & property", short: "Property", desc: "Buying, renting & moving", color: BRAND, tint: TINT, icon: CAT_ICON.home },
  business: { label: "Freelance & business", short: "Business", desc: "Tax, VAT & running costs", color: BRAND, tint: TINT, icon: CAT_ICON.briefcase },
  investing: { label: "Pensions & investing", short: "Pensions", desc: "Savings & your future", color: BRAND, tint: TINT, icon: CAT_ICON.chart },
  benefits: { label: "Family & benefits", short: "Benefits", desc: "Support, childcare & leave", color: BRAND, tint: TINT, icon: CAT_ICON.heart },
  vehicles: { label: "Vehicles & transport", short: "Vehicles", desc: "Car tax, fuel & travel", color: BRAND, tint: TINT, icon: CAT_ICON.car },
  students: { label: "Students", short: "Students", desc: "Loans & student finances", color: BRAND, tint: TINT, icon: CAT_ICON.school },
  life: { label: "Everyday life", short: "Everyday Life", desc: "Health, dates & useful maths", color: BRAND, tint: TINT, icon: CAT_ICON.calendar },
};

/** CSS custom properties that paint an element in a category's colours. */
export function catVars(slug: CategorySlug): React.CSSProperties {
  return { ["--c" as string]: CAT[slug].color, ["--t" as string]: CAT[slug].tint };
}

/** Find a category from a free-text label (e.g. a blog post's category). */
export function catFromLabel(label: string): CategorySlug | undefined {
  const l = label.toLowerCase();
  return (Object.keys(CAT) as CategorySlug[]).find(
    (k) => CAT[k].label.toLowerCase() === l || CAT[k].short.toLowerCase() === l,
  );
}

/** Drop the redundant trailing "Calculator" from a tool title for display. */
export function shortTitle(title: string): string {
  return title.replace(/\s+Calculator$/i, "");
}

/** Keyword → icon, so cards get varied art without a per-calculator map. */
const ICON_RULES: [RegExp, string][] = [
  [/mortgage|remortgage/i, ICON.house],
  [/stamp duty|sdlt|lbtt|\bltt\b/i, ICON.percent],
  [/afford|deposit|budget|means/i, ICON.pound],
  [/rent vs buy|buy.?to.?let|rent a room|\brent\b/i, ICON.scale],
  [/yield|invest|\broi\b|fire|premium bond/i, ICON.trendingUp],
  [/compound|inflation|isa|dividend/i, ICON.pie],
  [/overpayment|days|date|holiday|bank holiday/i, ICON.calendar],
  [/loan|student/i, ICON.calculator],
  [/pension|state pension|carer|attendance/i, ICON.coins],
  [/capital gains|\bcgt\b/i, ICON.pie],
  [/inheritance|\biht\b|probate|estate|power of attorney/i, ICON.doc],
  [/child|benefit|maternity|paternity|universal credit|childcare|\bpip\b/i, ICON.heart],
  [/car|vehicle|\bev\b|fuel|\bmot\b|\bved\b|petrol|clean air|licence|sorn|commut/i, ICON.car],
  [/vat|corporation|ir35|sole trader|business|markup|profit|break.?even|cis/i, ICON.briefcase],
  [/salary|take.?home|wage|bonus|overtime|pro rata|hourly|redundancy|sick pay/i, ICON.coins],
  [/tax|\bni\b|national insurance|paye|p45|p60|emergency|code/i, ICON.receipt],
  [/percentage|timesheet/i, ICON.calculator],
  [/council tax|single person/i, ICON.house],
  [/bmi|nhs|prescription|healthy|right to rent/i, ICON.shield],
];

/** Best-guess icon path for a calculator title, falling back to its category icon. */
export function iconForTitle(title: string, slug: CategorySlug): string {
  for (const [re, icon] of ICON_RULES) if (re.test(title)) return icon;
  return CAT[slug].icon;
}

/** SVG line icon rendered in `currentColor`. */
export function LineIcon({ path, size = 22, stroke = 1.7 }: { path: string; size?: number; stroke?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
