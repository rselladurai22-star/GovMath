"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { formatFigure, parseFigure } from "@/components/flagship/AnimatedText";

/*
 * Motion and polish for every page (October 2026): the header tightens when
 * the page scrolls, content below the first screen eases in, guides get a
 * reading progress bar and a contents list that follows the reader, long
 * pages get a back-to-top button, the home page's counts roll up, and the
 * salary and mortgage pages' figures roll to new values. Everything here is
 * an enhancement: without JavaScript, or with reduced motion, pages look and
 * work as before. Styles live in the "Motion and polish" block of
 * public/gm/govmath-theme.css.
 */

const reduced = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/** Elements that ease in as they scroll into view (only those below the first screen). */
const REVEAL = [
  ".categorytool",
  ".popularcard",
  ".gm-card",
  ".gm-cards > *",
  ".q-relatedCard",
  ".relatedgrid > *",
  ".g-section",
  ".q-faq",
  ".resultcard",
  ".gm-topicabout",
  ".gm-details > .sectionheading",
  ".gm-prose > h2",
  ".gm-prose > table",
  ".gm-embedcode",
  ".fullfaq .q-explainerTitle",
].join(",");

function countUp(el: HTMLElement) {
  const end = Number((el.textContent ?? "").replace(/[^\d]/g, ""));
  if (!end || reduced()) return;
  const t0 = performance.now();
  const span = 900;
  const step = (now: number) => {
    const k = Math.min(1, (now - t0) / span);
    el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** The salary and mortgage pages' scripts write their figures directly; roll them like the React calculators do. */
function watchPackageFigures(): () => void {
  const panel = document.querySelector<HTMLElement>("#salaryForm, #mortgageForm")?.closest(".calculator")?.querySelector<HTMLElement>(".result");
  if (!panel || reduced()) return () => {};
  const last = new WeakMap<Element, string>();
  const leaves = () => panel.querySelectorAll<HTMLElement>("b, strong, .value, [id]");
  leaves().forEach((el) => last.set(el, el.textContent ?? ""));
  let writing = false;
  const anim = new WeakMap<Element, number>();
  const mo = new MutationObserver((records) => {
    if (writing) return;
    const touched = new Set<HTMLElement>();
    for (const r of records) {
      const el = (r.target.nodeType === 3 ? r.target.parentElement : r.target) as HTMLElement | null;
      if (el && el.childNodes.length === 1 && el.firstChild?.nodeType === 3) touched.add(el);
    }
    touched.forEach((el) => {
      const now = el.textContent ?? "";
      const before = last.get(el);
      last.set(el, now);
      if (before === undefined || before === now) return;
      const a = parseFigure(before);
      const b = parseFigure(now);
      if (!a || !b || a.pre !== b.pre || a.post !== b.post) return;
      const row = (el.closest("li, .ind-row, tr, .ax-paymentstrip") as HTMLElement | null) ?? el;
      row.classList.remove("is-changed");
      void row.offsetWidth;
      row.classList.add("is-changed");
      cancelAnimationFrame(anim.get(el) ?? 0);
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 420);
        // The page script may write the figure again mid-roll (a new text node), so write to whichever is current.
        const node = el.firstChild;
        if (!node || node.nodeType !== 3) return;
        writing = true;
        node.nodeValue = k >= 1 ? now : formatFigure(b, a.n + (b.n - a.n) * (1 - Math.pow(1 - k, 3)));
        mo.takeRecords();
        writing = false;
        if (k < 1) anim.set(el, requestAnimationFrame(step));
      };
      anim.set(el, requestAnimationFrame(step));
    });
    leaves().forEach((el) => {
      if (!last.has(el)) last.set(el, el.textContent ?? "");
    });
  });
  mo.observe(panel, { subtree: true, childList: true, characterData: true });
  return () => mo.disconnect();
}

