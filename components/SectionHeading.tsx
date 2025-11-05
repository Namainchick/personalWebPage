import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold tracking-tight mb-12 ${className}`}
      style={{
        textShadow: '0 0 30px rgba(79, 70, 229, 0.2)'
      }}
    >
      {children}
    </h2>
  );
}
