import type { BedroomTile } from "@/lib/benefits/lha-engine";

/** A bed seen from above: one pillow or two. */
function Bed({ two }: { two: boolean }) {
  return (
    <svg viewBox="0 0 48 34" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="46" height="32" rx="4" className="sa-lha-bedframe" />
      {two ? (
        <>
          <rect x="6" y="5" width="16" height="9" rx="2.5" className="sa-lha-pillow" />
          <rect x="26" y="5" width="16" height="9" rx="2.5" className="sa-lha-pillow" />
        </>
      ) : (
        <rect x="14" y="5" width="20" height="9" rx="2.5" className="sa-lha-pillow" />
      )}
      <path d="M1 18 H47" className="sa-lha-sheet" />
    </svg>
  );
}

/**
 * The bedroom entitlement as a row of rooms, each labelled with who sleeps in
 * it. Rooms beyond the fourth are shown struck out: Local Housing Allowance
 * stops at the four-bedroom rate. On the shared rate there is one tile, for a
 * room in a shared home.
 */
export default function BedroomTiles({ tiles, shared }: { tiles: BedroomTile[]; shared: boolean }) {
  if (shared) {
    return (
      <ol className="sa-lha-tiles" aria-label="What you are allowed">
        <li className="is-shared">
          <Bed two={false} />
          <span className="sa-lha-room">A room</span>
          <span className="sa-lha-who">You, in a shared home</span>
        </li>
      </ol>
    );
  }
  return (
    <ol className="sa-lha-tiles" aria-label="Bedrooms you are allowed, and who is in each">
      {tiles.map((t, i) => {
        const two = t.kind === "you" ? t.who.includes("partner") : t.kind === "children" && (t.who.startsWith("Two") || t.who.includes(" and "));
        return (
          <li key={i} className={`is-${t.kind}${i >= 4 ? " is-over" : ""}`}>
            <Bed two={two} />
            <span className="sa-lha-room">{i >= 4 ? "No extra rate" : `Bedroom ${i + 1}`}</span>
            <span className="sa-lha-who">{t.who}</span>
          </li>
        );
      })}
    </ol>
  );
}
