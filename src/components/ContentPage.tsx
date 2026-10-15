import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import GmShell from "@/gm/GmShell";
import { homeCrumbs, type Crumb } from "@/lib/seo/home-links";

type ContentPageProps = {
  title: string;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  updated?: string;
  /** Extra lines under the intro (e.g. date and reading time). */
  meta?: ReactNode;
  /** Shown after the prose, full width (e.g. more articles). */
  after?: ReactNode;
  children: ReactNode;
};

/**
 * The design's flat breadcrumb: links separated by ›, the last item as text.
 * "Home" goes to the page's own home page, never to "/" (see home-links.ts);
 * on shared pages it is a plain link that CountrySwitch points at the
 * visitor's country.
 */
export function Crumbs({ items }: { items: Crumb[] }) {
  const crumbs = homeCrumbs(items);
  return (
    <div className="crumb">
      {crumbs.map((c, i) =>
        i === crumbs.length - 1 ? (
          <Fragment key={c.href + i}>{c.label}</Fragment>
        ) : (
          <Fragment key={c.href + i}>
            {c.shared ? (
              <a href={c.href} data-home="">
                {c.label}
              </a>
            ) : (
              <Link href={c.href}>{c.label}</Link>
            )}
            <span>›</span>
          </Fragment>
        ),
      )}
    </div>
  );
}

/**
 * Shared frame for prose pages (About, legal, contact, blog articles) in the
 * approved design: its header and footer, a flat breadcrumb, the grey
 * category hero and a readable column of prose.
 */
export default function ContentPage({
  title,
  intro,
  breadcrumbs = [{ href: "/", label: "Home" }],
  updated,
  meta,
  after,
  children,
}: ContentPageProps) {
  return (
    <GmShell>
      <div className="wrap">
        <Crumbs items={[...breadcrumbs, { href: "#", label: title }]} />
        <section className="categoryhero">
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
          {(updated || meta) && (
            <div className="gm-meta">
              {updated && <span>Last updated: {updated}</span>}
              {meta}
            </div>
          )}
        </section>
        <article className="gm-prose section">{children}</article>
        {after}
      </div>
    </GmShell>
  );
}
