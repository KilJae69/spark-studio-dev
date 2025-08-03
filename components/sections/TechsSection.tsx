import { useTranslations } from "next-intl";
import { Container } from "../Container";
import { FadeIn } from "../FadeIn";
import Marquee from "react-fast-marquee";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

import nextLogo from "@/images/tech/next-logo.svg";
import reactLogo from "@/images/tech/react-logo.svg";
import tailwindLogo from "@/images/tech/tailwind-logo.svg";
import laravelLogo from "@/images/tech/laravel-logo.svg";
import vercelLogo from "@/images/tech/vercel-logo.svg";
import hetznerLogo from "@/images/tech/hetzner-logo.svg";
import filamentLogo from "@/images/tech/filament-logo.svg";
import openaiLogo from "@/images/tech/openai-logo-2.svg";
import { SparklesText } from "../ui/sparkes-text";

const techs: [string, StaticImageData, number][] = [
  ["NextJs", nextLogo, 1],
  ["React", reactLogo, 2],
  ["Tailwind", tailwindLogo, 3],
  ["Laravel", laravelLogo, 4],
  ["OpenAi", openaiLogo, 5],
  ["Vercel", vercelLogo, 6],
  ["Hetzner", hetznerLogo, 7],
  ["Filament", filamentLogo, 8],
  // repeat for seamless marquee
  ["NextJs", nextLogo, 9],
  ["React", reactLogo, 10],
  ["Tailwind", tailwindLogo, 11],
  ["Laravel", laravelLogo, 12],
  ["OpenAi", openaiLogo, 13],
  ["Vercel", vercelLogo, 14],
  ["Hetzner", hetznerLogo, 15],
  ["Filament", filamentLogo, 16],
];

export default function TechsSection() {
  const t = useTranslations("HomePage");

  return (
    <section className="rounded-sm bg-primary-800 py-10 md:py-20">
      <Container>
        {/* Title + Divider */}
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            <SparklesText textColor="text-white" className="text-md lg:text-xl">{t("techSectionTitle")}</SparklesText>
          </h2>
          <div className="h-px flex-auto bg-primary-600" />
        </FadeIn>

        {/* Aspirational Subtitle */}
        <FadeIn className="mt-4">
          <p className="text-center text-sm lg:text-lg text-primary-300 max-w-xl mx-auto">
            {t("techSectionSubtitle")}
          </p>
        </FadeIn>
      </Container>

      {/* Scrolling Logos */}
      <Marquee pauseOnHover className="overflow-y-hidden mt-4">
        <ul
          role="list"
          className="mx-10 flex gap-10 md:gap-20 items-center justify-center"
        >
          {techs.map(([tech, logo, id]) => (
            <li key={id}>
              <div
                className={clsx(
                  "relative flex items-center justify-center",
                  "h-[70px] w-[120px] md:h-[120px] md:w-[230px]",
                  (tech === "OpenAi" ||
                    tech === "Laravel" ||
                    tech === "Filament") &&
                    "scale-[1.5]"
                )}
              >
                <Image
                  src={logo}
                  alt={tech}
                  unoptimized
                  fill
                  className="object-contain"
                />
              </div>
            </li>
          ))}
        </ul>
      </Marquee>
    </section>
  );
}
