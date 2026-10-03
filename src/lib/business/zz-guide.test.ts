import { it } from "vitest";
import { corporationTaxFull, directorPlan, employeeCost } from "./company";
import { dividendTax } from "../tax/dividend";
import { ratesStudy } from "./small-business-rates";
const f = (n: number) => n.toFixed(2);
it("print", () => {
  const o: string[] = [];
  const ct = (p: number) => corporationTaxFull({ profit: p, associated: 0, months: 12, dividendsReceived: 0 }).tax;
  o.push(`ct100 ${f(ct(100000))} ct80 ${f(ct(80000))} save van20k ${f(ct(100000)-ct(80000))}`);
  o.push(`ct40 ${f(ct(40000))} ct30 ${f(ct(30000))} save10k@40 ${f(ct(40000)-ct(30000))}`);
  o.push(`ct300 ${f(ct(300000))} ct280 ${f(ct(280000))} save20k@300 ${f(ct(300000)-ct(280000))}`);
  // three-year growth
  for (const p of [40000, 90000, 180000]) o.push(`grow ${p}: ${f(ct(p))}`);
  // dividend timing: salary 12570, dividends 87000 in one year vs 43500 x2
  const one = dividendTax(12570, 87000).total; const half = dividendTax(12570, 43500).total;
  o.push(`div one-year 87k ${f(one)} two-years ${f(2*half)} saving ${f(one-2*half)}`);
  const one2 = dividendTax(12570, 37700).total; o.push(`div 37700 ${f(one2)}`);
  // retained: profit 100k, take only basic band: dividends needed to fill basic band ~ 37,700
  const full = directorPlan({ profit: 100000, salary: 12570, pension: 0, employmentAllowance: false, scottish: false, associated: 0, otherIncome: 0 });
  o.push(`full payout keep ${f(full.takeHome)} div ${f(full.dividends)} dt ${f(full.dividendTax)}`);
  o.push(`basic band only: dividends 37700 tax ${f(dividendTax(12570,37700).total)} keep ${f(12570+37700-dividendTax(12570,37700).total)} retained ${f(full.dividends-37700)}`);
  // spouse: two shareholders each 12570 salary? simple: dividends 52476 split two (spouse no other income)
  const d = full.dividends; o.push(`one holder dt ${f(dividendTax(12570,d).total)} split dt ${f(dividendTax(12570,d/2).total + dividendTax(0,d/2).total)}`);
  // team
  const b = { bonus: 0, pensionPct: 0.03, pensionOnFullPay: false, sacrificePct: 0, benefits: 0, headcount: 1, employmentAllowance: false };
  const a1 = employeeCost({ ...b, salary: 24000, relief: "none" });
  const a2 = employeeCost({ ...b, salary: 30000, relief: "none" });
  const a3 = employeeCost({ ...b, salary: 20000, relief: "under21" });
  const ni = a1.employerNi + a2.employerNi + a3.employerNi;
  o.push(`team: ni ${f(a1.employerNi)} ${f(a2.employerNi)} ${f(a3.employerNi)} total ${f(ni)} pens ${f(a1.pension)} ${f(a2.pension)} ${f(a3.pension)} cost ${f(a1.costEach+a2.costEach+a3.costEach)} after EA ${f(a1.costEach+a2.costEach+a3.costEach-Math.min(10500,ni))}`);
  const nlw = 12.71*37.5*52; const c = employeeCost({ ...b, salary: nlw, relief: "none" });
  o.push(`nlw salary ${f(nlw)} ni ${f(c.employerNi)} pen ${f(c.pension)} cost ${f(c.costEach)} hourly ${f(c.costEach/(37.5*52))}`);
  const R=(n:string,x:any)=>{const r=ratesStudy({rateableValue:0,onlyProperty:true,retailHospitalityLeisure:false,charity:false,days:365,lastBill:0,...x});o.push(`${n}: gross ${f(r.grossRates)} relief ${f(r.reliefAmount)} bill ${f(r.bill)} monthly ${f(r.monthly)}`)};
  R("cafe 9k rhl",{rateableValue:9000,retailHospitalityLeisure:true});
  R("hair 14k rhl",{rateableValue:14000,retailHospitalityLeisure:true});
  R("office 30k",{rateableValue:30000});
  R("pub 60k rhl",{rateableValue:60000,retailHospitalityLeisure:true,onlyProperty:false});
  R("pub 60k nonrhl",{rateableValue:60000,onlyProperty:false});
  R("workshop 18k",{rateableValue:18000});
  console.log(o.join("\n"));
});
