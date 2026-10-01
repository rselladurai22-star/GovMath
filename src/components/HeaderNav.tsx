"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LineIcon } from "@/components/category-style";
import styles from "./SiteChrome.module.css";

export type NavTool = { title: string; href: string; popular: boolean };
export type NavTopic = {
  slug: string;
  href: string;
  label: string;
  title: string;
  desc: string;
  icon: string;
  tools: NavTool[];
};

/**
 * Desktop primary nav: one item per category, each opening a mega-menu that
 * lists every calculator in it. Opens on hover (with intent delay), click,
 * or keyboard; closes on Escape, outside click or navigation.
 */
export default function HeaderNav({ topics }: { topics: NavTopic[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const openSoon = (slug: string) => {
    clear();
    timer.current = setTimeout(() => setOpen(slug), open ? 0 : 90);
  };
  const closeSoon = () => {
    clear();
    timer.current = setTimeout(() => setOpen(null), 160);
  };

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  useEffect(() => clear, []);

  const current = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const active = topics.find((t) => t.slug === open);

  return (
    <nav aria-label="Main navigation" className={styles.nav} ref={navRef} onMouseLeave={closeSoon}>
      {topics.map((t) => (
        <button
          key={t.slug}
          type="button"
          className={styles.navItem}
          aria-expanded={open === t.slug}
          aria-controls="mega-menu"
          data-active={current(t.href) || undefined}
          onMouseEnter={() => openSoon(t.slug)}
          onFocus={() => setOpen((o) => (o ? t.slug : o))}
          onClick={() => {
            clear();
            setOpen((o) => (o === t.slug ? null : t.slug));
          }}
        >
          {t.label}
          <svg className={styles.chev} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
      <Link href="/blog" className={styles.navItem} aria-current={current("/blog") ? "page" : undefined} onMouseEnter={closeSoon}>
        Guides
      </Link>

      {active && (
        <div id="mega-menu" className={styles.mega} onMouseEnter={clear}>
          <div key={active.slug} className={`gm-wrap ${styles.megaInner}`}>
            <div className={styles.megaIntro}>
              <span className={styles.megaIcon}>
                <LineIcon path={active.icon} size={26} />
              </span>
              <strong>{active.title}</strong>
              <p>{active.desc}</p>
              <Link href={active.href} className={styles.megaAll} onClick={() => setOpen(null)}>
                View all {active.tools.length} calculators
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <ul className={styles.megaTools}>
              {active.tools.map((tool, i) => (
                <li key={tool.href} style={{ ["--i" as string]: i }}>
                  <Link href={tool.href} onClick={() => setOpen(null)} aria-current={pathname === tool.href ? "page" : undefined}>
                    <span>{tool.title}</span>
                    {tool.popular && <em>Popular</em>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
