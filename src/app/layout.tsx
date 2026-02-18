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

export const metadata: Metadata = {
  title: "Ksar Nujum | Luxury Villas & Longevity Resort in Marrakech",
  description: "An organic architectural sanctuary in Marrakech. Where ultra-luxury living integrates with the science of eternal youth.",
  keywords: ["luxury villas", "Marrakech", "longevity", "wellness", "Morocco", "real estate", "organic architecture"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
