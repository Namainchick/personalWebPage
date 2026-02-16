interface ProjectLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function ProjectLink({ href, children, variant = "primary" }: ProjectLinkProps) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1 font-medium transition-all duration-200 ${
        isPrimary ? "text-teal-600 hover:text-teal-700" : "text-gray-400 hover:text-gray-700"
      }`}
    >
      <span>{children}</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
    </a>
  );
}
