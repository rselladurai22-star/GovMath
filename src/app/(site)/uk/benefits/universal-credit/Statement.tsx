import type { ReactNode } from "react";
import { gbp } from "@/components/flagship/format";

export type StatementLine = { key: string; label: string; note?: ReactNode; amount: number };

const minus = (n: number) => `−${gbp(n, true)}`;

/**
 * The award set out like a payslip: what is added, what is taken off, and the
 * payment. A line is only passed in when it applies.
 */
export default function Statement({
  heading,
  award,
  added,
  maximum,
  takenOff,
  cap,
  footer,
}: {
  heading: string;
  award: number;
  added: StatementLine[];
  maximum: number;
  takenOff: StatementLine[];
  /** The benefit cap, applied last. */
  cap?: StatementLine;
  footer?: ReactNode;
}) {
  return (
    <div className="sa-uc-slip" id="statement">
      <div className="sa-uc-sliphead" aria-live="polite">
        <p>{heading}</p>
        <p className="sa-uc-award">
          <b>{gbp(award, true)}</b> <span>a month</span>
        </p>
      </div>
      <table className="sa-uc-lines">
        <caption className="sr-only">How the award is built up, a month</caption>
        <colgroup>
          <col />
          <col className="sa-uc-amountcol" />
        </colgroup>
        <tbody>
          <tr className="sa-uc-sub">
            <th scope="colgroup" colSpan={2}>
              What you are allowed
            </th>
          </tr>
          {added.map((l) => (
            <tr key={l.key}>
              <th scope="row">
                {l.label}
                {l.note && <small>{l.note}</small>}
              </th>
              <td>{gbp(l.amount, true)}</td>
            </tr>
          ))}
          <tr className="sa-uc-total">
            <th scope="row">Maximum award</th>
            <td>{gbp(maximum, true)}</td>
          </tr>
        </tbody>
        {(takenOff.length > 0 || cap) && (
          <tbody>
            <tr className="sa-uc-sub">
              <th scope="colgroup" colSpan={2}>
                What is taken off
              </th>
            </tr>
            {[...takenOff, ...(cap ? [cap] : [])].map((l) => (
              <tr key={l.key} className="is-off">
                <th scope="row">
                  {l.label}
                  {l.note && <small>{l.note}</small>}
                </th>
                <td>{minus(l.amount)}</td>
              </tr>
            ))}
          </tbody>
        )}
        <tfoot>
          <tr>
            <th scope="row">Universal Credit a month</th>
            <td>{gbp(award, true)}</td>
          </tr>
        </tfoot>
      </table>
      {footer}
    </div>
  );
}
