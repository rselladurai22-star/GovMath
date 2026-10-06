import data from "@/gm/pages/salary.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/tax-and-salary/salary-calculator");

export default function Page() {
  return <GmDocument page={page} trust={{ path: "/tax-and-salary/salary-calculator", sourcesId: "pay-guide-guide-sources" }} />;
}
