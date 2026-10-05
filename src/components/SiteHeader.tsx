import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import HeaderNav, { type NavTopic } from "@/components/HeaderNav";
import { LogoLink } from "@/components/Logo";
import { CAT } from "@/components/category-style";
import { CATEGORIES, getCalculatorsByCategory } from "@/lib/calculators";
import { TAX_YEAR } from "@/lib/rates/tax-year";
import styles from "./SiteChrome.module.css";

const UTILITY = [
  { href: "/calculators", label: "Calculators" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  // Every category with every tool — drives the desktop mega-menu and the
  // mobile accordion from the single calculator registry.
  const topics: NavTopic[] = CATEGORIES.map((c) => ({
    slug: c.slug,
    href: c.href,
    label: c.slug === "life" ? "Everyday" : CAT[c.slug].short,
    title: c.title,
    desc: c.tagline,
    icon: CAT[c.slug].icon,
    tools: getCalculatorsByCategory(c.slug).map((t) => ({ title: t.title, href: t.href, popular: Boolean(t.popular) })),
  }));

  return (
    <header className={styles.header}>
      {/* Utility strip */}
      <div className={styles.utility}>
        <div className={`gm-wrap ${styles.utilityInner}`}>
          <nav aria-label="Site sections" className={styles.utilityNav}>
            {UTILITY.map((l, i) => (
              <Link key={l.href} href={l.href} data-active={i === 0 || undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <span className={styles.utilityNote}>Updated for the {TAX_YEAR} tax year</span>
        </div>
      </div>

      {/* Main bar */}
      <div className={`gm-wrap ${styles.headerInner}`}>
        <LogoLink iconSize={34} tone="light" />
        <HeaderNav topics={topics} />
        <div className={styles.headerActions}>
          <Link href="/calculators#search" className={styles.searchBtn} aria-label="Search all calculators">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <Link href="/calculators" className={styles.headerCta}>
            All calculators
          </Link>
          <MobileNav topics={topics} />
        </div>
      </div>
    </header>
  );
}
