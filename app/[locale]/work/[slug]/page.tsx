import { ContactSection } from "@/components/ContactSection";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { GrayscaleTransitionImage } from "@/components/GrayscaleTransitionImage";
// import { MDXComponents } from "@/components/MDXComponents";
import { PageIntro } from "@/components/PageIntro";
//  import { PageLinks } from "@/components/PageLinks";
import { caseStudies } from "@/constants/data";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type CaseStudyProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const singleService = caseStudies.find((service) => service.slug === slug);
  if (!singleService) return notFound();

  // const t = await getTranslations({ locale, namespace: "ServicesList" });

  return {
    title: "Case Study",
    description: "Description",
  };
}

export function generateStaticParams() {
  const paths = caseStudies.map((service) => ({
    slug: service.slug,
  }));

  return paths;
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  // const t = await getTranslations("ServicesList");
  const singleCaseStudyData = caseStudies.find(
    (service) => service.slug === slug
  );

  if (!singleCaseStudyData) return notFound();

  const { title, description, client, date, service, image, content } =
    singleCaseStudyData;

  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro eyebrow="Case Study" title={title} centered>
            <p>{description}</p>
          </PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Client</dt>
                      <dd>{client}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Year</dt>
                      <dd>
                        <time dateTime={date.split("-")[0]}>
                          {date.split("-")[0]}
                        </time>
                      </dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Service</dt>
                      <dd>{service}</dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            <div className="border-y border-neutral-200 bg-neutral-100">
              <div className="-my-px mx-auto max-w-[76rem] bg-neutral-200">
                <GrayscaleTransitionImage
                  {...image}
                  quality={90}
                  className="w-full"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </header>

        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <h2>Overview</h2>
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </FadeIn>
        </Container>
      </article>

      {/* {moreCaseStudies.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More case studies"
          pages={moreCaseStudies}
        />
      )} */}

      <ContactSection />
    </>
  );
}
