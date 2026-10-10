import { UsTopicPage, usTopicMetadata } from "../UsTopic";

export const metadata = usTopicMetadata("us-housing");

export default function Page() {
  return <UsTopicPage slug="us-housing" />;
}
