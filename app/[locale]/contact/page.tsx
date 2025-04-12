import { type Metadata } from "next";
import { Border } from "@/components/Border";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { PageIntro } from "@/components/PageIntro";
import { SocialMedia } from "@/components/SocialMedia";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Locale, locales } from "@/lib/locales";
import { notFound } from "next/navigation";

import ContactForm from "@/components/ContactForm";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const ogImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(
    t("titleContact")
  )}&description=${encodeURIComponent(t("ogDescriptionContact"))}&locale=${locale}`;

  return {
    title: t("titleContact"),
    description: t("descriptionContact"),
    openGraph: {
      title: t("titleContact"),
      description: t("ogDescriptionContact"),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t("titleContact"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleContact"),
      description: t("ogDescriptionContact"),
      images: [ogImageUrl],
    },
  };
}

function ContactDetails({ t }: { t: (key: string) => string }) {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        {t("contactDetails.noOfficesTitle")}
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        {t("contactDetails.description")}
      </p>
      <div className="mt-4">
        <p className="text-sm text-neutral-600">
          🛜{t("contactDetails.wifiNote")}
        </p>
      </div>

      <Border className="mt-10 pt-10">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t("contactDetails.emailSection.title")}
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ["Careers", "careers@spark-dev-studio.com"],
            ["Marketing", "marketing@spark-dev-studio.com"],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <a
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-10 pt-10 grid grid-cols-2 ">
        <div>
          <h2 className="font-display text-base font-semibold text-neutral-950">
          {t("contactDetails.callUsSection.title")}
          </h2>
          <a className="mt-2 inline-block text-neutral-600 hover:text-neutral-950" href="tel:+38761250293">
            +38761250293
          </a>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-neutral-950">
            {t("contactDetails.socialMediaSection.title")}
          </h2>
          <SocialMedia className="mt-2" />
        </div>
      </Border>

      <Border className="mt-10 pt-10 ">
       
      </Border>
    </FadeIn>
  );
}

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return (
    <>
      <PageIntro eyebrow={t("pageIntro.eyebrow")} title={t("pageIntro.title")}>
        <p>{t("pageIntro.description")}</p>
      </PageIntro>

      <Container className="mt-24 ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails t={t} />
        </div>
      </Container>
    </>
  );
}
