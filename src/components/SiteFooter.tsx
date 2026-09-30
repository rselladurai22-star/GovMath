import Link from "next/link";
import { LogoWordmark } from "@/components/Logo";
import { CATEGORIES } from "@/lib/calculators";
import styles from "./SiteChrome.module.css";

const HALF = Math.ceil(CATEGORIES.length / 2);

const COMPANY = [
  { href: "/about", label: "About GovMath" },
  { href: "/blog", label: "Guides" },
  { href: "/calculators", label: "All calculators" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function SiteFooter() {
  return (
    <footer className={`rk ${styles.footer}`}>
      <div className="gm-wrap">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/" aria-label="GovMath home" className="inline-flex">
              <LogoWordmark iconSize={30} />
            </Link>
            <p>Practical tools for clearer decisions. Free UK calculators, with the maths explained.</p>
          </div>
          <nav className={styles.footerCol} aria-label="Topics">
            <h2>Topics</h2>
            <ul>
              {CATEGORIES.slice(0, HALF).map((c) => (
                <li key={c.slug}>
                  <Link href={c.href}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className={styles.footerCol} aria-label="More topics">
            <h2>More topics</h2>
            <ul>
              {CATEGORIES.slice(HALF).map((c) => (
                <li key={c.slug}>
                  <Link href={c.href}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className={styles.footerCol} aria-label="Footer">
            <h2>Company</h2>
            <ul>
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} GovMath</span>
          <p>
            Independent tools. Not a government website and not affiliated with
            HMRC. Check each calculator&rsquo;s assumptions and tax year.
          </p>
        </div>
      </div>
    </footer>
  );
}
