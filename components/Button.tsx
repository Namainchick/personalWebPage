import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
}

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]";

  const variants = {
    primary:
      "glass-button text-white active:scale-[0.98]",
    secondary:
      "border border-white/10 bg-white/[0.03] backdrop-blur-sm text-gray-200 hover:border-white/20 hover:bg-white/[0.08] active:scale-[0.98] shadow-lg",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (external || href.startsWith("mailto:") || href.startsWith("http")) {
      return (
        <a
          href={href}
          className={combinedClassName}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return <button className={combinedClassName}>{children}</button>;
}
