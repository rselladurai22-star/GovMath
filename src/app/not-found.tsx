import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import HomeSearch, { type SearchItem } from "@/components/HomeSearch";
import { accentVars, CAT, LineIcon } from "@/components/category-style";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import styles from "@/components/GovmathHome.module.css";

export const metadata: Metadata = { title: "Page not found" };

const SEARCH_ICON = "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-3.5-3.5";

export default function NotFound() {
  const searchItems: SearchItem[] = CALCULATORS.map((c) => ({
    title: c.title,
    href: c.href,
    category: CAT[c.category].label,
  }));

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Error 404"
        title="We can't find that page"
        lead="The link may be out of date, or the page may have moved. Search for a calculator or pick a topic below."
        icon={SEARCH_ICON}
      >
        <div className="relative z-10 max-w-[660px]">
          <HomeSearch items={searchItems} />
        </div>
      </PageHero>

      <div className={`gm-wrap ${styles.allBody}`}>
        <nav aria-label="Topics" className={styles.jump}>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={c.href} style={accentVars(c.slug)}>
              <LineIcon path={CAT[c.slug].icon} size={17} />
              {CAT[c.slug].label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap gap-3 pb-24">
          <Link href="/" className="gm-btn">
            Back to the homepage
          </Link>
          <Link href="/calculators" className="gm-btn-outline">
            Browse all calculators
          </Link>
        </div>
      </div>
    </div>
  );
}
