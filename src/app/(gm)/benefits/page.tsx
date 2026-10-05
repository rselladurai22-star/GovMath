import data from "@/gm/pages/benefits.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/benefits");

export default function Page() {
  return <GmDocument page={page} />;
}
