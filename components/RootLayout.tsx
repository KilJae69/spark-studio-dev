"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import clsx from "clsx";
import { MotionConfig, useReducedMotion } from "framer-motion";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Footer } from "@/components/sections/Footer";
import { GridPattern } from "@/components/GridPattern";
import { Logo, Logomark } from "@/components/Logo";

import { SocialMedia } from "@/components/SocialMedia";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const RootLayoutContext = createContext<{
  logoHovered: boolean;
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

function XIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  );
}

function MenuIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  );
}

function Header({
  panelId,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
  invert = false,
}: {
  panelId: string;
  icon: React.ComponentType<{ className?: string }>;
  expanded: boolean;
  onToggle: () => void;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
  invert?: boolean;
}) {
  const { logoHovered, setLogoHovered } = useContext(RootLayoutContext)!;
  const t = useTranslations("Header");

  return (
    <Container className="">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <Logomark
            className="h-8 sm:hidden"
            invert={invert}
            filled={logoHovered}
          />
          <Logo
            className="hidden h-8 sm:block"
            invert={invert}
            filled={logoHovered}
          />
        </Link>
        <div className="flex items-center whitespace-nowrap gap-x-8">
          <Button className="hidden sm:block" href="/contact" invert={invert}>
            {t("contact-button")}
          </Button>
          <LanguageSwitcher />
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded ? "true" : "false"}
            aria-controls={panelId}
            className={clsx(
              "group -m-2.5 rounded-full p-2.5 transition",
              invert ? "hover:bg-white/10" : "hover:bg-primary-800/10"
            )}
            aria-label="Toggle navigation"
          >
            <Icon
              className={clsx(
                "h-6 w-6",
                invert
                  ? "fill-white group-hover:fill-neutral-200"
                  : "fill-primary-800 group-hover:fill-neutral-700"
              )}
            />
          </button>
        </div>
      </div>
    </Container>
  );
}

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
      className="group relative isolate -mx-6 bg-primary-800 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-primary-600 sm:even:pl-16"
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

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const openRef = useRef<React.ElementRef<"button">>(null);
  const closeRef = useRef<React.ElementRef<"button">>(null);
  const navRef = useRef<React.ElementRef<"div">>(null);
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("ContactSection");
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest("a")?.href === window.location.href
      ) {
        setExpanded(false);
      }
    }

    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div
          className="absolute left-0 right-0 top-2 z-40 pt-14"
          //  aria-hidden={expanded ? "true" : undefined}

          //  inert={expanded ? "" : undefined}
        >
          <Header
            panelId={panelId}
            icon={MenuIcon}
            toggleRef={openRef}
            expanded={expanded}
            onToggle={() => {
              setExpanded((expanded) => !expanded);
              window.setTimeout(() =>
                closeRef.current?.focus({ preventScroll: true })
              );
            }}
          />
        </div>

        <div
          id={panelId}
          style={{ height: expanded ? "auto" : "0.5rem" }}
          className="relative z-50 overflow-hidden bg-primary-800"
          aria-hidden={expanded ? undefined : "true"}

          //  inert={expanded ? undefined : ''}
        >
          <div className="bg-primary-600">
            <div ref={navRef} className="bg-primary-800 pb-16 pt-14">
              <Header
                invert
                panelId={panelId}
                icon={XIcon}
                toggleRef={closeRef}
                expanded={expanded}
                onToggle={() => {
                  setExpanded((expanded) => !expanded);
                  window.setTimeout(() =>
                    openRef.current?.focus({ preventScroll: true })
                  );
                }}
              />
            </div>
            <Navigation />
            <div className="relative bg-primary-800 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-primary-600">
              <Container>
                <div className="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
                  <div>
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
          </div>
        </div>
      </header>

      <div
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
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
    </MotionConfig>
  );
}

type Props = {
  children: ReactNode;
  // locale?: string;
};

export function RootLayout({ children }: Props) {
  const pathname = usePathname();
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={pathname}>{children}</RootLayoutInner>
    </RootLayoutContext.Provider>
  );
}
