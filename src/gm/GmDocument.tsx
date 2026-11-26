import { createElement } from "react";
import { THEME_AFTER, THEME_BEFORE } from "./GmShell";
import GmScripts, { type GmScript } from "./GmScripts";
import { categoryGridHtml, categoryLabel, footerHtml, headerHtml, topicMainHtml } from "./catalog";
import { topicJsonLd } from "./schema";
import { ogFor } from "./og";
import type { CategorySlug } from "@/lib/calculators";

export type GmPage = {
  title: string;
  description: string;
  css: string[];
  scripts: string[];
  elements: { tag: string; attrs: Record<string, string>; html: string }[];
};

const PROP: Record<string, string> = { class: "className", for: "htmlFor", tabindex: "tabIndex" };

/**
 * Renders one page of the supplied design exactly as delivered: its
 * stylesheets in their original order, then each top-level body element with
 * its original tag, attributes and markup, then its scripts.
 */
export default function GmDocument({
  page,
  topic,
}: {
  page: GmPage;
  topic?: CategorySlug;
}) {
  // Calculator lists are built from the live catalogue (see catalog.ts).
  const fill = (html: string) =>
    html.replace("<!--GM:CATEGORYGRID-->", () => categoryGridHtml()).replace("<!--GM:TOPIC-->", () => (topic ? topicMainHtml(topic) : ""))
      // The breadcrumb's Home is the UK home page, never "/" (see src/lib/seo/home-links.ts).
      .replace('<div class="crumb"><a href="/">', '<div class="crumb"><a href="/uk">');
  // Topic pages list their calculators.
  const jsonLd = topic ? topicJsonLd(topic, categoryLabel(topic)) : null;
  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      {[...page.css, ...THEME_BEFORE, ...THEME_AFTER].map((href) => (
        <link key={href} rel="stylesheet" href={`/gm/${href}?v=${process.env.GM_CSS_VERSION}`} precedence="gm" />
      ))}
      <div className="gm-claret">
        {page.elements.map((el, i) => {
          const attrs = Object.fromEntries(Object.entries(el.attrs).map(([k, v]) => [PROP[k] ?? k, v]));
          // The site theme wraps the main content (see GmShell).
          if (el.tag === "main") attrs.className = [attrs.className, "gm-neutral"].filter(Boolean).join(" ");
          return createElement(el.tag, { key: i, ...attrs, dangerouslySetInnerHTML: { __html: el.tag === "header" ? headerHtml(el.html, "uk") : el.tag === "footer" ? footerHtml(fill(el.html), "uk") : fill(el.html) } });
        })}
      </div>
      <GmScripts scripts={page.scripts as GmScript[]} />
    </>
  );
}

/** Page metadata from the supplied page's title and description. */
export function gmMetadata(page: GmPage, path: string) {
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: path },
    openGraph: ogFor(path),
  };
}
