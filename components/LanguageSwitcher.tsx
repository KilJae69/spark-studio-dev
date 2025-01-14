"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalize } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const LanguageSwitcher: React.FC = () => {
  const pathname = usePathname(); // Get the full pathname
  const t = useTranslations("Header");

  type Option = {
    country: string;
    code: string;
  };

  const options: Option[] = [
    { country: t("language-option-en"), code: "en" },
    { country: t("language-option-bs"), code: "bs" },
    { country: t("language-option-de"), code: "de" },
  ];

  // Extract the current language code from the pathname
  const currentLanguageCode =
    pathname.split("/")[1] || "en"; // Get the first segment or default to 'en'

  const currentLanguage =
    options.find((option) => option.code === currentLanguageCode) ||
    { country: t("language-option-en"), code: "en" };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 text-lg font-semibold text-primary"
        >
          <Image
            width={28}
            height={28}
            src={`/icons/${currentLanguage.code}.png`}
            alt={`${currentLanguage.country} flag icon`}
            className="rounded-full"
          />
          {/* <span className="hidden lg:block">
            {capitalize(currentLanguage.country)}
          </span> */}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white">
        {options.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="hover:bg-rose-500 group cursor-pointer"
          >
            <Link href={`/${lang.code}/${pathname.split("/").slice(2).join("/")}`}>
              <button
                lang={lang.code}
                onMouseDown={(e) => e.preventDefault()}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm group-hover:text-white ${
                  currentLanguageCode === lang.code ? "text-primary" : ""
                }`}
              >
                <Image
                  className="rounded-full"
                  width={24}
                  height={24}
                  src={`/icons/${lang.code}.png`}
                  alt={`${lang.country} flag icon`}
                />
                {capitalize(lang.country)}
              </button>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
