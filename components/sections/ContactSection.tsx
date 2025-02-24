"use client";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import useLazyLoad from "@/hooks/useLazyLoad";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { SocialMedia } from "../SocialMedia";


const DynamicLottieComponent = dynamic(() => import("@/components/shared/LottieComponent"), {
  ssr: false,
})

export function ContactSection() {
  const t = useTranslations("ContactSection");
  const {ref,isLoaded} = useLazyLoad()
  

  return (
    <Container className="mt-20">
      <FadeIn className="relative rounded-md  overflow-hidden -mx-6 sm:rounded-4xl bg-gradient-to-tr bg-primary-800 px-6 py-20 sm:mx-0  md:px-12">
        <div ref={ref} className="mx-auto max-w-4xl pb-20 flex flex-col sm:flex-row justify-between ">
          <div className="max-w-xl flex-1">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              {t("title")}
            </h2>
            <div className="mt-6 flex">
              <Button href="/contact">{t("buttonText")}</Button>
            </div>
            <div className="mt-10 border-t border-white/10 pt-10 flex justify-between">
              <div className="flex-1">
                <h3 className="font-display text-base font-semibold text-white">
                  {t("noOfficesTitle")}
                </h3>
                <p className="mt-2 text-sm text-white/75">{t("description")}</p>
                <div className="mt-4">
                  <p className="text-sm flex items-center gap-3 text-white/75">
                    {" "}
                    <Image
                      src="/animations/wifi-icon.gif"
                      alt="wifi icon"
                      unoptimized
                      width={30}
                      height={30}
                    />
                    {t("wifiNote")}
                  </p>
                </div>
              </div>
            </div>
            <SocialMedia className="mt-4" invert/>
          </div>
        </div>
        <div className=" absolute bottom-0 translate-y-[50%] lg:translate-x-1/2 lg:right-20 lg:bottom-20 right-0 left-0">
          { isLoaded && <DynamicLottieComponent path="/animations/globe.json"/>}
        </div>
      </FadeIn>
    </Container>
  );
}
