import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import CalculatorCard from "@/components/CalculatorCard";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "All Calculators",
  description:
    "Every GovMath calculator in one place — tax, benefits, property and pensions. Free, plain English, no sign-up.",
};

export default function AllCalculatorsPage() {
  const liveCount = CALCULATORS.filter((c) => c.status === "live").length;

  return (
    <>
      <section className="bg-primary-dark text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-white/80 mb-4">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-semibold">All calculators</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Every GovMath calculator
          </h1>
          <p className="mt-4 text-lg text-white/85 max-w-2xl">
            {liveCount} live, more on the way. Jump to a category below or
            scroll to browse the lot.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-white/30 bg-white/5 hover:bg-white/15 transition-colors px-4 py-2 text-sm font-semibold"
              >
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8">
        <AdSlot size="leaderboard" />
      </div>

      {CATEGORIES.map((cat) => {
        const items = CALCULATORS.filter((c) => c.category === cat.slug);
        if (items.length === 0) return null;
        return (
          <section
            key={cat.slug}
            id={cat.slug}
            className="mx-auto max-w-6xl px-4 sm:px-6 py-10 scroll-mt-20"
          >
            <div className="flex items-end justify-between mb-2 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-primary-dark">
                  {cat.title}
                </h2>
                <p className="text-text/70 mt-1">{cat.tagline}</p>
              </div>
              <Link
                href={cat.href}
                className="hidden sm:inline text-primary font-semibold hover:underline whitespace-nowrap"
              >
                View {cat.title.toLowerCase()} →
              </Link>
            </div>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <li key={c.slug}>
                  <CalculatorCard c={c} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-4 mb-10">
        <AdSlot size="billboard" />
      </div>
    </>
  );
}
