import type { Metadata } from "next";
import GovmathHome from "@/components/GovmathHome";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "GovMath — Know your numbers. Plan with confidence.",
    description:
      "100 free UK calculators for salary, mortgages, taxes, benefits and everyday life. Find the numbers you need for your next decision.",
    url: "/",
  },
};

export default function Home() {
  return <GovmathHome />;
}
