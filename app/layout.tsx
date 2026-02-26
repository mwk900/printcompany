import type { Metadata } from "next";
import { Bitter, Space_Grotesk } from "next/font/google";
import { SiteChrome } from "@/components/site/site-chrome";
import { disclaimerText, siteConfig } from "@/lib/site-data";
import "./globals.css";

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Bitter({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.siteName} | Print Concept`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description:
    "Portfolio-safe concept website for a fictional Nottingham B2B print and reprographics company.",
  keywords: [
    "Nottingham print company",
    "B2B printing",
    "reprographics",
    "leaflets and flyers",
    "print portfolio concept",
  ],
  openGraph: {
    title: `${siteConfig.siteName} | Nottingham B2B Print`,
    description:
      "Fictional conversion-focused print and reprographics concept for portfolio demonstration.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.siteName} portfolio concept`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.siteName} | Nottingham B2B Print`,
    description:
      "Fictional conversion-focused print and reprographics concept for portfolio demonstration.",
    images: ["/opengraph-image"],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: `${siteConfig.siteName} (Portfolio Concept)`,
  description:
    "Fictional B2B print and reprographics company concept created for web design portfolio demonstration.",
  telephone: siteConfig.phoneDisplay,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.addressLine,
    addressLocality: "Nottingham",
    addressCountry: "GB",
  },
  areaServed: siteConfig.serviceArea,
  url: siteConfig.siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
        <div className="sr-only">{disclaimerText}</div>
      </body>
    </html>
  );
}
