/**
 * Inheritance Tax — UK 2025/26 simplified estimator.
 *
 * Rules modelled:
 *   - Nil-Rate Band (NRB): £325,000 per person.
 *   - Residence Nil-Rate Band (RNRB): up to £175,000 when the main home
 *     passes to direct descendants. Tapers £1 per £2 above £2m estate value.
 *   - Transferable NRB and RNRB: up to 100% from a deceased spouse/CP.
 *   - 40% IHT on the estate above the available allowances.
 *   - Reduced 36% rate if 10%+ of net estate is left to charity — out of scope.
 *
 * NOT modelled: 7-year gift taper, business/agricultural relief, trusts,
 * domicile rules. This is an estimator.
 */

export const IHT_2025_26 = {
  nilRateBand: 325000,
  residenceNilRateBand: 175000,
  rate: 0.4,
  rnrbTaperStart: 2_000_000,
} as const;

export type IHTInput = {
  estateValue: number;
  /** True if the main residence is passing to children/grandchildren etc. */
  passingHomeToDescendants: boolean;
  /**
   * Percentage of unused allowances inherited from a deceased spouse/CP
   * (0–100). 100 doubles both NRB and RNRB.
   */
  spouseTransferPct?: number;
};

export type IHTResult = {
  estateValue: number;
  nilRateBand: number;
  residenceNilRateBand: number;
  totalAllowance: number;
  taxableEstate: number;
  ihtDue: number;
  effectiveRate: number;
};

export function inheritanceTax(input: IHTInput): IHTResult {
  const estate = Math.max(0, input.estateValue);
  const transferPct = Math.min(100, Math.max(0, input.spouseTransferPct ?? 0)) / 100;

  const nrb = IHT_2025_26.nilRateBand * (1 + transferPct);

  let rnrb = 0;
  if (input.passingHomeToDescendants) {
    const baseRnrb = IHT_2025_26.residenceNilRateBand * (1 + transferPct);
    // Taper: lose £1 of RNRB per £2 of estate above £2m.
    if (estate <= IHT_2025_26.rnrbTaperStart) {
      rnrb = baseRnrb;
    } else {
      const taper = (estate - IHT_2025_26.rnrbTaperStart) / 2;
      rnrb = Math.max(0, baseRnrb - taper);
    }
  }

  const totalAllowance = nrb + rnrb;
  const taxable = Math.max(0, estate - totalAllowance);
  const iht = taxable * IHT_2025_26.rate;

  return {
    estateValue: estate,
    nilRateBand: nrb,
    residenceNilRateBand: rnrb,
    totalAllowance,
    taxableEstate: taxable,
    ihtDue: iht,
    effectiveRate: estate > 0 ? iht / estate : 0,
  };
}
