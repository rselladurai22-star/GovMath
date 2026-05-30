/**
 * Driving Licence at 70 — renewal schedule.
 *
 * Source: gov.uk/renew-driving-licence-at-70
 *
 * UK rules:
 *  - Photocard licences expire every 10 years (or earlier) until age 70.
 *  - At 70, you MUST renew — and again every 3 years thereafter.
 *  - Renewal is free, online or by post.
 *  - You must self-declare any medical conditions affecting driving.
 */

export type LicenceInput = {
  dateOfBirth: string; // ISO yyyy-mm-dd
  today?: string;       // override for testing
};

export type LicenceResult = {
  ageYears: number;
  must70Renew: boolean;
  nextRenewalAge: number;
  nextRenewalDate: string;
  yearsUntilNextRenewal: number;
};

function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

export function licenceAt70(input: LicenceInput): LicenceResult {
  const dob = parseDate(input.dateOfBirth);
  const today = input.today ? parseDate(input.today) : new Date();
  let ageYears = today.getUTCFullYear() - dob.getUTCFullYear();
  const beforeBirthday =
    today.getUTCMonth() < dob.getUTCMonth() ||
    (today.getUTCMonth() === dob.getUTCMonth() && today.getUTCDate() < dob.getUTCDate());
  if (beforeBirthday) ageYears -= 1;

  let nextRenewalAge: number;
  if (ageYears < 70) {
    nextRenewalAge = 70;
  } else {
    // age 70, 73, 76, 79, ...
    nextRenewalAge = 70 + Math.ceil((ageYears - 70 + 0.0001) / 3) * 3;
    if (nextRenewalAge <= ageYears) nextRenewalAge += 3;
  }

  const renewalDate = new Date(Date.UTC(dob.getUTCFullYear() + nextRenewalAge, dob.getUTCMonth(), dob.getUTCDate()));
  const yearsUntilNextRenewal = (renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  return {
    ageYears,
    must70Renew: ageYears >= 70,
    nextRenewalAge,
    nextRenewalDate: renewalDate.toISOString().slice(0, 10),
    yearsUntilNextRenewal: Math.max(0, yearsUntilNextRenewal),
  };
}
