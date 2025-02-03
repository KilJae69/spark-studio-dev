import Image, { StaticImageData } from "next/image";


import Marquee from "react-fast-marquee";
import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { List, ListItem } from "@/components/List";
import { SectionIntro } from "@/components/SectionIntro";
import { StylizedImage } from "@/components/StylizedImage";

import imageLaptop from "@/images/laptop.jpg";
import nextLogo from "@/images/tech/next-logo.svg";
import reactLogo from "@/images/tech/react-logo.svg";
import tailwindLogo from "@/images/tech/tailwind-logo.svg";
import laravelLogo from "@/images/tech/laravel-logo.svg";

import strapiLogo from "@/images/tech/strapi-logo.svg";
import vercelLogo from "@/images/tech/vercel-logo.svg";
import hetznerLogo from "@/images/tech/hetzner-logo.svg";

import { useTranslations } from "next-intl";

import { caseStudies } from "@/constants/data";


import HeroSection from "@/components/sections/HeroSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";

const techs: [string, StaticImageData][] = [
  ["NextJs", nextLogo],
  ["React", reactLogo],
  ["Tailwind", tailwindLogo],
  ["Laravel", laravelLogo],

  ["Strapi", strapiLogo],
  ["Vercel", vercelLogo],
  ["Hetzner", hetznerLogo],
];

function Techs() {
  const t = useTranslations("HomePage");
  return (
    <div className=" rounded-sm bg-primary-800 py-10 md:py-20">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            {t("techSectionTitle")}
          </h2>
          <div className="h-px flex-auto bg-primary-600" />
        </FadeIn>
      </Container>
      <Marquee pauseOnClick className="overflow-y-hidden">
        <ul
          role="list"
          className="mt-10 mx-10 flex gap-10 md:gap-20 items-center justify-center "
        >
          {techs.map(([tech, logo]) => (
            <li key={tech}>
              <div className="relative flex items-center justify-center h-[70px] w-[120px] md:h-[120px] md:w-[230px]">
                <Image
                  src={logo}
                  alt={tech}
                  unoptimized
                  className="object-contain"
                  fill
                />
              </div>
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  );
}



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

  return (
    <>
      <HeroSection />
      <FadeIn>
        <Techs />
      </FadeIn>
      <Services />

      {/* <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: "Pet Vet", logo: logoPetVet }}
      >
        The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.
      </Testimonial> */}
      <div className="relative isolate  w-full  pt-9">
        <CaseStudiesSection caseStudies={caseStudies} />

        <ContactSection />
      </div>
    </>
  );
}
