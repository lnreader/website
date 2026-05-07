import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { PreviewImage, previewImageAlt, previewImageSize } from "./preview-image";

export const alt = previewImageAlt;
export const contentType = "image/png";
export const size = previewImageSize;

async function loadFont(filename: string) {
  return readFile(join(process.cwd(), "public", "fonts", filename));
}

export default async function Image() {
  const [regular, semibold, extraBold] = await Promise.all([
    loadFont("space-grotesk-regular.ttf"),
    loadFont("space-grotesk-medium.ttf"),
    loadFont("space-grotesk-semibold.ttf"),
  ]);

  return new ImageResponse(<PreviewImage />, {
    ...previewImageSize,
    fonts: [
      {
        name: "Space Grotesk",
        data: regular,
        style: "normal",
        weight: 400,
      },
      {
        name: "Space Grotesk",
        data: semibold,
        style: "normal",
        weight: 500,
      },
      {
        name: "Space Grotesk",
        data: extraBold,
        style: "normal",
        weight: 600,
      },
    ],
  });
}
