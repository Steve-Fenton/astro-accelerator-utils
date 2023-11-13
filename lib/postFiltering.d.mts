/**
 * @typedef { import("../types/PagePredicate").PagePredicate } PagePredicate
 * @typedef { import("../types/Astro").MarkdownInstance} MarkdownInstance
 */
/**
 * Predicate for whether a page should appear in the sitemap
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export function showInSitemap(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page should appear in the site search
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export function showInSearch(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page should appear in the navigation menu
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export function showInMenu(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page is an author page
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export function isAuthor(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page is a search page
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export function isSearch(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page has a modified date
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export function hasModDate(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page should be listed
 * @param {MarkdownInstance<Record<string, any>>} p
 * @returns {boolean}
 */
export function isListable(p: any): boolean;
export type PagePredicate = import("../types/PagePredicate").PagePredicate;
export type MarkdownInstance = import("../types/Astro").MarkdownInstance;
