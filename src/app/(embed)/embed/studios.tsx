import type { ComponentType } from "react";
import type { Query } from "@/components/flagship/useStudio";
import TaperStudio from "@/app/(site)/uk/benefits/universal-credit-taper/TaperStudio";
import UcStudio from "@/app/(site)/uk/benefits/universal-credit/UcStudio";
import LhaStudio from "@/app/(site)/uk/benefits/local-housing-allowance/LhaStudio";
import CapStudio from "@/app/(site)/uk/benefits/benefit-cap/CapStudio";
import ChildBenefitStudio from "@/app/(site)/uk/benefits/child-benefit/ChildBenefitStudio";
import FreeHoursStudio from "@/app/(site)/uk/benefits/free-childcare-hours/FreeHoursStudio";
import MaintenanceStudio from "@/app/(site)/uk/students/maintenance-loan/MaintenanceStudio";
import LoanStudio from "@/components/students/LoanStudio";
import ProRataStudio from "@/app/(site)/uk/life/pro-rata-rent/ProRataStudio";
import SPDStudio from "@/app/(site)/uk/property/single-person-discount/SPDStudio";
import CouncilTaxStudio from "@/app/(site)/uk/property/council-tax-bands/CouncilTaxStudio";
import PremiumBondsStudio from "@/app/(site)/uk/investing/premium-bonds/PremiumBondsStudio";
import BonusStudio from "@/app/(site)/uk/tax-and-salary/bonus-tax/BonusStudio";
import PaycheckStudio from "@/app/(site)/us/taxes/paycheck-calculator/PaycheckStudio";
import MortgageStudio from "@/app/(site)/us/housing/mortgage-calculator/MortgageStudio";
import RedundancyPayStudio from "@/app/(site)/uk/tax-and-salary/redundancy/RedundancyPayStudio";
import ApplianceStudio from "@/app/(site)/uk/property/appliance-running-cost/ApplianceStudio";
import AgeStudio from "@/app/(site)/everyday/age-calculator/AgeStudio";
import DueDateStudio from "@/app/(site)/everyday/pregnancy-due-date/DueDateStudio";
import CalorieStudio from "@/app/(site)/everyday/calorie-calculator/CalorieStudio";
import CompoundStudio from "@/app/(site)/us/savings/compound-interest-calculator/CompoundStudio";
import type { EMBEDS } from "@/lib/embeds";

type Studio = ComponentType<{ query: Query }>;

// The student loan pages share one studio; these match their pages' defaults.
function Plan2Studio({ query }: { query: Query }) {
  return <LoanStudio query={query} plan="plan2" defaults={{ salary: 35_000, balance: 45_000 }} />;
}
function Plan5Studio({ query }: { query: Query }) {
  return <LoanStudio query={query} plan="plan5" defaults={{ salary: 30_000, balance: 50_000 }} />;
}

/** The calculator each embeddable page shows, keyed by the page's address. */
export const STUDIOS: Record<(typeof EMBEDS)[number], Studio> = {
  "/uk/benefits/universal-credit-taper": TaperStudio,
  "/uk/benefits/universal-credit": UcStudio,
  "/uk/benefits/local-housing-allowance": LhaStudio,
  "/uk/benefits/benefit-cap": CapStudio,
  "/uk/benefits/child-benefit": ChildBenefitStudio,
  "/uk/benefits/free-childcare-hours": FreeHoursStudio,
  "/uk/students/maintenance-loan": MaintenanceStudio,
  "/uk/students/plan-2-student-loan": Plan2Studio,
  "/uk/students/plan-5-student-loan": Plan5Studio,
  "/uk/life/pro-rata-rent": ProRataStudio,
  "/uk/property/single-person-discount": SPDStudio,
  "/uk/property/council-tax-bands": CouncilTaxStudio,
  "/uk/investing/premium-bonds": PremiumBondsStudio,
  "/uk/tax-and-salary/bonus-tax": BonusStudio,
  "/uk/tax-and-salary/redundancy": RedundancyPayStudio,
  "/uk/property/appliance-running-cost": ApplianceStudio,
  "/us/taxes/paycheck-calculator": PaycheckStudio,
  "/us/housing/mortgage-calculator": MortgageStudio,
  "/us/savings/compound-interest-calculator": CompoundStudio,
  "/everyday/age-calculator": AgeStudio,
  "/everyday/pregnancy-due-date": DueDateStudio,
  "/everyday/calorie-calculator": CalorieStudio,
};
