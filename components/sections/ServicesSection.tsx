import { useTranslations } from "next-intl";
import { SectionIntro } from "../SectionIntro";
import { Container } from "../Container";
import { FadeIn } from "../FadeIn";
import { StylizedImage } from "../StylizedImage";
import { List, ListItem } from "../List";
import imageLaptop from "@/images/laptop.jpg";

export default function ServicesSection() {
    const t = useTranslations("ServicesSection");
    return (
      <>
        <SectionIntro
          eyebrow={t("eyebrow")}
          title={t("heading")}
          className="mt-10 md:mt-20 lg:mt-24"
        >
          <p>{t("subheading")}</p>
        </SectionIntro>
        <Container className="my-10 md:my-20 lg:my-24">
          <div className="lg:flex lg:items-center lg:justify-end">
            <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
              <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
                <StylizedImage
                  src={imageLaptop}
                  sizes="655px"
                  className="justify-center lg:justify-end"
                />
              </FadeIn>
            </div>
            <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
              <ListItem title={t("webDevelopmentTitle")}>
                {t("webDevelopment")}
              </ListItem>
              <ListItem title={t("applicationDevelopmentTitle")}>
                {t("applicationDevelopment")}
              </ListItem>
              <ListItem title={t("eCommerceTitle")}>{t("eCommerce")}</ListItem>
              <ListItem title={t("customContentManagementTitle")}>
                {t("customContentManagement")}
              </ListItem>
            </List>
          </div>
        </Container>
      </>
    );
  }