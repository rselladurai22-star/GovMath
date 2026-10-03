/**
 * VAT Flat Rate Scheme (FRS) against standard VAT accounting.
 *
 * Source: gov.uk/vat-flat-rate-scheme. Rates unchanged since April 2022.
 *
 *   Standard: VAT charged on sales − VAT reclaimed on costs
 *   Flat rate: flat % × VAT-inclusive turnover (all sales, including
 *              zero-rated and exempt) − VAT on capital goods of £2,000+
 *
 * Limited cost business: relevant goods cost less than 2% of VAT-inclusive
 * turnover, or more than 2% but under £1,000 a year → 16.5%.
 * First year of VAT registration: 1 percentage point off the flat rate.
 */

export type FrsSector = { id: string; label: string; rate: number };

export const FRS_SECTORS: FrsSector[] = [
  { id: "accountancy", label: "Accountancy or book-keeping", rate: 0.145 },
  { id: "advertising", label: "Advertising", rate: 0.11 },
  { id: "agri-services", label: "Agricultural services", rate: 0.11 },
  { id: "other", label: "Any other activity not listed elsewhere", rate: 0.12 },
  { id: "architect", label: "Architect, civil and structural engineer or surveyor", rate: 0.145 },
  { id: "animals", label: "Boarding or care of animals", rate: 0.12 },
  { id: "business-services", label: "Business services not listed elsewhere", rate: 0.12 },
  { id: "catering", label: "Catering services, including restaurants and takeaways", rate: 0.125 },
  { id: "it", label: "Computer and IT consultancy or data processing", rate: 0.145 },
  { id: "computer-repair", label: "Computer repair services", rate: 0.105 },
  { id: "entertainment", label: "Entertainment or journalism", rate: 0.125 },
  { id: "estate-agency", label: "Estate agency or property management", rate: 0.12 },
  { id: "farming", label: "Farming or agriculture not listed elsewhere", rate: 0.065 },
  { id: "film", label: "Film, radio, television or video production", rate: 0.13 },
  { id: "financial", label: "Financial services", rate: 0.135 },
  { id: "forestry", label: "Forestry or fishing", rate: 0.105 },
  { id: "building", label: "General building or construction services", rate: 0.095 },
  { id: "hair", label: "Hairdressing or other beauty treatment", rate: 0.13 },
  { id: "hiring", label: "Hiring or renting goods", rate: 0.095 },
  { id: "hotel", label: "Hotel or accommodation", rate: 0.105 },
  { id: "security", label: "Investigation or security", rate: 0.12 },
  { id: "labour-only", label: "Labour-only building or construction", rate: 0.145 },
  { id: "laundry", label: "Laundry or dry-cleaning", rate: 0.12 },
  { id: "legal", label: "Lawyer or legal services", rate: 0.145 },
  { id: "cultural", label: "Library, archive, museum or other cultural activity", rate: 0.095 },
  { id: "management", label: "Management consultancy", rate: 0.14 },
  { id: "metal", label: "Manufacturing fabricated metal products", rate: 0.105 },
  { id: "food-manufacturing", label: "Manufacturing food", rate: 0.09 },
  { id: "manufacturing", label: "Manufacturing not listed elsewhere", rate: 0.095 },
  { id: "textiles", label: "Manufacturing yarn, textiles or clothing", rate: 0.09 },
  { id: "membership", label: "Membership organisation", rate: 0.08 },
  { id: "mining", label: "Mining or quarrying", rate: 0.1 },
  { id: "packaging", label: "Packaging", rate: 0.09 },
  { id: "photography", label: "Photography", rate: 0.11 },
  { id: "post-office", label: "Post offices", rate: 0.05 },
  { id: "printing", label: "Printing", rate: 0.085 },
  { id: "publishing", label: "Publishing", rate: 0.11 },
  { id: "pubs", label: "Pubs", rate: 0.065 },
  { id: "real-estate", label: "Real estate activity not listed elsewhere", rate: 0.14 },
  { id: "repair-household", label: "Repairing personal or household goods", rate: 0.1 },
  { id: "repair-vehicles", label: "Repairing vehicles", rate: 0.085 },
  { id: "retail-food", label: "Retailing food, confectionery, tobacco, newspapers or children's clothing", rate: 0.04 },
  { id: "retail-pharma", label: "Retailing pharmaceuticals, medical goods, cosmetics or toiletries", rate: 0.08 },
  { id: "retail", label: "Retailing not listed elsewhere", rate: 0.075 },
  { id: "retail-vehicles", label: "Retailing vehicles or fuel", rate: 0.065 },
  { id: "secretarial", label: "Secretarial services", rate: 0.13 },
  { id: "social-work", label: "Social work", rate: 0.11 },
  { id: "sport", label: "Sport or recreation", rate: 0.085 },
  { id: "transport", label: "Transport or storage, including couriers and taxis", rate: 0.1 },
  { id: "travel", label: "Travel agency", rate: 0.105 },
  { id: "vet", label: "Veterinary medicine", rate: 0.11 },
  { id: "wholesale-agri", label: "Wholesaling agricultural products", rate: 0.08 },
  { id: "wholesale-food", label: "Wholesaling food", rate: 0.075 },
  { id: "wholesale", label: "Wholesaling not listed elsewhere", rate: 0.085 },
];

