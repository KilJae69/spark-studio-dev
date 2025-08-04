import { useTranslations } from "next-intl";
import { Container } from "../Container";
import { FadeIn } from "../FadeIn";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { ColourfulText } from "../ui/colourful-text";
import { TextGenerateEffect } from "../ui/text-generate-effect";

import Phone3D from "@/components/FloatingPhone";
import { Button } from "../Button";
import SlideArrowLink from "../shared/SlideArrowLinkButton";

export default function HeroSection() {
  const t = useTranslations("HomePage");

  return (
    <>
      <BackgroundBeamsWithCollision>
        <Container className="mt-24 pb-24 sm:py-32 lg:pb-56 flex ">
          <FadeIn className="flex flex-col md:flex-row gap-12   items-center  w-full justify-start ">
            <div className="max-w-3xl ">
              <h1 className=" hidden md:block  font-bold text-5xl lg:text-6xl text-gradient-accent ">
                <ColourfulText text={t("title")} /> <br />
                <span className="text-3xl max-w-xl mt-4 inline-block">
                  {t("subtitle")}
                </span>
              </h1>
              <TextGenerateEffect
                className="hidden !text-lg md:block max-w-2xl"
                words={t("about")}
              />
              <h1 className="font-display md:hidden text-3xl font-bold tracking-tight text-gradient-accent [text-wrap:balance] sm:text-5xl">
                <span className="text-primary-accent mt-4 inline-block">
                  {t("title")}
                </span>{" "}
                <br />
                <span className="mt-4 inline-block">{t("subtitle")}</span>
              </h1>
              <p className="mt-4 text-slate-500 md:hidden font-neutral text-lg">
                {t("about")}
              </p>
              <div className="mt-6 gap-4 flex-col sm:items-center sm:justify-center md:justify-start sm:flex-row flex md:gap-12">
                <Button
                  className="md:text-xl whitespace-nowrap"
                  href="/projects"
                >
                  {t("projectsCta")}
                </Button>

                <SlideArrowLink
                  className="md:text-xl self-center w-fit"
                  href="/process"
                  text={t("processCta")}
                />
              </div>
            </div>
            <div className="">
              <Phone3D />
            </div>
          </FadeIn>
        </Container>
      </BackgroundBeamsWithCollision>
    </>
  );
}
