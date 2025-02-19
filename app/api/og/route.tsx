/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const hasDescription = searchParams.has("description");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Spark Studio Website";
    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 140)
      : "Your go-to platform for creativity and innovation.";

    const hasOGCTA1 = searchParams.has("ogCTA1")
    const hasOGCTA2 = searchParams.has("ogCTA2")

    const ogCTA1 = hasOGCTA1
      ? searchParams.get("ogCTA1")?.slice(0, 100)
      : "Započni";
    const ogCTA2 = hasOGCTA2
      ? searchParams.get("ogCTA2")?.slice(0, 100)
      : "Saznaj više";

    const fontData = await fetch(
      new URL("../../../fonts/Poppins-SemiBold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const logoData = await fetch(
      new URL("../../../public/spark-logo-img.png", import.meta.url)
    ).then((res) => res.arrayBuffer());

    // Convert ArrayBuffer to base64
    const logoBase64 = Buffer.from(logoData).toString("base64");
    const logoUrl = `data:image/png;base64,${logoBase64}`;

    return new ImageResponse(
      (
        <div tw="flex flex relative w-full h-full items-center justify-center bg-white ">
          <div tw="flex flex-col w-full py-12 px-4 md:items-center justify-between p-8">
            {/* Image with responsive styling */}

            <img src={logoUrl} alt="spark logo" width={300} height={120} />
            <h2
              style={{ fontFamily: "Poppins" }}
              tw="flex flex-col text-3xl sm:text-4xl font-bold py-8 tracking-wide text-center text-[#d4af37] justify-center items-center"
            >
              <span tw="mb-6">{title}</span>
              <span tw="text-slate-800">{description}</span>
            </h2>
            <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-md shadow">
                <a tw="flex items-center justify-center rounded-md border border-transparent bg-[#d4af37] px-5 py-3 text-base font-medium text-white">
                  {ogCTA1}
                </a>
              </div>
              <div tw="ml-3 flex rounded-md shadow">
                <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-[#d4af37]">
                  {ogCTA2}
                </a>
              </div>
            </div>
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
