import { MarkdownInstance } from "./Astro";

export type PagePredicate = (value: MarkdownInstance<Record<string, any>>, index: number, array: MarkdownInstance<Record<string, any>>[]) => boolean;