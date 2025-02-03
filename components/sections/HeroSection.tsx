

import { useTranslations } from "next-intl";
import { Container } from "../Container";
import { FadeIn } from "../FadeIn";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { ColourfulText } from "../ui/colourful-text";
import { TextGenerateEffect } from "../ui/text-generate-effect";

import Phone3D from "@/components/FloatingPhone";



export default function HeroSection() {
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
            <Phone3D/>
          </FadeIn>
        </Container>
      </BackgroundBeamsWithCollision>
    </>
  );
}
