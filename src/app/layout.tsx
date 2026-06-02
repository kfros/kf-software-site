import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { brandIdentity, heroContent } from "./content";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kf-software.com"),
  title: {
    default: "KF Software — Small software for real-world problems",
    template: "%s | KF Software",
  },
  description: heroContent.subheading,
  applicationName: brandIdentity.logoText,
  authors: [{ name: brandIdentity.legalName }],
  creator: brandIdentity.legalName,
  publisher: brandIdentity.legalName,
  keywords: [
    "KF Software",
    "ChillPup",
    "dog routines",
    "privacy-conscious apps",
    "Wrocław software",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KF Software — Small software for real-world problems",
    description: heroContent.subheading,
    url: "https://kf-software.com",
    siteName: brandIdentity.logoText,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KF Software — Small software for real-world problems",
    description: heroContent.subheading,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
