"use client";

import { Analytics } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics with each page address reported without its query
 * string: a shared results link carries the figures someone entered
 * (?salary=…), and those stay out of our analytics, as with Google Analytics
 * (src/lib/analytics.ts).
 */
export default function VercelAnalytics() {
  return <Analytics beforeSend={(event) => ({ ...event, url: event.url.split("?")[0] })} />;
}
