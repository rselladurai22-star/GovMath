import { createElement } from "react";
import GmScripts, { type GmScript } from "./GmScripts";

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
export default function GmDocument({ page }: { page: GmPage }) {
  return (
    <>
      {page.css.map((href) => (
        <link key={href} rel="stylesheet" href={`/gm/${href}`} precedence="gm" />
      ))}
      {page.elements.map((el, i) =>
        createElement(el.tag, {
          key: i,
          ...Object.fromEntries(Object.entries(el.attrs).map(([k, v]) => [PROP[k] ?? k, v])),
          dangerouslySetInnerHTML: { __html: el.html },
        }),
      )}
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
  };
}
