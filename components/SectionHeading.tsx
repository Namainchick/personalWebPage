import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-8 ${className}`}
    >
      {children}
      <span className="text-teal-500">.</span>
    </h2>
  );
}
