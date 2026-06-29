import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";
import { Button } from "@/components/ui/button";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Namainchick" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/namanh-bui-vu-37b05a2a9/"
  },
  { label: "TikTok", href: "https://www.tiktok.com/@namb.tech" }
];

export default function KontaktPage() {
  return (
    <div>
      <BackLink />
      <SectionHeader
        eyebrow="contact"
        title="Contact"
        sub="Reach out — about projects, collaboration, or just to say hi."
      />
      <Button href="mailto:namanh.bui2005@gmail.com">
        namanh.bui2005@gmail.com
      </Button>
      <div className="mt-8 flex flex-wrap gap-5 font-sans text-[15px] text-[var(--muted)]">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent-deep)]"
          >
            {s.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
