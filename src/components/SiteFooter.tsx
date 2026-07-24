import Link from "next/link";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer
      className="rk"
      style={{
        marginTop: 56,
        borderTop: "1px solid #e4e9e5",
        background: "#fbfcfb",
      }}
    >
      <div
        style={{ maxWidth: 1200 }}
        className="mx-auto flex flex-wrap items-baseline justify-between gap-4 px-7 py-6"
      >
        <span className="rk-serif" style={{ fontSize: 19 }}>
          GovMath<span style={{ color: "#1e5c45" }}>.</span>
        </span>
        <div className="flex gap-5" style={{ fontSize: 12.5 }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rk-inklink"
              style={{ color: "#5b645e" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <span style={{ fontSize: 11.5, color: "#94a09a" }}>
          © {new Date().getFullYear()} GovMath. Not affiliated with HMRC. UK
          2025/26 tax year.
        </span>
      </div>
    </footer>
  );
}
