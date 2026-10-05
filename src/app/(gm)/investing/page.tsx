import data from "@/gm/pages/investing.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/investing");

export default function Page() {
  return <GmDocument page={page} />;
}
