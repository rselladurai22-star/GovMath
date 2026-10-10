import { UsTopicPage, usTopicMetadata } from "../UsTopic";

export const metadata = usTopicMetadata("us-loans");

export default function Page() {
  return <UsTopicPage slug="us-loans" />;
}
