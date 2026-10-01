"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LineIcon } from "@/components/category-style";
import { LogoWordmark } from "@/components/Logo";
import type { NavTopic } from "@/components/HeaderNav";
import styles from "./SiteChrome.module.css";

const SECONDARY = [
  { href: "/calculators", label: "All calculators" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Mobile drawer: every category as an accordion listing all its tools. */
export default function MobileNav({ topics }: { topics: NavTopic[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={styles.mobileOnly}>
      <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-drawer" className={styles.iconBtn}>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <div onClick={close} aria-hidden="true" className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`} />

      <aside id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Site menu" className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`} inert={!open}>
        <div className={styles.drawerHead}>
          <LogoWordmark iconSize={32} />
          <button type="button" onClick={close} aria-label="Close menu" className={styles.iconBtn}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className={styles.drawerNav} aria-label="Mobile">
          {topics.map((t) => (
            <details key={t.slug} className={styles.acc}>
              <summary>
                <span className={styles.accIcon}>
                  <LineIcon path={t.icon} size={19} />
                </span>
                <span>{t.title}</span>
                <small>{t.tools.length}</small>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <ul>
                <li>
                  <Link href={t.href} onClick={close} className={styles.accAll}>
                    View all {t.title.toLowerCase()} →
                  </Link>
                </li>
                {t.tools.map((tool) => (
                  <li key={tool.href}>
                    <Link href={tool.href} onClick={close}>
                      {tool.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          <div className={styles.drawerMore}>
            {SECONDARY.map((l) => (
              <Link key={l.href} href={l.href} onClick={close}>
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.drawerFoot}>
          <Link href="/calculators" onClick={close} className="gm-btn" style={{ width: "100%" }}>
            Browse all calculators
          </Link>
        </div>
      </aside>
    </div>
  );
}
