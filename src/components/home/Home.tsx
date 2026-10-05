import Link from "next/link";
import { CATEGORIES, CALCULATORS, getCalculatorsByCategory } from "@/lib/calculators";
import { CAT, iconForTitle, LineIcon } from "@/components/category-style";
import AdSlot from "@/components/AdSlot";
import { TAX_YEAR } from "@/lib/rates/tax-year";
import HeroSearch, { type HeroSearchItem } from "./HeroSearch";
import s from "./Home.module.css";

const MOST_POPULAR = [
  "/tax-and-salary/salary-calculator",
  "/property/mortgage-repayment",
  "/property/stamp-duty-england",
  "/business/vat-calculator",
  "/benefits/universal-credit",
  "/investing/pension-tax-relief",
];

const QUICK_LINKS = [
  { label: "Salary", href: "/tax-and-salary/salary-calculator" },
  { label: "Stamp Duty", href: "/property/stamp-duty-england" },
  { label: "VAT", href: "/business/vat-calculator" },
  { label: "Mortgage", href: "/property/mortgage-repayment" },
];

const POINTS = [
  `${CALCULATORS.length} calculators across ${CATEGORIES.length} topics`,
  `Official ${TAX_YEAR} rates from HMRC, DWP and GOV.UK`,
  "Free to use, no sign-up, nothing you type is stored",
  "Rules for England, Scotland, Wales and Northern Ireland",
];

function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const find = (href: string) => CALCULATORS.find((c) => c.href === href);
  const items: HeroSearchItem[] = CALCULATORS.map((c) => ({ title: c.title, href: c.href, category: CAT[c.category].label }));
  const popular = MOST_POPULAR.flatMap((h) => find(h) ?? []);

  return (
    <div className={s.page}>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={`gm-wrap ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <span className={s.eyebrow}>Free UK calculators · {TAX_YEAR} rates</span>
            <h1 id="hero-title" className={s.bannerTitle}>
              Free UK calculators for tax, money and everyday life
            </h1>
            <p className={s.lead}>
              GovMath works out the numbers behind everyday money decisions: your take-home pay, Stamp Duty, mortgage repayments, benefits,
              pensions, student loans and more. Each calculator follows the official rules, shows its working and explains the rules in plain
              English.
            </p>
            <ul className={s.heroPoints}>
              {POINTS.map((p) => (
                <li key={p}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            <HeroSearch items={items} popular={QUICK_LINKS} />
          </div>

          <aside className={s.heroCard} aria-labelledby="popular-title">
            <span className={s.heroCardBadge}>Most used</span>
            <h2 id="popular-title" className={s.heroCardTitle}>
              The tools people use most
            </h2>
            <ul className={s.optionList}>
              {popular.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className={s.option}>
                    <span className={s.optionIcon}>
                      <LineIcon path={iconForTitle(c.title, c.category)} size={20} />
                    </span>
                    <span className={s.optionText}>
                      <strong>{c.title}</strong>
                      <small>{CAT[c.category].label}</small>
                    </span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ── Every category with its tools ───────────────── */}
      <section className={s.section} aria-labelledby="topics-title">
        <div className="gm-wrap">
          <h2 id="topics-title" className={s.sectionHeading}>
            Calculators by topic
          </h2>
          <p className={s.sectionSub}>Every GovMath calculator, grouped by topic.</p>
          <div className={s.moreGrid}>
            {CATEGORIES.map((cat) => {
              const tools = getCalculatorsByCategory(cat.slug);
              return (
                <article key={cat.slug} className={s.moreCard} aria-labelledby={`cat-${cat.slug}`}>
                  <span className={s.moreIcon}>
                    <LineIcon path={CAT[cat.slug].icon} size={24} />
                  </span>
                  <h3 id={`cat-${cat.slug}`}>{CAT[cat.slug].label}</h3>
                  <p>{cat.tagline}</p>
                  <ul>
                    {tools.map((t) => (
                      <li key={t.href}>
                        <Link href={t.href}>{t.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={cat.href} className={s.textLink}>
                    View all {tools.length} <Arrow size={14} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className={`gm-wrap ${s.adRow}`}>
        <AdSlot size="leaderboard" />
      </div>
    </div>
  );
}
