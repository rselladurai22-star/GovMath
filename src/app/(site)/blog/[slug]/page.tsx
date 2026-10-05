import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/blog/PostCard";
import ReadingProgress from "@/components/blog/ReadingProgress";
import { HomeMotion } from "@/components/home/Motion";
import styles from "@/components/blog/Blog.module.css";
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
    <div id="gm-post">
      <HomeMotion rootId="gm-post" />
      <ReadingProgress />
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
        lead={post.description}
        icon="M4 5a2 2 0 012-2h5v17H6a2 2 0 00-2 2V5zm16 0a2 2 0 00-2-2h-5v17h5a2 2 0 012 2V5z"
      >
        <div className={styles.metaRow}>
          <span>{post.dateLabel}</span>
          <span>{post.readingTime}</span>
        </div>
      </PageHero>

      <div className={styles.adRow}>
        <AdSlot size="leaderboard" />
      </div>

      <div className={styles.articleWrap}>
        <article className={`gm-prose ${styles.article}`}>{post.body}</article>
      </div>

      <div className={styles.adRow}>
        <AdSlot size="billboard" />
      </div>

      {more.length > 0 && (
        <section className={styles.more}>
          <div className="gm-wrap">
            <div data-reveal>
              <span className={styles.kicker}>Keep reading</span>
              <h2 className={styles.blockTitle}>More guides</h2>
            </div>
            <ul className={styles.grid}>
              {more.map((p, i) => (
                <li key={p.slug} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

    </div>
  );
}
