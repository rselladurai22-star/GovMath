"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import styles from "./GovmathHome.module.css";

export type SearchItem = { title: string; href: string; category: string };

/** Hero search with a live results dropdown over every calculator. */
export default function HomeSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" focuses search unless already typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLElement &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close on outside click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return [];
    return items
      .filter((i) => i.title.toLowerCase().includes(q))
      .slice(0, 8);
  }, [q, items]);

  return (
    <div className={styles.search} ref={boxRef}>
      <form
        className={styles.searchBox}
        onSubmit={(e) => {
          e.preventDefault();
          if (matches[0]) window.location.href = matches[0].href;
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6f7f9e"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
        <label htmlFor="gm-search" className="sr-only">
          Search calculators
        </label>
        <input
          id="gm-search"
          ref={inputRef}
          className={styles.searchInput}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search calculators, e.g. mortgage, salary, tax…"
          autoComplete="off"
        />
      </form>

      {open && q.length > 0 && (
        <div className={styles.results} role="listbox">
          {matches.length === 0 ? (
            <div className={styles.resultEmpty}>
              No calculator matches “{query.trim()}”. Try “salary”, “stamp” or
              “pension”.
            </div>
          ) : (
            matches.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className={styles.resultRow}
                role="option"
                onClick={() => setOpen(false)}
              >
                <span>{m.title}</span>
                <span className={styles.resultCat}>{m.category}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
