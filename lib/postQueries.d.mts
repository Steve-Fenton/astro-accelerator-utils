/**
 * @typedef { import("../types/PageFunction") } PageFunction
 * @typedef { import("../types/PagePredicate") } PagePredicate
 * @typedef { import("../types/Astro").MarkdownInstance} MarkdownInstance
 */
/**
 * Fetches pages
 * @param {PageFunction} fetchPages
 * @param {PagePredicate} [filter]
 * @returns {Promise<MarkdownInstance<Record<string, any>>[]>}
 */
export function getPages(fetchPages: PageFunction, filter?: PagePredicate): Promise<MarkdownInstance<Record<string, any>>[]>;
export type PageFunction = typeof import("../types/PageFunction");
export type PagePredicate = typeof import("../types/PagePredicate");
export type MarkdownInstance = any;
