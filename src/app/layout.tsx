import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Italiana, Jost, Pinyon_Script } from "next/font/google";
import { weddingConfig } from "@/config/wedding";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italiana",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(weddingConfig.seo.canonicalUrl),
  title: weddingConfig.seo.title,
  description: weddingConfig.seo.description,
  openGraph: {
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    images: [{ url: weddingConfig.seo.ogImage, width: 1200, height: 630 }],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#14110F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${italiana.variable} ${jost.variable} ${pinyon.variable} bg-[#14110F] text-[#3B2F2A]`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#14110F] text-[#F7F1E8] antialiased selection:bg-[#C9A96E] selection:text-[#14110F]"
      >
        {children}
      </body>
    </html>
  );
}
