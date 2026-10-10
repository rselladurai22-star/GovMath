"use client";

import { useState } from "react";

/** Copy-and-paste embed code with a copy button. */
export default function EmbedCode({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the code can still be selected by hand */
    }
  };
  return (
    <div className="gm-embedcode">
      <textarea readOnly rows={5} value={code} aria-label={label} onFocus={(e) => e.currentTarget.select()} />
      <button type="button" className="button" onClick={copy}>
        {copied ? "Copied" : "Copy embed code"}
      </button>
    </div>
  );
}
