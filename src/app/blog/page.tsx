import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { Crumbs } from "@/components/ContentPage";
import PostCard from "@/components/blog/PostCard";
import GmShell from "@/gm/GmShell";
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
    <GmShell>
      <div className="wrap">
        <Crumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Guides" },
          ]}
        />
        <section className="categoryhero">
          <p className="eyebrow">{posts.length === 1 ? "1 GUIDE" : `${posts.length} GUIDES`}</p>
          <h1>UK money rules, explained</h1>
          <p>Clear, in-depth guides to the UK rules that affect your money — written the way we&rsquo;d explain them to a friend.</p>
        </section>
        <AdSlot size="leaderboard" />
        <div className="gm-cards gm-postlist">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </GmShell>
  );
}
