import { type Metadata } from "next";
import Image from "next/image";

import { Border } from "@/components/Border";
import { Button } from "@/components/Button";
import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { PageIntro } from "@/components/PageIntro";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";
import { getLocalizedPosts } from "@/lib/getBlogPosts";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogPost } from "@/lib/types";
import { Locale, locales } from "@/lib/locales";
import { notFound } from "next/navigation";

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
  const ogImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(
    t("titleBlog")
  )}&description=${encodeURIComponent(t("ogDescriptionBlog"))}&locale=${locale}&ogCTA1=${encodeURIComponent(t("ogCTA1"))}&ogCTA2=${encodeURIComponent(t("ogCTA2"))}`;

  return {
    title: t("titleBlog"),
    description: t("descriptionBlog"),
    openGraph: {
      title: t("titleBlog"),
      description: t("ogDescriptionBlog"),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t("titleBlog"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleBlog"),
      description: t("ogDescriptionBlog"),
      images: [ogImageUrl],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const data = await getLocalizedPosts(locale);
  const blogs = data.data
  
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  return (
    <>
      <PageIntro eyebrow="Blog" title={t("heading")}>
        <p>{t("subheading")}</p>
      </PageIntro>

      <Container className="mt-24 ">
        <FadeInStagger className="space-y-24 ">
          {blogs && blogs.length > 0 ? blogs.map((blog:BlogPost) => (
            <FadeIn key={blog.slug}>
            <article>
              <Border className="pt-16">
                <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                  <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                    <h2 className="font-display text-2xl font-semibold text-neutral-950">
                      <Link href={{ pathname: "/blog/[slug]", params: { slug: blog.slug } }}>
                        {blog.title}
                      </Link>
                    </h2>
                    <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                      <dt className="sr-only">Published</dt>
                      <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                        <time dateTime={blog.published_at}>
                          {formatDate(blog.published_at,locale)}
                        </time>
                      </dd>
                      <dt className="sr-only">Author</dt>
                      <dd className="mt-6 flex items-center gap-x-4">
                        <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                          <Image
                            width={50}
                            height={50}
                            alt="avatar icon"
                            src={"/icons/developer-icon.webp"}
                            className="h-12 w-12 object-cover"
                          />
                        </div>
                        <div className="text-sm text-neutral-950">
                          <div className="font-semibold">
                            <span className="text-primary-accent">Spark</span>{" "}
                            Studio
                          </div>
                        </div>
                      </dd>
                    </dl>
                    <p className="mt-6 max-w-2xl text-base text-neutral-600">
                      {blog.short_description}
                    </p>
                    <Button
                      href={{ pathname: "/blog/[slug]", params: { slug: blog.slug } }}
                      aria-label={`${t("ButtonLinkLabel")}: ${blog.title}`}
                      className="mt-8"
                    >
                     {t("ButtonLinkLabel")}
                    </Button>
                  </div>
                </div>
              </Border>
            
            </article>
          </FadeIn>
          )):""}
          
        </FadeInStagger>
      </Container>

      <ContactSection />
    </>
  );
}
