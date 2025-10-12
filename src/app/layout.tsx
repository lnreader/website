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
const siteDescription =
  "Free, open source Android reader built for light novel fans.";
const baseUrl = new URL("https://lnreader.app");

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: `${siteName} · Light novel companion app`,
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
  ],
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: baseUrl,
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
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
