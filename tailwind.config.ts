import * as aspectRatioPlugin from "@tailwindcss/aspect-ratio";
import type { Config } from "tailwindcss";
import * as presets from "./tailwind.preset";

const config: Config = {
  presets: [presets],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [aspectRatioPlugin],
};
export default config;
