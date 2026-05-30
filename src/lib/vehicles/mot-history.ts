/**
 * MOT History Checker — info & link helper.
 *
 * The official DVSA MOT history service is at:
 *   https://www.check-mot.service.gov.uk/results?registration=<REG>
 *
 * This module: validates UK number plate format, builds the lookup URL,
 * and provides explainer text for the various MOT statuses you might see.
 */

export type MotInput = { registration: string };

export type MotResult = {
  valid: boolean;
  normalised: string;
  url: string;
};

/** Strip spaces, uppercase, and validate against common UK plate formats. */
export function normaliseReg(raw: string): string {
  return raw.replace(/\s+/g, "").toUpperCase();
}

const PLATE = /^[A-Z]{1,3}[0-9]{1,4}[A-Z]{0,3}$/;

export function checkRegistration(input: MotInput): MotResult {
  const normalised = normaliseReg(input.registration);
  const valid = PLATE.test(normalised);
  return {
    valid,
    normalised,
    url: valid ? `https://www.check-mot.service.gov.uk/results?registration=${encodeURIComponent(normalised)}` : "",
  };
}

export const MOT_STATUSES = [
  { code: "PASS", plain: "MOT passed — vehicle is road-legal until the expiry date shown." },
  { code: "PASS with advisories", plain: "Passed, but the tester noted things to monitor before they become failures." },
  { code: "FAIL — major defect", plain: "Vehicle cannot be driven until the defect is fixed and it&apos;s retested." },
  { code: "FAIL — dangerous defect", plain: "Do not drive away. You can be fined £2,500 and get 3 points." },
  { code: "Refusal to test", plain: "Vehicle couldn&apos;t be tested — usually missing documents or unsafe to drive into the bay." },
];
