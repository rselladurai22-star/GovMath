import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy taxonomy → new 8-category structure (permanent).
      { source: "/tax", destination: "/tax-and-salary", permanent: true },
      {
        source: "/tax/take-home-pay",
        destination: "/tax-and-salary/salary-calculator",
        permanent: true,
      },
      {
        source: "/tax/income-tax",
        destination: "/tax-and-salary/tax-bracket-checker",
        permanent: true,
      },
      {
        source: "/tax/national-insurance",
        destination: "/tax-and-salary/national-insurance",
        permanent: true,
      },
      {
        source: "/tax/vat",
        destination: "/business/vat-calculator",
        permanent: true,
      },
      { source: "/pensions", destination: "/investing", permanent: true },
      {
        source: "/pensions/:slug",
        destination: "/investing/:slug",
        permanent: true,
      },
      {
        source: "/property/stamp-duty",
        destination: "/property/stamp-duty-england",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
