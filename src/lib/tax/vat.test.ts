import { describe, expect, it } from "vitest";
import { addVat, removeVat, VAT_RATES } from "./vat";

const round = (n: number) => Math.round(n * 100) / 100;

describe("addVat", () => {
  it("adds 20% standard rate", () => {
    const r = addVat(100, VAT_RATES.standard);
    expect(round(r.vat)).toBe(20);
    expect(round(r.gross)).toBe(120);
  });

  it("adds 5% reduced rate", () => {
    const r = addVat(100, VAT_RATES.reduced);
    expect(round(r.vat)).toBe(5);
    expect(round(r.gross)).toBe(105);
  });

  it("adds 0% zero rate", () => {
    const r = addVat(100, VAT_RATES.zero);
    expect(r.vat).toBe(0);
    expect(r.gross).toBe(100);
  });

  it("clamps negative input to zero", () => {
    expect(addVat(-50, 0.2).gross).toBe(0);
  });
});

describe("removeVat", () => {
  it("extracts 20% VAT from a gross price (£120 → £100 net)", () => {
    const r = removeVat(120, VAT_RATES.standard);
    expect(round(r.net)).toBe(100);
    expect(round(r.vat)).toBe(20);
  });

  it("extracts 5% VAT (£105 → £100 net)", () => {
    const r = removeVat(105, VAT_RATES.reduced);
    expect(round(r.net)).toBe(100);
    expect(round(r.vat)).toBe(5);
  });

  it("is the inverse of addVat", () => {
    const original = 87.42;
    const grossed = addVat(original, 0.2);
    const reversed = removeVat(grossed.gross, 0.2);
    expect(round(reversed.net)).toBe(round(original));
  });

  it("handles zero gracefully", () => {
    expect(removeVat(0, 0.2).net).toBe(0);
  });
});

