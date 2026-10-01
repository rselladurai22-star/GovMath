import type { ReactNode } from "react";
import PageHero, { type Crumb } from "@/components/PageHero";
import { HomeMotion } from "@/components/home/Motion";
import styles from "@/components/blog/Blog.module.css";

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
 * Shared shell for prose pages (About, legal, contact): the site hero, a
 * premium reading card.
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
    <div id="gm-content">
      <HomeMotion rootId="gm-content" />
      <PageHero
        breadcrumbs={[...breadcrumbs, { href: "#", label: title }]}
        eyebrow={eyebrow}
        title={title}
        lead={intro}
        icon={DOC_ICON}
        compact
      >
        {updated && (
          <div className={styles.metaRow}>
            <span>Last updated: {updated}</span>
          </div>
        )}
      </PageHero>

      <div className={`${styles.articleWrap} ${styles.articleLast}`}>
        <article className={`gm-prose ${styles.article}`}>{children}</article>
      </div>

    </div>
  );
}
