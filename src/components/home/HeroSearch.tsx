"use client";

import { useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import s from "./Home.module.css";

export type HeroSearchItem = { title: string; href: string; category: string };

/** Search box with instant suggestions from the calculator list. */
export default function HeroSearch({ items, popular }: { items: HeroSearchItem[]; popular: { label: string; href: string }[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const listId = useId();
  const wrap = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    const words = t.split(/\s+/);
    return items.filter((i) => words.every((w) => `${i.title} ${i.category}`.toLowerCase().includes(w))).slice(0, 7);
  }, [q, items]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <div
      className={s.search}
      ref={wrap}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <form
        role="search"
        className={s.searchBox}
        onSubmit={(e) => {
          e.preventDefault();
          if (results[cursor]) go(results[cursor].href);
          else router.push(`/calculators?q=${encodeURIComponent(q)}`);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={q}
          placeholder="Search calculators, for example salary or stamp duty"
          aria-label="Search calculators"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setCursor(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setCursor((c) => Math.min(results.length - 1, c + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setCursor((c) => Math.max(0, c - 1));
            } else if (e.key === "Escape") setOpen(false);
          }}
        />
        <button type="submit" className={s.searchGo}>
          Search
        </button>
      </form>
      {open && results.length > 0 && (
        <ul id={listId} role="listbox" className={s.suggest}>
          {results.map((r, i) => (
            <li key={r.href} role="option" aria-selected={i === cursor}>
              <Link href={r.href} onClick={() => setOpen(false)} data-active={i === cursor || undefined}>
                <span>{r.title}</span>
                <small>{r.category}</small>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className={s.popularRow}>
        <span>Popular:</span>
        {popular.map((p) => (
          <Link key={p.href} href={p.href}>
            {p.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
