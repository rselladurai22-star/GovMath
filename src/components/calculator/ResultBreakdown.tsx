type Row = {
  label: string;
  value: number;
  /** "deduction" renders red with a minus sign, "total" renders green-bold. */
  variant?: "default" | "deduction" | "total";
  hint?: string;
};

const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default function ResultBreakdown({
  title,
  rows,
}: {
  title: string;
  rows: Row[];
}) {
  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border bg-ice">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
          {title}
        </h3>
      </div>
      <ul className="divide-y divide-border">
        {rows.map((r) => {
          const isDeduction = r.variant === "deduction";
          const isTotal = r.variant === "total";
          const display = `${isDeduction ? "−" : ""}${GBP.format(
            Math.abs(r.value)
          )}`;
          return (
            <li
              key={r.label}
              className={`flex items-baseline justify-between gap-4 px-5 py-3.5 transition-colors ${
                isTotal ? "bg-[#e9fbf3]" : "hover:bg-ice"
              }`}
            >
              <div>
                <div
                  className={`text-sm ${
                    isTotal ? "font-extrabold text-[#0a7a52]" : "font-medium text-text"
                  }`}
                >
                  {r.label}
                </div>
                {r.hint && (
                  <div className="text-xs text-text/60 mt-0.5">{r.hint}</div>
                )}
              </div>
              <div
                className={`font-mono tabular-nums ${
                  isTotal
                    ? "text-lg font-extrabold text-[#0a7a52]"
                    : isDeduction
                    ? "text-error font-semibold"
                    : "text-text font-semibold"
                }`}
              >
                {display}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
