import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de',"bs"],
 
  // Used when no locale matches
  defaultLocale: 'bs',
  localePrefix: 'as-needed',

  pathnames: {
    // Static pages
    "/": "/",
    "/about": { en: "/about", bs: "/o-nama", de: "/ueber-uns" },
   
    "/blog":"/blog",
    // Blog listing page
    "/process": {en:"/process",bs:"/proces", de:"/prozess"},
    "/work": {en:"/work",bs:"/rad", de:"/arbeit"},
    "/contact": {en:"/contact",bs:"/kontakt", de:"/kontaktieren"},
    "/privacy": {en:"/privacy-policy",bs:"/politika-privatnosti", de:"/datenschutzerklärung"},

    // Dynamic blog pages (uses CMS)
    "/blog/[slug]": {
      en: "/blog/[slug]",
      bs: "/blog/[slug]",
      de: "/blog/[slug]",
    },
    "/work/[slug]": {
      en: "/work/[slug]",
      bs: "/rad/[slug]",
      de: "/arbeit/[slug]",
    },
  },
  
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);