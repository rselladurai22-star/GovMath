import Link from "next/link";
import { CATEGORIES } from "@/lib/calculators";
import MobileNav from "@/components/MobileNav";

// Top-level nav surfaces the 5 most-trafficked categories; the rest live
// behind "All calculators". Keeps the header from becoming a wall of text.
const PRIMARY_NAV = CATEGORIES.filter((c) =>
  ["tax-and-salary", "property", "business", "investing", "benefits"].includes(
    c.slug
  )
);

export default function SiteHeader() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-border/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-primary-dark font-bold text-lg shrink-0"
        >
          <span
            aria-hidden
            className="relative inline-grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white font-extrabold shadow-[0_6px_16px_-6px_rgba(79,70,229,0.7)] transition-transform group-hover:scale-105"
          >
            G
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25" />
          </span>
          <span className="tracking-tight">
            GovMath<span className="text-accent">.</span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-1 text-sm font-medium"
        >
          {PRIMARY_NAV.map((c) => (
            <Link
              key={c.slug}
              href={c.href}
              className="relative px-3 py-2 rounded-lg text-text/80 hover:text-primary-dark hover:bg-card-hover transition-colors"
            >
              {c.title}
            </Link>
          ))}
          <Link
            href="/blog"
            className="relative px-3 py-2 rounded-lg text-text/80 hover:text-primary-dark hover:bg-card-hover transition-colors"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/calculators"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 shadow-sm hover:bg-primary transition-colors shrink-0"
          >
            All calculators
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
