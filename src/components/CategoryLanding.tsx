import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import CalculatorCard from "@/components/CalculatorCard";
import {
  getCalculatorsByCategory,
  getCategory,
  type CategorySlug,
} from "@/lib/calculators";

type CategoryLandingProps = {
  slug: CategorySlug;
  heroBadge?: string;
  /** Heading text shown as the H1 (overrides the default). */
  heading?: string;
  /** Optional footer prose block under the lists. */
  longCopy?: React.ReactNode;
};

export default function CategoryLanding({
  slug,
  heroBadge,
  heading,
  longCopy,
}: CategoryLandingProps) {
  const category = getCategory(slug);
  const items = getCalculatorsByCategory(slug);
  const live = items.filter((c) => c.status === "live");
  const upcoming = items.filter((c) => c.status === "coming-soon");

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
              <li className="font-semibold">{category.title}</li>
            </ol>
          </nav>
          {heroBadge && (
            <p className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
              {heroBadge}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight max-w-3xl">
            {heading ?? `UK ${category.title.toLowerCase()} calculators, in plain English`}
          </h1>
          <p className="mt-4 text-lg text-white/85 max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8">
        <AdSlot size="leaderboard" />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary-dark">
            Available now
          </h2>
          <span className="text-sm text-text/60">
            {live.length} calculator{live.length === 1 ? "" : "s"}
          </span>
        </div>
        {live.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((c) => (
              <li key={c.slug}>
                <CalculatorCard c={c} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
            <h3 className="font-bold text-primary-dark mb-1">
              Calculators landing soon
            </h3>
            <p className="text-sm text-text/70 max-w-md mx-auto">
              We&apos;re actively building this section. The first{" "}
              {category.title.toLowerCase()} calculators ship in the next
              release — see what&apos;s on the way below.
            </p>
          </div>
        )}
      </section>

      {upcoming.length > 0 && (
        <section className="bg-surface border-y border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary-dark">
                Coming soon
              </h2>
              <span className="text-sm text-text/60">
                {upcoming.length} on the way
              </span>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((c) => (
                <li key={c.slug}>
                  <CalculatorCard c={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        <AdSlot size="billboard" />
      </div>

      {longCopy && (
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-4 text-text/85 leading-relaxed">
          {longCopy}
        </section>
      )}
    </>
  );
}
