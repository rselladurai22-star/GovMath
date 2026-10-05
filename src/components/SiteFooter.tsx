import Link from "next/link";
import { LogoWordmark } from "@/components/Logo";
import { CAT } from "@/components/category-style";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import { TAX_YEAR } from "@/lib/rates/tax-year";
import styles from "./SiteChrome.module.css";

const POPULAR = [
  "/tax-and-salary/salary-calculator",
  "/property/mortgage-repayment",
  "/property/stamp-duty-england",
  "/business/vat-calculator",
  "/benefits/universal-credit",
  "/students/plan-2-student-loan",
];

const COMPANY = [
  { href: "/calculators", label: "All calculators" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About GovMath" },
  { href: "/contact", label: "Contact us" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/disclaimer", label: "Disclaimer" },
];

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <details className={styles.footCol} open>
      <summary className={styles.footHeading}>
        {title}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function SiteFooter() {
  const topics = CATEGORIES.map((c) => ({ href: c.href, label: CAT[c.slug].label }));
  const popular = POPULAR.flatMap((h) => {
    const c = CALCULATORS.find((x) => x.href === h);
    return c ? [{ href: c.href, label: c.title }] : [];
  });

  return (
    <footer className={styles.footer}>
      <div className="gm-wrap">
        <div className={styles.footGrid}>
          <div className={styles.footBrand}>
            <Link href="/" aria-label="GovMath home" className="inline-flex">
              <LogoWordmark iconSize={34} />
            </Link>
            <p>
              {CALCULATORS.length} free, independent UK calculators for tax, pay, property, pensions and benefits, with the maths explained in plain
              English.
            </p>
            <ul className={styles.footFacts}>
              {[`Official ${TAX_YEAR} rates`, "Free, no sign-up", "Nothing you type is stored"].map((f) => (
                <li key={f}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <Column title="Topics" links={topics} />
          <Column title="Popular calculators" links={popular} />
          <Column title="GovMath" links={COMPANY} />
          <Column title="Legal" links={LEGAL} />
        </div>
      </div>

      <div className={styles.footBottom}>
        <div className={`gm-wrap ${styles.footBottomInner}`}>
          <span>© {new Date().getFullYear()} GovMath. Independent tools: not a government website and not affiliated with HMRC.</span>
          <a href="#main" className={styles.toTop}>
            Back to top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
              <path d="m5 12 7-7 7 7M12 19V5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
