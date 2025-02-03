"use client";

import { ReactNode, useState } from "react";
import { Footer } from "./sections/Footer";
import { GridPattern } from "./GridPattern";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "./Container";
import { Link, usePathname } from "@/i18n/routing";

import { Button } from "./Button";

import { m, useScroll, useMotionValueEvent } from "framer-motion";

import dynamic from "next/dynamic";
import Image from "next/image";
import { FloatingDockMobile } from "./ui/floating-dock";



const FallbackComponent = () => (
  <button className="button-two" aria-expanded="false">
    <svg
      stroke="var(--button-color)"
      className="hamburger"
      viewBox="0 0 100 100"
      width="30"
    >
      <line
        className="line top"
        x1="90"
        x2="10"
        y1="40"
        y2="40"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="80"
        strokeDashoffset="0"
      ></line>
      <line
        className="line bottom"
        x1="10"
        x2="90"
        y1="60"
        y2="60"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="80"
        strokeDashoffset="0"
      ></line>
    </svg>
  </button>
);

const DynamicAnimatedSidebar = dynamic(
  () => import("@/components/shared/AnimatedModalHeader"),
  {
    ssr: false,
    loading: () => <FallbackComponent />,
  }
);

type InnerLayoutProps = {
  children: ReactNode;
};

// Define animation variants for the items


function Header() {
  const [headerState, setHeaderState] = useState<"top" | "hidden" | "small">("top");
  const { scrollY } = useScroll();
  const t = useTranslations("Header");
  const locale = useLocale()
  console.log(locale);
  const pathname = usePathname()
  const languages = [
    { code: "en", country: t("language-option-en"), flag: "/icons/en.png" },
    { code: "bs", country: t("language-option-bs"), flag: "/icons/bs.png" },
    { code: "de", country: t("language-option-de"), flag: "/icons/de.png" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest === 0) {
      setHeaderState("top");
    } else if (latest > previous && latest > 50) {
      setHeaderState("hidden");
    } else if (latest < previous) {
      setHeaderState("small");
    }
  });

  return (
    <m.header
      initial={{ y: -150,  }}
      animate={{
        y: headerState === "hidden" ? -150 : 0,
        
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-[1000] `}
    >
      <Container className="fixed w-full left-1/2 -translate-x-1/2 z-[1000]">
        <div
          className={`flex relative items-center justify-between p-3 transition-all duration-300 ${
            headerState === "top"
              ? "py-6 px-0 top-0 border-none rounded-none"
              : "py-1 top-2 border border-white border-opacity-40 bg-primary-800/90 shadow-lg backdrop-filter shadow-black/[0.3] backdrop-blur-xl rounded-full px-10"
          }`}
        >
          {/* Logo Animation */}
          <m.div
            initial={{ width: 200, height: 100 }}
            animate={{
              width: headerState === "small" ? 120 : 200,
              height: headerState === "small" ? 70 : 100,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative"
          >
            <Link href="/" aria-label="Home">
              <Image src="/spark-logo.svg" priority alt="Spark Studio Logo" className="object-contain" fill />
            </Link>
          </m.div>

          {/* Animated Items */}
          <m.div
            className="flex items-center justify-center whitespace-nowrap gap-x-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  
                  staggerChildren: 0.1, // Staggered children entrance
                  delayChildren: 0.4, // Delay after header animation
                },
              },
              exit: {
                
                opacity: 0,
                transition: {
                  staggerChildren: 0.05,
                  staggerDirection: -1,
                },
              },
            }}
            initial="hidden"
            animate={headerState !== "hidden" ? "visible" : "exit"} // Items animate after header
          >
            <m.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>
              <Button className="hidden sm:block" href="/contact">
                {t("contact-button")}
              </Button>
            </m.div>
            <m.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>
          
              <FloatingDockMobile items={languages} path={pathname}  />
            </m.div>
            <m.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>
              <DynamicAnimatedSidebar />
            </m.div>
          </m.div>
        </div>
      </Container>
    </m.header>
  );
}

export default function InnerLayout({ children }: InnerLayoutProps) {
  return (
    <>
      <Header/>
      <div className="relative flex flex-auto overflow-hidden bg-white pt-14">
        <div className="relative isolate flex w-full flex-col pt-9">
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-slate-50 stroke-slate-500/10 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>

          <Footer />
        </div>
      </div>
      <div id="modal-root"></div>
    </>
  );
}
