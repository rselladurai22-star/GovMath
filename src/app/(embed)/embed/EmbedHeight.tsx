"use client";

import { useEffect } from "react";

/** Tells the host page how tall the calculator is, so /embed.js can size the iframe. */
export default function EmbedHeight() {
  useEffect(() => {
    if (window.parent === window) return;
    const send = () => window.parent.postMessage({ type: "sumatlas-height", height: document.documentElement.scrollHeight }, "*");
    const ro = new ResizeObserver(send);
    ro.observe(document.body);
    send();
    return () => ro.disconnect();
  }, []);
  return null;
}
