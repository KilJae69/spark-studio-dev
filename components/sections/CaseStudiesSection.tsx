"use client";


import { GridPattern } from "../GridPattern";
import { SectionIntro } from "../SectionIntro";
import { Container } from "../Container";
import { FadeIn, FadeInStagger } from "../FadeIn";

import Image from "next/image";
 import dynamic from "next/dynamic";
import useLazyLoad from "@/hooks/useLazyLoad";
import { useTranslations } from "next-intl";
import { CaseStudy } from "@/lib/types";


 const DynamicPinContainer = dynamic(() => import("@/components/ui/3d-pin-new"));

export default function CaseStudiesSection({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const { isInView, ref } = useLazyLoad();
  const t = useTranslations("CaseStudiesSection")
  return (
    <div ref={ref} className="relative isolate bg-slate-50 py-16  md:pb-32">
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full fill-slate-100 stroke-slate-500/10 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
        yOffset={-256}
      />
      <SectionIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        className=""
      >
        <p>
        {t("paragraph")}
        </p>
      </SectionIntro>
    
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn
              key={caseStudy.slug}
              className=" h-[25rem] w-full flex items-center justify-center"
            >
              {isInView && (
                <DynamicPinContainer
                key={caseStudy.slug}
                  className=" group"
                  href={{ pathname: "/projects/[slug]", params: { slug: caseStudy.slug } }}
                  title={t("ButtonLinkLabel")}
                >
                  <div className="flex basis-full flex-col p-4 tracking-tight text-primary-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold !mb-3 line-clamp-1 group-hover:text-primary-accent transition text-base text-primary-100">
                    {caseStudy.title}
                    </h3>
                    <div className="text-sm !m-0 !p-0 font-normal">
                      <span className="text-primary-300 line-clamp-3">
                      {caseStudy.short_description}
                      </span>
                    </div>
                    <div className="mt-4 relative overflow-hidden w-full h-full rounded-xl">
                      <Image
                        className="grayscale group-hover:grayscale-0 transition-all object-cover"
                        fill
                        src={`https://admin.spark-dev-studio.com/storage/${caseStudy.featured_image}`}
                        alt={caseStudy.title}
                      />
                    </div>
                  </div>
                </DynamicPinContainer>
              )}
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  );
}
