import { routing } from "@/i18n/routing";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Locale } from "./locales";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalizedPath(currentPath: string, newLocale: string): string {
  const pathSegments = currentPath.split('/').filter(Boolean); // Remove empty segments
  const currentLocale = pathSegments[0]; // Assuming the first segment is the locale

  if (routing.locales.includes(currentLocale as Locale)) {
    // Replace the existing locale with the new one
    pathSegments[0] = newLocale;
  } else {
    // Prepend the new locale if no locale is present in the current path
    pathSegments.unshift(newLocale);
  }

  return `/${pathSegments.join('/')}`; // Construct the updated path
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatDate(dateString: string, locale: string) {
  const parts = dateString.split("-");
  const hasDay = parts.length > 2;

  return new Date(`${dateString}Z`).toLocaleDateString(locale, {
    day: hasDay ? "numeric" : undefined,
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const validateString = (value: unknown,maxLength:number) => {
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }

  return true;
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong.";
  }

  return message;
};

export function truncateWithEllipsis(
  str: string | null | undefined,
  maxLen: number
): string {
  if (!str) return ""
  if (str.length < maxLen) return str;
  // reserve 3 chars for "..."
  return str.slice(0, maxLen - 3).trimEnd() + "..."
}
