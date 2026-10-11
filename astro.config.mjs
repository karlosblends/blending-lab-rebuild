import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const projectId = env.PUBLIC_SANITY_PROJECT_ID || "13xgtq6v";
const dataset = env.PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  output: "static",
  security: {
    // Trust HTTPS addresses owned by this site when Vercel forwards requests.
    allowedDomains: [
      { hostname: "blending-lab.com", protocol: "https" },
      { hostname: "www.blending-lab.com", protocol: "https" },
      { hostname: "blending-lab-rebuild.vercel.app", protocol: "https" },
      { hostname: "blending-lab-rebuild-blending-lab.vercel.app", protocol: "https" },
      { hostname: "blending-lab-rebuild-git-main-blending-lab.vercel.app", protocol: "https" },
      ...(env.VERCEL_URL ? [{ hostname: env.VERCEL_URL, protocol: "https" }] : []),
    ],
  },
  adapter: vercel(),
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
