/**
 * @typedef { import("../types/PageFunction") } PageFunction
 * @typedef { import("../types/PagePredicate") } PagePredicate
 * @typedef { import("../types/Markdown") } Markdown
 */
/**
 * Predicate for whether a page should appear in the sitemap
 * @param {Markdown} p
 * @returns {boolean}
 */
export function showInSitemap(p: Markdown): boolean;
/**
 * Predicate for whether a page should appear in the site search
 * @param {Markdown} p
 * @returns {boolean}
 */
export function showInSearch(p: Markdown): boolean;
/**
 * Predicate for whether a page should appear in the navigation menu
 * @param {Markdown} p
 * @returns {boolean}
 */
export function showInMenu(p: Markdown): boolean;
/**
 * Predicate for whether a page is an author page
 * @param {Markdown} p
 * @returns {boolean}
 */
export function isAuthor(p: Markdown): boolean;
/**
 * Predicate for whether a page is a search page
 * @param {Markdown} p
 * @returns {boolean}
 */
export function isSearch(p: Markdown): boolean;
/**
 * Predicate for whether a page should be listed
 * @param {Markdown} p
 * @returns {boolean}
 */
export function isListable(p: Markdown): boolean;
export type PageFunction = typeof import("../types/PageFunction");
export type PagePredicate = typeof import("../types/PagePredicate");
export type Markdown = typeof import("../types/Markdown");
