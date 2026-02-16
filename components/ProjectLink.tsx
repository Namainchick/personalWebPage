interface ProjectLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
}

export default function ProjectLink({ href, children, variant = "primary" }: ProjectLinkProps) {
  const colorClass = {
    primary: "text-teal-600 hover:text-teal-700",
    secondary: "text-gray-400 hover:text-gray-700",
    light: "text-white/80 hover:text-white",
  }[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1 font-medium transition-all duration-200 ${colorClass}`}
    >
      <span>{children}</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
    </a>
  );
}
