import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const projectId = env.PUBLIC_SANITY_PROJECT_ID || "13xgtq6v";
const dataset = env.PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  output: "static",
  build: {
    format: "file",
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: env.PUBLIC_SANITY_API_VERSION || "2026-08-05",
      useCdn: false,
    }),
    react(),
  ],
});
