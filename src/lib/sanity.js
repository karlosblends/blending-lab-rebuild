import { createClient } from "@sanity/client";
import { projects as localProjects } from "../data/projects.js";

export const sanityConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || "2026-08-05",
  useCdn: import.meta.env.PUBLIC_SANITY_USE_CDN === "true",
};

export const isSanityConfigured = Boolean(sanityConfig.projectId && sanityConfig.dataset);

const client = isSanityConfigured ? createClient(sanityConfig) : null;

const projectFields = `
  _id,
  title,
  "slug": slug.current,
  template,
  description,
  role,
  service,
  deliverables,
  expertise,
  industry,
  platform,
  company,
  myRole,
  pageIntro,
  proofLine,
  services,
  "coverImage": coalesce(coverImage.asset->url, coverImagePath),
  "thumbnail": coalesce(thumbnail.asset->url, thumbnailPath),
  gallery[]{
    "src": coalesce(image.asset->url, src),
    alt,
    caption,
    position,
    objectPosition,
    aspect
  },
  featured,
  archived,
  caseStudyUrl,
  legacyUrls,
  liveUrl,
  liveLabel,
  caseStudy{
    label,
    headline,
    summary,
    heroTreatment,
    "heroImage": coalesce(heroImage.asset->url, heroImagePath),
    heroAlt,
    heroPosition,
    heroCaption,
    intro,
    context,
    sections[]{
      ...,
      "type": _type,
      "image": coalesce(image.asset->url, imagePath),
      images[]{
        "src": coalesce(image.asset->url, src),
        alt,
        caption,
        position,
        objectPosition,
        aspect
      }
    }
  }
`;

const projectsQuery = `
  *[_type == "project" && defined(slug.current)]
    | order(coalesce(orderRank, 9999) asc, title asc) {
      ${projectFields}
    }
`;

let projectsPromise;

const asContextTuples = (items) =>
  items
    ?.map((item) => {
      if (Array.isArray(item)) return item;
      return [item?.label, item?.value].filter(Boolean);
    })
    .filter((item) => item.length >= 2);

const normalizeImageList = (gallery = []) => gallery.map((item) => (typeof item === "string" ? item : item?.src || item?.image)).filter(Boolean);

const normalizeProject = (project) => {
  const caseStudy = project.caseStudy
    ? {
        ...project.caseStudy,
        context: asContextTuples(project.caseStudy.context),
        sections: project.caseStudy.sections?.map((section) => ({
          ...section,
          type: section.type || section._type,
          images: section.images?.filter((image) => image?.src || image?.image),
        })),
      }
    : undefined;

  return {
    ...project,
    gallery: normalizeImageList(project.gallery),
    featured: project.featured ?? false,
    archived: project.archived ?? false,
    caseStudy,
  };
};

export async function getProjects() {
  if (!client) return localProjects;

  projectsPromise ??= client
    .fetch(projectsQuery)
    .then((sanityProjects) => (sanityProjects?.length ? sanityProjects.map(normalizeProject) : localProjects))
    .catch((error) => {
      console.warn("Sanity content could not be loaded. Falling back to local project data.", error);
      return localProjects;
    });

  return projectsPromise;
}
