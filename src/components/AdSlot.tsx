type AdSlotProps = {
  /** Standard IAB sizes; height is reserved to prevent CLS. */
  size?: "leaderboard" | "billboard" | "mpu" | "skyscraper" | "mobile-banner";
  label?: string;
  className?: string;
};

const SIZE_STYLES: Record<NonNullable<AdSlotProps["size"]>, string> = {
  leaderboard: "h-[90px] max-w-[728px]",
  billboard: "h-[250px] max-w-[970px]",
  mpu: "h-[250px] max-w-[300px]",
  skyscraper: "h-[600px] max-w-[160px]",
  "mobile-banner": "h-[50px] max-w-[320px]",
};

export default function AdSlot({
  size = "leaderboard",
  label = "Advertisement",
  className = "",
}: AdSlotProps) {
  return (
    <div
      role="complementary"
      aria-label={label}
      className={`ad-slot mx-auto w-full ${SIZE_STYLES[size]} ${className}`}
    >
      {label}
    </div>
  );
}
