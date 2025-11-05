"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Über mich", href: "/" },
  { label: "Erfahrungen", href: "/erfahrungen" },
  { label: "Projekte", href: "/projekte" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header 
      className="sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur-xl bg-[#0a0a0a]/70"
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(79, 70, 229, 0.05)'
      }}
    >
      <nav className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Name */}
          <Link href="/" className="group">
            <span className="text-lg font-semibold tracking-tight hover:text-[#4f46e5] transition-colors duration-200">
              Namanh
            </span>
          </Link>

          {/* Navigation Links (rechtsbündig) */}
          <ul className="flex items-center gap-1 md:gap-2">
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
      </nav>
    </header>
  );
}
