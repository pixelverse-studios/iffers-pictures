import type { Metadata } from "next";
import { Josefin_Slab, Nunito } from "next/font/google";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";
import { Providers } from "@/components/providers/Providers";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SiteChrome } from "@/components/layout/SiteChrome";

const josefinSlab = Josefin_Slab({
  variable: "--font-josefin-slab",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  title: {
    default: `${SITE_CONFIG.name} | Event Photographer in ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "event photographer",
    "engagement photography",
    "baby shower photographer",
    "bridal shower photography",
    "party photographer",
    "Cliffside Park photographer",
    "Bergen County photographer",
    "Northern NJ photographer",
    "New Jersey event photography",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      {...mantineHtmlProps}
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body
        className={`${josefinSlab.variable} ${nunito.variable} antialiased min-h-screen flex flex-col`}
      >
        <GoogleAnalytics />
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
