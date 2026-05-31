import Link from "next/link";
import type { Calculator } from "@/lib/calculators";

export default function CalculatorCard({ c }: { c: Calculator }) {
  const comingSoon = c.status === "coming-soon";

  if (comingSoon) {
    return (
      <div
        aria-disabled
        className="card h-full p-6 opacity-65 cursor-not-allowed"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            {c.category}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-bg text-muted border border-border rounded-full px-2 py-0.5">
            Coming soon
          </span>
        </div>
        <h3 className="text-lg font-bold text-primary-dark">{c.title}</h3>
        <p className="text-sm text-muted mt-2">{c.blurb}</p>
      </div>
    );
  }

  return (
    <Link
      href={c.href}
      className="card card-interactive group relative h-full p-6 flex flex-col overflow-hidden"
    >
      {/* accent sheen on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />

      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
        {c.category}
      </span>
      <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary transition-colors">
        {c.title}
      </h3>
      <p className="text-sm text-muted mt-2 flex-1">{c.blurb}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Open calculator
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
