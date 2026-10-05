import data from "@/gm/pages/vehicles.json";
import GmDocument, { gmMetadata, type GmPage } from "@/gm/GmDocument";

const page = data as GmPage;

export const metadata = gmMetadata(page, "/vehicles");

export default function Page() {
  return <GmDocument page={page} topic="vehicles" />;
}
