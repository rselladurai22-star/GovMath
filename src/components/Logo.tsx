import Link from "next/link";

/**
 * Official Govmath brand mark: royal-to-electric-blue rounded tile with a
 * folded page corner and a white calculator glyph. Inline SVG (from the brand
 * package) so it stays razor-sharp at any size with no extra network request.
 */
export function LogoIcon({ size = 30 }: { size?: number }) {
  // Unique gradient id per size keeps multiple instances on a page valid.
  const gid = `gm-tile-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 192 192"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2D43FF" />
          <stop offset=".56" stopColor="#1748F2" />
          <stop offset="1" stopColor="#0A8CFF" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="176" height="176" rx="42" fill={`url(#${gid})`} />
      <path d="M93 8h49c23 0 42 19 42 42v47L93 8z" fill="#fff" />
      <path d="M96 8c17 25 42 49 88 68v26L96 8z" fill="#163EEB" opacity=".75" />
      <g
        fill="none"
        stroke="#fff"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="40" y="50" width="112" height="102" rx="18" />
        <path d="M96 50v102M40 101h112" />
        <path d="M63 75h22M74 64v22M120 75h20M63 126l20 20M83 126l-20 20M119 130h22M119 144h22" />
      </g>
    </svg>
  );
}

/**
 * Full brand lockup: icon + "Govmath" wordmark. The wordmark is Inter 800 with
 * the brand split — "Gov" in ink navy, "math" in royal blue (per brand spec).
 */
export function LogoWordmark({ iconSize = 30 }: { iconSize?: number }) {
  return (
    <span className="inline-flex items-center" style={{ gap: iconSize * 0.3 }}>
      <LogoIcon size={iconSize} />
      <span
        style={{
          fontWeight: 800,
          letterSpacing: "-0.03em",
          fontSize: iconSize * 0.82,
          lineHeight: 1,
          fontFamily: "var(--font-inter), Inter, Arial, sans-serif",
        }}
      >
        <span style={{ color: "#071B4D" }}>Gov</span>
        <span style={{ color: "#155BFF" }}>math</span>
      </span>
    </span>
  );
}

/** Convenience: the wordmark wrapped in a home link, as used in the header. */
export function LogoLink({ iconSize = 30 }: { iconSize?: number }) {
  return (
    <Link
      href="/"
      aria-label="Govmath home"
      className="shrink-0 inline-flex items-center"
    >
      <LogoWordmark iconSize={iconSize} />
    </Link>
  );
}
