import type { MarkdownInstance } from "./Astro";
import type { BannerImage } from "./BannerImage";
export interface AuthorList {
    image: BannerImage | null;
    writers: MarkdownInstance[];
    mainAuthor: MarkdownInstance | null;
    contributors: MarkdownInstance[];
}
