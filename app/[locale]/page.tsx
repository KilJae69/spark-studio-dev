import Image, { StaticImageData } from "next/image";
// import Link from 'next/link'
import Phone3D from "@/components/FloatingPhone";
import Marquee from "react-fast-marquee";
import { ContactSection } from "@/components/ContactSection";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
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
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ColourfulText } from "@/components/ui/colourful-text";
import { caseStudies, CaseStudyType } from "@/constants/data";

import { PinContainer } from "@/components/ui/3d-pin";
import { GridPattern } from "@/components/GridPattern";

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
    <div className=" rounded-xl bg-primary-800 py-20">
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
          className="mt-10 mx-10 flex gap-20 items-center justify-center "
        >
          {techs.map(([tech, logo]) => (
            <li key={tech}>
              <div className="relative flex items-center justify-center h-[120px] w-[230px]">
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

function CaseStudies({ caseStudies }: { caseStudies: CaseStudyType[] }) {
  return (
    <div className="relative isolate bg-slate-50 py-16  md:pb-32">
    <GridPattern
        className="absolute inset-0 -z-10 h-full w-full fill-slate-100 stroke-slate-500/10 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
        yOffset={-256}
      />
      <SectionIntro
      eyebrow="Our Work"
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
        <FadeInStagger className="grid grid-cols-1 gap-20 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="w-full ">
              <PinContainer
                className="w-full group"
                href={caseStudy.href}
                title={caseStudy.title}
              >
                <div className="flex basis-full flex-col p-1  sm:p-4 w-[16rem] sm:w-[27rem] tracking-tight text-primary-100/50 lg:w-[20rem] h-[20rem] ">
                  <h3 className="max-w-xs min-h-16 !pb-2 !m-0 font-bold  text-base text-white group-hover:text-primary-accent transition">
                    {caseStudy.title}
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500 line-clamp-3">
                      {caseStudy.description}
                    </span>
                  </div>
                  <div className="mt-2 relative overflow-hidden w-full h-full rounded-xl">
                    <Image
                      className="grayscale group-hover:grayscale-0 transition-all object-cover"
                      fill
                      src={caseStudy.image.src}
                      alt={caseStudy.title}
                    />
                  </div>
                </div>
              </PinContainer>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
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
  const t = useTranslations("HomePage");

  return (
    <>
      <BackgroundBeamsWithCollision>
        <Container className="mt-24 pb-24 sm:py-32 lg:pb-56 flex">
          <FadeIn className="flex flex-col md:flex-row gap-6 items-center justify-start max-w-7xl">
            <div className="">
              <h1 className="font-display text-5xl font-bold tracking-tight text-gradient-accent [text-wrap:balance] sm:text-7xl">
                <ColourfulText text={t("title")} /> <br />
                <span className="">{t("subtitle")}</span>
              </h1>
              <TextGenerateEffect className="max-w-3xl" words={t("about")} />
            </div>
            <Phone3D />
          </FadeIn>
        </Container>
      </BackgroundBeamsWithCollision>
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
        <CaseStudies caseStudies={caseStudies} />
       
        <ContactSection />
      </div>
    </>
  );
}
