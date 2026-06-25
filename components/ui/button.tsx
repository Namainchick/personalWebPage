import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "icon";

const base =
  "inline-flex items-center gap-2 font-sans cursor-pointer transition-[transform,background,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2";

const glass =
  "[background:var(--glass-grad)] [backdrop-filter:blur(14px)_saturate(1.4)] [-webkit-backdrop-filter:blur(14px)_saturate(1.4)] border border-[var(--glass-border)] [box-shadow:var(--glass-inset)] hover:-translate-y-px active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "text-[var(--bright)] font-semibold text-[14px] rounded-[var(--radius-ctrl)] px-5 py-3 border-0 [background:var(--accent)] [box-shadow:rgba(255,255,255,0.18)_0_1px_0_0_inset,rgba(55,75,42,0.35)_0_6px_16px_-8px] hover:-translate-y-px hover:[background:#6AA564] active:translate-y-0",
  ghost: `text-[var(--ink)] font-medium text-[14px] rounded-[var(--radius-ctrl)] px-5 py-3 ${glass}`,
  icon: `justify-center w-[40px] h-[40px] rounded-full text-[var(--ink)] ${glass}`,
};

type Props = { variant?: Variant; className?: string; href?: string } & AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "primary", className, href, ...props }: Props) {
  const cls = cn(base, variants[variant], className);
  if (href) return <a href={href} className={cls} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  return <button className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
