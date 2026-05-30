/**
 * Right to Rent — document checker for landlords/agents (England).
 *
 * Source: gov.uk/landlord-immigration-check
 *
 * Landlords in England must verify every adult tenant has the right to live in
 * the UK before granting a tenancy. Failure = civil penalty up to £20,000 per
 * tenant (or criminal liability if &quot;knowing&quot;).
 *
 * Two document lists:
 *  - List A: time-unlimited right (UK/Irish citizen, ILR holders, etc.)
 *  - List B: time-limited right (visa holders, frontier workers) — must recheck.
 *
 * Since 2022, online share-code checks via gov.uk/view-right-to-rent are the
 * default for non-UK/Irish citizens; physical docs only for UK/Irish.
 */

export type RightToRentInput = {
  nationality: "uk" | "irish" | "other-eu" | "non-eu";
  ilrOrSettled: boolean;
  visaExpiry?: string; // ISO date
  today?: string;
};

export type RightToRentResult = {
  list: "A" | "B" | "online-share-code";
  recheckRequired: boolean;
  recheckDate?: string;
  guidance: string;
};

function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

export function rightToRent(input: RightToRentInput): RightToRentResult {
  if (input.nationality === "uk" || input.nationality === "irish") {
    return {
      list: "A",
      recheckRequired: false,
      guidance: "Check original passport or birth certificate + secondary ID. Keep copies for 12 months after tenancy ends.",
    };
  }

  if (input.ilrOrSettled) {
    return {
      list: "online-share-code",
      recheckRequired: false,
      guidance: "Use gov.uk/view-right-to-rent with the share code. Settled/ILR = no recheck needed.",
    };
  }

  const today = input.today ? parseDate(input.today) : new Date();
  const expiry = input.visaExpiry ? parseDate(input.visaExpiry) : null;
  const recheckDate = expiry ? expiry.toISOString().slice(0, 10) : undefined;
  const recheckRequired = !!expiry && expiry.getTime() > today.getTime();

  return {
    list: "online-share-code",
    recheckRequired,
    recheckDate,
    guidance: "Use gov.uk/view-right-to-rent with the share code. Recheck on the date the visa expires — or 12 months from initial check, whichever is sooner.",
  };
}
