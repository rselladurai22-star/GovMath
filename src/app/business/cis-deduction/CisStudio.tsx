"use client";

import { cisInvoice, cisYear, CIS_RATES, type CisStatus } from "@/lib/business/self-employed";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  labour: num(2_000, 0, 10_000_000),
  materials: num(800, 0, 10_000_000),
  status: oneOf<CisStatus>("registered", ["registered", "unregistered", "gross"]),
  vat: bool(false),
  rc: bool(true),
  yLabour: num(0, 0, 10_000_000),
  yMaterials: num(0, 0, 10_000_000),
  yCosts: num(0, 0, 10_000_000),
  other: num(0, 0, 10_000_000),
  scot: bool(false),
};
const ADVANCED = ["vat", "rc", "yLabour", "yMaterials", "yCosts", "other", "scot"] as const;
const COLORS = { labour: "#4353ff", materials: "#94a3b8", cis: "#e11d48", vat: "#f59e0b" };
const STATUS_LABEL: Record<CisStatus, string> = { registered: "Registered: 20%", unregistered: "Not registered: 30%", gross: "Gross payment status: 0%" };

export default function CisStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = cisInvoice({ labour: v.labour, materials: v.materials, status: v.status, vatRegistered: v.vat, reverseCharge: v.vat && v.rc });
  const y = cisYear({ labour: v.yLabour, materials: v.yMaterials, expenses: v.yCosts, status: v.status, otherIncome: v.other, scottish: v.scot });
  const each = (["gross", "registered", "unregistered"] as CisStatus[]).map((k) => ({ k, x: cisInvoice({ labour: v.labour, materials: v.materials, status: k, vatRegistered: v.vat, reverseCharge: v.vat && v.rc }) }));
  const maxPaid = Math.max(...each.map((e) => e.x.paid), 1);
  const year = v.yLabour > 0;

  return (
    <Studio
      title="Your invoice"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my CIS deduction"
      onReset={st.reset}
      dock={{ label: "You're paid", value: gbp(r.paid, true) }}
      inputs={
        <>
          <InputGroup title="The invoice">
            <MoneyField label="Labour" value={v.labour} onChange={st.bind("labour")} big pence slider={{ min: 0, max: 10_000, step: 50, ends: ["£0", "£10k"] }} hint="Your charge for the work, before VAT." />
            <MoneyField label="Materials" value={v.materials} onChange={st.bind("materials")} pence hint="Materials, plant hire and consumables you bought for the job, before VAT. No CIS is taken from these." />
          </InputGroup>
          <InputGroup title="Your CIS status">
            <Segmented
              label="Status with HMRC"
              value={v.status}
              onChange={st.bind("status")}
              options={[
                { value: "registered", label: "20%", note: "Registered for CIS as a subcontractor." },
                { value: "unregistered", label: "30%", note: "Not registered, or the contractor cannot verify you." },
                { value: "gross", label: "Gross", note: "Gross payment status: nothing is deducted." },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="I'm VAT-registered" checked={v.vat} onChange={st.bind("vat")} optional />
            {v.vat && <Switch label="The domestic reverse charge applies" checked={v.rc} onChange={st.bind("rc")} optional hint="For most CIS work for a VAT-registered contractor who is not the end user. The contractor accounts for the VAT, not you." />}
            <MoneyField label="Labour invoiced this tax year" value={v.yLabour} onChange={st.bind("yLabour")} optional hint="To estimate your refund or bill at the end of the year." />
            {year && <MoneyField label="Materials invoiced this tax year" value={v.yMaterials} onChange={st.bind("yMaterials")} optional />}
            {year && <MoneyField label="All your business costs this tax year" value={v.yCosts} onChange={st.bind("yCosts")} optional hint="Materials, tools, van, fuel, phone, insurance, accountant." />}
            {year && <MoneyField label="Other income this tax year" value={v.other} onChange={st.bind("other")} optional hint="A salary or pension, if you have one." />}
            {year && <Switch label="You pay Scottish Income Tax" checked={v.scot} onChange={st.bind("scot")} optional />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="The contractor pays you"
        value={gbp(r.paid, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.deduction > 0 ? (
            <>
              The contractor takes <b>{gbp(r.deduction, true)}</b> ({percent(r.rate)} of the <b>{gbp(v.labour, true)}</b> labour) and pays it to HMRC for you. It counts towards your tax bill: you
              get credit for it on your tax return.
            </>
          ) : (
            <>With gross payment status, nothing is deducted. You pay all your tax yourself through Self Assessment.</>
          )
        }
        badges={[STATUS_LABEL[v.status], `${gbp(r.deduction, true)} CIS deducted`, ...(r.reverseChargeVat > 0 ? ["Reverse charge VAT"] : r.vat > 0 ? [`${gbp(r.vat, true)} VAT`] : [])]}
      />

      <Facts
        items={[
          { label: "Invoice total", value: gbp(r.invoiceTotal, true) },
          { label: "CIS deduction", value: gbp(r.deduction, true), tone: r.deduction > 0 ? "warn" : "good" },
          { label: "Paid to you", value: gbp(r.paid, true), tone: "good" },
          { label: "Effective deduction", value: r.invoiceTotal > 0 ? percent(r.deduction / r.invoiceTotal, 1) : "0%", note: "Of the whole invoice" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Deduction on", value: "Labour only" },
          { label: "CIS rate", value: percent(r.rate) },
          { label: "VAT", value: !v.vat ? "Not VAT-registered" : v.rc ? "Domestic reverse charge" : "20% charged" },
          { label: "Tax year", value: "2026/27" },
        ]}
      />

      {r.invoiceTotal > 0 && (
        <ResultCard title="Your invoice, split" sub="What the contractor pays you, and what goes to HMRC.">
          <SplitBar
            segments={[
              { label: "Labour paid to you", value: v.labour - r.deduction, display: gbp(v.labour - r.deduction, true), color: COLORS.labour },
              { label: "Materials paid to you", value: v.materials, display: gbp(v.materials, true), color: COLORS.materials },
              ...(r.vat > 0 ? [{ label: "VAT paid to you", value: r.vat, display: gbp(r.vat, true), color: COLORS.vat }] : []),
              ...(r.deduction > 0 ? [{ label: "CIS to HMRC", value: r.deduction, display: gbp(r.deduction, true), color: COLORS.cis }] : []),
            ]}
          />
          <Statement
            columns={["Amount"]}
            rows={[
              { label: "Labour", values: [gbp(v.labour, true)] },
              { label: "Materials", values: [gbp(v.materials, true)] },
              ...(r.vat > 0 ? [{ label: "VAT at 20%", values: [gbp(r.vat, true)] }] : []),
              ...(r.reverseChargeVat > 0 ? [{ label: "VAT: reverse charge, contractor accounts for it", values: [`(${gbp(r.reverseChargeVat, true)})`] }] : []),
              { label: "Invoice total", values: [gbp(r.invoiceTotal, true)], kind: "total" },
              { label: `CIS at ${percent(r.rate)} on labour`, values: [`−${gbp(r.deduction, true)}`], kind: "deduction" },
              { label: "Paid to you", values: [gbp(r.paid, true)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      {v.labour > 0 && (
        <ResultCard title="At each CIS rate" sub="The same invoice, depending on your status.">
          <Compare
            head={["Status", "Paid to you"]}
            rows={each.map(({ k, x }) => ({
              label: STATUS_LABEL[k],
              value: gbp(x.paid, true),
              delta: x.deduction > 0 ? `−${gbp(x.deduction, true)}` : undefined,
              deltaTone: "down",
              bar: x.paid / maxPaid,
              current: k === v.status,
            }))}
          />
          {v.status === "unregistered" && (
            <Callout tone="warn" title={`Registering would get you ${gbp(v.labour * (CIS_RATES.unregistered - CIS_RATES.registered), true)} more now`}>
              Registering as a subcontractor drops the deduction from 30% to 20%. Either way it is only an advance payment of tax, but 30% often takes far more than you owe.
            </Callout>
          )}
        </ResultCard>
      )}

      {year && (
        <ResultCard title="Your year: refund or bill?" sub="CIS deductions against the tax you actually owe as a sole trader.">
          <Statement
            columns={["2026/27"]}
            rows={[
              { label: "Labour and materials invoiced", values: [gbp(y.turnover)] },
              { label: "Business costs", values: [`−${gbp(v.yCosts)}`], kind: "deduction" },
              { label: "Profit", values: [gbp(y.profit)], kind: "total" },
              { label: "Income Tax and Class 4 NI on it", values: [gbp(y.owed)] },
              { label: "CIS already deducted", values: [`−${gbp(y.deducted)}`], kind: "deduction" },
              { label: y.refund >= 0 ? "Estimated refund" : "Left to pay", values: [gbp(Math.abs(y.refund))], kind: "total" },
            ]}
          />
          <Callout tone={y.refund >= 0 ? "good" : "warn"} title={y.refund >= 0 ? `About ${gbp(y.refund)} back after your tax return` : `About ${gbp(-y.refund)} more to pay`}>
            {y.refund >= 0
              ? "CIS takes a flat rate from labour, but your expenses and tax-free allowance mean you usually owe less. File your return soon after 5 April 2027 to get the refund sooner."
              : "Your CIS deductions do not cover all the tax on your profit. The rest is due by 31 January 2028, and you may also have payments on account."}
          </Callout>
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Avoiding the common CIS problems.">
        <Callout title="Show materials separately">
          CIS is only taken from labour. If materials are not itemised on your invoice, the contractor may deduct from the whole amount.
        </Callout>
        <Callout title="Keep your payment and deduction statements">
          Contractors must give you a statement every month they deduct CIS. You need them to claim the credit on your tax return.
        </Callout>
        {v.status !== "gross" && v.yLabour >= 30_000 && (
          <Callout title="You may qualify for gross payment status">
            Sole traders with at least £30,000 a year of construction turnover, excluding VAT and materials, and a good compliance record can apply to be paid without deductions.
          </Callout>
        )}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Construction Industry Scheme, 2026/27. Not tax advice.
      </p>
    </Studio>
  );
}
