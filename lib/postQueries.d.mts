/**
 * @typedef { import("../types/PageFunction") } PageFunction
 * @typedef { import("../types/PagePredicate") } PagePredicate
 * @typedef { import("../types/Markdown") } Markdown
 */
/**
 * Fetches pages
 * @param {PageFunction} fetchPages
 * @param {PagePredicate} [filter]
 * @returns {Markdown[]}
 */
export function getPages(fetchPages: PageFunction, filter?: PagePredicate): Markdown[];
export type PageFunction = typeof import("../types/PageFunction");
export type PagePredicate = typeof import("../types/PagePredicate");
export type Markdown = typeof import("../types/Markdown");
