// app/sitemap.ts
import { MetadataRoute } from 'next';
import { routing, getPathname } from '@/i18n/routing';
import type { BlogPost, CaseStudy } from '@/lib/types';
import { getLocalizedPosts, getLocalizedCaseStudies } from '@/lib/getBlogPosts';

const host = 'https://www.spark-dev-studio.com'; // Replace with your actual domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Static routes as defined in your routing config
    const staticRoutes: ("/" | "/about" | "/blog" | "/process" | "/projects" | "/contact" | "/privacy")[] = [
      '/',
      '/about',
      '/blog',
      '/process',
      '/projects',
      '/contact',
      '/privacy'
    ];

    const [blogPostsByLocale, caseStudiesByLocale] = await Promise.all([
        Promise.all(
          routing.locales.map(locale =>
            getLocalizedPosts(locale).then(res => res.data as BlogPost[])
          )
        ),
        Promise.all(
          routing.locales.map(locale =>
            getLocalizedCaseStudies(locale).then(res => res.data as CaseStudy[])
          )
        )
      ]);

    // Create a "zipped" mapping of blog posts by index.
    // For each index, we assume the blog post at that index in each locale
    // corresponds to the same content, but with a locale-specific slug.
    const blogMapping = blogPostsByLocale[0].map((_, index) => {
      const mapping: Record<string, string> = {};
      routing.locales.forEach((locale, i) => {
        mapping[locale] = blogPostsByLocale[i][index].slug;
      });
      return mapping;
    });

    // Same for case studies
    const caseStudyMapping = caseStudiesByLocale[0].map((_, index) => {
      const mapping: Record<string, string> = {};
      routing.locales.forEach((locale, i) => {
        mapping[locale] = caseStudiesByLocale[i][index].slug;
      });
      return mapping;
    });

    // Generate static sitemap entries for every locale
    const staticEntries = staticRoutes.flatMap((href) =>
      routing.locales.map((locale) => ({
        url: getUrl(href, locale),
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((cur) => [cur, getUrl(href, cur)])
          )
        }
      }))
    );

    // Generate dynamic entries for blog posts
    const blogEntries = blogMapping.flatMap((mapping) =>
      routing.locales.map((locale) => ({
        url: getUrl({ pathname: '/blog/[slug]', params: { slug: mapping[locale] } }, locale),
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((cur) => [
              cur,
              getUrl({ pathname: '/blog/[slug]', params: { slug: mapping[cur] } }, cur)
            ])
          )
        }
      }))
    );

    // Generate dynamic entries for case studies (projects)
    const caseStudyEntries = caseStudyMapping.flatMap((mapping) =>
      routing.locales.map((locale) => ({
        url: getUrl({ pathname: '/projects/[slug]', params: { slug: mapping[locale] } }, locale),
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((cur) => [
              cur,
              getUrl({ pathname: '/projects/[slug]', params: { slug: mapping[cur] } }, cur)
            ])
          )
        }
      }))
    );

    return [...staticEntries, ...blogEntries, ...caseStudyEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    throw error;
  }
}

// Overload signatures for getUrl:

// For static routes:
function getUrl(
  href: "/" | "/about" | "/blog" | "/process" | "/projects" | "/contact" | "/privacy",
  locale: string
): string;
// For dynamic routes:
function getUrl(
  href: { pathname: "/blog/[slug]"; params: { slug: string } } | { pathname: "/projects/[slug]"; params: { slug: string } },
  locale: string
): string;
// Implementation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUrl(href: any, locale: string): string {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
