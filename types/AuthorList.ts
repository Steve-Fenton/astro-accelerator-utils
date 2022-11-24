import type { MarkdownInstance } from "./Astro";
import type { BannerImage } from "./BannerImage";

export interface AuthorList {
    image: BannerImage | null;
    writers: MarkdownInstance<Record<string, any>>[];
    mainAuthor: MarkdownInstance<Record<string, any>> | null;
    contributors: MarkdownInstance<Record<string, any>>[];
};