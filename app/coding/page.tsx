import { getCodingView } from "@/lib/coding";
import { CodingStats } from "@/components/CodingStats";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";
import { GlassPanel } from "@/components/ui/glass-panel";
import { getServerI18n } from "@/lib/i18n-server";
import type { Metadata } from "next";

export const revalidate = 3600;
const USERNAME = "nam_bui";

export const metadata: Metadata = { title: "The Grind – Namanh Bui Vu" };

export default async function CodingPage() {
  const { t } = await getServerI18n();
  let view = null;
  try {
    view = await getCodingView(USERNAME);
  } catch {
    view = null;
  }
  return (
    <div>
      <BackLink />
      <SectionHeader eyebrow="the grind" title="The Grind" sub="LeetCode · live · NeetCode-Fortschritt aus den letzten Solves" />
      {view ? (
        <CodingStats v={view} />
      ) : (
        <GlassPanel className="p-6">
          <p className="text-[var(--muted)]">{t.coding.error}</p>
        </GlassPanel>
      )}
    </div>
  );
}
