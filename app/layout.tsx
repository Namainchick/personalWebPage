import type { Metadata } from "next";
import "./globals.css";
import { serif, sans, mono } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { getServerLanguage } from "@/lib/i18n-server";
import { SkyBackground } from "@/components/SkyBackground";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Namanh Bui Vu – Portfolio",
  description:
    "Portfolio of Namanh Bui Vu — Computer Science student at TUHH and Product Engineer. Projects, experience, contact.",
  metadataBase: new URL("https://namanh-portfolio.vercel.app"), // TODO: Anpassen nach Deployment
  openGraph: {
    title: "Namanh Bui Vu – Portfolio",
    description:
      "Portfolio of Namanh Bui Vu — Computer Science student at TUHH and Product Engineer. Projects, experience, contact.",
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Namanh Bui Vu – Portfolio",
    description:
      "Portfolio of Namanh Bui Vu — Computer Science student at TUHH and Product Engineer. Projects, experience, contact.",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getServerLanguage();
  return (
    <html lang={language} className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <SkyBackground />
        <div className="relative z-10 mx-auto w-full max-w-[760px] px-5 sm:px-6 py-10 sm:py-16 min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <Footer language={language} />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
