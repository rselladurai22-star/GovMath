import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { href: string; label: string };

type ContentPageProps = {
  title: string;
  intro?: string;
  breadcrumbs?: Crumb[];
  updated?: string;
  children: ReactNode;
};

/**
 * Shared shell for prose pages (About, legal, contact, blog posts).
 * Gives a consistent ink-panel hero + readable content column.
 */
export default function ContentPage({
  title,
  intro,
  breadcrumbs = [{ href: "/", label: "Home" }],
  updated,
  children,
}: ContentPageProps) {
  return (
    <>
      <section className="ink-panel text-white relative overflow-hidden">
        <div className="grid-overlay pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70 mb-5">
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden className="text-white/40">/</span>}
                  <Link href={c.href} className="hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
              <li aria-hidden className="text-white/40">/</li>
              <li className="font-semibold text-white">{title}</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1]">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-lg text-white/80 leading-relaxed">{intro}</p>
          )}
          {updated && (
            <p className="mt-4 text-sm text-white/60">Last updated: {updated}</p>
          )}
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 gm-prose">
        {children}
      </article>
    </>
  );
}
