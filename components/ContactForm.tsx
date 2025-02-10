"use client";

import { FadeIn } from "./FadeIn";
import { Button } from "@/components/Button";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, TContactFormSchema } from "@/lib/types";
import clsx from "clsx";
import { sendEmailAction } from "@/lib/sendEmail.action";
import toast from "react-hot-toast";

function TextInput({
  label,
  errorMessage,
  name,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  name: string;
  errorMessage: string;
}) {
  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={name}
        name={name}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-6 pt-12  text-base/6 text-primary-800 ring-4 ring-transparent transition  focus:outline-none focus:ring-primary-800/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={name}
        className={clsx(
          "pointer-events-none absolute left-6 top-1/2 tracking-widest -mt-3 origin-left text-base/6 text-primary-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-primary-800 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-primary-800",
          errorMessage && "!text-rose-500"
        )}
      >
        {label}
      </label>
      <div className="absolute bottom-1 left-6">
        {errorMessage && (
          <p aria-live="polite" className="text-rose-500 text-xs">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
function TextareaInput({
  label,
  name,
  errorMessage,
  ...props
}: React.ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  name: string;
  errorMessage: string;
}) {
  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
        id={name}
        name={name}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-primary-800 ring-4 ring-transparent transition  focus:outline-none focus:ring-primary-800/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={name}
        className={clsx(
          "pointer-events-none absolute top-14 left-6 tracking-widest -mt-3 origin-left text-base/6 text-primary-500 transition-all duration-200 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-primary-800 peer-[:not(:placeholder-shown)]:-translate-y-9 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-primary-800",
          errorMessage && "text-rose-500"
        )}
      >
        {label}
      </label>
      <div className="absolute bottom-1 left-6">
        {errorMessage && (
          <p aria-live="polite" className="text-rose-500 text-xs">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TContactFormSchema>({
    resolver: zodResolver(contactFormSchema(t)),
  });

  const onSubmit = async (data: TContactFormSchema) => {
    try {
      const response = await sendEmailAction(data);

      if (response.error) {
        toast.error(`${t("errorMessage")}:${response.error}`);
      } else {
        toast.success(`${t("successMessage")}`);
        reset();
      }
    } catch (error) {
      toast.error(`Unexpected error: ${error} `);
    }
  };
  console.log(errors);
  return (
    <FadeIn className="lg:order-last">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-display text-base font-semibold text-primary-800">
          {t("workInquiriesTitle")}
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput
            {...register("name")}
            label={t("fields.name.label")}
            placeholder={t("fields.name.placeholder")}
            name="name"
            autoComplete="name"
            errorMessage={errors.name?.message || ""}
          />
          <TextInput
            {...register("email")}
            label={t("fields.email.label")}
            type="email"
            name="email"
            autoComplete="email"
            errorMessage={errors.email?.message || ""}
          />

          <TextInput
            {...register("phone")}
            label={t("fields.phone.label")}
            type="tel"
            name="phone"
            autoComplete="tel"
            errorMessage={errors.phone?.message || ""}
          />
          <TextareaInput
            {...register("message")}
            label={t("fields.message.label")}
            name="message"
            errorMessage={errors.message?.message || ""}
          />
        </div>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="mt-10 min-w-[300px]"
        >
          {t("submitButton")}
        </Button>
      </form>
    </FadeIn>
  );
}
