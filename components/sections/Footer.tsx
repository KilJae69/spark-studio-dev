import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";

import { socialMediaProfiles } from "@/components/SocialMedia";
import Image from "next/image";
import { getLocalizedCaseStudies } from "@/lib/getBlogPosts";
import { Locale } from "@/lib/locales";
import { getTranslations } from "next-intl/server";
import { CaseStudy } from "@/lib/types";

import { Link } from "@/i18n/routing";

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

function NewsletterForm({ t }: { t: (t: string) => string }) {
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-primary-800">
        {t("NewsletterForm.title")}
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        {t("NewsletterForm.paragraph")}
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder={t("NewsletterForm.placeholder")}
          autoComplete="email"
          aria-label={t("NewsletterForm.placeholder")}
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-primary-800 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-primary-800 focus:outline-none focus:ring-neutral-950/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-primary-800 text-white transition hover:bg-primary-700"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  );
}

export async function Footer({ locale }: { locale: Locale }) {
  const data = await getLocalizedCaseStudies(locale);
  const caseStudies: CaseStudy[] = data.data;

  const t = await getTranslations("Footer");

  return (
    <Container as="footer" className="mt-20 w-full bg-white">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <nav>
            <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <li>
                <div className="font-display text-sm font-semibold tracking-wider text-primary-800">
                  {t("Sections.work")}
                </div>
                <ul role="list" className="mt-4 text-sm text-neutral-700">
                  {caseStudies.slice(-3).map((caseStudy) => (
                    <li className="mt-4" key={caseStudy.id}>
                      <Link
                        href={{
                          pathname: "/work/[slug]",
                          params: { slug: caseStudy.slug },
                        }}
                        className="transition hover:text-neutral-950"
                      >
                        {caseStudy.client}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-4">
                    <Link
                      href="/work"
                      className="transition flex  hover:text-neutral-950"
                    >
                      {t("Sections.see-more")} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div className="font-display text-sm font-semibold tracking-wider text-primary-800">
                {t("Sections.Company")}
                </div>
                <ul role="list" className="mt-4 text-sm text-neutral-700">
                  <li className="mt-4">
                    <Link
                      href="/process"
                      className="transition hover:text-neutral-950"
                    >
                      {t("CompanyLinks.process-text")}
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      href="/blog"
                      className="transition hover:text-neutral-950"
                    >
                      {t("CompanyLinks.blog-text")}
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      href="/contact"
                      className="transition hover:text-neutral-950"
                    >
                       {t("CompanyLinks.contact-text")}
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      href="/privacy"
                      className="transition hover:text-neutral-950"
                    >
                       {t("CompanyLinks.privacy-text")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div className="font-display text-sm font-semibold tracking-wider text-primary-800">
                {t("Sections.Connect")}
                </div>
                <ul role="list" className="mt-4 text-sm text-neutral-700">
                  {socialMediaProfiles.map((link) => (
                    <li key={link.title} className="mt-4">
                      <a
                        target="__blank"
                        href={link.href}
                        className="transition hover:text-neutral-950"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
       
          <div className="flex lg:justify-end">
            <NewsletterForm t={t} />
          </div>
        </div>
        <div className="my-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-5">
          <Link
            href="/"
            aria-label="Home"
            className="relative w-[120px] h-[70px]"
          >
            <Image
              src="/spark-logo.svg"
              alt="Spark Studio Logo"
              className="object-contain"
              fill
            />
          </Link>
          <p className="text-sm text-neutral-700">
            © Spark Studio. {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  );
}
