"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Flagship.module.css";

export type SectionTab = { id: string; label: string };

/**
 * Sticky row of section links under the page banner (Calculator, Guide,
 * FAQs…). It sits just below the site header and underlines the section
 * currently in view.
 */
export default function SectionTabs({ items }: { items: SectionTab[] }) {
  const nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState(items[0]?.id);

  // Pin the bar under the sticky site header, whatever its height.
  useEffect(() => {
    const header = document.querySelector("header");
    const set = () => nav.current?.style.setProperty("--tabs-top", `${header?.getBoundingClientRect().height ?? 0}px`);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav ref={nav} className={s.tabsBar} aria-label="On this page">
      <ul className="gm-wrap">
        {items.map((t) => (
          <li key={t.id}>
            <a href={`#${t.id}`} aria-current={active === t.id ? "true" : undefined} onClick={() => setActive(t.id)}>
              {t.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
