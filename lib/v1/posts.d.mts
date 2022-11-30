/**
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 */
export class Posts {
    /**
     * Constructor
     * @param {() => MarkdownInstance[]} [fetchAll]
     */
    constructor(fetchAll?: () => MarkdownInstance[]);
    fetchAll: () => any;
    allPosts: any[];
    /**
     * Gets all markdown posts in the site
     * @returns {MarkdownInstance[]}
     */
    all(): MarkdownInstance[];
    /**
     * Gets top-level markdown posts in the site
     * @returns {MarkdownInstance[]}
     */
    root(subfolder: any): MarkdownInstance[];
}
export type MarkdownInstance = import("../../types/Astro").MarkdownInstance;
