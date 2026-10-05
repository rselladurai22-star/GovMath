"use client";

import { useEffect } from "react";

/**
 * Marks the contents link for the section being read (aria-current), so the
 * table of contents shows where you are, as on long-form bank blog pages.
 * Renders nothing; it only updates the links inside `[data-toc]`.
 */
export default function TocSpy({ ids }: { ids: string[] }) {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const mark = (id: string) =>
      document.querySelectorAll<HTMLAnchorElement>("[data-toc] a").forEach((a) => {
        if (a.getAttribute("href") === `#${id}`) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) mark(seen[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [ids]);
  return null;
}
