import SectionHeading from "@/components/SectionHeading";
import ExperiencesGrid from "@/components/ExperiencesGrid";
import { getTranslatedExperiences } from "@/lib/i18n";
import { getServerI18n } from "@/lib/i18n-server";

export default async function ErfahrungenPage() {
  const { language, t } = await getServerI18n();
  const experiences = getTranslatedExperiences(language);

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>{t.experiences.heading}</SectionHeading>
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">{t.experiences.intro}</p>
      <ExperiencesGrid experiences={experiences} />
    </div>
  );
}
