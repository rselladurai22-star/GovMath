"use client";

import { useEffect } from "react";
import { initHeader } from "@/gm/scripts/header.js";
import { initAxis } from "@/gm/scripts/axis.js";
import { initSalary } from "@/gm/scripts/salary.js";
import { initMortgage } from "@/gm/scripts/mortgage.js";
import { salaryResult, stampDuty } from "./engines";

export type GmScript = "axis" | "salary" | "mortgage";

const RUN: Record<GmScript, () => void> = {
  axis: initAxis,
  salary: () => initSalary(salaryResult as (s: unknown) => unknown),
  mortgage: () => initMortgage(stampDuty as (price: number, buyer: string) => number),
};

/**
 * Runs the supplied design's scripts once, in the same order as the original
 * page: the header menu script, then each page script.
 */
export default function GmScripts({ scripts }: { scripts: GmScript[] }) {
  useEffect(() => {
    const w = window as unknown as { __gmInit?: boolean };
    if (w.__gmInit) return;
    w.__gmInit = true;
    initHeader();
    scripts.forEach((name) => RUN[name]());
  }, [scripts]);
  return null;
}
