import Link from "next/link";
import MobileNav from "@/components/MobileNav";

// Compact directory nav: eight short category labels anchored to their routes.
const NAV: { href: string; label: string }[] = [
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/property", label: "Property" },
  { href: "/business", label: "Business" },
  { href: "/benefits", label: "Benefits" },
  { href: "/investing", label: "Pensions" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/students", label: "Students" },
  { href: "/life", label: "Life" },
];

export default function SiteHeader() {
  return (
    <header
      className="rk sticky top-0 z-40"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid #e4e9e5",
      }}
    >
      <div
        style={{ maxWidth: 1200, height: 58 }}
        className="mx-auto flex items-center justify-between gap-5 px-7"
      >
        <Link
          href="/"
          className="rk-serif shrink-0"
          style={{ fontSize: 24, color: "#141a16" }}
        >
          GovMath<span style={{ color: "#1e5c45" }}>.</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center"
          style={{ fontSize: 13.5, fontWeight: 500 }}
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="rk-navlink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span
            className="rk-mono hidden sm:inline-block"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.06em",
              color: "#1e5c45",
              border: "1px solid #cfe0d6",
              borderRadius: 999,
              padding: "5px 11px",
              background: "#f3f8f5",
            }}
          >
            2025/26
          </span>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
