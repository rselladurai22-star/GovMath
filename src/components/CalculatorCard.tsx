import Link from "next/link";
import type { Calculator } from "@/lib/calculators";

export default function CalculatorCard({ c }: { c: Calculator }) {
  const comingSoon = c.status === "coming-soon";

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    comingSoon ? (
      <div
        aria-disabled
        className="block h-full rounded-xl bg-surface border border-border p-6 opacity-70 cursor-not-allowed"
      >
        {children}
      </div>
    ) : (
      <Link
        href={c.href}
        className="group block h-full rounded-xl bg-surface border border-border p-6 hover:bg-card-hover hover:border-primary transition-colors"
      >
        {children}
      </Link>
    );

  return (
    <Wrapper>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {c.category}
        </span>
        {comingSoon && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-bg text-text/60 border border-border rounded-full px-2 py-0.5">
            Coming soon
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-primary-dark">{c.title}</h3>
      <p className="text-sm text-text/75 mt-2">{c.blurb}</p>
      {!comingSoon && (
        <span className="inline-block mt-4 text-sm font-semibold text-primary">
          Open calculator →
        </span>
      )}
    </Wrapper>
  );
}
