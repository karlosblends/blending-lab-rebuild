import { projectImageSrcsets } from "../data/projects.js";

export const img = (name) => {
  if (!name) return "";
  if (/^(https?:)?\/\//.test(name) || name.startsWith("data:") || name.startsWith("/")) return name;
  return name.includes("/") ? `/assets/${name}` : `/assets/images/${name}`;
};

export const vid = (name) => `/assets/videos/${name}`;

export const imgSrcset = (name) =>
  projectImageSrcsets[name]
    ? projectImageSrcsets[name]
        .split(", ")
        .map((entry) => `${img(entry.split(" ")[0])} ${entry.split(" ")[1]}`)
        .join(", ")
    : "";

export const normalizePage = (page) => {
  if (!page) return "index.html";
  if (page.includes(".")) return page;
  return `${page}.html`;
};

export const pageToParam = (page) => page.replace(/\.html$/, "");
