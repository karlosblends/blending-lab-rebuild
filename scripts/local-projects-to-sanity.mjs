import { projects } from "../src/data/projects.js";

const compactObject = (value) => {
  if (Array.isArray(value)) return value.map(compactObject).filter((item) => item !== undefined);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value)
      .map(([key, item]) => [key, compactObject(item)])
      .filter(([, item]) => item !== undefined && item !== null && item !== "")
  );
};

const toGalleryItem = (item, index) => {
  if (typeof item === "string") {
    return { _type: "galleryImage", _key: `gallery-${index + 1}`, src: item };
  }

  return {
    _type: "galleryImage",
    _key: item._key || `gallery-${index + 1}`,
    ...item,
  };
};

const toContextItem = (item, index) => {
  if (Array.isArray(item)) {
    return { _type: "contextItem", _key: `context-${index + 1}`, label: item[0], value: item[1] };
  }

  return { _type: "contextItem", _key: item._key || `context-${index + 1}`, ...item };
};

const toSection = (section, index) => {
  const next = { ...section, _type: section.type, _key: section._key || `section-${index + 1}` };
  delete next.type;

  if (typeof next.image === "string") {
    next.imagePath = next.image;
    delete next.image;
  }

  if (next.images) {
    next.images = next.images.map(toGalleryItem);
  }

  return compactObject(next);
};

const toCaseStudy = (caseStudy = {}) => {
  const next = { ...caseStudy };

  if (typeof next.heroImage === "string") {
    next.heroImagePath = next.heroImage;
    delete next.heroImage;
  }

  if (next.context) next.context = next.context.map(toContextItem);
  if (next.sections) next.sections = next.sections.map(toSection);

  return compactObject(next);
};

const docs = projects.map((project, index) => {
  const doc = {
    ...project,
    _id: `project.${project.slug}`,
    _type: "project",
    slug: { _type: "slug", current: project.slug },
    orderRank: index,
  };

  if (typeof doc.coverImage === "string") {
    doc.coverImagePath = doc.coverImage;
    delete doc.coverImage;
  }

  if (typeof doc.thumbnail === "string") {
    doc.thumbnailPath = doc.thumbnail;
    delete doc.thumbnail;
  }

  if (doc.gallery) doc.gallery = doc.gallery.map(toGalleryItem);
  if (doc.caseStudy) doc.caseStudy = toCaseStudy(doc.caseStudy);

  return compactObject(doc);
});

for (const doc of docs) {
  process.stdout.write(`${JSON.stringify(doc)}\n`);
}

console.error(`Exported ${docs.length} project documents for Sanity import.`);
