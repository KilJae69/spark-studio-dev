import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { getLocalizedPost, getLocalizedPosts } from "@/lib/getBlogPosts";
import { Locale, locales } from "@/lib/locales";
// import { BlogPost } from "@/lib/types";
// import { formatDate } from "@/lib/utils";
// import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
  const params = [];

  for (const locale of locales) {
    const posts = await getLocalizedPosts(locale);
    console.log(posts);
    for (const post of posts.data) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }
  console.log("Generated Params:", params); // Log the generated params
  return params;
}


export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  console.log(await params);

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

   setRequestLocale(locale);
  
  const data = await getLocalizedPost(locale, slug);
  const post =  data.data

  if (!post) return <div>Post not found</div>;
  
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
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by AuthorName, AuthorRole
            </p>
          </header>
        </FadeIn>

        <FadeIn className="flex justify-center">
          <section className="mt-24 sm:mt-32 lg:mt-40 prose" dangerouslySetInnerHTML={{ __html: post.body }}/>
        </FadeIn>
      </Container>
    </>
  );
}
