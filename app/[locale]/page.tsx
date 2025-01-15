import Image, { StaticImageData } from "next/image";
// import Link from 'next/link'

import { ContactSection } from "@/components/ContactSection";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { List, ListItem } from "@/components/List";
import { SectionIntro } from "@/components/SectionIntro";
import { StylizedImage } from "@/components/StylizedImage";
import { Testimonial } from "@/components/Testimonial";

import logoPetVet from "@/images/clients/pet-vet/petvet-logo.png";
import imageLaptop from "@/images/laptop.jpg";
import nextLogo from "@/images/tech/next-logo.png";
import reactLogo from "@/images/tech/react-logo.png";
import tailwindLogo from "@/images/tech/tailwind-logo.png";
import laravelLogo from "@/images/tech/laravel-logo.png";
import mySqlLogo from "@/images/tech/mysql-logo.png";
import strapiLogo from "@/images/tech/strapi-logo.png";
import { useTranslations } from "next-intl";
// import MarqueeBanner from '@/components/shared/marquee-banner'

// import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

// const clients = [
//   // ["Pet Vet", logoPetVet],
//   ["Phobia", logoPhobiaLight],
//   ["Family Fund", logoFamilyFund],
//   ["Unseal", logoUnseal],
//   ["Mail Smirk", logoMailSmirk],
//   ["Home Work", logoHomeWork],
//   ["Green Life", logoGreenLife],
//   ["Bright Path", logoBrightPath],
//   ["North Adventures", logoNorthAdventures],
// ];

const techs: [string, StaticImageData][] = [
  ["NextJs", nextLogo],
  ["React", reactLogo],
  ["Tailwind", tailwindLogo],
  ["Laravel", laravelLogo],
  ["My SQL", mySqlLogo],
  ["Strapi", strapiLogo],
];

function Techs() {
  const t = useTranslations("HomePage");
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            {t("techSectionTitle")}
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {techs.map(([tech, logo]) => (
              <li key={tech}>
                <FadeIn>
                  <div className="relative w-[300px] ">
                    <Image
                      src={logo}
                      alt={tech}
                      unoptimized
                      className="object-cover size-full"
                    />
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  );
}

/*
function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Harnessing technology for a brighter future"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We believe technology is the answer to the world’s greatest
          challenges. It’s also the cause, so we find ourselves in bit of a
          catch 22 situation.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}
*/
function Services() {
  const t = useTranslations("ServicesSection");
  return (
    <>
      <SectionIntro
        eyebrow={t("eyebrow")}
        title={t("heading")}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{t("subheading")}</p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title={t("webDevelopmentTitle")}>
              {t("webDevelopment")}
            </ListItem>
            <ListItem title={t("applicationDevelopmentTitle")}>
              {t("applicationDevelopment")}
            </ListItem>
            <ListItem title={t("eCommerceTitle")}>{t("eCommerce")}</ListItem>
            <ListItem title={t("customContentManagementTitle")}>
              {t("customContentManagement")}
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
}

export default function Home() {
  //  let caseStudies = (await loadCaseStudies()).slice(0, 3)
  const t = useTranslations("HomePage");
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-xl text-neutral-600">{t("about")}</p>
        </FadeIn>
      </Container>

      <Techs />

      {/* <CaseStudies caseStudies={caseStudies} /> */}

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: "Pet Vet", logo: logoPetVet }}
      >
        The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.
      </Testimonial>
      {/* <MarqueeBanner text='The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.'/> */}
      <Services />

      <ContactSection />
    </>
  );
}
