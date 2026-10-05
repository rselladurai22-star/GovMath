import Link from "next/link";
import { CATEGORIES, CALCULATORS, getCalculatorsByCategory, type CategorySlug } from "@/lib/calculators";
import { CAT, iconForTitle, LineIcon } from "@/components/category-style";
import AdSlot from "@/components/AdSlot";
import { TAX_YEAR } from "@/lib/rates/tax-year";
import HeroSearch, { type HeroSearchItem } from "./HeroSearch";
import PlanCalcs from "./PlanCalcs";
import s from "./Home.module.css";

const ROTATING = ["your take-home pay", "your mortgage", "Stamp Duty", "your pension", "your benefits", "your student loan"];

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

/** The four big feature cards: badge, title, description and four calculators each. */
const FEATURES: { slug: CategorySlug; badge: [string, string]; title: string; body: string; picks: string[]; tone: "light" | "plum" }[] = [
  {
    slug: "tax-and-salary",
    badge: ["Know your numbers on", "tax and pay"],
    title: "See exactly what reaches your bank each month",
    body: "Income Tax, National Insurance, pensions and student loans, worked out on 2026/27 rates for England, Wales, Northern Ireland and Scotland.",
    picks: ["/tax-and-salary/salary-calculator", "/tax-and-salary/tax-code-decoder", "/tax-and-salary/national-insurance", "/tax-and-salary/bonus-tax"],
    tone: "light",
  },
  {
    slug: "property",
    badge: ["Know your numbers on", "buying a home"],
    title: "Plan your purchase, from deposit to monthly payment",
    body: "Stamp Duty in every UK nation, mortgage repayments and affordability, renting versus buying, and the costs of moving.",
    picks: ["/property/mortgage-repayment", "/property/stamp-duty-england", "/property/mortgage-affordability", "/property/first-time-buyer"],
    tone: "plum",
  },
  {
    slug: "investing",
    badge: ["Know your numbers on", "saving for later"],
    title: "Grow your savings and plan your retirement",
    body: "Pension tax relief, workplace pensions, ISAs, compound growth and the State Pension, with every assumption shown.",
    picks: ["/investing/pension-tax-relief", "/investing/workplace-pension", "/investing/compound-interest", "/investing/state-pension-age"],
    tone: "light",
  },
  {
    slug: "benefits",
    badge: ["Know your numbers on", "support you can claim"],
    title: "Check the help you could be entitled to",
    body: "Universal Credit, Child Benefit, childcare support, parental pay, PIP and Pension Credit, using the latest DWP rates.",
    picks: ["/benefits/universal-credit", "/benefits/child-benefit", "/benefits/tax-free-childcare", "/benefits/pension-credit"],
    tone: "plum",
  },
];

const MORE: CategorySlug[] = ["business", "vehicles", "students", "life"];

const WHY = [
  { title: "Official rates", body: `Every figure uses HMRC, DWP and GOV.UK rates for ${TAX_YEAR}, checked against the source.`, icon: "M9 12l2 2 4-4M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z" },
  { title: "Free, no sign-up", body: "Every calculator is free to use, with no account, no email and no paywall.", icon: "M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" },
  { title: "Private by design", body: "Nothing you type is stored. Calculations run in your browser.", icon: "M6 10V8a6 6 0 1112 0v2M5 10h14v11H5z" },
  { title: "Plain English", body: "Each calculator explains the rules and shows the working, so you can check it.", icon: "M4 5h16v11H8l-4 4V5z" },
];

