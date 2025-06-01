import { type Metadata } from "next";

import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { GridList, GridListItem } from "@/components/GridList";
import { GridPattern } from "@/components/GridPattern";
import { List, ListItem } from "@/components/List";
import { PageIntro } from "@/components/PageIntro";
import { SectionIntro } from "@/components/SectionIntro";
import { StylizedImage } from "@/components/StylizedImage";
import { TagList, TagListItem } from "@/components/TagList";
import imageLaptop from "@/images/laptop.jpg";
import imageMeeting from "@/images/meeting.jpg";
import imageWhiteboard from "@/images/whiteboard.jpg";
// import { Blockquote } from "@/components/Blockquote";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/lib/locales";
import { getTranslations, setRequestLocale } from "next-intl/server";


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
    title: t("titleProcess"),
    description: t("descriptionProcess"),
    openGraph: {
      title: t("titleProcess"),
      description: t("ogDescriptionProcess"),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}spark-og.png`,
          width: 1200,
          height: 630,
          alt: t("titleProcess"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleProcess"),
      description: t("ogDescriptionProcess"),
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}spark-og.png`],
    },
  };
}

function Section({
  title,
  image,
  children,
}: {
  title: string;
  image: React.ComponentPropsWithoutRef<typeof StylizedImage>;
  children: React.ReactNode;
}) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-16">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  );
}

function Discover({ t }: { t: (key: string) => string }) {
  return (
    <Section title={t("discover.title")} image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>{t("discover.description.0")}</p>
        <p>{t("discover.description.1")}</p>
        <p>{t("discover.description.2")}</p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        {t("discover.included.title")}
      </h3>
      <TagList className="mt-4">
        <TagListItem>{t("discover.included.items.0")}</TagListItem>
        <TagListItem>{t("discover.included.items.1")}</TagListItem>
        <TagListItem>{t("discover.included.items.2")}</TagListItem>
        <TagListItem>{t("discover.included.items.3")}</TagListItem>
        <TagListItem>{t("discover.included.items.4")}</TagListItem>
        <TagListItem>{t("discover.included.items.5")}</TagListItem>
      </TagList>
    </Section>
  );
}

function Build({ t }: { t: (key: string) => string }) {
  return (
    <Section title={t("build.title")} image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>{t("build.description.0")}</p>
        <p>{t("build.description.1")}</p>
        <p>{t("build.description.2")}</p>
      </div>

      {/* <Blockquote
        author={{ name: "Debra Fiscal", role: "CEO of Unseal" }}
        className="mt-12"
      >
        Studio were so regular with their progress updates we almost began to
        think they were automated!
      </Blockquote> */}
    </Section>
  );
}

function Deliver({ t }: { t: (key: string) => string }) {
  return (
    <Section title={t("deliver.title")} image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>{t("deliver.description.0")}</p>
        <p>{t("deliver.description.1")}</p>
        <p>{t("deliver.description.2")}</p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        {t("deliver.included.title")}
      </h3>
      <List className="mt-8">
        <ListItem title={t("deliver.included.items.0.title")}>
          {t("deliver.included.items.0.description")}
        </ListItem>
        <ListItem title={t("deliver.included.items.1.title")}>
          {t("deliver.included.items.1.description")}
        </ListItem>
        <ListItem title={t("deliver.included.items.2.title")}>
          {t("deliver.included.items.2.description")}
        </ListItem>
      </List>
    </Section>
  );
}

function Values({ t }: { t: (key: string) => string }) {
  return (
    <div className="relative mt-24 pt-24 ">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro eyebrow={t("values.eyebrow")} title={t("values.title")}>
        <p>{t("values.description")}</p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title={t("values.items.0.title")}>
            {t("values.items.0.description")}
          </GridListItem>
          <GridListItem title={t("values.items.1.title")}>
            {t("values.items.1.description")}
          </GridListItem>
          <GridListItem title={t("values.items.2.title")}>
            {t("values.items.2.description")}
          </GridListItem>
          <GridListItem title={t("values.items.3.title")}>
            {t("values.items.3.description")}
          </GridListItem>
          <GridListItem title={t("values.items.4.title")}>
            {t("values.items.4.description")}
          </GridListItem>
          <GridListItem title={t("values.items.5.title")}>
            {t("values.items.5.description")}
          </GridListItem>
        </GridList>
      </Container>
    </div>
  );
}

export default async function Process({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ProcessPage" });
  return (
    <>
      <PageIntro eyebrow={t("pageIntro.eyebrow")} title={t("pageIntro.title")}>
        <p>{t("pageIntro.description")}</p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] ">
        <Discover t={t} />
        <Build t={t} />
        <Deliver t={t} />
      </div>

      <Values t={t} />

      <ContactSection />
    
    </>
  );
}
