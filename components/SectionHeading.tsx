import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <div className={`flex items-center gap-6 mb-12 ${className}`}>
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight whitespace-nowrap"
        style={{
          textShadow: '0 0 40px rgba(79, 70, 229, 0.4), 0 0 80px rgba(79, 70, 229, 0.2)'
        }}
      >
        {children}
      </h2>
      <div 
        className="h-[2px] flex-1 max-w-[50%] bg-gradient-to-r from-[#4f46e5] via-[#4f46e5]/20 to-transparent"
        style={{
          boxShadow: '0 0 25px rgba(79, 70, 229, 0.8), 0 0 50px rgba(79, 70, 229, 0.4)'
        }}
        aria-hidden="true"
      />
    </div>
  );
}
