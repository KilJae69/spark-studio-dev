import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { GrayscaleTransitionImage } from "@/components/GrayscaleTransitionImage";
// import { MDXComponents } from "@/components/MDXComponents";
import { PageIntro } from "@/components/PageIntro";
//  import { PageLinks } from "@/components/PageLinks";

import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/lib/locales";
import {
  getLocalizedCaseStudies,
  getLocalizedCaseStudy,
} from "@/lib/getBlogPosts";

import { CaseStudy } from "@/lib/types";
import { PageLinks } from "@/components/PageLinks";
import OutsideLink from "@/components/shared/OutsideLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getLocalizedCaseStudy(locale, slug);

  if (!data || !data.data) {
    return {
      title: "Case Study Not Found",
      description: "The case study you are looking for does not exist.",
    };
  }
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const caseStudy = data.data;
  const ogImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(
    caseStudy.title
  )}&description=${encodeURIComponent(caseStudy.og_desc)}&locale=${locale}&ogCTA1=${encodeURIComponent(t("ogCTA1"))}&ogCTA2=${encodeURIComponent(t("ogCTA2"))}&pill=${encodeURIComponent(t("ogPillProject"))}`;

  return {
    title: `${caseStudy.title} | Spark Studio`,
    description:
      caseStudy.short_description ||
      caseStudy.excerpt ||
      "Read the latest insights on Spark Studio.",
      openGraph: {
        title: caseStudy.title,
        description: caseStudy.short_description,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: caseStudy.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: caseStudy.title,
        description: caseStudy.short_description,
        images: [ogImageUrl],
      },
  };
}

export async function generateStaticParams() {
  const params = [];

  for (const locale of locales) {
    const posts = await getLocalizedCaseStudies(locale);

    for (const post of posts.data) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return params;
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SingleCaseStudyPage");
  const data = await getLocalizedCaseStudy(locale, slug);
  const singleCaseStudy: CaseStudy = data.data;

  const allCaseStudiesData = await getLocalizedCaseStudies(locale);
  const allCaseStudies: CaseStudy[] = allCaseStudiesData.data;

  const restOfCaseStudies = allCaseStudies
    .filter(({ id }) => id !== singleCaseStudy.id)
    .slice(0, 2);

  if (!singleCaseStudy) return notFound();

  const {
    title,
    short_description,
    client,
    created_at,
    service,
    featured_image,
    body,
    url,
  } = singleCaseStudy;
  console.log(url);
  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro eyebrow={t("eyebrow")} title={title} centered>
            <p>{short_description}</p>
          </PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{t("client")}</dt>
                      <dd>{client}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{t("year")}</dt>
                      <dd>
                        <time dateTime={created_at.split("-")[0]}>
                          {created_at.split("-")[0]}
                        </time>
                      </dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{t("service")}</dt>
                      <dd>{service}</dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            <div className="border-y  border-neutral-200 bg-neutral-100">
              <div className="-my-px mx-auto max-w-[76rem]  rounded-xl">
                <GrayscaleTransitionImage
                  src={`https://admin.spark-dev-studio.com/storage/${featured_image}`}
                  quality={90}
                  className="w-full"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                />
                {/* <Image src={`https://admin.spark-dev-studio.com/storage/${featured_image}`} width={400} height={400} alt=""/>   */}
              </div>
            </div>
          </FadeIn>
        </header>

        <Container className="">
          <FadeIn className="flex justify-center">
            <section
              className="mt-24 prose"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </FadeIn>
          <div className="w-full mt-8 flex items-center">
            <OutsideLink href={url}>{t("CTALink")}</OutsideLink>
          </div>
        </Container>
      </article>

      {restOfCaseStudies.length > 0 && (
        <PageLinks
          locale={locale}
          className="mt-24 "
          title={t("pageLinksTitle")}
          linkLabel={t("pageLinksLink")}
          pages={restOfCaseStudies}
        />
      )}

      <ContactSection />
    </>
  );
}
