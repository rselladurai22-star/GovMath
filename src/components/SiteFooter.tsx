import Link from "next/link";
import { CATEGORIES, getLiveCalculators } from "@/lib/calculators";

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function SiteFooter() {
  const popular = getLiveCalculators().slice(0, 5);

  return (
    <footer className="ink-panel text-white mt-20 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              aria-hidden
              className="inline-grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent text-white font-extrabold text-sm"
            >
              G
            </span>
            <span className="font-bold text-lg tracking-tight">
              GovMath<span className="text-accent">.</span>
            </span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-xs">
            UK government rules, translated into plain English. Free
            calculators, no jargon, no sign-ups — updated for the 2025/26 tax
            year.
          </p>
        </div>

        <div>
          <div className="font-semibold mb-3 text-xs uppercase tracking-wider text-white/50">
            Topics
          </div>
          <ul className="space-y-2.5 text-sm">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={cat.href}
                  className="text-white/75 hover:text-white transition-colors"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3 text-xs uppercase tracking-wider text-white/50">
            Popular calculators
          </div>
          <ul className="space-y-2.5 text-sm">
            {popular.map((c) => (
              <li key={c.slug}>
                <Link
                  href={c.href}
                  className="text-white/75 hover:text-white transition-colors"
                >
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/calculators"
                className="font-semibold text-accent hover:text-white transition-colors"
              >
                All calculators →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3 text-xs uppercase tracking-wider text-white/50">
            Company
          </div>
          <ul className="space-y-2.5 text-sm">
            {COMPANY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/75 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 text-xs text-white/55 flex flex-col sm:flex-row gap-2 justify-between">
          <span>
            © {new Date().getFullYear()} GovMath. Not affiliated with HMRC or
            HM Government.
          </span>
          <span>Figures based on the UK 2025/26 tax year.</span>
        </div>
      </div>
    </footer>
  );
}
