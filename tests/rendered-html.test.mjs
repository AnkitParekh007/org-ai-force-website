import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the AI Employee Force experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>AI Employee Force/);
  assert.match(html, /Your AI workforce/);
  assert.match(html, /specialist AI employees/);
  assert.match(html, /Meet your/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("ships agent imagery and social preview metadata", async () => {
  const [layout, page] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /\/og\.png/);
  assert.match(page, /Toggle color theme/);
  assert.match(page, /Search agents/);
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/agents/fronto.png", import.meta.url));
  await access(new URL("../public/generated/hero-squad.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", root)));
});
