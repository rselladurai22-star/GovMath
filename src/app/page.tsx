import Link from "next/link";
import type { Metadata } from "next";
import type { CategorySlug } from "@/lib/calculators";
import AdSlot from "@/components/AdSlot";
import CalculatorCard from "@/components/CalculatorCard";
import {
  CALCULATORS,
  CATEGORIES,
  getPopularCalculators,
} from "@/lib/calculators";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "GovMath — UK government rules, in plain English",
    description: "Free UK tax, salary, mortgage, benefits and pension calculators. 2025/26 rates, no signup, plain-English explanations.",
    url: "/",
  },
};

/** Per-category icon + accent tint, used across the homepage. */
const CATEGORY_ICONS: Record<CategorySlug, { tint: string; path: React.ReactNode }> = {
  "tax-and-salary": {
    tint: "text-indigo-600 bg-indigo-50",
    path: <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m-6 4h6m-4 4h4M6 3h12a1 1 0 011 1v16l-3-2-2 2-2-2-2 2-2-2-3 2V4a1 1 0 011-1z" />,
  },
  property: {
    tint: "text-emerald-600 bg-emerald-50",
    path: <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5M9.5 21v-6h5v6" />,
  },
  business: {
    tint: "text-amber-600 bg-amber-50",
    path: <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-9 0h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2zm0 4h16" />,
  },
  investing: {
    tint: "text-violet-600 bg-violet-50",
    path: <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16M4 19V5m4 14v-6m4 6V9m4 10V7m4 12V11" />,
  },
  benefits: {
    tint: "text-rose-600 bg-rose-50",
    path: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />,
  },
  vehicles: {
    tint: "text-cyan-600 bg-cyan-50",
    path: <path strokeLinecap="round" strokeLinejoin="round" d="M5 16l1.5-5A2 2 0 018.4 9.6h7.2a2 2 0 011.9 1.4L19 16m-14 0h14m-14 0v2.5a.5.5 0 00.5.5h2a.5.5 0 00.5-.5V16m11 0v2.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V16M7.5 13h.01M16.5 13h.01" />,
  },
  students: {
    tint: "text-sky-600 bg-sky-50",
    path: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4L2 9l10 5 10-5-10-5zm0 5v8m6-5.5V17a6 3 0 01-12 0v-4.5" />,
  },
  life: {
    tint: "text-fuchsia-600 bg-fuchsia-50",
    path: <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />,
  },
};

function CategoryIcon({ slug }: { slug: CategorySlug }) {
  const { tint, path } = CATEGORY_ICONS[slug];
  return (
    <span className={`inline-grid place-items-center w-11 h-11 rounded-xl ${tint}`}>
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        {path}
      </svg>
    </span>
  );
}

