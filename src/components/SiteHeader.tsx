import Link from "next/link";
import { CATEGORIES } from "@/lib/calculators";

// Top-level nav surfaces the 5 most-trafficked categories; the rest live
// behind "All calculators". Keeps the header from becoming a wall of text.
const PRIMARY_NAV = CATEGORIES.filter((c) =>
  ["tax-and-salary", "property", "business", "investing", "benefits"].includes(
    c.slug
  )
);

export default function SiteHeader() {
  return (
    <header className="bg-surface border-b border-border sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary-dark font-bold text-lg shrink-0"
        >
          <span
            aria-hidden
            className="inline-block w-8 h-8 rounded-md bg-primary text-white grid place-items-center font-extrabold"
          >
            G
          </span>
          <span>
            GovMath<span className="text-primary">.</span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-5 text-sm font-medium"
        >
          {PRIMARY_NAV.map((c) => (
            <Link key={c.slug} href={c.href} className="hover:text-primary">
              {c.title}
            </Link>
          ))}
        </nav>

        <Link
          href="/calculators"
          className="hidden sm:inline-flex items-center rounded-md bg-primary text-white text-sm font-semibold px-4 py-2 hover:bg-primary-dark transition-colors shrink-0"
        >
          All calculators
        </Link>
      </div>
    </header>
  );
}
