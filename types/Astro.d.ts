import { Frontmatter } from "./Frontmatter";
export type MarkdownInstance = {
    frontmatter: Frontmatter;
    /** Absolute file path (e.g. `/home/user/projects/.../file.md`) */
    file: string;
    /** Browser URL for files under `/src/pages` (e.g. `/en/guides/markdown-content`) */
    url: string | undefined;
    /** Component to render content in `.astro` files. Usage: `<Content />` */
    Content: any;
    /** raw Markdown file content, excluding layout HTML and YAML frontmatter */
    rawContent(): string;
    /** Markdown file compiled to HTML, excluding layout HTML */
    compiledContent(): string;
    /** List of headings (h1 -> h6) with associated metadata */
    getHeadings(): any[];
    /** @deprecated Renamed to `getHeadings()` */
    getHeaders(): void;
    default: any;
};
