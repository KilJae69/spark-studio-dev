


import { ContactSection } from "@/components/sections/ContactSection";
import { FadeIn } from "@/components/FadeIn";


import HeroSection from "@/components/sections/HeroSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";

import ServicesSection from "@/components/sections/ServicesSection";
import TechsSection from "@/components/sections/TechsSection";
import { getLocalizedCaseStudies } from "@/lib/getBlogPosts";
import { Locale } from "@/lib/locales";
import { CaseStudy } from "@/lib/types";



export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  //  let caseStudies = (await loadCaseStudies()).slice(0, 3)
  const data = await getLocalizedCaseStudies(locale);
      const caseStudies:CaseStudy[] = data.data

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
