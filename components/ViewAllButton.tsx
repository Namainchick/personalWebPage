"use client";

import Link from "next/link";
import { useState } from "react";

interface ViewAllButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function ViewAllButton({ href, children }: ViewAllButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={href}
      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-white/[0.05] border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] hover:border-[#4f46e5]/50 transition-all duration-200"
      style={{
        boxShadow: isHovered 
          ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px rgba(79, 70, 229, 0.15)'
          : '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 40px rgba(79, 70, 229, 0.05)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{children}</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
    </Link>
  );
}
