"use client";

import { ReactNode, useState } from "react";
import { Footer } from "./Footer";
import { GridPattern } from "./GridPattern";
import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { Link } from "@/i18n/routing";
import { Logo, Logomark } from "./Logo";
import { Button } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { m, useScroll, useMotionValueEvent } from "framer-motion";

import { AnimatedModalHeader } from "./shared/AnimatedModalHeader";

type InnerLayoutProps = {
  children: ReactNode;
};

function Header() {
  const [headerState, setHeaderState] = useState<"top" | "hidden" | "small">(
    "top"
  );
  const { scrollY } = useScroll();
  const t = useTranslations("Header");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest === 0) {
      // At the top of the page
      setHeaderState("top");
    } else if (latest > previous && latest > 50) {
      // Scrolling down and past 50px
      setHeaderState("hidden");
    } else if (latest < previous) {
      // Scrolling up
      setHeaderState("small");
    }
  });

  return (
    <m.header
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: headerState === "hidden" ? -100 : 0,
       // opacity: headerState === "hidden" ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 w-full z-[1000] ${
        headerState === "small"
          ? "backdrop-blur-md bg-white/50 shadow-md"
          : "bg-transparent"
      }`}
    >
      <Container className="fixed w-full left-1/2 -translate-x-1/2  z-[1000]">
        <div
          className={`flex relative items-center justify-between p-3 transition-all duration-300 ${
            headerState === "top" ? "py-6 px-0 top-0 border-none rounded-none" : "py-3 top-2 border border-white border-opacity-40 bg-primary-800/90  shadow-lg backdrop-filter shadow-black/[0.3] backdrop-blur-xl rounded-full px-10"
          }`}
        >
          <Link href="/" aria-label="Home">
            <Logomark className="h-8 sm:hidden" />
            <Logo className="hidden h-8 sm:block" />
          </Link>
          <div className="flex items-center whitespace-nowrap gap-x-8">
            <Button className="hidden sm:block" href="/contact">
              {t("contact-button")}
            </Button>
            <LanguageSwitcher />
            <AnimatedModalHeader />
          </div>
        </div>
      </Container>
    </m.header>
  );
}

export default function InnerLayout({ children }: InnerLayoutProps) {
  return (
    <>
      <Header />
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
