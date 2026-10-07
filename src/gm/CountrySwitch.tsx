"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { COUNTRIES, DEFAULT_COUNTRY, countryForPath } from "@/lib/countries";

const KEY = "sa-country";

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage blocked (private mode): the choice simply is not remembered.
  }
}

/** Shows `code` as the selected country in every country menu on the page. */
function show(code: string) {
  const c = COUNTRIES.find((x) => x.code === code) ?? COUNTRIES[0];
  document.querySelectorAll(".gm-country").forEach((menu) => {
    const name = menu.querySelector(".gm-country-name");
    if (name) name.textContent = c.short;
    menu.querySelectorAll("[data-country]").forEach((item) => {
      if (item.getAttribute("data-country") === c.code) item.setAttribute("aria-current", "true");
      else item.removeAttribute("aria-current");
    });
    const note = menu.querySelector(".gm-country-note");
    if (note) note.textContent = c.live ? "Choose your country" : `${c.name}: coming soon. UK and US calculators are live now.`;
  });
  document.documentElement.dataset.country = c.code;
}

/** The visitor's country from Vercel's location header, asked once per browser session. */
async function detected(): Promise<string | null> {
  const cached = (() => {
    try {
      return sessionStorage.getItem("sa-geo");
    } catch {
      return null;
    }
  })();
  if (cached !== null) return cached || null;
  try {
    const r = await fetch("/api/country", { cache: "no-store" });
    const { country } = (await r.json()) as { country: string | null };
    try {
      sessionStorage.setItem("sa-geo", country ?? "");
    } catch {
      // ignore
    }
    return country;
  } catch {
    return null;
  }
}

function close(menu: Element) {
  menu.querySelector(".gm-country-btn")?.setAttribute("aria-expanded", "false");
  const list = menu.querySelector<HTMLElement>(".gm-country-list");
  if (list) list.hidden = true;
}

/**
 * The header's country menu (markup from countryMenuHtml in catalog.ts).
 * Inside a country's section (/uk/…, /us/…) it shows that country. Elsewhere it
 * shows the visitor's own choice if they made one, else the country they
 * are browsing from (when we cover it), else the UK. It never redirects:
 * people, and search engines crawling from abroad, always reach the page
 * they asked for.
 */
export default function CountrySwitch() {
  const path = usePathname();

  useEffect(() => {
    const section = countryForPath(path);
    if (section) {
      show(section);
      return;
    }
    const saved = read(KEY);
    show(saved ?? DEFAULT_COUNTRY);
    if (saved) return;
    let live = true;
    detected().then((code) => {
      if (live && code) show(code);
    });
    return () => {
      live = false;
    };
  }, [path]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const btn = target.closest(".gm-country-btn");
      document.querySelectorAll(".gm-country").forEach((menu) => {
        if (btn && menu.contains(btn)) return;
        if (!menu.contains(target)) close(menu);
      });
      if (btn) {
        const menu = btn.closest(".gm-country")!;
        const list = menu.querySelector<HTMLElement>(".gm-country-list")!;
        const open = list.hidden;
        list.hidden = !open;
        btn.setAttribute("aria-expanded", String(open));
        if (open) menu.querySelector<HTMLElement>("a[data-country], [data-country]")?.focus?.();
        return;
      }
      const choice = target.closest("a[data-country]");
      if (choice) {
        write(KEY, choice.getAttribute("data-country")!);
        close(choice.closest(".gm-country")!);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.querySelectorAll(".gm-country").forEach((menu) => {
        const btn = menu.querySelector<HTMLElement>(".gm-country-btn");
        if (btn?.getAttribute("aria-expanded") === "true") {
          close(menu);
          btn.focus();
        }
      });
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
