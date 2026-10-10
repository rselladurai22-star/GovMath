import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import EmbedCode from "@/components/EmbedCode";
import { CALCULATORS } from "@/lib/calculators";
import { EMBEDS, SITE_URL, embedCode } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "Free Calculator Widgets for Your Website",
  description:
    "Free UK and US calculator widgets to embed on your website: Universal Credit, student loans, council tax, Child Benefit, paycheck and mortgage. Always up to date.",
  alternates: { canonical: "/widgets" },
};

const LIST = EMBEDS.map((href) => CALCULATORS.find((c) => c.href === href)!);

function Group({ title, country }: { title: string; country: "uk" | "us" }) {
  return (
    <>
      <h2>{title}</h2>
      {LIST.filter((c) => c.country === country).map((c) => (
        <details key={c.href} className="gm-widget">
          <summary>
            <strong>{c.title}</strong> <span>{c.blurb}</span>
          </summary>
          <p>
            <Link href={c.href}>See the full calculator</Link> ·{" "}
            <a href={`${SITE_URL}/embed${c.href}`} target="_blank" rel="noopener">
              Preview the widget
            </a>
          </p>
          <EmbedCode code={embedCode(c.href, c.title)} label={`Embed code for the ${c.title}`} />
        </details>
      ))}
    </>
  );
}

export default function WidgetsPage() {
  return (
    <ContentPage
      title="Free calculator widgets for your website"
      intro="Add a SumAtlas calculator to your website, blog, intranet or advice service in one step. They are free, have no ads and update themselves when rates change."
    >
      <h2>How it works</h2>
      <ol>
        <li>Pick a calculator below and copy its code.</li>
        <li>Paste the code into your page&rsquo;s HTML where you want the calculator to appear.</li>
        <li>That&rsquo;s it: the calculator fits your page&rsquo;s width and grows to its own height.</li>
      </ol>
      <p>
        Each widget runs on our servers, so when a rate or threshold changes (every April in the UK, every January in the
        US) your page shows the new figures without you doing anything. The widgets carry no ads and set no advertising
        cookies.
      </p>
      <h2>The terms</h2>
      <ul>
        <li>Free for any website, including charities, schools, councils, advice services and businesses.</li>
        <li>Please keep the &ldquo;Calculator by SumAtlas&rdquo; line under the widget.</li>
        <li>
          The figures are estimates for guidance, not financial advice. Read <Link href="/how-we-check">how we check our figures</Link>.
        </li>
        <li>
          Want a calculator that isn&rsquo;t listed, or a different default? <Link href="/contact">Tell us</Link>.
        </li>
      </ul>
      <Group title="UK calculators" country="uk" />
      <Group title="US calculators" country="us" />
    </ContentPage>
  );
}
