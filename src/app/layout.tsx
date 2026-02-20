import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nujum.darsociety.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ksar Nujum | Luxury Villas & Longevity Resort in Marrakech",
    template: "%s | Ksar Nujum"
  },
  description: "An organic architectural sanctuary in Marrakech. Where ultra-luxury living integrates with the science of eternal youth. Exclusive villas from €1M to €1.5M.",
  keywords: [
    "luxury villas Marrakech",
    "Marrakech real estate",
    "longevity resort Morocco",
    "wellness retreat Marrakech",
    "organic architecture",
    "bio-hacking retreat",
    "Atlas mountains villas",
    "luxury property Morocco",
    "Ksar Nujum",
    "Dar Society"
  ],
  authors: [{ name: "Dar Society" }],
  creator: "Dar Society",
  publisher: "Dar Society",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Ksar Nujum',
    title: 'Ksar Nujum | Luxury Villas & Longevity Resort in Marrakech',
    description: 'An organic architectural sanctuary in Marrakech. Where ultra-luxury living integrates with the science of eternal youth.',
    images: [
      {
        url: '/images/villas/majorelle-exterior.png',
        width: 1200,
        height: 630,
        alt: 'Ksar Nujum - Luxury Villa in Marrakech',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ksar Nujum | Luxury Villas & Longevity Resort in Marrakech',
    description: 'An organic architectural sanctuary in Marrakech. Where ultra-luxury living integrates with the science of eternal youth.',
    images: ['/images/villas/majorelle-exterior.png'],
    creator: '@darsociety',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'Real Estate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#BC9E73" />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
