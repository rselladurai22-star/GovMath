"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CategorySlug } from "@/lib/calculators";

export type DirectoryTool = { name: string; href: string; popular?: boolean };

export type DirectorySection = {
  id: string;
  slug: CategorySlug;
  title: string;
  tagline: string;
  count: number;
  color: string;
  tint: string;
  edge: string;
  iconPath: string;
  categoryHref: string;
  top: DirectoryTool[];
  tools: DirectoryTool[];
};

type Props = {
  bigSections: DirectorySection[];
  smallSections: DirectorySection[];
  totalCount: number;
  topicCount: number;
};

/** SVG line icon rendered white on the category colour chip. */
function CatIcon({ path, size }: { path: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.9}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

function catVars(s: DirectorySection): React.CSSProperties {
  return {
    // consumed by .rk-card / .rk-tool / .rk-foot hover rules
    ["--cat-color" as string]: s.color,
    ["--cat-tint" as string]: s.tint,
    ["--cat-edge" as string]: s.edge,
  };
}

function matches(tool: DirectoryTool, q: string) {
  return tool.name.toLowerCase().includes(q);
}

export default function HomeDirectory({
  bigSections,
  smallSections,
  totalCount,
  topicCount,
}: Props) {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses the search box (unless already typing in a field).
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
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = query.trim().toLowerCase();

  const { big, small, noResults } = useMemo(() => {
    if (!q) return { big: bigSections, small: smallSections, noResults: false };
    const filt = (s: DirectorySection): DirectorySection => ({
      ...s,
      top: s.top.filter((t) => matches(t, q)),
      tools: s.tools.filter((t) => matches(t, q)),
    });
    const big = bigSections
      .map(filt)
      .filter((s) => s.tools.length > 0 || s.top.length > 0);
    const small = smallSections.map(filt).filter((s) => s.tools.length > 0);
    return { big, small, noResults: big.length === 0 && small.length === 0 };
  }, [q, bigSections, smallSections]);

  return (
    <div className="rk">
      {/* Hero band */}
      <section
        style={{
          borderBottom: "1px solid #e4e9e5",
          background: "linear-gradient(180deg,#f6faf7,#ffffff)",
        }}
      >
        <div
          style={{ maxWidth: 1200 }}
          className="mx-auto flex flex-wrap items-center justify-between gap-10 px-7 pb-9 pt-11"
        >
          <div style={{ maxWidth: 540 }}>
            <div
              className="rk-mono"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1e5c45",
                marginBottom: 14,
              }}
            >
              Free · No sign-up · Checked against HMRC 2025/26
            </div>
            <h1
              className="rk-serif"
              style={{
                margin: 0,
                fontSize: 46,
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: "-0.01em",
              }}
            >
              {totalCount} free UK calculators,
              <br />
              all in <em>plain English</em>.
            </h1>
            <p
              style={{
                margin: "14px 0 0",
                fontSize: 15,
                lineHeight: 1.6,
                color: "#5b645e",
                textWrap: "pretty",
              }}
            >
              Tax, pay, property, benefits — every HMRC and DWP rule computed
              precisely, with the maths shown step by step.
            </p>
            <div style={{ display: "flex", gap: 26, marginTop: 22 }}>
              {[
                { value: `${totalCount}`, label: "Calculators" },
                { value: `${topicCount}`, label: "Topics" },
                { value: "£0", label: "Cost to you" },
              ].map((stat, i) => (
                <div key={stat.label} style={{ display: "flex", gap: 26 }}>
                  {i > 0 && (
                    <div style={{ width: 1, background: "#e4e9e5" }} />
                  )}
                  <div>
                    <div
                      className="rk-serif"
                      style={{ fontSize: 24, color: "#141a16" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#94a09a",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div style={{ flex: 1, minWidth: "min(100%,340px)", maxWidth: 480 }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                document
                  .getElementById("directory")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#fff",
                border: "1px solid #d5ddd7",
                borderRadius: 12,
                padding: "6px 6px 6px 16px",
                boxShadow:
                  "0 1px 2px rgba(15,26,21,0.04),0 8px 24px -16px rgba(15,26,21,0.12)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1e5c45"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
              <label htmlFor="reckon-search" className="sr-only">
                Search calculators
              </label>
              <input
                id="reckon-search"
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a calculator, e.g. stamp duty…"
                style={{
                  flex: 1,
                  border: 0,
                  outline: "none",
                  background: "transparent",
                  fontSize: 14.5,
                  fontFamily: "inherit",
                  color: "#141a16",
                  minWidth: 0,
                }}
              />
              <span
                className="rk-mono"
                aria-hidden="true"
                style={{
                  fontSize: 11,
                  color: "#94a09a",
                  border: "1px solid #e4e9e5",
                  borderRadius: 6,
                  padding: "3px 8px",
                  background: "#fbfcfb",
                }}
              >
                /
              </span>
              <button
                type="submit"
                className="rk-searchbtn"
                style={{
                  background: "#1e5c45",
                  color: "#fff",
                  border: 0,
                  fontFamily: "inherit",
                  fontSize: 13.5,
                  fontWeight: 600,
                  padding: "11px 20px",
                  borderRadius: 9,
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </form>
            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: 10,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 11.5, color: "#94a09a" }}>
                Most used:
              </span>
              {[
                { name: "Take-Home Pay", href: "/tax-and-salary/salary-calculator" },
                { name: "Stamp Duty", href: "/property/stamp-duty-england" },
                { name: "Mortgage", href: "/property/mortgage-repayment" },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rk-chip"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#1e5c45",
                    background: "#eaf4ee",
                    borderRadius: 999,
                    padding: "5px 11px",
                  }}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Directory */}
      <section
        id="directory"
        style={{ maxWidth: 1200 }}
        className="mx-auto px-7 pt-10"
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            marginBottom: 22,
          }}
        >
          <h2
            className="rk-serif"
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Browse the full library
          </h2>
          <div style={{ flex: 1, height: 1, background: "#e4e9e5" }} />
          <span
            className="rk-mono hidden sm:inline"
            style={{ fontSize: 11, color: "#94a09a", whiteSpace: "nowrap" }}
          >
            {totalCount} TOOLS · {topicCount} TOPICS
          </span>
        </div>

        {noResults && (
          <div
            style={{
              border: "1px dashed #d5ddd7",
              borderRadius: 14,
              padding: 40,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <div
              className="rk-serif"
              style={{ fontSize: 22, fontWeight: 600 }}
            >
              No calculator matches “{query.trim()}”
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 13.5, color: "#5b645e" }}>
              Try a simpler word — “salary”, “stamp”, “pension” — or clear the
              search to browse all {totalCount}.
            </p>
          </div>
        )}

        {/* Big category cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,480px),1fr))",
            gap: 20,
          }}
        >
          {big.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="rk-card"
              style={{ ...catVars(s), scrollMarginTop: 80 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "18px 22px",
                  background: s.tint,
                  borderBottom: `1px solid ${s.edge}`,
                }}
              >
                <span
                  style={{
                    display: "inline-grid",
                    placeItems: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: s.color,
                    color: "#fff",
                  }}
                >
                  <CatIcon path={s.iconPath} size={20} />
                </span>
                <div style={{ flex: 1 }}>
                  <h3
                    className="rk-serif"
                    style={{
                      margin: 0,
                      fontSize: 22,
                      fontWeight: 600,
                      color: "#141a16",
                    }}
                  >
                    {s.title}
                  </h3>
                  <div
                    style={{
                      fontSize: 12,
                      color: s.color,
                      fontWeight: 600,
                      marginTop: 1,
                    }}
                  >
                    {s.tagline}
                  </div>
                </div>
                <span
                  className="rk-mono"
                  style={{
                    fontSize: 10.5,
                    color: s.color,
                    background: "#fff",
                    border: `1px solid ${s.edge}`,
                    borderRadius: 999,
                    padding: "4px 10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.count} tools
                </span>
              </div>

              {s.top.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    padding: "16px 22px 4px",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="rk-mono"
                    style={{
                      fontSize: 9.5,
                      letterSpacing: "0.14em",
                      color: "#94a09a",
                    }}
                  >
                    POPULAR
                  </span>
                  {s.top.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="rk-pill"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: "#fff",
                        background: s.color,
                        borderRadius: 999,
                        padding: "7px 14px",
                      }}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              )}

              <div
                style={{
                  padding: "12px 22px 14px",
                  columnCount: 2,
                  columnGap: 32,
                }}
              >
                {s.tools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="rk-tool"
                    style={{
                      display: "block",
                      fontSize: 13.5,
                      lineHeight: 1.4,
                      color: "#39423c",
                      padding: "5px 0",
                      breakInside: "avoid",
                      borderBottom: "1px solid #f2f5f2",
                    }}
                  >
                    {t.name}
                  </Link>
                ))}
              </div>

              <Link
                href={s.categoryHref}
                className="rk-foot"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 22px",
                  borderTop: "1px solid #eef2ee",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: s.color,
                  background: "#fbfcfb",
                }}
              >
                <span>
                  All {s.count} {s.title} tools
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Small category cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          {small.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="rk-card"
              style={{
                ...catVars(s),
                scrollMarginTop: 80,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px 20px",
                  background: s.tint,
                  borderBottom: `1px solid ${s.edge}`,
                }}
              >
                <span
                  style={{
                    display: "inline-grid",
                    placeItems: "center",
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: s.color,
                    color: "#fff",
                  }}
                >
                  <CatIcon path={s.iconPath} size={18} />
                </span>
                <div style={{ flex: 1 }}>
                  <h3
                    className="rk-serif"
                    style={{
                      margin: 0,
                      fontSize: 19,
                      fontWeight: 600,
                      color: "#141a16",
                    }}
                  >
                    {s.title}
                  </h3>
                  <div
                    style={{ fontSize: 11, color: s.color, fontWeight: 600 }}
                  >
                    {s.tagline}
                  </div>
                </div>
                <span
                  className="rk-mono"
                  style={{ fontSize: 10, color: s.color }}
                >
                  {s.count}
                </span>
              </div>

              <div style={{ padding: "12px 20px 14px", flex: 1 }}>
                {s.tools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="rk-tool"
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 8,
                      fontSize: 13.5,
                      lineHeight: 1.4,
                      color: "#39423c",
                      padding: "5px 0",
                      borderBottom: "1px solid #f2f5f2",
                    }}
                  >
                    <span>{t.name}</span>
                    {t.popular && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: "#fff",
                          background: s.color,
                          borderRadius: 4,
                          padding: "2.5px 7px",
                          flex: "none",
                        }}
                      >
                        TOP
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <Link
                href={s.categoryHref}
                className="rk-foot"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 20px",
                  borderTop: "1px solid #eef2ee",
                  fontSize: 12,
                  fontWeight: 600,
                  color: s.color,
                  background: "#fbfcfb",
                }}
              >
                <span>All {s.count} tools</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
