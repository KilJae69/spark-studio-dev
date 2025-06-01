 // import { Blockquote } from "@/components/Blockquote";
import { Border } from "@/components/Border";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { PageIntro } from "@/components/PageIntro";
import { Link } from "@/i18n/routing";


import { ContactSection } from "@/components/sections/ContactSection";
import { Locale, locales } from "@/lib/locales";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getLocalizedCaseStudies } from "@/lib/getBlogPosts";
import { CaseStudy } from "@/lib/types";
 import Image from "next/image";



export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const revalidate = 60;

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


  return {
    title: t("titleWork"),
    description: t("descriptionWork"),
    openGraph: {
      title: t("titleWork"),
      description: t("ogDescriptionWork"),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}spark-og.png`,
          width: 1200,
          height: 630,
          alt: t("titleWork"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleWork"),
      description: t("ogDescriptionWork"),
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}spark-og.png`],
    },
  };
}

function CaseStudies({ caseStudies,t }: { caseStudies: CaseStudy[]; t:(t:string)=>string; }) {
console.log(caseStudies);
  return (
    <Container className="mt-24">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
        {t("ListSection.title")}
        </h2>
      </FadeIn>
      
      <div className="mt-10 space-y-20 sm:space-y-24 ">
   
        {caseStudies.map((caseStudy) => (
          <FadeIn key={caseStudy.client}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                      <Image
                      src={`https://admin.spark-dev-studio.com/storage/${caseStudy.logo}`}
                      alt=""
                      height={64}
                      width={64}
                      className="h-16 w-16 flex-none"
                      unoptimized
                    />  
                    <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                      {caseStudy.client}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {caseStudy.service}
                    </p>
                    <p className="text-sm text-neutral-950 lg:mt-2">
                      <time dateTime={caseStudy.year}>
                        {caseStudy.year}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-neutral-950">
                    <Link href={{ pathname: "/projects/[slug]", params: { slug: caseStudy.slug } }}>{caseStudy.title}</Link>
                  </p>
                  <div className="mt-6 space-y-6 text-base text-neutral-600">
                  
                      <p >{caseStudy.short_description}</p>
                   
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={{ pathname: "/projects/[slug]", params: { slug: caseStudy.slug } }}
                      aria-label={`Read case study: ${caseStudy.client}`}
                    >
                      {t("ListSection.CTAButton")}
                    </Button>
                  </div>
                  {/* {caseStudy.testimonial && (
                    <Blockquote
                      author={caseStudy.testimonial.author}
                      className="mt-12"
                    >
                      {caseStudy.testimonial.content}
                    </Blockquote>
                  )} */}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
   
    </Container>
  );
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {

  const { locale } = await params;
  
    if (!locales.includes(locale as Locale)) {
      notFound();
    }
  
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "WorkPage" });
  
    const data = await getLocalizedCaseStudies(locale);
    const caseStudies = data.data
  return (
    <>
      <PageIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
      >
        <p>
        {t("paragraph")}
        </p>
      </PageIntro>
      <CaseStudies  t={t} caseStudies={caseStudies} />
      <ContactSection />
     
    </>
  );
}
