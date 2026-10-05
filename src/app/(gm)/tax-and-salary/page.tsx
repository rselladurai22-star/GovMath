import data from "@/gm/pages/tax-and-salary.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/tax-and-salary");

export default function Page() {
  return <GmDocument page={page} />;
}
