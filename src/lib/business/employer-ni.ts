/**
 * UK Employer's National Insurance (Class 1 Secondary).
 *
 * From 6 April 2025:
 *  - Secondary threshold lowered to £5,000/year (was £9,100)
 *  - Rate raised to 15% (was 13.8%)
 *  - Employment Allowance increased to £10,500 (most employers eligible)
 *
 * This calculator returns the headline gross employer NI bill.
 * Employment Allowance is a separate annual offset, applied at payroll year-end.
 */

export const EMPLOYER_NI_THRESHOLD_2025 = 5_000;
export const EMPLOYER_NI_RATE_2025 = 0.15;
export const EMPLOYMENT_ALLOWANCE_2025 = 10_500;

export type EmployerNIInput = {
  /** Annual salary paid to this employee. */
  annualSalary: number;
  /** Whether the business is eligible for Employment Allowance. */
  employmentAllowance?: boolean;
};

export type EmployerNIResult = {
  niableEarnings: number;
  grossEmployerNI: number;
  /** True cost of the employee = salary + NI (allowance is a business-wide offset). */
  totalEmploymentCost: number;
  employmentAllowance: number;
};

export function employerNI(input: EmployerNIInput): EmployerNIResult {
  const niableEarnings = Math.max(0, input.annualSalary - EMPLOYER_NI_THRESHOLD_2025);
  const grossEmployerNI = niableEarnings * EMPLOYER_NI_RATE_2025;
  const allowance = input.employmentAllowance ? Math.min(EMPLOYMENT_ALLOWANCE_2025, grossEmployerNI) : 0;
  const totalEmploymentCost = input.annualSalary + grossEmployerNI - allowance;
  return {
    niableEarnings,
    grossEmployerNI,
    totalEmploymentCost,
    employmentAllowance: allowance,
  };
}
