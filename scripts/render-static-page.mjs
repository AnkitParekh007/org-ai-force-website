import { copyFile, writeFile } from "node:fs/promises";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("static", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://ankitparekh007.github.io/"),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static render failed with ${response.status}`);
const pagesBase = "/org-ai-force-website/";
const html = (await response.text())
  .replaceAll('"/_next/', `"${pagesBase}_next/`)
  .replaceAll("url(/_next/", `url(${pagesBase}_next/`)
  .replaceAll('href="/favicon.svg"', `href="${pagesBase}favicon.svg"`);
if (/(?:href|src)="\/(?:_next|agents|generated|favicon)/.test(html) || html.includes("url(/_next/")) {
  throw new Error("Static render contains root-relative asset URLs");
}
await writeFile(new URL("../dist/client/index.html", import.meta.url), html);
await copyFile(
  new URL("../dist/client/index.html", import.meta.url),
  new URL("../dist/client/404.html", import.meta.url),
);
await writeFile(new URL("../dist/client/.nojekyll", import.meta.url), "");
console.log("GitHub Pages static entry generated.");
