import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-white/10 backdrop-blur-sm bg-white/[0.02]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            built and published by Namanh – All rights reserved. © {currentYear}
          </p>

          {/* Rechtliches */}
          <div className="flex gap-6 text-sm">
            <Link
              href="/impressum"
              className="text-gray-400 hover:text-white transition-colors duration-150"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-gray-400 hover:text-white transition-colors duration-150"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
