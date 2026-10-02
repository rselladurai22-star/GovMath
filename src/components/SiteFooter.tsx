import Link from "next/link";
import { LogoWordmark } from "@/components/Logo";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import styles from "./SiteChrome.module.css";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

const FACTS = ["Official 2025/26 rates", "Free, no sign-up", "Nothing you type is stored"];

export default function SiteFooter() {
  return (
    <footer className={`rk ${styles.footer}`}>
      <div className={styles.footerGlow} aria-hidden="true" />
      <div className="gm-wrap">
        {/* Call-to-action band */}
        <div className={styles.footerCta}>
          <div>
            <h2>Find the right calculator in seconds</h2>
            <p>
              {CALCULATORS.length} free UK calculators across {CATEGORIES.length} topics, updated for 2025/26.
            </p>
          </div>
          <Link href="/calculators" className={styles.footerCtaBtn}>
            Browse all calculators
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/" aria-label="GovMath home" className="inline-flex">
              <LogoWordmark iconSize={36} tone="light" />
            </Link>
            <p>Free, independent UK calculators for tax, pay, property and benefits — with the maths explained in plain English.</p>
          </div>
          <ul className={styles.footerFacts}>
            {FACTS.map((f) => (
              <li key={f}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} GovMath. Independent tools — not a government website and not affiliated with HMRC.</span>
          <nav aria-label="Site information">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <a href="#main" className={styles.toTop}>
              Back to top
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                <path d="m5 12 7-7 7 7M12 19V5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
