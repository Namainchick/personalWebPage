import { homepageDetails } from "@/data/homepage-details";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About – Namanh Bui Vu" };

export default function AboutPage() {
  const blocks = [homepageDetails.about, homepageDetails.mission, homepageDetails.hobbies].filter(Boolean);
  return (
    <div>
      <BackLink />
      <SectionHeader eyebrow="about" title="About" />
      <p className="font-mono text-[13px] text-[var(--muted-2)] flex flex-wrap gap-x-4 gap-y-1 mb-8">
        <span>location: Hamburg, DE</span><span>·</span><span>studying: CS @ TUHH</span>
        <span>·</span><a href="/Namanh_Bui_Vu_CV.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-deep)]">cv: pdf ↗</a>
      </p>
      <div className="space-y-5 text-[var(--ink)] leading-[1.7] max-w-[62ch] text-[16px]">
        {blocks.flatMap((b, bi) => b!.content.split("\n\n").map((p, pi) => <p key={`${bi}-${pi}`}>{p}</p>))}
      </div>
    </div>
  );
}
