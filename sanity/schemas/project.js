import { defineField, defineType } from "sanity";

const existingAssetDescription = "Optional fallback path for assets already in public/assets, for example projects/xcare-website/cover.png.";

const localImageFields = [
  defineField({
    name: "image",
    title: "Uploaded image",
    type: "image",
    options: { hotspot: true },
  }),
  defineField({
    name: "imagePath",
    title: "Existing site image path",
    type: "string",
    description: existingAssetDescription,
  }),
  defineField({ name: "alt", title: "Alt text", type: "string" }),
  defineField({ name: "caption", title: "Caption", type: "string" }),
  defineField({ name: "position", title: "Image position", type: "string" }),
  defineField({ name: "objectPosition", title: "Object position", type: "string" }),
  defineField({ name: "aspect", title: "Aspect preset", type: "string" }),
];

const sectionTextFields = [
  defineField({ name: "id", title: "Section ID", type: "string" }),
  defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
  defineField({ name: "tone", title: "Tone", type: "string" }),
];

const galleryImage = defineField({
  name: "galleryImage",
  title: "Gallery image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Uploaded image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "src",
      title: "Existing site image path",
      type: "string",
      description: existingAssetDescription,
    }),
    defineField({ name: "alt", title: "Alt text", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "position", title: "Image position", type: "string" }),
    defineField({ name: "objectPosition", title: "Object position", type: "string" }),
    defineField({ name: "aspect", title: "Aspect preset", type: "string" }),
  ],
  preview: {
    select: {
      media: "image",
      title: "caption",
      subtitle: "src",
    },
    prepare({ media, title, subtitle }) {
      return { media, title: title || "Gallery image", subtitle };
    },
  },
});

export const statement = defineType({
  name: "statement",
  title: "Statement",
  type: "object",
  fields: sectionTextFields,
});

export const textImage = defineType({
  name: "textImage",
  title: "Text and image",
  type: "object",
  fields: [
    ...sectionTextFields,
    ...localImageFields,
    defineField({ name: "align", title: "Image alignment", type: "string", options: { list: ["left", "right"] } }),
    defineField({ name: "scale", title: "Image scale", type: "string", options: { list: ["wide", "crop"] } }),
  ],
});

export const fullImage = defineType({
  name: "fullImage",
  title: "Full image",
  type: "object",
  fields: [
    ...sectionTextFields,
    ...localImageFields,
    defineField({ name: "size", title: "Size", type: "string", options: { list: ["bleed"] } }),
    defineField({ name: "crop", title: "Crop image", type: "boolean" }),
  ],
});

export const twoImage = defineType({
  name: "twoImage",
  title: "Two images",
  type: "object",
  fields: [
    ...sectionTextFields,
    defineField({ name: "ratio", title: "Ratio preset", type: "string", options: { list: ["primary"] } }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [galleryImage],
      validation: (Rule) => Rule.max(2),
    }),
  ],
});

export const itemGrid = defineType({
  name: "itemGrid",
  title: "Item grid",
  type: "object",
  fields: [
    ...sectionTextFields,
    defineField({ name: "columns", title: "Columns preset", type: "string" }),
    defineField({ name: "numbered", title: "Numbered items", type: "boolean" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineField({
          name: "item",
          title: "Item",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "label", subtitle: "text" },
          },
        }),
      ],
    }),
    defineField({ name: "note", title: "Note", type: "text", rows: 2 }),
  ],
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "orderRank", title: "Sort order", type: "number", initialValue: 999 }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "archived", title: "Archived", type: "boolean", initialValue: false }),
    defineField({ name: "template", title: "Template", type: "string", initialValue: "standard" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "service", title: "Service", type: "string" }),
    defineField({ name: "deliverables", title: "Deliverables", type: "string" }),
    defineField({ name: "expertise", title: "Expertise", type: "string" }),
    defineField({ name: "industry", title: "Industry", type: "string" }),
    defineField({ name: "platform", title: "Platform", type: "string" }),
    defineField({ name: "company", title: "Company context", type: "text", rows: 4 }),
    defineField({ name: "myRole", title: "My role", type: "text", rows: 4 }),
    defineField({ name: "pageIntro", title: "Page intro", type: "text", rows: 4 }),
    defineField({ name: "proofLine", title: "Proof line", type: "text", rows: 3 }),
    defineField({ name: "services", title: "Services", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "coverImagePath", title: "Existing cover path", type: "string", description: existingAssetDescription }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "thumbnailPath", title: "Existing thumbnail path", type: "string", description: existingAssetDescription }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [galleryImage] }),
    defineField({ name: "caseStudyUrl", title: "Case study URL", type: "string" }),
    defineField({ name: "legacyUrls", title: "Legacy URLs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "liveLabel", title: "Live link label", type: "string" }),
    defineField({
      name: "caseStudy",
      title: "Case study",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
        defineField({ name: "heroTreatment", title: "Hero treatment", type: "string", options: { list: ["immersive", "contained"] } }),
        defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
        defineField({ name: "heroImagePath", title: "Existing hero path", type: "string", description: existingAssetDescription }),
        defineField({ name: "heroAlt", title: "Hero alt text", type: "string" }),
        defineField({ name: "heroPosition", title: "Hero position", type: "string" }),
        defineField({ name: "heroCaption", title: "Hero caption", type: "string" }),
        defineField({
          name: "intro",
          title: "Intro",
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
          ],
        }),
        defineField({
          name: "context",
          title: "Project facts",
          type: "array",
          of: [
            defineField({
              name: "contextItem",
              title: "Fact",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "value", title: "Value", type: "string" }),
              ],
              preview: {
                select: { title: "label", subtitle: "value" },
              },
            }),
          ],
        }),
        defineField({
          name: "sections",
          title: "Sections",
          type: "array",
          of: [{ type: "statement" }, { type: "textImage" }, { type: "fullImage" }, { type: "twoImage" }, { type: "itemGrid" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "service",
      media: "coverImage",
    },
  },
});
