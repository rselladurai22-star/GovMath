import Link from "next/link";

/**
 * Govmath brand mark: a blue calculator tile with a plus, minus and equals
 * glyph. Inline SVG so it stays razor-sharp at any size.
 */
export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-grid",
        placeItems: "center",
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.3),
        background: "var(--brand-gradient)",
        boxShadow: "0 8px 18px -8px rgba(87, 70, 245, 0.7), inset 0 1px 0 rgba(255,255,255,0.3)",
        color: "#fff",
      }}
    >
      <svg
        width={Math.round(size * 0.75)}
        height={Math.round(size * 0.75)}
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <path d="M7 10h8M11 6v8M20 10h5M7 22h8M20 20h5M20 24h5" />
      </svg>
    </span>
  );
}

/** Full lockup: tile + "GovMath" wordmark (Math in action blue). */
export function LogoWordmark({
  iconSize = 32,
  tone = "dark",
}: {
  iconSize?: number;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className="inline-flex items-center"
      style={{ gap: Math.round(iconSize * 0.28) }}
    >
      <LogoIcon size={iconSize} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: Math.round(iconSize * 0.62),
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: tone === "light" ? "#fff" : "var(--navy)",
        }}
      >
        Gov<span style={{ color: tone === "light" ? "#9cc4f5" : "var(--blue)" }}>Math</span>
      </span>
    </span>
  );
}

/** Convenience: the wordmark wrapped in a home link, as used in the header. */
export function LogoLink({ iconSize = 32, tone = "dark" }: { iconSize?: number; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="GovMath home"
      className="shrink-0 inline-flex items-center"
    >
      <LogoWordmark iconSize={iconSize} tone={tone} />
    </Link>
  );
}
