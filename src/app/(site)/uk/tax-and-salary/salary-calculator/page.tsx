import data from "@/gm/pages/salary.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/uk/tax-and-salary/salary-calculator");

export default function Page() {
  return <GmDocument page={page} trust={{ path: "/uk/tax-and-salary/salary-calculator", sourcesId: "pay-guide-guide-sources" }} />;
}
