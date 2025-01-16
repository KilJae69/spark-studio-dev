import { useId } from 'react'
import { type Metadata } from 'next'


import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Locale, locales } from '@/lib/locales'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/routing'


export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("titleContact"),
    description: t("descriptionContact"),
  };
}

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  const id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

// function RadioInput({
//   label,
//   ...props
// }: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
//   return (
//     <label className="flex gap-x-3">
//       <input
//         type="radio"
//         {...props}
//         className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
//       />
//       <span className="text-base/6 text-neutral-950">{label}</span>
//     </label>
//   )
// }

function ContactForm({ t }: { t: (key: string) => string }) {
  return (
    <FadeIn className="lg:order-last">
      <form>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t("form.workInquiriesTitle")}
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label={t("form.fields.name.label")} placeholder={t("form.fields.name.placeholder")} name="name" autoComplete="name" />
          <TextInput
            label={t("form.fields.email.label")}
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput
            label={t("form.fields.company.label")}
            name="company"
            autoComplete="organization"
          />
          <TextInput label={t("form.fields.phone.label")} type="tel" name="phone" autoComplete="tel" />
          <TextInput label={t("form.fields.message.label")} name="message" />
          
        </div>
        <Button type="submit" className="mt-10">
        {t("form.submitButton")}
        </Button>
      </form>
    </FadeIn>
  )
}

function ContactDetails({ t }: { t: (key: string) => string }) {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        {t("contactDetails.noOfficesTitle")}
      </h2>
      <p className="mt-6 text-base text-neutral-600">
      {t("contactDetails.description")}
      </p>
      <div className="mt-4">
                  <p className="text-sm text-neutral-600">🛜{t("contactDetails.wifiNote")}</p>
                </div>
      

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
        {t("contactDetails.emailSection.title")}
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Careers', 'careers@studioagency.com'],
            ['Press', 'press@studioagency.com'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
        {t("contactDetails.socialMediaSection.title")}
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}



export default async function Contact({ params }: {  params: Promise<{ locale: string }> }) {
  const { locale } =await params;
  
    if (!locales.includes(locale as Locale)) {
      notFound();
    }
  
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "ContactPage" });
  return (
    <>
      <PageIntro eyebrow={t("pageIntro.eyebrow")} title={t("pageIntro.title")}>
        <p>{t("pageIntro.description")}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm t={t}/>
          <ContactDetails t={t} />
        </div>
      </Container>
    </>
  )
}
