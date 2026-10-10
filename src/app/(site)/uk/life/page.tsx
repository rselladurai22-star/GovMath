import data from "@/gm/pages/life.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/uk/life");

export default function Page() {
  return <GmDocument page={page} topic="life" />;
}
