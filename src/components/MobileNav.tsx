"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/calculators";

const SECONDARY = [
  { href: "/calculators", label: "All calculators" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MobileNav() {
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
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        className="inline-grid place-items-center w-10 h-10 rounded-xl border border-border text-primary-dark hover:bg-card-hover transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {/* Overlay */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-primary-dark/40 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed right-0 top-0 z-50 h-dvh w-[86%] max-w-sm bg-surface shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-border">
          <span className="rk-serif text-xl text-primary-dark">
            GovMath<span style={{ color: "#1e5c45" }}>.</span>
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="inline-grid place-items-center w-10 h-10 rounded-xl border border-border text-primary-dark hover:bg-card-hover transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">
            Topics
          </p>
          <ul className="space-y-1">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={c.href}
                  onClick={close}
                  className="block rounded-xl px-3 py-2.5 font-medium text-text hover:bg-card-hover hover:text-primary-dark transition-colors"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>

          <p className="px-3 pt-5 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">
            More
          </p>
          <ul className="space-y-1">
            {SECONDARY.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  onClick={close}
                  className="block rounded-xl px-3 py-2.5 font-medium text-text hover:bg-card-hover hover:text-primary-dark transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            href="/calculators"
            onClick={close}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-primary-dark text-white font-semibold px-4 py-3"
          >
            Browse all calculators
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </aside>
    </div>
  );
}
