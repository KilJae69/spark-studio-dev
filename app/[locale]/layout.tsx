import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import { RootLayout } from "@/components/RootLayout";

import "@/styles/tailwind.css";
import { Locale, locales } from "@/lib/locales";
import { routing } from "@/i18n/routing";


const poppins = Poppins({
  subsets: ["latin"], // Choose language subsets as needed
  weight: ["200", "300", "400", "500", "700"], // Include only the weights you use
  variable: "--font-poppins", // Optional CSS variable
  preload: true, // Ensures the font is preloaded automatically
});


type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // params is now a Promise
};

export async function generateMetadata({
  params,
}: {params: Promise<{ locale: string }>}): Promise<Metadata> {
  const { locale } = await params; 

   // Validate the locale
   if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("titleHome"),
    description: t("descriptionHome"),
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
    <html lang={locale} className={`${poppins.variable} h-full bg-neutral-950 text-base antialiased`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <RootLayout >{children}</RootLayout>
        </NextIntlClientProvider>
        
      </body>
    </html>
  );
}
