import data from "@/gm/pages/business.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/uk/business");

export default function Page() {
  return <GmDocument page={page} topic="business" />;
}
