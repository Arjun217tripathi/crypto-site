import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Conserving Outfit font
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Cryptecho – Crypto & Web3 Marketing Agency in Dubai",
  description: "Cryptecho is a full-stack crypto marketing agency helping Web3, blockchain, and token projects grow through community building, influencer marketing, SEO, and paid ads.",
  metadataBase: new URL('https://cryptecho.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cryptecho – Crypto Marketing Agency',
    description: 'Full-stack Web3 & blockchain marketing agency in UAE & Dubai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cryptecho – Crypto Marketing Agency',
    description: 'Full-stack Web3 & blockchain marketing agency in UAE & Dubai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Cryptecho",
      "url": "https://cryptecho.com",
      "logo": "https://cryptecho.com/logo.png",
      "sameAs": [
        "https://twitter.com/cryptecho",
        "https://instagram.com/cryptecho",
        "https://t.me/cryptecho"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+971-50-000-0000",
        "contactType": "customer service",
        "areaServed": ["AE", "Dubai"],
        "availableLanguage": ["en", "ar"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    {
      "@type": "Service",
      "serviceType": "Crypto Marketing",
      "provider": {
        "@type": "Organization",
        "name": "Cryptecho"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web3 Marketing Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Token Launch Marketing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Community Building" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Crypto Influencer Marketing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web3 SEO & Paid Ads" } }
        ]
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          id="schema-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased bg-black text-white`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
