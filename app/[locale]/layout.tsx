import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";

import "@/styles/tailwind.css";
import { Locale, locales } from "@/lib/locales";
import { routing } from "@/i18n/routing";

import InnerLayout from "@/components/InnerLayout";
import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/sections/Footer";

const poppins = Poppins({
  subsets: ["latin"], // Choose language subsets as needed
  weight: ["200", "300", "400", "500", "700"], // Include only the weights you use
  variable: "--font-poppins", // Optional CSS variable
  preload: true, // Ensures the font is preloaded automatically
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>; // params is now a Promise
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Validate the locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  // Construct the OG image URL
  const ogImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(
    t("titleHome")
  )}&description=${encodeURIComponent(t("ogDescriptionHome"))}&locale=${locale}&ogCTA1=${encodeURIComponent(t("ogCTA1"))}&ogCTA2=${encodeURIComponent(t("ogCTA2"))}`;

  return {
    title: t("titleHome"),
    description: t("descriptionHome"),
    openGraph: {
      title: t("titleHome"),
      description: t("ogDescriptionHome"),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t("titleHome"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleHome"),
      description: t("ogDescriptionHome"),
      images: [ogImageUrl],
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${poppins.variable} h-full bg-white text-base antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <LazyMotion features={domAnimation}>
            <InnerLayout>
              {children}
              <Toaster />
            </InnerLayout>
            <Footer locale={locale} />
          </LazyMotion>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
