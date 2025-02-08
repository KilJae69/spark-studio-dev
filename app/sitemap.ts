/*
import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog"; // adjust the import based on your project structure

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts();
  
  const blogRoutes = posts.map((post) => ({
    url: `https://www.elatus.net/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || Date.now()),
    alternates: {
      languages: {
        en: `https://www.elatus.net/blog/${post.slug}`,
        hr: `https://www.elatus.net/hr/blog/${post.slug}`,
      },
    },
  }));

  return [
    {
      url: "https://www.elatus.net/",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://www.elatus.net/",
          hr: "https://www.elatus.net/hr",
        },
      },
    },
    {
      url: "https://www.elatus.net/services",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://www.elatus.net/services",
          hr: "https://www.elatus.net/hr/services",
        },
      },
    },
    {
      url: "https://www.elatus.net/work",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://www.elatus.net/work",
          hr: "https://www.elatus.net/hr/work",
        },
      },
    },
    ...blogRoutes,
  ];
}
*/