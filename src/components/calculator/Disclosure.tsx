import type { ReactNode } from "react";

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
    <details
      open={defaultOpen}
      className="group rounded-lg border border-border bg-surface p-4 open:bg-card-hover/30"
    >
      <summary className="cursor-pointer list-none flex items-center justify-between gap-3 font-semibold text-primary-dark">
        <span>{question}</span>
        <span
          aria-hidden
          className="text-primary transition-transform group-open:rotate-45 text-xl leading-none"
        >
          +
        </span>
      </summary>
      <div className="mt-3 text-text/80 text-[15px] leading-relaxed space-y-3">
        {children}
      </div>
    </details>
  );
}
