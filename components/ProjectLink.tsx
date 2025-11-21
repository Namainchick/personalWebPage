"use client";

import { useState } from "react";

interface ProjectLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function ProjectLink({ href, children, variant = "primary" }: ProjectLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1 transition-all duration-200 ${
        isPrimary 
          ? "text-[#4f46e5] hover:text-[#4338ca]" 
          : "text-gray-400 hover:text-white"
      }`}
      style={{
        textShadow: isHovered
          ? isPrimary
            ? '0 0 25px rgba(79, 70, 229, 0.6)'
            : '0 0 20px rgba(255, 255, 255, 0.4)'
          : isPrimary
            ? '0 0 15px rgba(79, 70, 229, 0.3)'
            : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{children}</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
    </a>
  );
}
