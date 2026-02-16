"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = "", hoverable = false }: CardProps) {
  const hoverStyles = hoverable
    ? "hover:border-teal-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    : "";

  return (
    <article
      className={`
        rounded-2xl border border-gray-200 bg-white p-6 md:p-8
        shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.06)]
        ${hoverStyles}
        ${className}
      `}
      tabIndex={hoverable ? 0 : undefined}
    >
      {children}
    </article>
  );
}
