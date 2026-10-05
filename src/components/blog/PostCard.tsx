import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

/** Guide card in the design's related-card style. */
export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="gm-card">
      <small>
        {post.category} · {post.readingTime}
      </small>
      <strong>{post.title}</strong>
      <p>{post.description}</p>
      <span className="gm-go">Read guide · {post.dateLabel}</span>
    </Link>
  );
}
