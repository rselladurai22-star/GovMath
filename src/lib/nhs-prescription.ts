/**
 * NHS Prescription Prepayment Certificate (PPC) saver — England.
 *
 * Source: nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/prescription-prepayment-certificates
 *
 * 2026/27 prices (frozen since April 2023):
 *   - Single item:        £9.90
 *   - 3-month PPC:        £32.05  (break-even at 4 items in 3 months)
 *   - 12-month PPC:       £114.50 (break-even at 12 items per year; or 10 monthly direct debits of £11.45)
 *
 * Wales, Scotland & NI have free prescriptions — calculator is England-only.
 */

export const ITEM_COST = 9.90;
export const PPC_3M = 32.05;
export const PPC_12M = 114.5;
export const PPC_12M_DD_MONTHLY = 11.45;

export type PrescriptionInput = {
  itemsPerMonth: number;
};

export type PrescriptionResult = {
  monthlyPayAsYouGo: number;
  annualPayAsYouGo: number;
  ppc3MonthAnnual: number;
  ppc12MonthAnnual: number;
  bestOption: "pay-as-you-go" | "3-month-ppc" | "12-month-ppc";
  annualSaving: number;
};

export function prescriptionSaver(input: PrescriptionInput): PrescriptionResult {
  const items = Math.max(0, input.itemsPerMonth);
  const annualItems = items * 12;
  const annualPayAsYouGo = annualItems * ITEM_COST;
  const ppc3MonthAnnual = PPC_3M * 4;
  const ppc12MonthAnnual = PPC_12M;

  const options = {
    "pay-as-you-go": annualPayAsYouGo,
    "3-month-ppc": ppc3MonthAnnual,
    "12-month-ppc": ppc12MonthAnnual,
  };
  const bestOption = (Object.entries(options).sort((a, b) => a[1] - b[1])[0][0]) as PrescriptionResult["bestOption"];
  const bestCost = options[bestOption];

  return {
    monthlyPayAsYouGo: items * ITEM_COST,
    annualPayAsYouGo,
    ppc3MonthAnnual,
    ppc12MonthAnnual,
    bestOption,
    annualSaving: Math.max(0, annualPayAsYouGo - bestCost),
  };
}
