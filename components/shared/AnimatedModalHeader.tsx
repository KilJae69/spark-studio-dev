"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Container } from "../Container";
import { SocialMedia } from "../SocialMedia";

function NavigationRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="even:mt-px sm:bg-primary-800">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  );
}

function NavigationItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative w-screen isolate -mx-6 bg-primary-800 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-primary-600 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-primary-700 h-0 transition group-odd:right-0 group-even:left-0 group-hover:h-full" />
    </Link>
  );
}

function Navigation() {
  const t = useTranslations("Header");
  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <NavigationRow>
        <NavigationItem href="/work">{t("link-our-work")}</NavigationItem>
        <NavigationItem href="/process">{t("link-process")}</NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href="/contact">{t("link-contact-us")}</NavigationItem>
        <NavigationItem href="/blog">{t("link-blog")}</NavigationItem>
      </NavigationRow>
    </nav>
  );
}

export function AnimatedModalDemo() {
  const t = useTranslations("ContactSection");
  return (
    <div className=" flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Book your flight
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            ✈️
          </div>
        </ModalTrigger>
        <ModalBody className="fixed inset-0 h-full w-full">
          <ModalContent>
            <Navigation />
            <div className="relative bg-primary-800 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-primary-600">
              <Container>
                <div className="flex gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
                  <div className="flex-1">
                    <h2 className="font-display text-base font-semibold text-white">
                      {t("noOfficesTitle")}
                    </h2>
                    <p className="mt-2 text-sm text-white/75">
                      {t("description")}
                    </p>
                    <div className="mt-4">
                      <p className="text-sm text-white/75">🛜{t("wifiNote")}</p>
                    </div>
                  </div>
                  <div className="sm:border-l sm:border-transparent sm:pl-16">
                    <h2 className="font-display text-base font-semibold text-white">
                      Follow us
                    </h2>
                    <SocialMedia className="mt-6" invert />
                  </div>
                </div>
              </Container>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
