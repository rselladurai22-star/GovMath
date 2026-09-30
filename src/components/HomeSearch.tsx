"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./GovmathHome.module.css";

export type SearchItem = { title: string; href: string; category: string };

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/**
 * The page's primary action: one large search over every calculator, with
 * live results and popular shortcuts underneath.
 */
export default function HomeSearch({
  items,
  shortcuts = [],
  autoFocus = false,
}: {
  items: SearchItem[];
  shortcuts?: { label: string; href: string }[];
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const matches = useMemo(() => {
    const terms = normalize(query).split(" ").filter(Boolean);
    if (!terms.length) return [];
    return items
      .filter((i) => {
        const text = normalize(`${i.title} ${i.category}`);
        return terms.every((t) => text.includes(t));
      })
      .slice(0, 8);
  }, [query, items]);

  const showResults = open && query.trim().length > 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLElement &&
        (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div className={styles.search} ref={boxRef}>
      <form
        className={styles.searchBox}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const hit = matches[active] ?? matches[0];
          if (hit) router.push(hit.href);
          else inputRef.current?.focus();
        }}
      >
        <label htmlFor="gm-search" className="sr-only">
          Search calculators
        </label>
        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="gm-search"
          ref={inputRef}
          type="search"
          value={query}
          autoFocus={autoFocus}
          placeholder="What do you want to work out? e.g. salary, stamp duty"
          autoComplete="off"
          role="combobox"
          aria-controls={listId}
          aria-expanded={showResults}
          aria-autocomplete="list"
          aria-activedescendant={showResults && matches[active] ? `${listId}-${active}` : undefined}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!showResults || !matches.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => (a + 1) % matches.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => (a + matches.length - 1) % matches.length);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        />
        <button type="submit" className={`gm-btn ${styles.searchBtn}`}>
          Search
        </button>

        {showResults && (
          <div className={styles.results}>
            {matches.length ? (
              <ul id={listId} role="listbox" aria-label="Matching calculators">
                {matches.map((m, i) => (
                  <li key={m.href} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                    <Link
                      href={m.href}
                      className={i === active ? styles.resultActive : undefined}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => setOpen(false)}
                    >
                      <span>{m.title}</span>
                      <small>{m.category}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.resultEmpty}>
                No calculator matches &ldquo;{query.trim()}&rdquo;. Try &ldquo;salary&rdquo;, &ldquo;mortgage&rdquo; or{" "}
                <Link href="/calculators">browse all calculators</Link>.
              </p>
            )}
          </div>
        )}
      </form>

      {shortcuts.length > 0 && (
        <div className={styles.chips}>
          <span>Popular:</span>
          {shortcuts.map((s) => (
            <Link key={s.href} href={s.href}>
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
