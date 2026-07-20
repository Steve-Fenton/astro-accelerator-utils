export type AuthorList = import("../../types/AuthorList").AuthorList;
export type MarkdownInstance = import("../../types/Astro").MarkdownInstance;
export type Frontmatter = import("../../types/Frontmatter").Frontmatter;
/**
 * @typedef { import("../../types/AuthorList").AuthorList } AuthorList
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("../../types/Frontmatter").Frontmatter } Frontmatter
 */
export declare class Authors {
    posts: Posts;
    /**
     * Constructor
     * @param {Posts} posts
     */
    constructor(posts: Posts);
    /**
     * Gets a list of authors, and exposes main author and contributors
     * @param {Frontmatter} frontmatter
     * @returns {AuthorList}
     */
    forPost(frontmatter: Frontmatter): AuthorList;
    /**
     * Get a single author by id/slug
     * @param {string} slug
     * @returns {MarkdownInstance}
     */
    info(slug: string): MarkdownInstance;
}
