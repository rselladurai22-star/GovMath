import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import ContentPage from "@/components/ContentPage";
import PostCard from "@/components/blog/PostCard";
import { ORG_ID, SITE } from "@/gm/schema";
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
    title: post.seoTitle ?? post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      siteName: "GovMath",
      locale: "en_GB",
      images: [{ url: `/og/blog/${post.slug}`, width: 1200, height: 630 }],
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
    author: { "@type": "Organization", "@id": ORG_ID, name: "GovMath", url: SITE },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `https://govmath.co.uk/blog/${post.slug}`,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE}/blog/${post.slug}` },
    ],
  };

  return (
    <ContentPage
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/blog", label: "Guides" },
      ]}
      title={post.title}
      intro={post.description}
      meta={
        <>
          <span>{post.dateLabel}</span>
          <span>{post.readingTime}</span>
        </>
      }
      after={
        <>
          <AdSlot size="billboard" />
          {more.length > 0 && (
            <section className="section">
              <p className="eyebrow">KEEP READING</p>
              <h2>More guides</h2>
              <div className="gm-cards">
                {more.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          )}
        </>
      }
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]) }} />
      <AdSlot size="leaderboard" />
      {post.body}
    </ContentPage>
  );
}
