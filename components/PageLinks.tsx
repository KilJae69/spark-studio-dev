import clsx from "clsx";

import { Border } from "@/components/Border";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { GridPattern } from "@/components/GridPattern";
import { SectionIntro } from "@/components/SectionIntro";
import { Link } from "@/i18n/routing";
import { BlogPost, CaseStudy } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Locale } from "@/lib/locales";

function ArrowIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 6" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 3 18 .5v2H0v1h18v2L24 3Z"
      />
    </svg>
  );
}

function PageLink({
  page,
  locale,
  linkLabel
}: {
  page: BlogPost | CaseStudy;
  locale: Locale;
  linkLabel:string
}) {
  // Type guard to check if it's a BlogPost
  const isBlogPost = (page: BlogPost | CaseStudy): page is BlogPost =>
    "published_at" in page;
  return (
    <article key={page.id}>
      <Border
        position="left"
        className="relative flex flex-col items-start pl-8"
      >
        <h3 className="mt-6 text-base font-semibold text-neutral-950">
          {page.title}
        </h3>
        {isBlogPost(page) ? (
          // ✅ BlogPost: Display published_at
          <time
            dateTime={page.published_at}
            className="order-first text-sm text-neutral-600"
          >
            {formatDate(page.published_at, locale)}
          </time>
        ) : (
          // ✅ CaseStudy: Display year
          <p className="text-sm text-neutral-600">{page.year}</p>
        )}

        <p className="mt-2.5 text-base text-neutral-600">
          {page.short_description}
        </p>
        {isBlogPost(page) ? (
          <Link
            href={{ pathname: "/blog/[slug]", params: { slug: page.slug } }}
            className="mt-6 flex gap-x-3 text-base font-semibold text-neutral-950 transition hover:text-neutral-700"
            aria-label={`${linkLabel}: ${page.title}`}
          >
            {linkLabel}
            <ArrowIcon className="w-6 flex-none fill-current" />
            <span className="absolute inset-0" />
          </Link>
        ) : (
          <Link
            href={{ pathname: "/projects/[slug]", params: { slug: page.slug } }}
            className="mt-6 flex gap-x-3 text-base font-semibold text-neutral-950 transition hover:text-neutral-700"
            aria-label={`${linkLabel}: ${page.title}`}
          >
            {linkLabel}
            <ArrowIcon className="w-6 flex-none fill-current" />
            <span className="absolute inset-0" />
          </Link>
        )}
      </Border>
    </article>
  );
}

export function PageLinks({
  title,
  pages,
  intro,
  className,
  locale,
  linkLabel,
}: {
  title: string;
  linkLabel: string;
  pages: Array<BlogPost> | Array<CaseStudy>;
  intro?: string;
  className?: string;
  locale: Locale;
}) {
  return (
    <div className={clsx("relative pt-24 sm:pt-32 lg:pt-40", className)}>
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro title={title} smaller>
        {intro && <p>{intro}</p>}
      </SectionIntro>

      <Container className={intro ? "mt-24" : "mt-16"}>
        <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {pages.map((page) => (
            <FadeIn key={page.id}>
              <PageLink linkLabel = {linkLabel} locale={locale} page={page} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  );
}
