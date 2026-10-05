import data from "@/gm/pages/property.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/property");

export default function Page() {
  return <GmDocument page={page} />;
}
