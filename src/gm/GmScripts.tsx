"use client";

import { useEffect } from "react";
import { initHeader } from "@/gm/scripts/header.js";
import { initAxis } from "@/gm/scripts/axis.js";
import { initSalary } from "@/gm/scripts/salary.js";
import { initMortgage } from "@/gm/scripts/mortgage.js";
import { salaryResult, stampDuty } from "./engines";
import CountrySwitch from "./CountrySwitch";
import { initPackageDonut } from "./packageDonut";

export type GmScript = "axis" | "salary" | "mortgage";

const RUN: Record<GmScript, () => void> = {
  axis: initAxis,
  salary: () => initSalary(salaryResult as (s: unknown) => unknown),
  mortgage: () => initMortgage(stampDuty as (price: number, buyer: string) => number),
};

/**
 * Runs the supplied design's scripts in the same order as the original page:
 * the header menu script, then each page script. Also mounts the header's
 * country menu.
 *
 * They run once per rendered page, not once per browser load: after a
 * client-side navigation (next/link) the new page brings a new header and
 * body with no handlers, so its menus, and the salary and mortgage
 * calculators, did nothing until a full reload (fixed 15 October 2026). The
 * page's own nav carries the mark, so a page is never set up twice.
 */
export default function GmScripts({ scripts }: { scripts: GmScript[] }) {
  useEffect(() => {
    const nav = document.getElementById("ax-navigation");
    if (!nav || nav.dataset.gmInit) return;
    nav.dataset.gmInit = "1";
    initHeader();
    scripts.forEach((name) => RUN[name]());
    initPackageDonut();
  }, [scripts]);
  return <CountrySwitch />;
}
