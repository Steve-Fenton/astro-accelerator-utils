import { MarkdownInstance } from "./Astro";

export type PageFunction = () => MarkdownInstance<Record<string,any>>[];