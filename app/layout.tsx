import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Namanh Bui Vu – Portfolio",
  description: "Portfolio von Namanh Bui Vu: KI-interessierter CS-Student (TUHH). Projekte, Erfahrungen, Kontakt.",
  metadataBase: new URL("https://namanh-portfolio.vercel.app"), // TODO: Anpassen nach Deployment
  openGraph: {
    title: "Namanh Bui Vu – Portfolio",
    description: "Portfolio von Namanh Bui Vu: KI-interessierter CS-Student (TUHH). Projekte, Erfahrungen, Kontakt.",
    url: "https://namanh-portfolio.vercel.app",
    siteName: "Namanh Bui Vu Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Namanh Bui Vu Portfolio",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Namanh Bui Vu – Portfolio",
    description: "Portfolio von Namanh Bui Vu: KI-interessierter CS-Student (TUHH). Projekte, Erfahrungen, Kontakt.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
