import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
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
      <section className="ink-panel text-white relative overflow-hidden">
        <div className="grid-overlay pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70 mb-5">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/40">/</li>
              <li className="font-semibold text-white">Blog</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
            The GovMath blog
          </h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl leading-relaxed">
            Clear, in-depth guides to the UK rules that affect your money —
            written the way we&apos;d explain them to a friend.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8">
        <AdSlot size="leaderboard" />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="card card-interactive group flex h-full flex-col p-6"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  {post.category}
                </div>
                <h2 className="mt-3 text-xl font-bold text-primary-dark group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted flex-1">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted">
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
