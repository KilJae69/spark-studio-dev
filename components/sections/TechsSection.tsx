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

import strapiLogo from "@/images/tech/strapi-logo.svg";
import vercelLogo from "@/images/tech/vercel-logo.svg";
import hetznerLogo from "@/images/tech/hetzner-logo.svg";
import filamentLogo from "@/images/tech/filament-logo.svg";

const techs: [string, StaticImageData,number][] = [
    ["NextJs", nextLogo,1],
    ["React", reactLogo,2],
    ["Tailwind", tailwindLogo,3],
    ["Laravel", laravelLogo,4],
    ["Strapi", strapiLogo,5],
    ["Vercel", vercelLogo,6],
    ["Hetzner", hetznerLogo,7],
    ["Filament", filamentLogo,8],
    ["NextJs", nextLogo,9],
    ["React", reactLogo,10],
    ["Tailwind", tailwindLogo,11],
    ["Laravel", laravelLogo,12],
    ["Strapi", strapiLogo,13],
    ["Vercel", vercelLogo,14],
    ["Hetzner", hetznerLogo,15],
    ["Filament", filamentLogo,16],
  ];

export default function TechsSection() {
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
            {techs.map(([tech, logo,id]) => (
              <li key={id}>
                <div className={clsx("relative flex items-center justify-center h-[70px] w-[120px] md:h-[120px] md:w-[230px]",`${(tech === "Strapi" || tech === "Laravel" || tech === "Filament") && "scale-150"}`)}>
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