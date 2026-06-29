import { getHomeSections } from "@/lib/home-teasers";
import { HomeSectionList } from "@/components/HomeSectionList";

const SOCIALS = [
  { label: "github", href: "https://github.com/Namainchick" },
  { label: "linkedin", href: "https://www.linkedin.com/in/namanh-bui-vu-37b05a2a9/" },
  { label: "tiktok", href: "https://www.tiktok.com/@namb.tech" },
];

export default function Home() {
  const sections = getHomeSections();
  return (
    <div>
      <h1 className="font-serif text-[clamp(40px,7vw,68px)] leading-[1.0] tracking-[-0.66px] text-[var(--ink-strong)]">
        Namanh Bui Vu
      </h1>
      <p className="mt-3 text-[var(--muted)] text-[17px]">CS @ TUHH · full-stack AI builder</p>
      <p className="mt-4 font-mono text-[13px] text-[var(--muted-2)] flex flex-wrap gap-x-4 gap-y-1">
        <span>location: Hamburg, DE</span>
        <span>·</span>
        <a href="/Namanh_Bui_Vu_CV.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-deep)]">cv: pdf ↗</a>
      </p>
      <div className="mt-4 flex flex-wrap gap-4 font-sans text-[14px] text-[var(--muted)]">
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-deep)]">
            {s.label} ↗
          </a>
        ))}
      </div>
      <HomeSectionList sections={sections} />
    </div>
  );
}
