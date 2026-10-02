import Link from "next/link";
import s from "./Flagship.module.css";

export type Crumb = { href: string; label: string };

/** Compact page heading shared by every calculator page. */
export default function FlagshipHero({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  points,
}: {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  points: string[];
}) {
  return (
    <section className={s.hero}>
      <div className="gm-wrap">
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <ol>
            {breadcrumbs.map((c, i) => (
              <li key={c.href}>
                {i === breadcrumbs.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}
              </li>
            ))}
          </ol>
        </nav>
        <span className={s.heroEyebrow}>
          <i aria-hidden="true" />
          {eyebrow}
        </span>
        <h1 className={s.heroTitle}>{title}</h1>
        <p className={s.heroLead}>{lead}</p>
        <ul className={s.heroPoints}>
          {points.map((p) => (
            <li key={p}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
