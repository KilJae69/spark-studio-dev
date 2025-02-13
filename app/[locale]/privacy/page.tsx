import { FadeIn } from "@/components/FadeIn";
import { PageIntro } from "@/components/PageIntro";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");

  return (
    <>
      <PageIntro
        centered
        eyebrow={t("eyebrow", { year: new Date().getFullYear() })}
        title={t("title")}
      >
        <p>{t("intro")}</p>
      </PageIntro>
      <FadeIn className="prose mx-auto my-12">
        <h2>{t("sections.information_we_collect.title")}</h2>
        <p>{t("sections.information_we_collect.description")}</p>
        <ul>
          <li>
            {t.rich("sections.information_we_collect.points.0", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
          {t.rich("sections.information_we_collect.points.1", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
          {t.rich("sections.information_we_collect.points.2", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
        </ul>

        <h2>{t("sections.how_we_use.title")}</h2>
        <ul>
          <li>{t("sections.how_we_use.points.0")}</li>
          <li>{t("sections.how_we_use.points.1")}</li>
          <li>{t("sections.how_we_use.points.2")}</li>
        </ul>

        <h2>{t("sections.data_sharing.title")}</h2>
        <p>
        {t.rich("sections.data_sharing.description", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
        </p>

        <h2>{t("sections.data_security.title")}</h2>
        <ul>
        <li>{t.rich("sections.data_security.points.0", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}</li>
          <li>{t.rich("sections.data_security.points.1", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}</li>
          <li>{t.rich("sections.data_security.points.2", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}</li>
        </ul>

        <h2>{t("sections.user_rights.title")}</h2>
        <ul>
          <li>
          {t.rich("sections.user_rights.points.0", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
          {t.rich("sections.user_rights.points.1", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
        </ul>

        <h2>{t("sections.changes.title")}</h2>
        <p>
        {t("sections.changes.description")}
        </p>

        <h2>{t("sections.contact.title")}</h2>
        <p>
        {t.rich("sections.contact.description",{
              a: (chunks) => <a href="mailto:info@spark-dev-studio.com">{chunks}</a>,
              Link: (chunks)=> <Link href="/contact">{chunks}</Link>
            })}
         
        </p>

        <p>
        {t.rich("sections.thank_you",{
              strong: (chunks) =><strong>{chunks}</strong>,
              span: (chunks) => <span className="text-primary-accent">{chunks}</span>
          
            })}
        </p>
      </FadeIn>
    </>
  );
}
