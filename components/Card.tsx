import { ReactNode } from "react";

export type CardVariant = "white" | "teal" | "coral" | "light-teal" | "light-coral" | "gradient";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  hoverable?: boolean;
}

export const variantStyles: Record<CardVariant, string> = {
  white: "bg-white border border-gray-200 shadow-sm text-gray-900",
  teal: "bg-teal-600 text-white",
  coral: "bg-orange-500 text-white",
  "light-teal": "bg-teal-50 text-gray-900",
  "light-coral": "bg-orange-50 text-gray-900",
  gradient: "bg-gradient-to-br from-teal-500 to-orange-500 text-white",
};

export default function Card({
  children,
  className = "",
  variant = "white",
  hoverable = false,
}: CardProps) {
  const hoverStyles = hoverable
    ? "hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer"
    : "";

  return (
    <article className={`rounded-2xl p-6 ${variantStyles[variant]} ${hoverStyles} ${className}`}>
      {children}
    </article>
  );
}
