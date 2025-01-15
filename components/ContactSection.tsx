"use client";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

export function ContactSection() {
  const t = useTranslations("ContactSection");
  const [loadLottie, setLoadLottie] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) { // Adjust scroll threshold as needed
        setLoadLottie(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LottieComponent = loadLottie
    ? dynamic(() => import("@/components/shared/LottieComponent"), {
        ssr: false,
      })
    : null;

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row justify-between">
          <div className="max-w-xl flex-1">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              {t("title")}
            </h2>
            <div className="mt-6 flex">
              <Button href="/contact" invert>
                {t("buttonText")}
              </Button>
            </div>
            <div className="mt-10 border-t border-white/10 pt-10 flex justify-between">
              <div className="flex-1">
                <h3 className="font-display text-base font-semibold text-white">
                  {t("noOfficesTitle")}
                </h3>
                <p className="mt-2 text-sm text-white/75">
                  {t("description")}
                </p>
                <div className="mt-4">
                  <p className="text-sm text-white/75">🛜{t("wifiNote")}</p>
                </div>
              </div>
            </div>
          </div>
          {LottieComponent && <LottieComponent />}
        </div>
      </FadeIn>
    </Container>
  );
}
