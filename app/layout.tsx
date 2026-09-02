import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { display, sans, mono } from "@/lib/fonts";
import { getCodingView } from "@/lib/coding";
import { getTikTokCards } from "@/lib/tiktok";
import { content } from "@/data/content";
import { site } from "@/data/site";
import { StoreProvider } from "@/components/os/StoreProvider";
import { Desktop } from "@/components/os/Desktop";

const description =
  "Product Engineer at Arbio, CS at TUHH, six hackathon wins, TikTok about tech careers. A portfolio that boots.";

export const metadata: Metadata = {
  title: { default: "Namanh Bui Vu — namOS", template: "%s · namOS" },
  description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: "Namanh Bui Vu — namOS",
    description,
    url: site.url,
    siteName: "namanh.dev",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "namOS desktop with the about.sh terminal open" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Namanh Bui Vu — namOS", description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [grind, tiktok] = await Promise.all([getCodingView(), getTikTokCards(content.featured)]);
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <StoreProvider>
          <Desktop data={{ grind, tiktok }}>{children}</Desktop>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
