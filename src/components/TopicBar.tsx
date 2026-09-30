import Link from "next/link";
import { LineIcon } from "@/components/category-style";
import styles from "./TopicBar.module.css";

/** Brand-gradient section header for a topic, with a "View all" link. */
export default function TopicBar({
  id,
  title,
  icon,
  href,
  linkLabel,
  subtitle,
}: {
  id: string;
  title: string;
  icon: string;
  href: string;
  linkLabel: string;
  subtitle?: string;
}) {
  return (
    <header className={styles.bar}>
      <span className={styles.icon}>
        <LineIcon path={icon} size={22} />
      </span>
      <div className={styles.titles}>
        <h2 id={id}>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <Link href={href} className={styles.link}>
        {linkLabel}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true" className={styles.arrow}>
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </header>
  );
}
