import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans-base",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Grotesk({
  variable: "--font-mono-base",
  subsets: ["latin"],
  display: "swap",
});

const siteName = "LNReader";
const siteTagline = "Open Source Light Novel Reader for Android";
const siteDescription =
  "A thoughtfully designed light novel reader for Android. Open source, free, works online and offline.";
const baseUrl = new URL("https://lnreader.app");

export const metadata: Metadata = {
  metadataBase: baseUrl,
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", url: "/icon.svg", type: "image/svg+xml" },
    ],
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} · ${siteTagline}`,
    description: siteDescription,
  },
  alternates: {
    canonical: baseUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#106e81",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
