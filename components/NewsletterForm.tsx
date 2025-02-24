"use client";

import { sendNewsletterAction } from "@/lib/sendNewsletter.action";
import { newsletterSchema, TNewsletterFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ArrowIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  );
}

export default function NewsletterForm() {
  // useFormStatus gives us the pending state for the form action.

  const t = useTranslations("Footer");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    reset,
  } = useForm<TNewsletterFormSchema>({
    resolver: zodResolver(newsletterSchema(t)),
  });

  const onSubmit = async (data: TNewsletterFormSchema) => {
    try {
      const response = await sendNewsletterAction(data);

      if (response.error) {
        toast.error(`${t("NewsletterForm.errorMessage")}:${response.error}`);
      } else {
        toast.success(`${t("NewsletterForm.successMessage")}`);
        reset();
      }
    } catch (error) {
      toast.error(`Unexpected error: ${error} `);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-primary-800">
        {t("NewsletterForm.title")}
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        {t("NewsletterForm.paragraph")}
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          {...register("email")}
          placeholder={t("NewsletterForm.placeholder")}
          autoComplete="email"
          onBlur={() => {
            clearErrors("email");
          }}
          aria-label={t("NewsletterForm.placeholder")}
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-primary-800 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-primary-800 focus:outline-none focus:ring-neutral-950/5"
        />
        <p className="text-rose-500 absolute ">{errors.email?.message || ""}</p>
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            disabled={isSubmitting}
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-primary-800 text-white transition hover:bg-primary-700"
          >
            {isSubmitting ? (
              <Image src={"/loader.svg"} width={16} height={16} alt="loader" />
            ) : (
              <ArrowIcon className="w-4" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
