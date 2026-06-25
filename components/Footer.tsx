import Link from "next/link";

export default function Footer({ language }: { language: string }) {
  const year = 2026;
  const impressum = language === "en" ? "Imprint" : "Impressum";
  const privacy = language === "en" ? "Privacy" : "Datenschutz";
  return (
    <footer className="mt-20 pt-8 border-t border-[rgba(55,75,42,0.12)] flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--muted-2)] font-mono">
      <span>© {year} Namanh Bui Vu</span>
      <Link href="/impressum" className="hover:text-[var(--accent-deep)]">
        {impressum}
      </Link>
      <Link href="/datenschutz" className="hover:text-[var(--accent-deep)]">
        {privacy}
      </Link>
    </footer>
  );
}
