// scripts/build-favicon.ts
import { writeFileSync } from "node:fs";
import sharp from "sharp";

sharp("src/app/icon.svg")
  .resize(256, 256) // ICOs are bitmap; pick sizes you want
  .toFormat("ico")
  .toBuffer()
  .then((buffer) => writeFileSync("src/app/favicon.ico", buffer));
