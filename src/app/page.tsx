import type { Metadata } from "next";
import GovmathHome from "@/components/GovmathHome";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Govmath — Smart calculations for life's big decisions",
    description:
      "100+ free UK calculators across money, property, tax, benefits and more. Accurate, up to date, no sign-up — with the maths shown step by step.",
    url: "/",
  },
};

export default function Home() {
  return <GovmathHome />;
}
