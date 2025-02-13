import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";


export default function NotFoundPage() {
  const t = useTranslations("NotFound");
  return (
    <>
      <Container className="flex  items-center pt-24 sm:pt-32 lg:pt-40">
        <FadeIn className="flex max-w-xl flex-col items-center text-center">
          <p className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
            {t("title")}
          </p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
            {t("header")}
          </h1>
          <p className="mt-2 text-sm text-neutral-600">{t("description")}</p>
          <Link
            href="/"
            className="mt-4 text-sm font-semibold text-neutral-950 transition hover:text-neutral-700"
          >
            {t("homeLink")}
          </Link>
        </FadeIn>
      </Container>
      
    </>
  );
}
