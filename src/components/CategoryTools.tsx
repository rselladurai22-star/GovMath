"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LineIcon } from "@/components/category-style";
import styles from "./CategoryLanding.module.css";

export type ToolItem = {
  title: string;
  href: string;
  blurb: string;
  popular?: boolean;
  iconPath: string;
};

const INITIAL = 12;

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className={styles.toolArrow} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CategoryTools({
  label,
  color,
  tint,
  tools,
}: {
  label: string;
  color: string;
  tint: string;
  tools: ToolItem[];
}) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      q
        ? tools.filter(
            (t) =>
              t.title.toLowerCase().includes(q) ||
              t.blurb.toLowerCase().includes(q)
          )
        : tools,
    [q, tools]
  );

  const showAll = expanded || q.length > 0;
  const visible = showAll ? filtered : filtered.slice(0, INITIAL);
  const hiddenCount = filtered.length - visible.length;

  return (
    <div className={styles.content} style={{ ["--cat" as string]: color }}>
      <div className={styles.toolsHead}>
        <h2 className={styles.toolsTitle}>
          {label} Calculators <span>({tools.length})</span>
        </h2>
        <div className={styles.search}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6f7f9e" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <label htmlFor="cat-search" className="sr-only">
            Search in {label} calculators
          </label>
          <input
            id="cat-search"
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search in ${label} calculators…`}
            autoComplete="off"
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          No {label} calculator matches “{query.trim()}”.
        </div>
      ) : (
        <div className={styles.toolGrid}>
          {visible.map((t) => (
            <Link key={t.href} href={t.href} className={styles.toolCard}>
              <span className={styles.toolIcon} style={{ background: tint, color }}>
                <LineIcon path={t.iconPath} size={22} />
              </span>
              <div className={styles.toolBody}>
                <h3 className={styles.toolTitle}>{t.title}</h3>
                <p className={styles.toolDesc}>{t.blurb}</p>
                {t.popular && (
                  <span className={styles.badge}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Most used
                  </span>
                )}
              </div>
              <ArrowRight />
            </Link>
          ))}
        </div>
      )}

      {!showAll && hiddenCount > 0 && (
        <button type="button" className={styles.showMore} onClick={() => setExpanded(true)}>
          Show {hiddenCount} more calculator{hiddenCount === 1 ? "" : "s"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
