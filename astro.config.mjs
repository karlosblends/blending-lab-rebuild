import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET || "production";
const sanityEnabled = Boolean(projectId && dataset);

export default defineConfig({
  output: "static",
  build: {
    format: "file",
  },
  integrations: [
    ...(sanityEnabled
      ? [
          sanity({
            projectId,
            dataset,
            apiVersion: env.PUBLIC_SANITY_API_VERSION || "2026-08-05",
            useCdn: env.PUBLIC_SANITY_USE_CDN === "true",
            studioBasePath: "/studio",
          }),
        ]
      : []),
    react(),
  ],
});
