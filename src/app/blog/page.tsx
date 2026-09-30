import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import PageHero from "@/components/PageHero";
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
    <>
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

      <section className="gm-wrap py-14">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="card card-interactive group flex h-full flex-col p-6"
              >
                <div className="gm-eyebrow" style={{ fontSize: 12 }}>
                  {post.category}
                </div>
                <h2 className="mt-3 text-[1.6rem] leading-tight text-navy group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted flex-1">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-[#e9eef4] pt-3 text-[13px] text-muted">
                  <span>{post.dateLabel}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
