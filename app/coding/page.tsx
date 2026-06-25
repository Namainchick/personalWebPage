import { getCodingView } from "@/lib/coding";
import { CodingStats } from "@/components/CodingStats";
import { SectionHeader } from "@/components/SectionHeader";
import { BackLink } from "@/components/BackLink";
import { GlassPanel } from "@/components/ui/glass-panel";

export const revalidate = 3600;
const USERNAME = "nam_bui";

export default async function CodingPage() {
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
          <p className="text-[var(--muted)]">LeetCode gerade nicht erreichbar. Lade die Seite gleich neu.</p>
        </GlassPanel>
      )}
    </div>
  );
}
