import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import PageHero from "@/components/PageHero";
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

      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Guides" },
          { href: `/blog/${post.slug}`, label: post.title },
        ]}
        eyebrow={post.category}
        title={post.title}
        icon="M4 5a2 2 0 012-2h5v17H6a2 2 0 00-2 2V5zm16 0a2 2 0 00-2-2h-5v17h5a2 2 0 012 2V5z"
      >
        <div className="flex items-center gap-3 text-sm text-muted">
          <span>{post.dateLabel}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
      </PageHero>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-8">
        <AdSlot size="leaderboard" />
      </div>

      <article className="mx-auto max-w-3xl px-6 py-14 gm-prose">
        {post.body}
      </article>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 mb-4">
        <AdSlot size="billboard" />
      </div>

      {more.length > 0 && (
        <section className="bg-ice py-16">
          <div className="gm-wrap">
            <span className="gm-eyebrow">Keep reading</span>
            <h2 className="gm-section-title mt-2 mb-8">More guides</h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="card card-interactive group flex h-full flex-col p-6"
                  >
                    <span className="gm-eyebrow" style={{ fontSize: 12 }}>
                      {p.category}
                    </span>
                    <h3 className="mt-2 text-[1.15rem] font-bold leading-snug text-navy group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted flex-1">
                      {p.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="gm-wrap flex flex-wrap items-center justify-between gap-6 py-16">
        <div>
          <span className="gm-eyebrow">Run the numbers</span>
          <h2 className="mt-2 text-[clamp(2.2rem,3.6vw,2.7rem)]">Ready to run your own numbers?</h2>
          <p className="gm-section-lead">
            Every GovMath calculator is free, plain-English and updated for 2025/26.
          </p>
        </div>
        <Link href="/calculators" className="gm-btn">
          Browse all calculators
        </Link>
      </section>
    </>
  );
}
