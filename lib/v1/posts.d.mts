/**
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("./cache.mjs").Cache } Cache
 */
export type MarkdownInstance = import("../../types/Astro").MarkdownInstance;
export type Cache = import("./cache.mjs").Cache;
export declare class Posts {
    cache: import("./cache.mjs").Cache;
    fetchAll: () => any;
    /**
     * Constructor
     * @param {Cache} cache
     * @param {() => MarkdownInstance[]} [fetchAll]
     */
    constructor(cache: Cache, fetchAll?: () => MarkdownInstance[]);
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
