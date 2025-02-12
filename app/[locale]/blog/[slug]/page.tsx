import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { PageLinks } from "@/components/PageLinks";
import { ContactSection } from "@/components/sections/ContactSection";
import { getLocalizedPost, getLocalizedPosts } from "@/lib/getBlogPosts";
import { Locale, locales } from "@/lib/locales";
import { BlogPost } from "@/lib/types";
// import { BlogPost } from "@/lib/types";
// import { formatDate } from "@/lib/utils";
// import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const params = [];

  for (const locale of locales) {
    const posts = await getLocalizedPosts(locale);

    for (const post of posts.data) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return params;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const data = await getLocalizedPost(locale, slug);
  const post = data.data;

  const allBlogsData = await getLocalizedPosts(locale);
  const allBlogs:BlogPost[] = allBlogsData.data
  console.log(post);
  console.log(allBlogs);
  const restOfBlogs = allBlogs
    .filter(({ id }) => id !== post.id)
    .slice(0, 2)
console.log(restOfBlogs);
  if (!post) return notFound();

  return (
    <>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              {post.title}
            </h1>
            <time
              dateTime={""}
              className="order-first text-sm text-neutral-950"
            >
              {/* {formatDate("article.date")} */}
            </time>
            <dd className="mt-6 flex items-center justify-center gap-x-4">
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
                  <span className="text-primary-accent">Spark</span> Studio
                </div>
              </div>
            </dd>
          </header>
        </FadeIn>

        <FadeIn className="flex justify-center">
          <section
            className="mt-24 prose"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </FadeIn>
      </Container>
     {restOfBlogs.length >0 && <PageLinks pages={restOfBlogs} locale={locale} className="mt-24  " title="More articles"/> }
      <ContactSection />
    </>
  );
}
