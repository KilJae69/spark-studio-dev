import { z } from "zod";

export const contactFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: t("validation.required") })
      .max(100, { message: t("validation.nameMax") })
      .refine((value) => /^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/.test(value), {
        message: t("validation.nameLetters"),
      }),

    email: z
      .string()
      .trim()
      .email({ message: t("validation.emailInvalid") })
      .min(1, { message: t("validation.required") })
      .max(100, { message: t("validation.emailMax") }),

      phone: z
      .string()
      .trim()
      .max(20, { message: t("validation.phoneMax") })
      .optional()
      .refine((value) => !value || /^[\d\s()+-]+$/.test(value), {
        message: t("validation.phoneInvalid"),
      }),

    message: z
      .string()
      .trim()
      .min(1, { message: t("validation.required") })
      .max(1000, { message: t("validation.messageMax") }),
  });

export type TContactFormSchema = z.infer<ReturnType<typeof contactFormSchema>>;

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  body: string;
  thumbnail: string;
  published: boolean;
  published_at: string; // ISO date format
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
  user_id: number;
};

export type CaseStudy = {
  id: number;
  logo:string;
  url:string;
  title: string;
  slug: string;
  body: string;
  client: string;
  service: string;
  short_description: string;
  featured_image: string;
  published: boolean | 1 | 0;
  year: string;
  user_id: number;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
};
