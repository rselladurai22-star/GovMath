import type { Metadata } from "next";
import Link from "next/link";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";

export const metadata: Metadata = { title: "Page not found" };

const CATS = cats as { slug: string; label: string }[];

export default function NotFound() {
  return (
    <GmShell>
      <div className="wrap">
        <section className="categoryhero gm-notfound">
          <h1>We can&rsquo;t find that page</h1>
          <p>The link may be out of date, or the page may have moved. Search for a calculator from the top of the page, or pick a topic below.</p>
        </section>
        <nav className="categoryjump" aria-label="Topics">
          {CATS.map((c) => (
            <Link key={c.slug} href={`/uk/${c.slug}`}>
              {c.label.replace(/&amp;/g, "&")}
            </Link>
          ))}
        </nav>
        <div className="gm-actions">
          <Link href="/" className="button">
            Back to the homepage
          </Link>
          <Link href="/calculators" className="textbutton">
            Browse all calculators
          </Link>
        </div>
      </div>
    </GmShell>
  );
}
