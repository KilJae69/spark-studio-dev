"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../ui/animated-modal";
import { Link } from "@/i18n/routing";
// import { useTranslations } from "next-intl";
// import { Container } from "../Container";
// import { SocialMedia } from "../SocialMedia";
// import { IoMenu } from "react-icons/io5";
import { useModal } from "../ui/animated-modal"; // Import useModal
// import { IoClose } from "react-icons/io5";

import { useTranslations } from "next-intl";
import { SocialMedia } from "../SocialMedia";
import Image from "next/image";
import { Meteors } from "../ui/meteors";
import { FloatingDock } from "../ui/floating-dock";


/* 
function NavigationRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="even:mt-px sm:bg-primary-800 ">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  );
}

 */
function NavigationItem({
  href,
  children,
  onOpen,
  iconSrc,
  iconAlt,
}: {
  href: string;
  children: React.ReactNode;
  onOpen: () => void;
  iconSrc?: string;
  iconAlt?: string;
}) {
  // Use the useModal hook to get setOpen

  return (
    <Link
      href={href}
      className="flex gap-4"
      onClick={onOpen} // Close the modal when the link is clicked
    >
      <Image src={iconSrc || ""} alt={iconAlt || ""} width={40} height={20} />
      {children}
    </Link>
  );
}

function Navigation() {
  const { setOpen } = useModal();
  const t = useTranslations("Header");
  return (
    <nav className=" font-display sm:text-3xl font-medium flex flex-col gap-4 tracking-tight text-primary-800">
      <NavigationItem
        onOpen={() => setOpen(false)}
        href="/work"
        iconSrc="/animations/coding-icon.gif"
      >
        {t("link-our-work")}
      </NavigationItem>
      <NavigationItem
        onOpen={() => setOpen(false)}
        href="/process"
        iconSrc="/animations/developer-icon.gif"
      >
        {t("link-process")}
      </NavigationItem>

      <NavigationItem
        onOpen={() => setOpen(false)}
        href="/contact"
        iconSrc="/animations/phone-icon.gif"
      >
        {t("link-contact-us")}
      </NavigationItem>
      <NavigationItem
        onOpen={() => setOpen(false)}
        href="/blog"
        iconSrc="/animations/blog-icon.gif"
      >
        {t("link-blog")}
      </NavigationItem>
    </nav>
  );
}

function ModalHeader() {
  // const { setOpen } = useModal();
  return (
    <div className="flex relative items-center justify-center">
      <Link href="/" aria-label="Home" className="relative w-[300px] h-[120px]">
        <Image
          src="/spark-logo.svg"
          alt="Spark Studio Logo"
          className="object-contain"
          fill
        />
      </Link>
      <span className="bg-primary-800 absolute inset-0 -z-10 scale-150 -rotate-12" />
      <Meteors number={20} />
      {/* <div className="flex items-center whitespace-nowrap gap-x-8">
        <button
          onClick={() => setOpen(false)}
          className="group text-primary-800 p-1 bg-primary-200 rounded-full flex justify-center group/modal-btn"
        >
          <IoClose className="size-10 group-hover:scale-110 transition" />
        </button>
      </div> */}
    </div>
  );
}

export default function AnimatedModalHeader() {
  const t = useTranslations("ContactSection");

  
  return (
    <Modal>
      <ModalTrigger />

      <ModalBody className="size-full bg-white ">
        <ModalContent className="flex">
          <ModalHeader />

          <div className="mt-20  p-5">
           
            <Navigation />
          </div>
          <div className="flex items-center justify-center my-auto w-full">
            <FloatingDock
             // only for demo, remove for production
              
            />
          </div>
          <div className="relative px-2 sm:px-5 py-10 mt-auto mb-10 max-w-[300px]">
            <div className="flex flex-col gap-y-10  ">
              <div className="flex-1">
                <h2 className="font-display text-base font-semibold text-primary-700">
                  {t("noOfficesTitle")}
                </h2>
                <p className="mt-2 text-sm text-primary-700/75">
                  {t("description")}
                </p>
                <div className="mt-4">
                  <p className="text-sm text-primary-700/75">
                    🛜{t("wifiNote")}
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
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
