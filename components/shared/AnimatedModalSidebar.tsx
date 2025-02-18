"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  useModal,
} from "../ui/animated-modal";
import { Link } from "@/i18n/routing";

// import { Container } from "../Container";
// import { SocialMedia } from "../SocialMedia";
// import { IoMenu } from "react-icons/io5";
// import { IoClose } from "react-icons/io5";
// import { SocialMedia } from "../SocialMedia";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Meteors } from "../ui/meteors";
import { FloatingDock } from "../ui/floating-dock";

import CustomLink from "./CustomAnimatedLink";
import { Variants, m } from "framer-motion";

const containerVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: "0",
    transition: {
      staggerChildren: 0.1, // Adjust the stagger delay as needed
      type: "spring",
      damping: "16",
      stiffness: "130",
    },
  },
};

const itemVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: "0",
    transition: {
      duration: 0.3,
      type: "spring",
      damping: "16",
      stiffness: "130",
    },
  },
};

function NavigationLinks() {
  const t = useTranslations("Header");

  return (
    <m.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mt-14 p-5 space-y-4"
    >
      <m.div variants={itemVariants}>
        <CustomLink
          heading={t("link-our-work")}
          href="/projects"
          iconSrc="/animations/coding-icon.gif"
        />
      </m.div>
      <m.div variants={itemVariants}>
        <CustomLink
          heading={t("link-process")}
          href="/process"
          iconSrc="/animations/developer-icon.gif"
        />
      </m.div>
      <m.div variants={itemVariants}>
        <CustomLink
          heading={t("link-contact-us")}
          href="/contact"
          iconSrc="/animations/mail-flying-icon.gif"
        />
      </m.div>
      <m.div variants={itemVariants}>
        <CustomLink
          heading={t("link-blog")}
          href="/blog"
          iconSrc="/animations/blog-icon.gif"
        />
      </m.div>
    </m.nav>
  );
}

function ModalHeader() {
  const { setOpen } = useModal();
  return (
    <div className="flex relative items-center justify-center">
      <Link
        href="/"
        onClick={() => setOpen(false)}
        aria-label="Home"
        className="relative w-[300px] h-[120px]"
      >
        <Image
          src="/spark-logo.svg"
          alt="Spark Studio Logo"
          className="object-contain"
          fill
        />
      </Link>
      <span className="bg-primary-800 absolute inset-0 -z-10 scale-150 -rotate-12" />
      <Meteors number={20} />
    </div>
  );
}
/*
function ModalFooter() {
  const t = useTranslations("ContactSection");

  return (
    <div className="relative px-2 sm:px-5 max-w-[300px] pb-10">
      <div className="flex flex-col gap-y-10  ">
        <div className="flex-1">
          <h2 className="font-display text-base font-semibold text-primary-700">
            {t("noOfficesTitle")}
          </h2>
          <p className="mt-2 text-sm text-primary-700/75">{t("description")}</p>
          <div className="rotate-90"></div>
          <div className="mt-4">
            <p className="text-sm flex flex-col sm:flex-row items-center justify-start gap-3 italic font-semibold text-primary-700/75">
              <Image
                src="/animations/wifi-icon.gif"
                alt="wifi icon"
                width={30}
                height={30}
              />
              {t("wifiNote")}
            </p>
          </div>
        </div>
        <div className="sm:border-l sm:border-transparent ">
          <h2 className="font-display text-base font-semibold text-primary-700">
            Follow us
          </h2>
          <SocialMedia className="mt-6" />
        </div>
      </div>
    </div>
  );
}
*/
export default function AnimatedModalSidebar() {
  const t = useTranslations("Header");
  return (
    <Modal>
      <ModalTrigger />

      <ModalBody className="size-full bg-white ">
        <ModalContent className="flex">
          <ModalHeader />

          <NavigationLinks />
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center py-10 mt-auto w-full"
          >
            <p className="text-md sm:text-xl font-semibold tracking-widest mb-10 text-primary-800">
              {t("language-label")}
            </p>
            <FloatingDock />
          </m.div>
          {/* <ModalFooter /> */}
          
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
