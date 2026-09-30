import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import HeaderNav, { type NavTopic } from "@/components/HeaderNav";
import { LogoLink } from "@/components/Logo";
import { CAT } from "@/components/category-style";
import { CALCULATORS, CATEGORIES, getCalculatorsByCategory } from "@/lib/calculators";
import styles from "./SiteChrome.module.css";

export default function SiteHeader() {
  const topics: NavTopic[] = CATEGORIES.map((c) => ({
    href: c.href,
    label: CAT[c.slug].label,
    desc: CAT[c.slug].desc,
    icon: CAT[c.slug].icon,
    count: getCalculatorsByCategory(c.slug).length,
  }));

  return (
    <header className={`rk ${styles.header}`}>
      <div className={`gm-wrap ${styles.headerInner}`}>
        <LogoLink iconSize={34} />
        <HeaderNav topics={topics} total={CALCULATORS.length} />
        <div className={styles.headerActions}>
          <Link href="/calculators#search" className={styles.iconBtn} aria-label="Search calculators" title="Search calculators">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <Link href="/calculators" className={`gm-btn ${styles.headerCta}`}>
            All calculators
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
