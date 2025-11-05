"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = "", hoverable = false }: CardProps) {
  const hoverStyles = hoverable
    ? "hover:scale-[1.01] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 cursor-pointer"
    : "";

  return (
    <article
      className={`
        rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8
        backdrop-blur-sm
        ${hoverStyles}
        ${className}
      `}
      style={{
        boxShadow: hoverable 
          ? 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 20px rgba(0, 0, 0, 0.2), 0 0 40px rgba(79, 70, 229, 0.05)'
          : 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 20px rgba(0, 0, 0, 0.2)',
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px rgba(79, 70, 229, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 20px rgba(0, 0, 0, 0.2), 0 0 40px rgba(79, 70, 229, 0.05)';
        }
      }}
      tabIndex={hoverable ? 0 : undefined}
    >
      {children}
    </article>
  );
}
