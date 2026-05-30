import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import BankHolidaysCalculator from "./BankHolidaysCalculator";

export const metadata: Metadata = {
  title: "UK Bank Holiday Working Day Calculator",
  description: "Count working days between two dates, automatically excluding weekends and UK bank holidays.",
};

export default function BankHolidaysPage() {
  return (
    <CalculatorShell
      category="Everyday Life"
      updatedLabel="2025 & 2026 dates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/life", label: "Everyday Life" },
        { href: "/life/bank-holidays", label: "Bank Holidays" },
      ]}
      title="UK Bank Holiday Working Day Calculator"
      intro="Plan project deadlines, holiday cover or contract end-dates by counting actual working days between two dates — weekends and bank holidays automatically stripped out."
      calculator={<BankHolidaysCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We loop day-by-day between your start and end dates (inclusive), counting any day that&rsquo;s Monday–Friday and not in the official UK bank holiday list for your chosen nation. Data covers 2025 and 2026 from gov.uk/bank-holidays.
            </p>
          }
          officialRules={
            <ul>
              <li>England &amp; Wales has 8 bank holidays a year, Scotland has 9, Northern Ireland has 10 (including St Patrick&rsquo;s Day and the Twelfth).</li>
              <li>When a bank holiday falls at the weekend, the &quot;substitute&quot; day is the next Monday (or Tuesday for Boxing Day clashes).</li>
              <li>Bank holidays aren&rsquo;t a statutory right to paid leave — your contract decides.</li>
              <li>Statutory holiday entitlement (5.6 weeks = 28 days for a 5-day week) can include the 8 bank holidays.</li>
            </ul>
          }
          pitfalls={[
            { title: "Scotland is different", body: "Scottish bank holidays vary by employer and local council. The list shown is the national gov.uk set, not a guarantee your office is closed." },
            { title: "Working day counts inclusive of start and end", body: "If you start and finish on the same Monday, that counts as 1 working day. Adjust the end date if your contract excludes the last day." },
            { title: "Calendar days vs working days", body: "Notice periods are usually calendar days; payroll deadlines are usually working days. Read the small print." },
          ]}
          faqs={[
            { question: "Does this include school holidays?", answer: "No — only statutory UK bank holidays. School holidays vary by local authority." },
            { question: "What about Royal funerals or one-off holidays?", answer: "One-off bank holidays (e.g. Coronation 8 May 2023) are added in the year they happen. Future one-offs aren&rsquo;t included." },
            { question: "Can I export the working days?", answer: "Not yet — but the list of bank holidays falling inside your range is shown so you can copy them into a project plan." },
          ]}
          disclaimer="Bank holiday dates change year to year. Always verify long-range plans against gov.uk/bank-holidays."
        />
      }
    />
  );
}
