"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LineIcon } from "@/components/category-style";
import styles from "./SiteChrome.module.css";

export type NavTopic = { href: string; label: string; desc: string; icon: string; count: number };

/** Direct links to the most-visited topics, beside the full Calculators menu. */
const QUICK = [
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/property", label: "Property" },
  { href: "/benefits", label: "Benefits" },
  { href: "/blog", label: "Guides" },
];

/** Desktop primary nav: Calculators mega-menu plus quick topic links. */
export default function HeaderNav({ topics, total }: { topics: NavTopic[]; total: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click and Escape (menu links close it on click).
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const quickActive = QUICK.some((q) => current(q.href));
  const menuActive = !quickActive && (topics.some((t) => current(t.href)) || current("/calculators"));

  return (
    <nav aria-label="Main navigation" className={styles.nav}>
      <div className={styles.menuWrap} ref={wrapRef}>
        <button
          type="button"
          className={styles.navItem}
          aria-expanded={open}
          aria-controls="calc-menu"
          data-active={menuActive || undefined}
          onClick={() => setOpen((o) => !o)}
        >
          Calculators
          <svg className={styles.chev} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <div id="calc-menu" className={styles.menu}>
            <div className={styles.menuHead}>
              <strong>Browse {total} calculators</strong>
              <Link href="/calculators" onClick={() => setOpen(false)}>
                View all →
              </Link>
            </div>
            <div className={styles.menuGrid}>
              {topics.map((t) => (
                <Link key={t.href} href={t.href} className={styles.menuItem} onClick={() => setOpen(false)}>
                  <span className={styles.menuIcon}>
                    <LineIcon path={t.icon} size={20} />
                  </span>
                  <span>
                    <strong>{t.label}</strong>
                    <small>
                      {t.desc} · {t.count}
                    </small>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {QUICK.map((q) => (
        <Link
          key={q.href}
          href={q.href}
          className={styles.navItem}
          aria-current={current(q.href) ? "page" : undefined}
        >
          {q.label}
        </Link>
      ))}
    </nav>
  );
}
