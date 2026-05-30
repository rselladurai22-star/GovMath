/**
 * UK Probate application fees (2025/26).
 *
 * Source: gov.uk/applying-for-probate
 *  - Estate worth £5,000 or less: £0 application fee
 *  - Estate worth over £5,000:    £300 application fee
 *  - Extra "sealed" copies of the grant: £1.50 each
 *
 * Same fee applies whether you apply yourself (PA1P/PA1A) or via a solicitor.
 */

export const PROBATE_THRESHOLD = 5000;
export const PROBATE_FEE_OVER_THRESHOLD = 300;
export const SEALED_COPY_FEE = 1.5;

export type ProbateInput = {
  estateValue: number;
  /** Extra sealed copies of the grant (for banks, share registrars, etc.). */
  extraCopies: number;
};

export type ProbateResult = {
  estateValue: number;
  applicationFee: number;
  copiesFee: number;
  totalFee: number;
  feeWaived: boolean;
};

export function probateFees(input: ProbateInput): ProbateResult {
  const estate = Math.max(0, input.estateValue);
  const copies = Math.max(0, Math.floor(input.extraCopies));
  const feeWaived = estate <= PROBATE_THRESHOLD;
  const applicationFee = feeWaived ? 0 : PROBATE_FEE_OVER_THRESHOLD;
  const copiesFee = copies * SEALED_COPY_FEE;
  return {
    estateValue: estate,
    applicationFee,
    copiesFee,
    totalFee: applicationFee + copiesFee,
    feeWaived,
  };
}