const FAQ = [
  { q: "Are GovMath calculators free?", a: "Yes. Every calculator is free, with no account or sign-up. Nothing you type is stored." },
  { q: "Which tax year do the calculators use?", a: `They use the official rates for the ${TAX_YEAR} tax year, from 6 April 2026 to 5 April 2027, unless a page says otherwise.` },
  { q: "Do the calculators work for Scotland, Wales and Northern Ireland?", a: "Yes. Pages show where the rules differ, such as Scottish Income Tax, Land and Buildings Transaction Tax in Scotland and Land Transaction Tax in Wales." },
  { q: "Is GovMath part of the government?", a: "No. GovMath is an independent website. It is not affiliated with HMRC, DWP or any government department." },
  { q: "How accurate are the results?", a: "They follow the published rules and are checked against official examples. They are estimates to help you plan, so check anything important against your own circumstances." },
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
              Know your numbers for{" "}
              <span className={s.rotator} aria-hidden="true">
                <span className={s.rotatorTrack}>
                  {[...ROTATING, ROTATING[0]].map((w, i) => (
                    <i key={i}>{w}</i>
                  ))}
                </span>
              </span>
              <span className="sr-only">your take-home pay, mortgage, Stamp Duty, pension, benefits and student loan</span>
            </h1>
            <p className={s.lead}>
              {CALCULATORS.length} free calculators for tax, pay, property, pensions and benefits. Results update as you type, with the rules
              explained in plain English.
            </p>
            <HeroSearch items={items} popular={QUICK_LINKS} />
          </div>

          <aside className={s.heroCard} aria-labelledby="popular-title">
            <span className={s.heroCardBadge}>Most popular</span>
            <h2 id="popular-title" className={s.heroCardTitle}>
              The calculators people use most
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

      {/* ── Topic tiles ────────────────────────────────── */}
      <section className={s.section} aria-labelledby="topics-title">
        <div className="gm-wrap">
          <h2 id="topics-title" className={s.sectionHeading}>
            What would you like to work out?
          </h2>
          <p className={s.sectionSub}>Choose a topic to see every calculator in it.</p>
          <ul className={s.topicTiles}>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={c.href} className={s.topicTile}>
                  <span className={s.topicIcon}>
                    <LineIcon path={CAT[c.slug].icon} size={26} />
                  </span>
                  <strong>{CAT[c.slug].label}</strong>
                  <small>{getCalculatorsByCategory(c.slug).length} calculators</small>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Feature cards ──────────────────────────────── */}
      <section className={s.section} aria-label="Calculators by topic">
        <div className={`gm-wrap ${s.featureStack}`}>
          {FEATURES.map((f) => {
            const cat = CATEGORIES.find((c) => c.slug === f.slug)!;
            const count = getCalculatorsByCategory(f.slug).length;
            const picks = f.picks.flatMap((h) => find(h) ?? []);
            return (
              <article key={f.slug} className={`${s.featureCard} ${f.tone === "plum" ? s.featurePlum : s.featureLight}`} aria-labelledby={`feature-${f.slug}`}>
                <span className={s.cardBadge}>
                  {f.badge[0]} <em>{f.badge[1]}</em>
                </span>
                <div className={s.featureBody}>
                  <div className={s.featureCopy}>
                    <span className={s.featureIcon}>
                      <LineIcon path={CAT[f.slug].icon} size={28} />
                    </span>
                    <h3 id={`feature-${f.slug}`} className={s.dataTitle}>
                      {f.title}
                    </h3>
                    <p>{f.body}</p>
                    <div className={s.featureActions}>
                      <Link href={cat.href} className={f.tone === "plum" ? s.btnLight : s.btnPrimary}>
                        View all {count} calculators
                      </Link>
                    </div>
                  </div>
                  <ul className={s.featureOptions}>
                    {picks.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className={s.featureOption}>
                          <span className={s.featureOptionIcon}>
                            <LineIcon path={iconForTitle(c.title, c.category)} size={20} />
                          </span>
                          <span className={s.optTitle}>{c.title}</span>
                          <Arrow />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── More topics ────────────────────────────────── */}
      <section className={s.section} aria-labelledby="more-title">
        <div className="gm-wrap">
          <h2 id="more-title" className={s.sectionHeading}>
            More ways to plan with confidence
          </h2>
          <p className={s.sectionSub}>Calculators for running a business, driving, studying and everyday life.</p>
          <div className={s.moreGrid}>
            {MORE.map((slug) => {
              const cat = CATEGORIES.find((c) => c.slug === slug)!;
              const tools = getCalculatorsByCategory(slug).slice(0, 4);
              return (
                <article key={slug} className={s.moreCard}>
                  <span className={s.moreIcon}>
                    <LineIcon path={CAT[slug].icon} size={24} />
                  </span>
                  <h3>{cat.title}</h3>
                  <p>{cat.tagline}</p>
                  <ul>
                    {tools.map((t) => (
                      <li key={t.href}>
                        <Link href={t.href}>{t.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={cat.href} className={s.textLink}>
                    View all <Arrow size={14} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Quick calculators ──────────────────────────── */}
      <section className={`${s.section} ${s.sectionSoft}`} aria-labelledby="calc-title" id="calculator">
        <div className="gm-wrap">
          <h2 id="calc-title" className={s.sectionHeading}>
            Good plans start with well-worked-out numbers
          </h2>
          <p className={s.sectionSub}>Try a quick calculation, then open the full calculator for every option.</p>
          <PlanCalcs />
        </div>
      </section>

      <div className={`gm-wrap ${s.adRow}`}>
        <AdSlot size="leaderboard" />
      </div>

      {/* ── Why GovMath ────────────────────────────────── */}
      <section className={s.section} aria-labelledby="why-title">
        <div className="gm-wrap">
          <h2 id="why-title" className={s.sectionHeading}>
            Calculators you can rely on
          </h2>
          <p className={s.sectionSub}>Built to the published rules, and open about how every figure is worked out.</p>
          <ul className={s.whyGrid}>
            {WHY.map((w) => (
              <li key={w.title} className={s.whyCard}>
                <span className={s.whyIcon}>
                  <LineIcon path={w.icon} size={24} />
                </span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQs ───────────────────────────────────────── */}
      <section className={`${s.section} ${s.sectionSoft}`} aria-labelledby="faq-title">
        <div className={`gm-wrap ${s.faqGrid}`}>
          <div>
            <h2 id="faq-title" className={s.sectionHeading}>
              Frequently asked questions
            </h2>
            <p className={s.sectionSub}>Can&rsquo;t find what you need?</p>
            <Link href="/contact" className={s.btnOutline}>
              Request a calculator
            </Link>
          </div>
          <div className={s.accordion}>
            {FAQ.map((f, i) => (
              <details key={f.q} className={s.accordItem} open={i === 0}>
                <summary>
                  {f.q}
                  <span className={s.accordIcon} aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
