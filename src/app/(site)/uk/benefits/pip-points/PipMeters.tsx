import type { PipBand } from "@/lib/benefits/pip-assessment";

const SCALE = 16;

/** One component's score on a 0 to 16 track, with the 8 and 12 point thresholds marked. */
function Meter({ name, points, band, weekly, money, special }: { name: string; points: number; band: PipBand; weekly: number; money: (n: number) => string; special?: boolean }) {
  const fill = Math.min(points, SCALE) / SCALE;
  const bandText = band === "enhanced" ? "Enhanced rate" : band === "standard" ? "Standard rate" : "No award";
  const toNext = points >= 12 ? 0 : points >= 8 ? 12 - points : 8 - points;
  const label = special
    ? `${name}: enhanced rate under the special rules for people nearing the end of life, ${money(weekly)} a week.`
    : `${name}: ${points} points. ${bandText}, ${money(weekly)} a week.${toNext > 0 ? ` ${toNext} more ${toNext === 1 ? "point" : "points"} for the ${points >= 8 ? "enhanced" : "standard"} rate.` : ""}`;
  return (
    <div className={`sa-pip-meter is-${special ? "enhanced" : band}`}>
      <p className="sa-pip-mhead">
        <span>{name}</span>
        <b>{special ? "Special rules" : `${points} ${points === 1 ? "point" : "points"}`}</b>
      </p>
      <div className="sa-pip-track" role="img" aria-label={label}>
        <span className="sa-pip-fill" style={{ width: `${(special ? 1 : fill) * 100}%` }} />
        <i className="sa-pip-tick" style={{ left: "50%" }} />
        <i className="sa-pip-tick" style={{ left: "75%" }} />
      </div>
      <div className="sa-pip-scale" aria-hidden="true">
        <span style={{ left: "50%" }}>8</span>
        <span style={{ left: "75%" }}>12</span>
      </div>
      <p className="sa-pip-mfoot">
        <span>{special ? "Enhanced rate" : bandText}</span>
        <b>{money(weekly)}</b>
      </p>
    </div>
  );
}

export default function PipMeters(props: {
  daily: number;
  mobility: number;
  dailyBand: PipBand;
  mobilityBand: PipBand;
  dailyWeekly: number;
  mobilityWeekly: number;
  money: (n: number) => string;
  terminal: boolean;
}) {
  return (
    <div className="sa-pip-meters">
      <Meter name="Daily living" points={props.daily} band={props.dailyBand} weekly={props.dailyWeekly} money={props.money} special={props.terminal} />
      <Meter name="Mobility" points={props.mobility} band={props.mobilityBand} weekly={props.mobilityWeekly} money={props.money} />
    </div>
  );
}
