import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CALCULATORS } from "@/lib/calculators";
import { EMBEDS, SITE_URL } from "@/lib/embeds";
import type { Query } from "@/components/flagship/useStudio";
import { STUDIOS } from "../studios";
import EmbedHeight from "../EmbedHeight";

type Params = { path: string[] };
type Href = (typeof EMBEDS)[number];

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return EMBEDS.map((href) => ({ path: href.slice(1).split("/") }));
}

const titleOf = (href: string) => CALCULATORS.find((c) => c.href === href)?.title ?? "Calculator";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const href = "/" + (await params).path.join("/");
  // Not for search results: the canonical page is the full calculator with its guide.
  return { title: titleOf(href), alternates: { canonical: href }, robots: { index: false, follow: true } };
}

/** One calculator on its own, for other sites to show in an iframe. */
export default async function EmbedPage({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<Query> }) {
  const href = ("/" + (await params).path.join("/")) as Href;
  const query = await searchParams;
  const Studio = STUDIOS[href];
  if (!Studio) notFound();
  const full = `${SITE_URL}${href}`;
  return (
    <div className="gm-embed">
      <div className="gm-embedbar">
        <a href={full} target="_blank" rel="noopener" aria-label="SumAtlas: open the full calculator">
          {/* eslint-disable-next-line @next/next/no-img-element -- the site serves its own pre-sized logo files */}
          <img src="/gm/sumatlas-logo-84.webp" alt="SumAtlas" width={94} height={28} />
        </a>
        <a href={full} target="_blank" rel="noopener" className="gm-embedfull">
          Full calculator and guide
        </a>
      </div>
      <Studio query={query} />
      <p className="gm-embedfoot">
        Free {titleOf(href).replace(/ Calculator$/, " calculator")} by{" "}
        <a href={full} target="_blank" rel="noopener">
          SumAtlas
        </a>
        . Estimates only, not financial advice.
      </p>
      <EmbedHeight />
    </div>
  );
}
