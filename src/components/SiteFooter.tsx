import Link from "next/link";
import { CATEGORIES, getLiveCalculators } from "@/lib/calculators";

export default function SiteFooter() {
  const popular = getLiveCalculators().slice(0, 4);
  const topicCols: typeof CATEGORIES[] = [
    CATEGORIES.slice(0, 4),
    CATEGORIES.slice(4),
  ];

  return (
    <footer className="bg-primary-dark text-white mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="font-bold text-lg mb-2">GovMath</div>
          <p className="text-sm text-white/80">
            UK government rules, translated into plain English. Free
            calculators, no jargon.
          </p>
        </div>

        <div>
          <div className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/70">
            Popular calculators
          </div>
          <ul className="space-y-2 text-sm">
            {popular.map((c) => (
              <li key={c.slug}>
                <Link href={c.href} className="hover:underline">
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/calculators" className="hover:underline font-semibold">
                All calculators →
              </Link>
            </li>
          </ul>
        </div>

        {topicCols.map((col, i) => (
          <div key={i}>
            <div className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/70">
              {i === 0 ? "Topics" : "More topics"}
            </div>
            <ul className="space-y-2 text-sm">
              {col.map((cat) => (
                <li key={cat.slug}>
                  <Link href={cat.href} className="hover:underline">
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 text-xs text-white/70 flex flex-col sm:flex-row gap-2 justify-between">
          <span>
            © {new Date().getFullYear()} GovMath. Not affiliated with HMRC or
            HM Government.
          </span>
          <span>Figures based on UK 2025/26 tax year.</span>
        </div>
      </div>
    </footer>
  );
}
