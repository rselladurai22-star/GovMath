"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/*
 * Quick search (October 2026): Ctrl+K, ⌘K or the key hint in the header
 * search box opens a search over every calculator, with arrow-key
 * navigation and the visitor's recently opened calculators (kept only in
 * this browser's localStorage, key sa-recent). Reads the same catalogue as
 * the header search (/gm/catalog.json).
 */

type Tool = { url: string; title: string; desc: string; group: string };
type Group = { title: string; tools: { url: string; title: string; desc: string }[] };

const RECENT_KEY = "sa-recent";

function readRecent(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, 6) : [];
  } catch {
    return [];
  }
}

function score(t: Tool, words: string[]): number {
  const title = t.title.toLowerCase();
  const all = `${title} ${t.desc.toLowerCase()} ${t.group.toLowerCase()}`;
  let s = 0;
  for (const w of words) {
    if (!all.includes(w)) return 0;
    s += title.startsWith(w) ? 6 : title.includes(w) ? 3 : 1;
  }
  return s;
}

export default function CommandPalette() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [tools, setTools] = useState<Tool[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<Element | null>(null);

  const load = useCallback(async () => {
    if (tools.length) return;
    try {
      const groups: Group[] = await (await fetch("/gm/catalog.json")).json();
      setTools(groups.flatMap((g) => g.tools.map((t) => ({ ...t, group: g.title.replace(/&amp;/g, "&") }))));
    } catch {
      /* the header search still works */
    }
  }, [tools.length]);

  const show = useCallback(() => {
    opener.current = document.activeElement;
    setRecent(readRecent());
    setQ("");
    setSel(0);
    setOpen(true);
    void load();
  }, [load]);

  // Remember calculators the visitor opens (most recent first).
  useEffect(() => {
    if (!/^\/(uk|us|everyday)\/.+/.test(path)) return;
    try {
      const next = [path, ...readRecent().filter((p) => p !== path)].slice(0, 6);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* private mode */
    }
  }, [path]);

  // Shortcut and the header hint.
  useEffect(() => {
    const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    const box = document.querySelector(".gm-headsearch");
    let hint: HTMLButtonElement | null = null;
    if (box && !box.querySelector(".gm-kbd")) {
      hint = document.createElement("button");
      hint.type = "button";
      hint.className = "gm-kbd";
      hint.textContent = mac ? "⌘K" : "Ctrl K";
      hint.setAttribute("aria-label", "Open quick search");
      hint.addEventListener("click", show);
      box.appendChild(hint);
    }
    // The hint takes room in the box, so the placeholder gets shorter.
    const field = box?.querySelector<HTMLInputElement>("input");
    const placeholder = field?.placeholder;
    if (field && hint) field.placeholder = "Search…";
    return () => {
      window.removeEventListener("keydown", onKey);
      hint?.remove();
      if (field && placeholder !== undefined) field.placeholder = placeholder;
    };
  }, [show]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => input.current?.focus());
    document.documentElement.classList.add("gm-noscroll");
    return () => document.documentElement.classList.remove("gm-noscroll");
  }, [open]);

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) {
      const byUrl = new Map(tools.map((t) => [t.url, t]));
      return recent.map((u) => byUrl.get(u)).filter((t): t is Tool => !!t);
    }
    return tools
      .map((t) => ({ t, s: score(t, words) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || a.t.title.localeCompare(b.t.title))
      .slice(0, 8)
      .map((x) => x.t);
  }, [q, tools, recent]);

  const close = () => {
    setOpen(false);
    (opener.current as HTMLElement | null)?.focus?.();
  };
  const go = (t: Tool | undefined) => {
    if (t) window.location.href = t.url;
  };

  if (!open) return null;
  return (
    <div className="gm-palette" role="dialog" aria-modal="true" aria-label="Quick search" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="gm-palette-box">
        <div className="gm-palette-input">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={input}
            value={q}
            placeholder={`Search ${tools.length || "all the"} calculators: try ‘stamp duty’ or ‘paycheck’`}
            aria-label="Search calculators"
            aria-controls="gm-palette-list"
            aria-activedescendant={results[sel] ? `gm-pal-${sel}` : undefined}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
              else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(s + 1, Math.max(results.length - 1, 0)));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(s - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                go(results[sel]);
              }
            }}
          />
          <kbd>Esc</kbd>
        </div>
        <p className="gm-palette-head">{q.trim() ? (results.length ? "Calculators" : "No calculator matches that yet") : results.length ? "Recently opened" : "Start typing to search every calculator"}</p>
        <ul id="gm-palette-list" role="listbox">
          {results.map((t, i) => (
            <li key={t.url} id={`gm-pal-${i}`} role="option" aria-selected={i === sel} className={i === sel ? "is-sel" : undefined} onMouseEnter={() => setSel(i)} onClick={() => go(t)}>
              <strong>{t.title}</strong>
              <span>{t.desc}</span>
              <em>{t.group}</em>
            </li>
          ))}
        </ul>
        <p className="gm-palette-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> to move
          </span>
          <span>
            <kbd>Enter</kbd> to open
          </span>
        </p>
      </div>
    </div>
  );
}
