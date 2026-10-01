import Link from "next/link";
import type { ReactNode } from "react";
import { catVars, LineIcon } from "@/components/category-style";
import type { CategorySlug } from "@/lib/calculators";
import styles from "./PageHero.module.css";

export type Crumb = { href: string; label: string };

/** Generic "calculator" glyph used when a page has no category icon. */
export const HERO_ICON_CALC =
  "M5 2h14v20H5zM8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2";

type PageHeroProps = {
  title: ReactNode;
  eyebrow?: ReactNode;
  lead?: ReactNode;
  /** Trail ending in the current page; the last crumb is not linked. */
  breadcrumbs?: Crumb[];
  /** Icon path (24×24) shown beside the title; null for none. */
  icon?: string | null;
  /** Rendered under the lead: fact pills, meta line… */
  children?: ReactNode;
  compact?: boolean;
  /** Category whose colours tint the icon and eyebrow. */
  tone?: CategorySlug;
};

/** Shared inner-page hero — the site's single page-heading pattern. */
export default function PageHero({
  title,
  eyebrow,
  lead,
  breadcrumbs,
  icon = HERO_ICON_CALC,
  children,
  compact,
  tone,
}: PageHeroProps) {
  return (
    <section
      className={`${styles.hero} ${compact ? styles.compact : ""}`}
      style={tone ? catVars(tone) : undefined}
    >
      <div className={styles.aurora} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className={`gm-wrap ${styles.inner}`}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              {breadcrumbs.map((c, i) => (
                <li key={`${c.href}-${i}`}>
                  {i === breadcrumbs.length - 1 ? (
                    <span aria-current="page">{c.label}</span>
                  ) : (
                    <Link href={c.href}>{c.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={styles.head}>
          {icon && (
            <span className={styles.icon} aria-hidden="true">
              <LineIcon path={icon} size={32} stroke={1.6} />
            </span>
          )}
          <div className={styles.copy}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            <h1 className={styles.title}>{title}</h1>
            {lead && <p className={styles.lead}>{lead}</p>}
            {children && <div className={styles.extra}>{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Checkmarked facts for a hero's children slot. */
export function HeroPills({ items }: { items: string[] }) {
  return (
    <ul className={styles.pills}>
      {items.map((t) => (
        <li key={t}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t}
        </li>
      ))}
    </ul>
  );
}
