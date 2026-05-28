import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GovMath — UK calculators in plain English";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #0a2540 0%, #1e3a8a 100%)",
          padding: "80px",
          color: "white",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.7, marginBottom: 24, letterSpacing: 2 }}>
          GOVMATH.CO.UK
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05, marginBottom: 32 }}>
          UK government rules,
          <br />
          in plain English.
        </div>
        <div style={{ fontSize: 36, opacity: 0.85, fontWeight: 500 }}>
          Free tax, salary, mortgage &amp; benefits calculators · 2025/26
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            gap: 16,
            fontSize: 22,
            opacity: 0.75,
          }}
        >
          <span>71 calculators</span>
          <span>·</span>
          <span>No signup</span>
          <span>·</span>
          <span>HMRC-accurate</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
