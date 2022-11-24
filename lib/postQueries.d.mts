/**
 * @typedef { import("../types/PageFunction").PageFunction } PageFunction
 * @typedef { import("../types/PagePredicate").PagePredicate } PagePredicate
 * @typedef { import("../types/Frontmatter").Frontmatter } Frontmatter
 * @typedef { import("../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("../types/AuthorList").AuthorList } AuthorList
 */
/**
 * Fetches pages
 * @param {PageFunction} fetchPages
 * @param {PagePredicate} [filter]
 * @returns {Promise<MarkdownInstance<Record<string, any>>[]>}
 */
export function getPages(fetchPages: PageFunction, filter?: PagePredicate): Promise<MarkdownInstance<Record<string, any>>[]>;
/**
 *
 * @param {PageFunction} fetchPages
 * @param {Frontmatter} frontmatter
 * @returns {AuthorList}
 */
export function getAuthors(fetchPages: PageFunction, frontmatter: Frontmatter): AuthorList;
export type PageFunction = import("../types/PageFunction").PageFunction;
export type PagePredicate = import("../types/PagePredicate").PagePredicate;
export type Frontmatter = import("../types/Frontmatter").Frontmatter;
export type MarkdownInstance = any;
export type AuthorList = import("../types/AuthorList").AuthorList;
