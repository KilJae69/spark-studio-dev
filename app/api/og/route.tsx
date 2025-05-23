/* eslint-disable @next/next/no-img-element */

import { truncateWithEllipsis } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const hasDescription = searchParams.has("description");
    const title = hasTitle
  ? truncateWithEllipsis(searchParams.get("title"), 100)
  : "Spark Studio Website"

const description = hasDescription
  ? truncateWithEllipsis(searchParams.get("description"), 140)
  : "Your go-to platform for creativity and innovation."

    

    const hasPill = searchParams.has("pill");
    const pill = hasPill && searchParams.get("pill");

    const fontData = await fetch(
      new URL("../../../fonts/Poppins-SemiBold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const logoData = await fetch(
      new URL("../../../public/spark-logo-img.png", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const avatarData = await fetch(
      new URL("../../../public/og-avatar-resized.png", import.meta.url)
    ).then((res) => res.arrayBuffer());

    // Convert ArrayBuffer to base64
    const logoBase64 = Buffer.from(logoData).toString("base64");
    const logoUrl = `data:image/png;base64,${logoBase64}`;

    const avatarBase64 = Buffer.from(avatarData).toString("base64");
    const avatarUrl = `data:image/png;base64,${avatarBase64}`;

    console.log(title,description);

    return new ImageResponse(
      (
        <div tw="flex flex relative w-full h-full items-center justify-center bg-white ">
          <div tw="flex flex-col w-[70%] py-12 px-4 md:items-center justify-between p-8">
            {/* Image with responsive styling */}

            {/* <img src={logoUrl} alt="spark logo" width={300} height={120} /> */}
            {pill && (
              <div tw="bg-slate-800 text-[#d4af37] text-xl rounded-2xl py-3 px-6">
                {pill}
              </div>
            )}
            <h2
              style={{ fontFamily: "Poppins" }}
              tw="flex flex-col text-3xl sm:text-4xl font-bold py-8 tracking-wide text-center text-[#d4af37] justify-center items-center"
            >
              <span tw="mb-6">{title}</span>
              <span tw="text-slate-800">{description}</span>
            </h2>
           
          </div>
          <div tw="w-[30%] flex flex-col pt-8 items-center justify-between h-full bg-slate-800">
            <img
              src={logoUrl}
              alt="spark logo"
              tw="ml-8"
              width={300}
              height={120}
            />
            <img src={avatarUrl} alt="avatar" width={300} height={400} />
          </div>
        </div>
      ),
      {
        emoji: "twemoji",
        fonts: [
          {
            name: "Poppins",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return new Response(`Failed to generate OG image - ${e}`, { status: 500 });
  }
}