export default function Home() {
  const popular = getPopularCalculators().slice(0, 6);
  const totalCount = CALCULATORS.length;
  const liveCount = CALCULATORS.filter((c) => c.status === "live").length;

  return (
    <>
      {/* Hero */}
      <section className="ink-panel relative overflow-hidden text-white">
        {/* decorative layers */}
        <div className="grid-overlay pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/20 rounded-full px-3 py-1.5 mb-6 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="dot-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              UK 2025/26 tax year · {totalCount} calculators
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              UK government rules,{" "}
              <span className="text-gradient">in plain English</span>.
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              Free calculators for tax, take-home pay, mortgages, benefits,
              pensions and more. No jargon. No sign-ups. Just answers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tax-and-salary/salary-calculator"
                className="group inline-flex items-center gap-2 rounded-xl bg-white text-primary-dark font-semibold px-5 py-3 shadow-lg shadow-black/20 transition-transform hover:scale-[1.02]"
              >
                Try the Salary Calculator
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center rounded-xl border border-white/30 text-white font-semibold px-5 py-3 hover:bg-white/10 transition-colors"
              >
                Browse all {totalCount}
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75">
              {["100% free", "No sign-up", "2025/26 rates", "Privacy-first"].map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick lookup card */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/40 to-accent/30 blur-2xl opacity-60" aria-hidden="true" />
            <div className="relative bg-surface text-text rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/10">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick lookup
              </div>
              <h2 className="text-2xl font-bold mb-1 text-primary-dark">
                What does your salary really pay?
              </h2>
              <p className="text-sm text-muted mb-5">
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
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
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
                    className="w-full rounded-xl border border-border bg-white pl-7 pr-3 py-3 text-base focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-primary text-white font-semibold px-5 py-3 hover:bg-primary-dark transition-colors"
                >
                  Calculate
                </button>
              </form>
              <ul className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                <li className="rounded-xl bg-bg p-3">
                  <div className="text-xs text-muted">Income Tax</div>
                  <div className="font-semibold text-error">−£4,486</div>
                </li>
                <li className="rounded-xl bg-bg p-3">
                  <div className="text-xs text-muted">NI</div>
                  <div className="font-semibold text-error">−£1,794</div>
                </li>
                <li className="rounded-xl bg-bg p-3">
                  <div className="text-xs text-muted">Take-home</div>
                  <div className="font-semibold text-success">£28,720</div>
                </li>
              </ul>
              <p className="mt-3 text-xs text-muted">
                Illustrative figures for a £35,000 salary, England 2025/26.
              </p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-white/[0.04] backdrop-blur">
          <dl className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { value: `${totalCount}`, label: "Calculators" },
              { value: `${CATEGORIES.length}`, label: "Topics" },
              { value: "2025/26", label: "Tax year" },
              { value: "£0", label: "Cost to you" },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-6 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl sm:text-3xl font-extrabold">{stat.value}</dd>
                <dd className="text-xs sm:text-sm text-white/70 mt-0.5">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8">
        <AdSlot size="leaderboard" />
      </div>

      {/* Browse by topic */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">
            Browse by topic
          </h2>
          <p className="text-muted mt-2">
            Every calculator is paired with a plain-English explainer. Pick a
            topic to dive in.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const count = CALCULATORS.filter(
              (c) => c.category === cat.slug
            ).length;
            return (
              <li key={cat.slug}>
                <Link
                  href={cat.href}
                  className="card card-interactive group flex h-full flex-col p-6"
                >
                  <div className="flex items-center justify-between">
                    <CategoryIcon slug={cat.slug} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {count}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-primary-dark">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted mt-1.5 flex-1">{cat.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    Explore
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Popular calculators */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">
                Popular calculators
              </h2>
              <p className="text-muted mt-1">
                {liveCount} live now, {totalCount - liveCount} more on the way.
              </p>
            </div>
            <Link
              href="/calculators"
              className="hidden sm:inline-flex items-center gap-1 text-primary font-semibold hover:underline"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => (
              <li key={c.slug}>
                <CalculatorCard c={c} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        <AdSlot size="billboard" />
      </div>

      {/* Why GovMath */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">
            Why GovMath?
          </h2>
          <p className="text-muted mt-2">
            Built to be the clearest, most trustworthy way to run the numbers.
          </p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "Always free",
              body: "No paywalls, no sign-ups, no email harvesting.",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-3-3l3 3 3-3M12 3a9 9 0 100 18 9 9 0 000-18z" />,
            },
            {
              title: "Plain English",
              body: "Every rule explained the way you’d explain it to a friend.",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M21 12a9 9 0 01-13.5 7.8L3 21l1.2-4.5A9 9 0 1121 12z" />,
            },
            {
              title: "Up to date",
              body: "Aligned with HMRC and DWP figures for the 2025/26 tax year.",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
            },
          ].map((f) => (
            <li key={f.title} className="card p-6">
              <span className="inline-grid place-items-center w-11 h-11 rounded-xl bg-card-hover text-primary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  {f.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-bold text-primary-dark">{f.title}</h3>
              <p className="text-sm text-muted mt-1.5">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <div className="ink-panel relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 text-center text-white">
          <div className="grid-overlay pointer-events-none absolute inset-0" />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Can’t find what you need?
            </h2>
            <p className="mt-3 text-white/80">
              Browse the full library of {totalCount} UK calculators across{" "}
              {CATEGORIES.length} topics — all free, all explained.
            </p>
            <Link
              href="/calculators"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-dark shadow-lg transition-transform hover:scale-[1.02]"
            >
              Browse all calculators
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
