import type { ReactNode } from "react";
import PageHero, { type Crumb } from "@/components/PageHero";

type ContentPageProps = {
  title: string;
  intro?: string;
  breadcrumbs?: Crumb[];
  updated?: string;
  /** Short context line above the title. */
  eyebrow?: string;
  children: ReactNode;
};

const DOC_ICON = "M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zm7 0v5h5M9 13h6M9 17h4";

/**
 * Shared shell for prose pages (About, legal, contact, blog posts):
 * the site hero followed by a readable content column.
 */
export default function ContentPage({
  title,
  intro,
  breadcrumbs = [{ href: "/", label: "Home" }],
  updated,
  eyebrow = "GovMath",
  children,
}: ContentPageProps) {
  return (
    <>
      <PageHero
        breadcrumbs={[...breadcrumbs, { href: "#", label: title }]}
        eyebrow={eyebrow}
        title={title}
        lead={intro}
        icon={DOC_ICON}
        compact
      >
        {updated && (
          <p className="text-sm text-muted">Last updated: {updated}</p>
        )}
      </PageHero>

      <article className="mx-auto max-w-3xl px-6 py-14 gm-prose">
        {children}
      </article>
    </>
  );
}
