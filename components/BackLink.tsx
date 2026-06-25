import Link from "next/link";

export function BackLink({ href = "/", label = "back to home" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 font-mono text-[13px] text-[var(--muted)] hover:text-[var(--accent-deep)] mb-10"
    >
      <span aria-hidden>←</span> {label}
    </Link>
  );
}
