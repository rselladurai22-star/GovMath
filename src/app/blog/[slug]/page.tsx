import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import { BLOG_POSTS, getAllPosts, getPost } from "@/lib/blog";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "GovMath" },
    publisher: {
      "@type": "Organization",
      name: "GovMath",
      logo: {
        "@type": "ImageObject",
        url: "https://govmath.co.uk/icon.png",
      },
    },
    mainEntityOfPage: `https://govmath.co.uk/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="ink-panel text-white relative overflow-hidden">
        <div className="grid-overlay pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70 mb-5">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/40">/</li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ol>
          </nav>
          <span className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.12]">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-white/70">
            <span>{post.dateLabel}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-8">
        <AdSlot size="leaderboard" />
      </div>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 gm-prose">
        {post.body}
      </article>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 mb-4">
        <AdSlot size="billboard" />
      </div>

      {more.length > 0 && (
        <section className="bg-surface border-t border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
            <h2 className="text-2xl font-extrabold text-primary-dark mb-6">
              More from the blog
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="card card-interactive group flex h-full flex-col p-6"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {p.category}
                    </span>
                    <h3 className="mt-2 font-bold text-primary-dark group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted flex-1">
                      {p.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-primary-dark">
          Ready to run your own numbers?
        </h2>
        <p className="mt-2 text-muted">
          Every GovMath calculator is free, plain-English and updated for
          2025/26.
        </p>
        <Link
          href="/calculators"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-dark text-white px-6 py-3 text-sm font-semibold hover:bg-primary transition-colors"
        >
          Browse all calculators
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </>
  );
}
