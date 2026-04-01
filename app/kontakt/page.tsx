import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { getServerI18n } from "@/lib/i18n-server";

export default async function KontaktPage() {
  const { t } = await getServerI18n();

  return (
    <div className="mx-auto max-w-[1100px] px-4 md:px-6 lg:px-8 py-12">
      <SectionHeading>{t.contact.heading}</SectionHeading>
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">{t.contact.intro}</p>

      <div className="bento-grid">
        {/* Email - teal, span-2 */}
        <Card variant="teal" className="col-span-2">
          <h3 className="text-xl font-semibold mb-3">{t.contact.email.heading}</h3>
          <p className="text-white/80 mb-6">{t.contact.email.description}</p>
          <a
            href="mailto:namanh.bui2005@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium bg-white text-teal-700 hover:bg-teal-50 transition-all duration-200"
          >
            {t.contact.email.cta}
          </a>
        </Card>

        {/* LinkedIn - white, span-1 */}
        <Card variant="white" hoverable className="col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{t.contact.linkedin.heading}</h3>
            <p className="text-gray-600 text-sm mb-4">{t.contact.linkedin.description}</p>
          </div>
          <a
            href="https://www.linkedin.com/in/namanh-bui-vu-37b05a2a9/"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-link text-teal-600 hover:text-teal-700 font-medium text-sm"
          >
            {t.contact.linkedin.cta}
          </a>
        </Card>

        {/* GitHub - white, span-1 */}
        <Card variant="white" hoverable className="col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{t.contact.github.heading}</h3>
            <p className="text-gray-600 text-sm mb-4">{t.contact.github.description}</p>
          </div>
          <a
            href="https://github.com/Namainchick"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-link text-teal-600 hover:text-teal-700 font-medium text-sm"
          >
            {t.contact.github.cta}
          </a>
        </Card>
      </div>
    </div>
  );
}
