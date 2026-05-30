/**
 * P45 & P60 field decoder.
 *
 * Tiny rule-based explainer: given a field code or label, return the
 * plain-English description, where to find it, and common confusion.
 */

export type DocType = "P45" | "P60";

export type FieldExplain = {
  doc: DocType;
  field: string;
  plain: string;
  why: string;
  watchFor: string;
};

const FIELDS: FieldExplain[] = [
  { doc: "P45", field: "Total pay to date", plain: "All taxable pay from this employer in the tax year up to your leave date.", why: "Your next employer adds this to your earnings with them to keep cumulative tax right.", watchFor: "Excludes statutory maternity/sick pay reimbursed by HMRC." },
  { doc: "P45", field: "Total tax to date", plain: "Income tax deducted by this employer this tax year.", why: "Carried forward so your new employer doesn’t over-tax you.", watchFor: "If blank, you were on a Week 1/Month 1 code — flag this to your new payroll." },
  { doc: "P45", field: "Tax code at leaving", plain: "The PAYE code used on your final pay.", why: "Starting code for the new employer until HMRC sends an update.", watchFor: "BR or 0T codes usually mean second-job tax — talk to HMRC if it’s your only job." },
  { doc: "P45", field: "Week/month number", plain: "Pay period number when you left (1–52 weekly or 1–12 monthly).", why: "Tells new payroll where in the year to pick up cumulative calculations.", watchFor: "Off-by-one errors at year boundaries — Apr 5 is the cutoff." },
  { doc: "P60", field: "Pay in this employment", plain: "Gross taxable pay from this job for the whole tax year.", why: "Used for self-assessment, mortgage applications, benefits claims.", watchFor: "Doesn’t include benefits in kind — those are on the P11D." },
  { doc: "P60", field: "Tax deducted", plain: "Total income tax taken via PAYE this year.", why: "Cross-check against your tax code; reclaim overpayments via HMRC.", watchFor: "Doesn’t include student loan or NI — those are separate lines." },
  { doc: "P60", field: "National Insurance contributions", plain: "Class 1 NI paid this tax year.", why: "Builds your qualifying years for State Pension.", watchFor: "Check this matches your NI record at gov.uk/check-state-pension." },
  { doc: "P60", field: "Statutory payments", plain: "SMP, SSP, SAP, SPP and ShPP you received via payroll.", why: "Counted as taxable pay; needed for benefits applications.", watchFor: "If you had any of these, check the figure matches your payslips." },
];

export function listFields(doc?: DocType): FieldExplain[] {
  return doc ? FIELDS.filter((f) => f.doc === doc) : FIELDS;
}

export function findField(query: string): FieldExplain | undefined {
  const q = query.trim().toLowerCase();
  return FIELDS.find((f) => f.field.toLowerCase().includes(q));
}
