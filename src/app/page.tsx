import type { Metadata } from "next";
import Home from "@/components/home/Home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "GovMath — Know your numbers. Plan with confidence.",
    description:
      "100 free UK calculators for salary, mortgages, taxes, benefits and everyday life. Find the numbers you need for your next decision.",
    url: "/",
  },
};

export default function HomePage() {
  return <Home />;
}
