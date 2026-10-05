import AdUnit from "@/components/AdUnit";
import { ADSENSE_CLIENT, ADSENSE_SLOT } from "@/lib/ads";

type AdSlotProps = {
  /** Standard IAB sizes; height is reserved to prevent CLS. */
  size?: "leaderboard" | "billboard" | "mpu" | "skyscraper" | "mobile-banner";
  label?: string;
  className?: string;
};

const SIZES: Record<NonNullable<AdSlotProps["size"]>, [number, number]> = {
  leaderboard: [90, 728],
  billboard: [250, 970],
  mpu: [250, 300],
  skyscraper: [600, 160],
  "mobile-banner": [50, 320],
};

/**
 * An in-page ad position. Renders nothing until AdSense is configured with a
 * display ad unit, so visitors and reviewers never see empty boxes.
 */
export default function AdSlot({
  size = "leaderboard",
  label = "Advertisement",
  className = "",
}: AdSlotProps) {
  if (!ADSENSE_CLIENT || !ADSENSE_SLOT) return null;
  return (
    <div
      role="complementary"
      aria-label={label}
      className={`ad-slot ${className}`.trim()}
      style={{ height: SIZES[size][0], maxWidth: SIZES[size][1], width: "100%", margin: "24px auto" }}
    >
      <AdUnit client={ADSENSE_CLIENT} slot={ADSENSE_SLOT} />
    </div>
  );
}
