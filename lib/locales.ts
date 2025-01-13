export const locales = ["en", "de", "bs"] as const;
export type Locale = (typeof locales)[number];