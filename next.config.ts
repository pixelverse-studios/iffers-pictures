import type { NextConfig } from "next";

type ImageRemotePatterns = NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
>;
type ImageRemotePattern = ImageRemotePatterns[number];

const DEFAULT_MEDIA_PUBLIC_BASE_URL =
  "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";
const DEFAULT_MEDIA_CUSTOM_DOMAIN = "https://media.ifferspictures.com";

const mediaPublicBaseUrls = [
  DEFAULT_MEDIA_PUBLIC_BASE_URL,
  DEFAULT_MEDIA_CUSTOM_DOMAIN,
  ...parseMediaPublicBaseUrls(process.env.MEDIA_PUBLIC_BASE_URLS),
  ...parseMediaPublicBaseUrls(process.env.MEDIA_PUBLIC_BASE_URL),
  ...parseMediaPublicBaseUrls(process.env.NEXT_PUBLIC_MEDIA_PUBLIC_BASE_URL),
];

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    remotePatterns: buildMediaRemotePatterns(mediaPublicBaseUrls),
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;

function parseMediaPublicBaseUrls(value: string | undefined): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildMediaRemotePatterns(urls: string[]): ImageRemotePatterns {
  const patterns = new Map<string, ImageRemotePattern>();

  for (const rawUrl of urls) {
    const pattern = buildMediaRemotePattern(rawUrl);

    if (!pattern) continue;

    patterns.set(`${pattern.hostname}${pattern.pathname}`, pattern);
  }

  return Array.from(patterns.values());
}

function buildMediaRemotePattern(rawUrl: string): ImageRemotePattern | null {
  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    console.warn(`Ignoring invalid media public base URL: ${rawUrl}`);
    return null;
  }

  if (url.protocol !== "https:") {
    console.warn(`Ignoring non-HTTPS media public base URL: ${rawUrl}`);
    return null;
  }

  if (!isAllowedMediaImageHost(url.hostname)) {
    console.warn(`Ignoring unsupported media image host: ${url.hostname}`);
    return null;
  }

  const pathname = url.pathname.replace(/\/$/, "");

  return {
    protocol: "https",
    hostname: url.hostname,
    pathname: pathname ? `${pathname}/**` : "/**",
  };
}

function isAllowedMediaImageHost(hostname: string): boolean {
  return (
    hostname === "pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev" ||
    hostname.endsWith(".r2.dev") ||
    hostname === "media.ifferspictures.com"
  );
}
