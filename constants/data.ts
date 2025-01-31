import logo from "@/images/clients/family-fund/logomark-dark.svg";
import imageHero from "@/images/dummy/hero.jpg";
import { StaticImageData } from "next/image";

export type CaseStudyType = {
  client: string;
  title: string;
  href: string;
  slug: string;
  summary: string[];
  description: string;
  content: string[];
  logo: string; // Assuming logo is a string (URL or path to an image), adjust if needed
  image: { src: StaticImageData }; // Assuming imageHero is a string (URL or path to an image)
  date: string; // Consider using Date if parsing is needed
  service: string;
  testimonial: {
    author: { name: string; role: string };
    content: string;
  };
};

export const caseStudies: CaseStudyType[] = [
  {
    client: "FamilyFund",
    title: "Skip the bank, borrow from those you trust",
    href: "/work/family-fund",
    slug: "family-fund",
    summary: [
      "FamilyFund is a crowdfunding platform for friends and family. Allowing users to take personal loans from their network without a traditional financial institution.",
      "We developed a custom CMS to power their blog with and optimised their site to rank higher for the keywords “Gary Vee” and “Tony Robbins”.",
    ],
    description:
      "FamilyFund is a crowdfunding platform for friends and family. Allowing users to take personal loans from their network without a traditional financial institution.",
    content: [
      "Having written one of the most shared posts on medium.com (“How to cash out your Dad’s 401K without him knowing”) FamilyFund approached us looking to build out their own blog.",
      "The blog would help drive new traffic to their site and serve as a resource-hub for users already trying to exploit their network for money. Because it was so important that they own their own content, we decided that an on-prem solution would be best.",
      "We installed 24 Mac Minis bought from craigslist in the storage cupboard of their office. One machine would be used for the web server and another one for the build server. The other 22 were for redundancy, and to DDOS squarespace.com every few months to keep them on their toes.",
      "To optimise their search traffic we used an innovative technique. Every post has a shadow post only visible to web crawlers that is some variation of “Gary Vee is looking to invest in new founders”. Like bees to honey.",
    ],
    logo,
    image: { src: imageHero },
    date: "2023-01",
    service: "Web development, CMS",
    testimonial: {
      author: { name: "Debra Fiscal", role: "CEO of FamilyFund" },
      content:
        "Working with Studio, we felt more like a partner than a customer. They really resonated with our mission to change the way people convince their parents to cash out their pensions.",
    },
  },
  {
    client: "Phobia",
    title: "Overcome your fears, find your match",
    href: "/work/phobia",
    slug: "phobia",
    summary: [
      "Find love in the face of fear — Phobia is a dating app that matches users based on their mutual phobias so they can be scared together.",
      "We worked with Phobia to develop a new onboarding flow. A user is shown pictures of common phobias and we use the microphone to detect which ones make them scream, feeding the results into the matching algorithm.",
    ],
    description:
      "Find love in the face of fear — Phobia is a dating app that matches users based on their mutual phobias so they can be scared together.",
    content: [
      "Noticing incredibly high churn, the team at Phobia came to the conclusion that, instead of having a fundamentally flawed business idea, they needed to improve their onboarding process.",
      "Previously users selected their phobias manually but this led to some users selecting things they weren’t actually afraid of to increase their matches.",
      "To combat this, we developed a system that displays a slideshow of common phobias during onboarding. We then use malware to surreptitiously access their microphone and detect when they have audible reactions. We measure the pitch, volume and duration of their screams and feed that information to the matching algorithm.",
      "The next phase is a VR version of the onboarding flow where users are subjected to a series of scenarios that will determine their fears. We are currently developing the first scenario, working title: “Jumping out of a plane full of spiders”.",
    ],
    logo,
    image: { src: imageHero },
    date: "2022-06",
    service: "App development",
    testimonial: {
      author: { name: "Jenny Wilson", role: "CPO of Phobia" },
      content:
        "The team at Studio went above and beyond with our onboarding, even finding a way to access the user’s microphone without triggering one of those annoying permission dialogs.",
    },
  },
  {
    client: "Unseal",
    title: "Get a hodl of your health",
    href: "/work/unseal",
    slug: "unseal",
    summary: [
      "Unseal is the first NFT platform where users can mint and trade NFTs of their own personal health records, allowing them to take control of their data.",
      "We built out the blockchain infrastructure that supports Unseal. Unfortunately, we took a massive loss on this project when Unseal’s cryptocurrency, PlaceboCoin, went to zero.",
    ],
    description:
      "Unseal is the first NFT platform where users can mint and trade NFTs of their own personal health records, allowing them to take control of their data.",
    content: [
      "Annoyed that his wife’s gynaecologist would not disclose the results of her pap smear, Unseal’s founder Kevin came up with the idea of using the block chain to store individual health records.",
      "Unseal approached us early in their development, having just raised funds through an ICO of their cryptocurrency PlaceboCoin. Having never worked on a web3 product we decided to farm the project out to an agency in Kyiv and skim profits off the top. Despite frequent complaints about missile strikes and power outages, the Ukrainians delivered the brief ahead of schedule.",
      "After reaching a high of $12k, PlaceboCoin went to zero in a matter of hours. Because we took payment in PlaceboCoin but our subcontractors insisted on being paid in USD we have taken a huge financial loss on this project.",
    ],
    logo,
    image: { src: imageHero },
    date: "2022-10",
    service: "Blockchain development",
    testimonial: {
      author: { name: "Emily Selman", role: "Head of Engineering at Unseal" },
      content:
        "Studio did an amazing job building out our core blockchain infrastructure and I’m sure once PlaceboCoin rallies they’ll be able to finish the project.",
    },
  },
];
