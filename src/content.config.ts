import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const books = defineCollection({
  loader: glob({ base: "./src/content/books", pattern: "**/*.md" }),
  schema: z.object({}),
});

const notes = defineCollection({
  loader: glob({ base: "./src/content/notes", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    teaser: z.string(),
    status: z.string().default("Tinkering"),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    order: z.number(),
    hidden: z.boolean().optional().default(false),
  }),
});

export const collections = { books, notes };