export default function Enhance() {
  const path = usePathname();

  // Once per page load: header state, back-to-top button.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("gm-js");
    const top = document.createElement("button");
    top.type = "button";
    top.className = "gm-totop";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }));
    document.body.appendChild(top);
    // The header sticks to the top: share its height (desktop only) so other
    // sticky parts and in-page links keep clear of it. On phones it slides
    // away while scrolling down and returns on the way up.
    const header = document.querySelector<HTMLElement>(".ax-header");
    const measure = () => {
      const h = header && window.innerWidth > 850 ? header.offsetHeight : 0;
      root.style.setProperty("--gm-headh", `${h}px`);
    };
    const ro = header && "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    if (header && ro) ro.observe(header);
    measure();
    let ticking = false;
    let lastY = window.scrollY;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        root.classList.toggle("gm-scrolled", y > 24);
        top.classList.toggle("is-on", y > 1200);
        if (y > lastY + 6 && y > 220) root.classList.add("gm-headhide");
        else if (y < lastY - 6 || y <= 220) root.classList.remove("gm-headhide");
        lastY = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro?.disconnect();
      top.remove();
    };
  }, []);

  // Per page: reveals, reading progress, contents highlight, counters, package figures.
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const motion = !reduced() && "IntersectionObserver" in window;

    if (motion) {
      const fold = window.innerHeight;
      const items = Array.from(document.querySelectorAll<HTMLElement>(REVEAL)).filter(
        (el) => !el.classList.contains("gm-reveal") && el.getBoundingClientRect().top > fold * 0.92,
      );
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add("gm-in");
            io.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -6% 0px" },
      );
      items.forEach((el) => {
        const sibs = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
        el.style.setProperty("--gm-delay", `${(sibs % 4) * 60}ms`);
        el.classList.add("gm-reveal");
        io.observe(el);
      });
      cleanups.push(() => io.disconnect());

      const counters = document.querySelectorAll<HTMLElement>("[data-countup]");
      if (counters.length) {
        const cio = new IntersectionObserver((entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            countUp(e.target as HTMLElement);
            cio.unobserve(e.target);
          }
        });
        counters.forEach((c) => cio.observe(c));
        cleanups.push(() => cio.disconnect());
      }
    }

    // Reading progress for guides and articles.
    const article = document.querySelector<HTMLElement>(".pg-guide, article.g-article, article.gm-prose, .gm-prose");
    if (article) {
      const bar = document.createElement("div");
      bar.className = "gm-progress";
      bar.setAttribute("aria-hidden", "true");
      document.body.appendChild(bar);
      let raf = 0;
      const update = () => {
        raf = 0;
        const r = article.getBoundingClientRect();
        const total = r.height - window.innerHeight * 0.6;
        const done = Math.min(1, Math.max(0, -r.top / (total > 0 ? total : 1)));
        bar.style.setProperty("--p", String(done));
        bar.classList.toggle("is-on", r.top < window.innerHeight * 0.5 && done < 1);
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        bar.remove();
      });
    }

    // "In this guide": highlight the section being read.
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".guide-nav a[href^='#']"));
    if (links.length && "IntersectionObserver" in window) {
      const byId = new Map(links.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
      const sections = Array.from(byId.keys())
        .map((id) => document.getElementById(id))
        .filter((s): s is HTMLElement => !!s);
      const visible = new Set<string>();
      const spy = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) visible.add(e.target.id);
            else visible.delete(e.target.id);
          }
          const current = sections.find((s) => visible.has(s.id));
          if (!current) return;
          links.forEach((a) => {
            const on = byId.get(current.id) === a;
            a.classList.toggle("is-current", on);
            if (on) a.setAttribute("aria-current", "location");
            else a.removeAttribute("aria-current");
          });
        },
        { rootMargin: "-20% 0px -65% 0px" },
      );
      sections.forEach((s) => spy.observe(s));
      cleanups.push(() => spy.disconnect());
    }

    cleanups.push(watchPackageFigures());
    return () => cleanups.forEach((c) => c());
  }, [path]);

  return null;
}
