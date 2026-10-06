/**
 * Google Analytics 4, off until NEXT_PUBLIC_GA_ID (a measurement ID such as
 * G-ABC123XYZ) is set in Vercel.
 *
 * Consent mode starts with everything denied in the UK, the EEA and
 * Switzerland; Google's consent message (set up in AdSense under Privacy &
 * messaging) updates it when the visitor chooses. Until they agree, GA sends
 * only cookieless pings.
 */
export const GA_ID = /^G-[A-Z0-9]{4,20}$/.test((process.env.NEXT_PUBLIC_GA_ID ?? "").trim())
  ? (process.env.NEXT_PUBLIC_GA_ID ?? "").trim()
  : "";

const CONSENT_REGIONS = [
  "GB", "CH", "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT",
  "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
];

/** Inline script that sets consent defaults and configures GA; runs before gtag.js loads. */
export function gaInitScript(id: string): string {
  const denied = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };
  return (
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}" +
    `gtag('consent','default',${JSON.stringify({ ...denied, region: CONSENT_REGIONS, wait_for_update: 500 })});` +
    `gtag('js',new Date());gtag('config',${JSON.stringify(id)});`
  );
}
