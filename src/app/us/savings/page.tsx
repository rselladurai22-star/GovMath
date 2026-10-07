import { UsTopicPage, usTopicMetadata } from "../UsTopic";

export const metadata = usTopicMetadata("us-savings");

export default function Page() {
  return <UsTopicPage slug="us-savings" />;
}
