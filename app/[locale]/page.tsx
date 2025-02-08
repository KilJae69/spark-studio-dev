


import { ContactSection } from "@/components/sections/ContactSection";
import { FadeIn } from "@/components/FadeIn";
import { caseStudies } from "@/constants/data";

import HeroSection from "@/components/sections/HeroSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";

import ServicesSection from "@/components/sections/ServicesSection";
import TechsSection from "@/components/sections/TechsSection";


export default function Home() {
  //  let caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <>
      <HeroSection />
      <FadeIn>
        <TechsSection />
      </FadeIn>
      <ServicesSection />

      <div className="relative isolate  w-full  ">
        <CaseStudiesSection caseStudies={caseStudies} />

        <ContactSection />
      </div>
    </>
  );
}
