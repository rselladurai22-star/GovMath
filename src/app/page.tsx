import data from "@/gm/pages/home.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/");

export default function Page() {
  return <GmDocument page={page} />;
}
