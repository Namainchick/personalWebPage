"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Erfahrungen", href: "/erfahrungen" },
  { label: "Projekte", href: "/projekte" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header 
      className="sticky top-0 z-30 w-full border-b border-white/10 backdrop-blur-xl bg-[#0a0a0a]/70"
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(79, 70, 229, 0.05)'
      }}
    >
      <nav className="mx-auto w-full max-w-[95%] px-2 md:px-3 lg:px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-6">
            {/* Logo/Name */}
            <Link href="/" className="group">
              <span className="text-lg font-semibold tracking-tight hover:text-[#4f46e5] transition-colors duration-200">
                Namanh
              </span>
            </Link>

            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        relative px-3 py-2 text-sm font-medium transition-all duration-150
                        ${
                          isActive
                            ? "text-[#4f46e5]"
                            : "text-gray-300 hover:text-white"
                        }
                      `}
                      style={isActive ? {
                        textShadow: '0 0 20px rgba(79, 70, 229, 0.5)'
                      } : undefined}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4f46e5]"
                          style={{
                            boxShadow: '0 0 10px rgba(79, 70, 229, 0.8)'
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/namanh-bui-vu-37b05a2a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-[#4f46e5] transition-colors duration-200"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Namainchick"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-[#4f46e5] transition-colors duration-200"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="mailto:namanh.bui2005@gmail.com"
              className="text-sm text-gray-400 hover:text-[#4f46e5] transition-colors duration-200"
              aria-label="E-Mail"
            >
              Mail
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