export const FRS = {
  limitedCostRate: 0.165,
  firstYearDiscount: 0.01,
  /** Limited cost test: goods under 2% of VAT-inclusive turnover… */
  lctShare: 0.02,
  /** …or under £1,000 a year. */
  lctFloor: 1000,
  /** Can join if taxable turnover (ex-VAT) next 12 months is £150,000 or less. */
  joinLimit: 150_000,
  /** Must leave once total income including VAT passes £230,000. */
  leaveLimit: 230_000,
  /** A single capital purchase of £2,000+ including VAT can still be reclaimed. */
  capitalMin: 2000,
  standardRate: 0.2,
} as const;

export type FlatRateInput = {
  /** Standard-rated sales a year, before VAT. */
  sales: number;
  /** Zero-rated and exempt sales a year (no VAT charged, but they count in flat-rate turnover). */
  otherSales: number;
  /** Business costs a year that carry 20% VAT, including the VAT. */
  costs: number;
  /** Of those, goods used in the business (for the limited cost test), including VAT. */
  goods: number;
  /** Capital goods of £2,000+ each bought this year, including VAT. */
  capital: number;
  /** Flat rate for your trade, e.g. 0.145. */
  sectorRate: number;
  firstYear: boolean;
};

export type FlatRateResult = {
  /** VAT charged to customers. */
  outputVat: number;
  /** VAT reclaimed on costs under standard accounting. */
  inputVat: number;
  capitalVat: number;
  standardVat: number;
  /** Turnover the flat rate applies to: all sales including VAT. */
  flatTurnover: number;
  limitedCost: boolean;
  /** Goods as a share of flat-rate turnover. */
  goodsShare: number;
  /** The percentage actually used, after the limited cost test and first-year discount. */
  rateUsed: number;
  flatVat: number;
  /** Positive when the flat rate scheme saves money. */
  saving: number;
  better: "flat" | "standard" | "tie";
  /** VAT you keep from customers under the flat rate (taxable profit). */
  flatKeep: number;
  /** Costs including VAT above which standard accounting wins. */
  costsBreakEven: number;
  canJoin: boolean;
  mustLeave: boolean;
};

export function flatRateStudy(i: FlatRateInput): FlatRateResult {
  const sales = Math.max(0, i.sales);
  const other = Math.max(0, i.otherSales);
  const costs = Math.max(0, i.costs);
  const goods = Math.min(costs, Math.max(0, i.goods));
  const capital = Math.max(0, i.capital);
  const outputVat = sales * FRS.standardRate;
  const inputVat = costs / 6;
  const capitalVat = capital >= FRS.capitalMin ? capital / 6 : 0;
  const standardVat = outputVat - inputVat - capitalVat;
  const flatTurnover = sales * (1 + FRS.standardRate) + other;
  const goodsShare = flatTurnover > 0 ? goods / flatTurnover : 0;
  const limitedCost = flatTurnover > 0 && (goods < flatTurnover * FRS.lctShare || goods < FRS.lctFloor);
  const base = limitedCost ? FRS.limitedCostRate : Math.max(0, i.sectorRate);
  const rateUsed = Math.max(0, base - (i.firstYear ? FRS.firstYearDiscount : 0));
  const flatVat = flatTurnover * rateUsed - capitalVat;
  const saving = standardVat - flatVat;
  // standardVat falls £1 for every £6 of costs; solve standardVat = flatVat for costs.
  const costsBreakEven = Math.max(0, (outputVat - flatTurnover * rateUsed) * 6);
  return {
    outputVat,
    inputVat,
    capitalVat,
    standardVat,
    flatTurnover,
    limitedCost,
    goodsShare,
    rateUsed,
    flatVat,
    saving,
    better: Math.abs(saving) < 0.5 ? "tie" : saving > 0 ? "flat" : "standard",
    flatKeep: outputVat - flatTurnover * rateUsed,
    costsBreakEven,
    canJoin: sales + other <= FRS.joinLimit,
    mustLeave: flatTurnover > FRS.leaveLimit,
  };
}
