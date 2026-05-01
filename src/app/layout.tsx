import type { Metadata } from "next";
import { Josefin_Slab, Nunito } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers/Providers";
import { DEFAULT_THEME_ID, THEMES, THEME_STORAGE_KEY } from "@/lib/themes";
import {
  DEFAULT_LAYOUT_VARIANT_ID,
  LAYOUT_VARIANT_QUERY_KEY,
  LAYOUT_VARIANT_STORAGE_KEY,
  LAYOUT_VARIANTS,
} from "@/lib/layout-variants";

// Bakes the theme token maps into an inline <script> that runs in <head>
// before hydration, so we can apply the stored theme to :root synchronously
// and avoid a flash of the default palette on first paint. Also sets
// data-theme and data-theme-mode on <html> so CSS selectors can target
// light/dark states from first paint.
const themeInitMap = Object.fromEntries(
  Object.entries(THEMES).map(([id, theme]) => [
    id,
    { mode: theme.mode, tokens: theme.tokens },
  ])
);
const themeInitScript = `
(function(){try{
var k=${JSON.stringify(THEME_STORAGE_KEY)};
var s=localStorage.getItem(k);
var M=${JSON.stringify(themeInitMap)};
var id=(s&&M[s])?s:${JSON.stringify(DEFAULT_THEME_ID)};
var e=M[id],t=e.tokens,r=document.documentElement;
for(var p in t){r.style.setProperty('--'+p,t[p]);}
r.dataset.theme=id;
r.dataset.themeMode=e.mode;
}catch(e){}})();
`.trim();

const layoutVariantInitScript = `
(function(){try{
var q=${JSON.stringify(LAYOUT_VARIANT_QUERY_KEY)};
var k=${JSON.stringify(LAYOUT_VARIANT_STORAGE_KEY)};
var M=${JSON.stringify(Object.keys(LAYOUT_VARIANTS))};
var p=new URLSearchParams(window.location.search);
var v=p.get(q);
var s=localStorage.getItem(k);
var id=(v&&M.indexOf(v)>-1)?v:((s&&M.indexOf(s)>-1)?s:${JSON.stringify(DEFAULT_LAYOUT_VARIANT_ID)});
document.documentElement.dataset.layoutVariant=id;
}catch(e){}})();
`.trim();

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: layoutVariantInitScript }} />
      </head>
      <body
        className={`${josefinSlab.variable} ${nunito.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
