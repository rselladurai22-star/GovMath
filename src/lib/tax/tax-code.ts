/**
 * UK PAYE tax-code decoder.
 *
 * Tax code structure (HMRC):
 *  - Letter-only codes:
 *      BR    = all earnings taxed at basic rate (20%)
 *      D0    = all earnings taxed at higher rate (40%)
 *      D1    = all earnings taxed at additional rate (45%)
 *      NT    = no tax deducted
 *      0T    = no personal allowance, normal rates apply (emergency)
 *  - Number + letter codes (e.g. 1257L):
 *      number × 10 + 9 = annual tax-free allowance (£12,579 displayed as £12,570)
 *      L = standard personal allowance
 *      M = received 10% from spouse (Marriage Allowance recipient)
 *      N = transferred 10% to spouse (Marriage Allowance giver)
 *      T = other adjustments — usually high earners with tapered allowance
 *      Y = born before 6 Apr 1938 (legacy)
 *  - K codes (e.g. K500): negative allowance — number × 10 added to taxable pay.
 *  - Suffixes W1 / M1 / X: non-cumulative (emergency), applied to that pay period only.
 *  - Prefix "S" (Scotland) or "C" (Wales) — uses regional rates.
 *
 * 2026/27 standard personal allowance = £12,570 → standard code 1257L.
 */

import { bandTax } from "./emergency-tax";

export const STANDARD_PERSONAL_ALLOWANCE = 12570;

export type TaxCodeAnalysis = {
  raw: string;
  normalised: string;
  valid: boolean;
  /** Scotland / Wales / rest-of-UK. */
  region: "rUK" | "scotland" | "wales";
  /** True for W1/M1/X non-cumulative codes. */
  emergency: boolean;
  /** Annual tax-free personal allowance implied by the code. Negative for K codes. */
  personalAllowance: number;
  /** "standard" / "marriage-receiver" / "marriage-giver" / "br" / "d0" / "d1" / "nt" / "0t" / "k" / "tapered" / "unknown" */
  type:
    | "standard"
    | "marriage-receiver"
    | "marriage-giver"
    | "tapered"
    | "br"
    | "d0"
    | "d1"
    | "nt"
    | "0t"
    | "k"
    | "unknown";
  /** Short plain-English summary. */
  meaning: string;
};

export function decodeTaxCode(input: string): TaxCodeAnalysis {
  const raw = (input ?? "").trim();
  const normalised = raw.toUpperCase().replace(/\s+/g, "");
  let region: "rUK" | "scotland" | "wales" = "rUK";
  let body = normalised;
  if (body.startsWith("S")) { region = "scotland"; body = body.slice(1); }
  else if (body.startsWith("C")) { region = "wales"; body = body.slice(1); }
  let emergency = false;
  if (/(W1|M1|X)$/.test(body)) {
    emergency = true;
    body = body.replace(/(W1|M1|X)$/, "");
  }

  const base = (allowance: number, type: TaxCodeAnalysis["type"], meaning: string): TaxCodeAnalysis => ({
    raw, normalised, valid: true, region, emergency, personalAllowance: allowance, type, meaning,
  });

  if (body === "BR")  return base(0, "br",  "All income at basic rate (20%). Usually your second job.");
  if (body === "D0")  return base(0, "d0",  region === "scotland" ? "All income at the Scottish intermediate rate (21%). Usually a second job." : "All income at higher rate (40%). Usually a second job above the basic-rate band.");
  if (body === "D1")  return base(0, "d1",  region === "scotland" ? "All income at the Scottish higher rate (42%)." : "All income at additional rate (45%).");
  if (body === "D2" && region === "scotland") return base(0, "d1", "All income at the Scottish advanced rate (45%).");
  if (body === "D3" && region === "scotland") return base(0, "d1", "All income at the Scottish top rate (48%).");
  if (body === "NT")  return base(0, "nt",  "No tax deducted at source.");
  if (body === "0T")  return base(0, "0t",  "No personal allowance — normal tax bands apply. Common emergency code.");

  const kMatch = body.match(/^K(\d+)$/);
  if (kMatch) {
    const negAllowance = -Number(kMatch[1]) * 10;
    return base(negAllowance, "k", "Negative allowance — added to your taxable pay each period. Common when you owe HMRC.");
  }

  const numLetter = body.match(/^(\d+)([LMNTY])$/);
  if (numLetter) {
    const allowance = Number(numLetter[1]) * 10;
    switch (numLetter[2]) {
      case "L": return base(allowance, "standard",          `Standard personal allowance: £${allowance.toLocaleString("en-GB")}.`);
      case "M": return base(allowance, "marriage-receiver", `Marriage Allowance recipient — receives 10% of spouse’s allowance. Effective allowance £${allowance.toLocaleString("en-GB")}.`);
      case "N": return base(allowance, "marriage-giver",    `Marriage Allowance giver — transfers 10% to spouse. Reduced allowance £${allowance.toLocaleString("en-GB")}.`);
      case "T": return base(allowance, "tapered",           `Tapered or otherwise adjusted allowance £${allowance.toLocaleString("en-GB")}. Common for incomes over £100,000.`);
      case "Y": return base(allowance, "standard",          `Legacy age-related code, allowance £${allowance.toLocaleString("en-GB")}.`);
    }
  }

  return { raw, normalised, valid: false, region, emergency, personalAllowance: 0, type: "unknown", meaning: "Code not recognised. Check the PAYE coding notice from HMRC." };
}


/** Flat rate for BR and D codes, by region. */
function flatRate(normalised: string, region: TaxCodeAnalysis["region"]): number | null {
  const body = normalised.replace(/^[SC]/, "").replace(/(W1|M1|X)$/, "");
  const scot = region === "scotland";
  if (body === "BR") return 0.2;
  if (body === "D0") return scot ? 0.21 : 0.4;
  if (body === "D1") return scot ? 0.42 : 0.45;
  if (body === "D2" && scot) return 0.45;
  if (body === "D3" && scot) return 0.48;
  return null;
}

/**
 * Income Tax for a full year of pay under a code, applied cumulatively.
 * Uses the code's allowance as given (no £100,000 taper, as PAYE does).
 * K codes are limited so tax never exceeds half of pay.
 */
export function taxUnderCode(pay: number, code: TaxCodeAnalysis): number {
  const p = Math.max(0, pay || 0);
  if (!code.valid) return 0;
  if (code.type === "nt") return 0;
  const flat = flatRate(code.normalised, code.region);
  if (flat !== null) return p * flat;
  const region = code.region === "scotland" ? "scotland" : "ruk";
  const allowance = code.type === "0t" ? 0 : code.personalAllowance;
  const tax = bandTax(p - allowance, 1, region);
  return code.type === "k" ? Math.min(tax, p * 0.5) : tax;
}
