"use client";

import { CaseStudyType } from "@/constants/data";
import { GridPattern } from "../GridPattern";
import { SectionIntro } from "../SectionIntro";
import { Container } from "../Container";
import { FadeIn, FadeInStagger } from "../FadeIn";

import Image from "next/image";
// import dynamic from "next/dynamic";
import useLazyLoad from "@/hooks/useLazyLoad";
import { PinContainer } from "../ui/3d-pin-new";

// const DynamicPinContainer = dynamic(() => import("@/components/ui/3d-pin"));

export default function CaseStudiesSection({
  caseStudies,
}: {
  caseStudies: CaseStudyType[];
}) {
  const { isInView, ref } = useLazyLoad();
  return (
    <div ref={ref} className="relative isolate bg-slate-50 py-16  md:pb-32">
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
      {/* <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-20 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className=" ">
              {isInView && (
                <DynamicPinContainer
                  className=" group"
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
                </DynamicPinContainer>
              )}
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container> */}
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn
              key={caseStudy.href}
              className=" h-[25rem] w-full flex items-center justify-center"
            >
              {isInView && (
                <PinContainer
                  className=" group"
                  href={caseStudy.href}
                  title={"Read more"}
                >
                  <div className="flex basis-full flex-col p-4 tracking-tight text-primary-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold line-clamp-1 group-hover:text-primary-accent transition text-base text-primary-100">
                    {caseStudy.title}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                      <span className="text-primary-300 line-clamp-2">
                      {caseStudy.description}
                      </span>
                    </div>
                    <div className="mt-4 relative overflow-hidden w-full h-full rounded-xl">
                      <Image
                        className="grayscale group-hover:grayscale-0 transition-all object-cover"
                        fill
                        src={caseStudy.image.src}
                        alt={caseStudy.title}
                      />
                    </div>
                  </div>
                </PinContainer>
              )}
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  );
}
