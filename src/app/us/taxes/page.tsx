import { UsTopicPage, usTopicMetadata } from "../UsTopic";

export const metadata = usTopicMetadata("us-taxes");

export default function Page() {
  return <UsTopicPage slug="us-taxes" />;
}
