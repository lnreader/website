import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sans = localFont({
  variable: "--font-sans-base",
  src: [
    { path: "../../public/fonts/manrope-regular.ttf", weight: "400" },
    { path: "../../public/fonts/manrope-semibold.ttf", weight: "600" },
    { path: "../../public/fonts/manrope-extrabold.ttf", weight: "800" },
  ],
  display: "swap",
});

const mono = localFont({
  variable: "--font-mono-base",
  src: [
    { path: "../../public/fonts/dm-mono-regular.ttf", weight: "400" },
    { path: "../../public/fonts/dm-mono-medium.ttf", weight: "500 700" },
  ],
  display: "swap",
});

const display = localFont({
  variable: "--font-display",
  src: [
    { path: "../../public/fonts/space-grotesk-regular.ttf", weight: "400" },
    { path: "../../public/fonts/space-grotesk-medium.ttf", weight: "500" },
    { path: "../../public/fonts/space-grotesk-semibold.ttf", weight: "600 700" },
  ],
  display: "swap",
});

const siteName = "LNReader";
const siteTagline = "Open Source Light Novel Reader for Android";
const siteDescription =
  "A thoughtfully designed light novel reader for Android. Open source, free, works online and offline.";
const baseUrl = new URL("https://www.lnreader.app");
const previewImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "LNReader, an open source light novel reader for Android",
};

export const metadata: Metadata = {
  metadataBase: baseUrl,
  icons: {
    icon: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  },
  title: {
    default: `${siteName} · ${siteTagline}`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "light novels",
    "reader",
    "lnreader",
    "android",
    "open source",
    "tachiyomi",
    "offline reading",
    "free light novel app",
    "japanese novels",
    "novel tracker",
  ],
  openGraph: {
    title: `${siteName} · ${siteTagline}`,
    description: siteDescription,
    url: baseUrl,
    siteName,
    images: [previewImage],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} · ${siteTagline}`,
    description: siteDescription,
    images: [previewImage],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#edf3f3",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} ${display.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
