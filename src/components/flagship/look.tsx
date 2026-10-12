"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * A page-level design variant for the calculator (owner's trial, October
 * 2026): "indus" draws the calculator as a white card on a full-width maroon
 * band with the page title inside it, a half-circle gauge and coloured
 * result rows. FlagshipPage provides it; Studio reads it.
 */
export type Look = { look: "indus"; title: string; lead: string } | null;

const LookContext = createContext<Look>(null);

export function LookProvider({ value, children }: { value: Look; children: ReactNode }) {
  return <LookContext.Provider value={value}>{children}</LookContext.Provider>;
}

export const useLook = () => useContext(LookContext);
