import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <div className={`flex items-center gap-6 mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight whitespace-nowrap text-gray-900">
        {children}
      </h2>
      <div
        className="h-[2px] flex-1 max-w-[50%] bg-gradient-to-r from-teal-500 via-teal-200 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
