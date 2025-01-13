import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { RootLayout } from "@/components/RootLayout";

import "@/styles/tailwind.css";
import { Locale } from "@/lib/locales";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: {
    template: "%s - Spark Studio",
    default: "Spark Studio - Award winning developer studio based in Denmark",
  },
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // params is now a Promise
};

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <RootLayout>{children}</RootLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
