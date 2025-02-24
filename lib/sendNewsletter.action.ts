"use server";

import NewsletterFormEmail from "@/email/NewsletterFormEmail";
import React from "react";
import { Resend } from "resend";
import { getErrorMessage } from "./utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletterAction({ email }: { email: string }) {
  try {
    const response = await resend.emails.send({
      from: "Newsletter Form <onboarding@resend.dev>",
      to: "spark.studio.dev@gmail.com",
      subject: "Novi subscriber - Spark Studio Website",
      replyTo: email,
      react: React.createElement(NewsletterFormEmail, { email }),
    });

    if (!response.data || response.error) {
      throw new Error(response?.error?.message || "Email sending failed");
    }

    return { data: response.data };
  } catch (error: unknown) {
    console.error("Error in sendNewsletterAction:", error);
    return { error: getErrorMessage(error) };
  }
}
