import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve("public/agents");
const outputDirectory = path.join(sourceDirectory, "avif");
const skipped = new Set(["agents-banner.png", "agents-login-banner.png"]);

await mkdir(outputDirectory, { recursive: true });
const sources = (await readdir(sourceDirectory))
  .filter((name) => name.endsWith(".png") && !skipped.has(name));

const workerCount = 4;
let nextIndex = 0;
async function worker() {
  while (nextIndex < sources.length) {
    const name = sources[nextIndex++];
    const { data, info } = await sharp(path.join(sourceDirectory, name))
      .resize(720, 720, { fit: "inside", withoutEnlargement: true })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    for (let index = 3; index < data.length; index += 4) {
      const alpha = data[index];
      data[index] = alpha <= 28 ? 0 : Math.round(((alpha - 28) * 255) / 227);
    }
    await sharp(data, { raw: info })
      .avif({ quality: 62, effort: 5, chromaSubsampling: "4:4:4" })
      .toFile(path.join(outputDirectory, `${path.parse(name).name}.avif`));
  }
}

await Promise.all(Array.from({ length: workerCount }, worker));
const pngBytes = (await Promise.all(sources.map((name) => stat(path.join(sourceDirectory, name)))))
  .reduce((total, entry) => total + entry.size, 0);
const avifBytes = (await Promise.all(sources.map((name) => stat(path.join(outputDirectory, `${path.parse(name).name}.avif`)))))
  .reduce((total, entry) => total + entry.size, 0);

console.log(`Converted ${sources.length} agents: ${(pngBytes / 1_048_576).toFixed(1)} MB PNG -> ${(avifBytes / 1_048_576).toFixed(1)} MB AVIF`);
