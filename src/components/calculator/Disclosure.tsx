import type { ReactNode } from "react";
import styles from "./Shell.module.css";

export default function Disclosure({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className={styles.faq}>
      <summary>
        <span>{question}</span>
        <span aria-hidden className={styles.faqPlus} />
      </summary>
      <div className={styles.faqBody}>{children}</div>
    </details>
  );
}
