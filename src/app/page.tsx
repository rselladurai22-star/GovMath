import Link from "next/link";
import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import CalculatorCard from "@/components/CalculatorCard";
import {
  CALCULATORS,
  CATEGORIES,
  getPopularCalculators,
} from "@/lib/calculators";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const popular = getPopularCalculators().slice(0, 6);
  const totalCount = CALCULATORS.length;
  const liveCount = CALCULATORS.filter((c) => c.status === "live").length;

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-dark text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5">
              UK 2025/26 tax year · {totalCount} calculators
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              UK government rules,{" "}
              <span className="underline decoration-white/40 underline-offset-4">
                in plain English
              </span>
              .
            </h1>
            <p className="mt-5 text-lg text-white/85 max-w-xl">
              Free calculators for tax, take-home pay, mortgages, benefits,
              pensions and more. No jargon. No sign-ups. Just answers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tax-and-salary/salary-calculator"
                className="inline-flex items-center rounded-md bg-white text-primary-dark font-semibold px-5 py-3 hover:bg-card-hover transition-colors"
              >
                Try the Salary Calculator
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center rounded-md border border-white/40 text-white font-semibold px-5 py-3 hover:bg-white/10 transition-colors"
              >
                Browse all {totalCount}
              </Link>
            </div>
          </div>

          {/* Quick lookup card */}
          <div className="bg-surface text-text rounded-xl shadow-lg p-6 sm:p-8 border border-border">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              Quick lookup
            </div>
            <h2 className="text-2xl font-bold mb-1">
              What does your salary really pay?
            </h2>
            <p className="text-sm text-text/70 mb-5">
              Enter a gross annual salary to see take-home pay at a glance.
            </p>
            <form
              action="/tax-and-salary/salary-calculator"
              method="GET"
              className="flex flex-col sm:flex-row gap-3"
            >
              <label className="sr-only" htmlFor="salary">
                Gross annual salary
              </label>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text/60">
                  £
                </span>
                <input
                  id="salary"
                  name="salary"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={100}
                  defaultValue={35000}
                  className="w-full rounded-md border border-border bg-white pl-7 pr-3 py-3 text-base focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-primary text-white font-semibold px-5 py-3 hover:bg-primary-dark transition-colors"
              >
                Calculate
              </button>
            </form>
            <ul className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
              <li className="rounded-md bg-bg p-3">
                <div className="text-xs text-text/60">Income Tax</div>
                <div className="font-semibold text-error">−£4,486</div>
              </li>
              <li className="rounded-md bg-bg p-3">
                <div className="text-xs text-text/60">NI</div>
                <div className="font-semibold text-error">−£1,794</div>
              </li>
              <li className="rounded-md bg-bg p-3">
                <div className="text-xs text-text/60">Take-home</div>
                <div className="font-semibold text-success">£28,720</div>
              </li>
            </ul>
            <p className="mt-3 text-xs text-text/60">
              Illustrative figures for a £35,000 salary, England 2025/26.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8">
        <AdSlot size="leaderboard" />
      </div>

      {/* Popular calculators */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">
              Popular calculators
            </h2>
            <p className="text-text/70 mt-1">
              {liveCount} live now, {totalCount - liveCount} more on the way.
            </p>
          </div>
          <Link
            href="/calculators"
            className="hidden sm:inline text-primary font-semibold hover:underline"
          >
            View all →
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((c) => (
            <li key={c.slug}>
              <CalculatorCard c={c} />
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-2">
            Browse by topic
          </h2>
          <p className="text-text/70 mb-6">
            Every calculator is paired with a plain-English explainer.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => {
              const count = CALCULATORS.filter(
                (c) => c.category === cat.slug
              ).length;
              return (
                <li key={cat.slug}>
                  <Link
                    href={cat.href}
                    className="block h-full rounded-xl border border-border p-6 hover:border-primary hover:bg-card-hover transition-colors"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-text/60 mb-2">
                      {count} calculator{count === 1 ? "" : "s"}
                    </div>
                    <h3 className="text-lg font-bold text-primary-dark">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-text/75 mt-2">{cat.tagline}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        <AdSlot size="billboard" />
      </div>

      {/* Trust strip */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-8 text-center">
          Why GovMath?
        </h2>
        <ul className="grid gap-6 sm:grid-cols-3">
          <li className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-card-hover text-primary grid place-items-center font-extrabold text-xl mb-3">
              £
            </div>
            <h3 className="font-bold text-primary-dark">Always free</h3>
            <p className="text-sm text-text/75 mt-1">
              No paywalls, no sign-ups, no email harvesting.
            </p>
          </li>
          <li className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-card-hover text-primary grid place-items-center font-extrabold text-xl mb-3">
              ✓
            </div>
            <h3 className="font-bold text-primary-dark">Plain English</h3>
            <p className="text-sm text-text/75 mt-1">
              Every rule explained the way you&apos;d explain it to a friend.
            </p>
          </li>
          <li className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-card-hover text-primary grid place-items-center font-extrabold text-xl mb-3">
              ⚡
            </div>
            <h3 className="font-bold text-primary-dark">Up to date</h3>
            <p className="text-sm text-text/75 mt-1">
              Aligned with HMRC and DWP figures for the 2025/26 tax year.
            </p>
          </li>
        </ul>
      </section>
    </>
  );
}
