import data from "@/gm/pages/mortgage.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/property/mortgage-repayment");

export default function Page() {
  return <GmDocument page={page} />;
}
