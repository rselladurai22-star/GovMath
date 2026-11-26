import Link from "next/link";
import { shortTitle, type Calculator } from "@/lib/calculators";

/** A grid of calculator cards in the design's topic-page markup. */
export function ToolGrid({ tools, icon }: { tools: Calculator[]; icon: string }) {
  return (
    <div className="fullcategory">
      {tools.map((t) => (
        <Link key={t.href} className="categorytool" href={t.href}>
          <span className="toolicon" dangerouslySetInnerHTML={{ __html: icon }} />
          <div>
            <h2>{shortTitle(t.title)}</h2>
            <p>{t.blurb}</p>
            <span className="openlabel">Open calculator</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
