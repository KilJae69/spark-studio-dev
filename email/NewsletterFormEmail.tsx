import { TNewsletterFormSchema } from "@/lib/types";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export default function NewsletterFormEmail({ email }: TNewsletterFormSchema) {
  return (
    <Html>
      <Head />
      <Preview>Novi Subscriber</Preview>
      <Tailwind>
        <Body className="bg-primary-50 text-black font-sans">
          <Container className="mx-auto my-6 max-w-xl rounded-md bg-white p-6 shadow-lg">
            <Section>
              <Heading className="text-slate-800 text-xl font-semibold text-center">
                Novi subscriber za Spark Studio
              </Heading>
              <Hr className="my-4 border-t border-gray-300" />

              <Hr className="my-4 border-t border-gray-300" />
              <Text className="text-slate-700 text-lg">
                <strong>Email subscribera:</strong> <br />
                <p className="text-primary-accent">{email}</p>
              </Text>

              <Hr className="my-4 border-t border-gray-300" />
              <Text className="text-center text-slate-500 text-sm">
                Ova poruka je poslana putem newsletter forme na vašoj web
                stranici.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
