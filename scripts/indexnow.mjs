#!/usr/bin/env node
/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver and others; Bing
 * shares with ChatGPT search and Copilot) which pages changed, so they crawl
 * them within minutes instead of waiting.
 *
 *   node scripts/indexnow.mjs              pages whose sitemap lastmod is in the last 3 days
 *   node scripts/indexnow.mjs --days 7     ... in the last 7 days
 *   node scripts/indexnow.mjs --all        every page in the sitemap (first run only)
 *   node scripts/indexnow.mjs /uk/x /us/y  just these pages
 *
 * Runs on its own after each production deploy (.github/workflows/indexnow.yml).
 * The key is public by design: search engines check it at https://sumatlas.com/<key>.txt.
 */
import { readdirSync } from "node:fs";

const SITE = "https://sumatlas.com";
const HOST = "sumatlas.com";
const KEY = readdirSync(new URL("../public", import.meta.url)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.slice(0, -4);
if (!KEY) throw new Error("No IndexNow key file (public/<32 hex>.txt) found");

const args = process.argv.slice(2);
const daysAt = args.indexOf("--days");
const days = daysAt >= 0 ? Number(args[daysAt + 1]) : 3;
const all = args.includes("--all");
const paths = args.filter((a, i) => a.startsWith("/") && args[i - 1] !== "--days");

async function fromSitemap() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const since = Date.now() - days * 86_400_000;
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((m) => ({ loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1], mod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] }))
    .filter((u) => u.loc && (all || (u.mod && Date.parse(u.mod) >= since)))
    .map((u) => u.loc);
}

const urlList = paths.length ? paths.map((p) => SITE + p) : await fromSitemap();
if (!urlList.length) {
  console.log(`IndexNow: no pages changed in the last ${days} days.`);
  process.exit(0);
}
// One request takes up to 10,000 addresses.
for (let i = 0; i < urlList.length; i += 10_000) {
  const batch = urlList.slice(i, i + 10_000);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: batch }),
  });
  // 200 and 202 mean accepted; 403 means the key file isn't live yet; 422 means a URL isn't on this host.
  console.log(`IndexNow: ${batch.length} URLs → HTTP ${res.status}`);
  if (res.status >= 300) process.exitCode = 1;
}
