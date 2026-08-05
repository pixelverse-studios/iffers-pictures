import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const constantsPath = path.join(root, "src/lib/constants.ts");
const layoutPath = path.join(root, "src/app/layout.tsx");

const [constantsSource, layoutSource] = await Promise.all([
  readFile(constantsPath, "utf8"),
  readFile(layoutPath, "utf8"),
]);

const ogImageMatch = constantsSource.match(/ogImage:\s*["']([^"']+)["']/);

if (!ogImageMatch) {
  throw new Error("SITE_CONFIG.ogImage is missing from src/lib/constants.ts");
}

const ogImagePath = ogImageMatch[1];

if (!ogImagePath.startsWith("/")) {
  throw new Error("SITE_CONFIG.ogImage must be a root-relative public asset path");
}

if (!layoutSource.includes("url: SITE_CONFIG.ogImage")) {
  throw new Error("Open Graph metadata must use SITE_CONFIG.ogImage");
}

if (!layoutSource.includes("images: [SITE_CONFIG.ogImage]")) {
  throw new Error("Twitter metadata must use SITE_CONFIG.ogImage");
}

const publicImagePath = path.join(root, "public", ogImagePath.slice(1));
const imageBuffer = await readFile(publicImagePath);
const dimensions = readJpegDimensions(imageBuffer);

if (dimensions.width !== 1200 || dimensions.height !== 630) {
  throw new Error(
    `Social image must be 1200x630; found ${dimensions.width}x${dimensions.height}`
  );
}

console.log(
  `Validated ${ogImagePath}: ${dimensions.width}x${dimensions.height} JPEG`
);

function readJpegDimensions(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error("Social image must be a JPEG file");
  }

  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    offset += 2;

    if (marker === 0xd8 || marker === 0xd9) {
      continue;
    }

    const segmentLength = buffer.readUInt16BE(offset);

    if (isStartOfFrame(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += segmentLength;
  }

  throw new Error("Unable to read JPEG dimensions from social image");
}

function isStartOfFrame(marker) {
  return (
    marker >= 0xc0 &&
    marker <= 0xcf &&
    ![0xc4, 0xc8, 0xcc].includes(marker)
  );
}
