import Link from "next/link";

interface ViewAllButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function ViewAllButton({ href, children }: ViewAllButtonProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-700 bg-white border border-gray-200 hover:border-teal-300 hover:text-teal-600 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <span>{children}</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
    </Link>
  );
}
