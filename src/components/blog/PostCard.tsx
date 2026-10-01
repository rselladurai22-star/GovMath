import Link from "next/link";
import { accentVars, CAT, catFromLabel, LineIcon } from "@/components/category-style";
import type { BlogPost } from "@/lib/blog";
import styles from "./Blog.module.css";

const BOOK = "M4 5a2 2 0 012-2h5v17H6a2 2 0 00-2 2V5zm16 0a2 2 0 00-2-2h-5v17h5a2 2 0 012 2V5z";

/** Guide card with a gradient cover in its topic's colours. */
export default function PostCard({ post }: { post: BlogPost }) {
  const slug = catFromLabel(post.category);
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card} style={slug ? accentVars(slug) : undefined}>
      <span className={styles.cover} aria-hidden="true">
        <span className={styles.coverIcon}>
          <LineIcon path={slug ? CAT[slug].icon : BOOK} size={32} stroke={1.6} />
        </span>
      </span>
      <span className={styles.body}>
        <span className={styles.meta}>
          <span className={styles.tag}>{post.category}</span>
          <span>{post.readingTime}</span>
        </span>
        <span className={styles.title}>{post.title}</span>
        <span className={styles.desc}>{post.description}</span>
        <span className={styles.foot}>
          <span>{post.dateLabel}</span>
          <span className={styles.read}>
            Read guide
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </span>
    </Link>
  );
}
