"use server";

import { Resend } from "resend";
import { getErrorMessage, validateString } from "./utils";
import ContactFormEmail from "@/email/ContactFormEmail";
import React from "react";
import { TContactFormSchema } from "./types";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailAction({
  name,
  email,
  message,
  phone,
}: TContactFormSchema) {
  if (!validateString(email, 500)) {
    return {
      error: "Invalid sender email",
    };
  }

  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }
  try {
    const response = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "spark.studio.dev@gmail.com",
      subject: "Poruka iz kontaktne forme - Spark Studio Website",
      replyTo: email as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        email: email as string,
        name: name as string,

        phone: phone as string,
      }),
    });

    if (!response.data || response.error) {
      throw new Error(response?.error?.message || "Email sending failed");
    }

    return { data: response.data };
  } catch (error: unknown) {
    console.error("Error in sendEmailAction:", error);
    return { error: getErrorMessage(error) };
  }
}
