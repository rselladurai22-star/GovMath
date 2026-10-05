import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/blog/PostCard";
import { HomeMotion } from "@/components/home/Motion";
import styles from "@/components/blog/Blog.module.css";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — UK money rules, explained",
  description:
    "Plain-English guides to UK tax, benefits, property and pensions from the GovMath team. No jargon, no sign-ups.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div id="gm-blog">
      <HomeMotion rootId="gm-blog" />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Guides" },
        ]}
        eyebrow="Guides"
        title="UK money rules, explained"
        lead="Clear, in-depth guides to the UK rules that affect your money — written the way we'd explain them to a friend."
        icon="M4 5a2 2 0 012-2h5v17H6a2 2 0 00-2 2V5zm16 0a2 2 0 00-2-2h-5v17h5a2 2 0 012 2V5z"
      />

      <div className="gm-wrap mt-10">
        <AdSlot size="leaderboard" />
      </div>

      <section className={`gm-wrap ${styles.list}`}>
        <ul className={styles.grid}>
          {posts.map((post, i) => (
            <li key={post.slug} data-reveal style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
