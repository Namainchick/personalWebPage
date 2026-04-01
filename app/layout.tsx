import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { getServerLanguage } from "@/lib/i18n-server";
import Sidebar from "@/components/Sidebar";
import BackgroundDecoration from "@/components/BackgroundDecoration";
import { getTranslations } from "@/lib/i18n";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getServerLanguage();

  const t = getTranslations(language);

  const navItems = [
    { label: t.nav.experiences, href: "/erfahrungen" },
    { label: t.nav.projects, href: "/projekte" },
    { label: t.nav.contact, href: "/kontakt" },
  ];

  return (
    <html lang={language}>
      <body className="antialiased">
        <div className="flex">
          <Sidebar language={language} navItems={navItems} />
          <div className="flex-1 min-w-0 relative">
            <BackgroundDecoration />
            <Nav language={language} />
            <main className="min-h-screen relative z-10">{children}</main>
            <Footer language={language} />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
