export interface Markdown<T extends Record<string, any>> {
    url: string;
    frontmatter: T;
}
