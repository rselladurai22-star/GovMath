import data from "@/gm/pages/mortgage.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/uk/property/mortgage-repayment");

export default function Page() {
  return <GmDocument page={page} trust={{ path: "/uk/property/mortgage-repayment", sourcesId: "guide-guide-sources" }} />;
}
