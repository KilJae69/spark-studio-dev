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
import { IoClose } from "react-icons/io5";

import { Logo, Logomark } from "../Logo";

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

function NavigationItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { setOpen } = useModal(); // Use the useModal hook to get setOpen

  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-white px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l-[1px] sm:even:border-primary-600 sm:even:pl-16"
      onClick={() => setOpen(false)} // Close the modal when the link is clicked
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

 */

function ModalHeader() {
  const { setOpen } = useModal();
  return (
   
      <div className="flex items-center justify-between p-3 ">
        <Link
          onClick={() => setOpen(false)}
          href="/"
          aria-label="Home"
          // onMouseEnter={() => setLogoHovered(true)}
          //  onMouseLeave={() => setLogoHovered(false)}
        >
          <Logomark
            className="h-8 sm:hidden"

            //  filled={logoHovered}
          />
          <Logo
            className="hidden h-8 sm:block"

            //   filled={logoHovered}
          />
        </Link>
        <div className="flex items-center whitespace-nowrap gap-x-8">
          <button
            onClick={() => setOpen(false)}
            className="group text-primary-800 p-1 bg-primary-200 rounded-full flex justify-center group/modal-btn"
          >
            <IoClose className="size-10 group-hover:scale-110 transition" />
          </button>
        </div>
      </div>

   
  );
}

export default function AnimatedModalHeader() {
 // const t = useTranslations("ContactSection");
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger />
          
        
        <ModalBody className="size-full bg-white">
          <ModalContent>
            <ModalHeader/>
            {/* <ModalHeader />
            <div className="mt-20">
               <Navigation /> 
            </div>
            <div className="relative bg-white before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-primary-600">
              <Container>
                <div className="flex flex-col sm:flex-row gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
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
             
            </div> */}
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
