/**
 * @typedef { import("../types/PageFunction").PageFunction } PageFunction
 * @typedef { import("../types/PagePredicate").PagePredicate } PagePredicate
 * @typedef { import("../types/Astro").MarkdownInstance} MarkdownInstance
 */
/**
 * Predicate for whether a page should appear in the sitemap
 * @param {MarkdownInstance<Record<string, any>>} p
 * @returns {boolean}
 */
export function showInSitemap(p: any): boolean;
/**
 * Predicate for whether a page should appear in the site search
 * @param {MarkdownInstance<Record<string, any>>} p
 * @returns {boolean}
 */
export function showInSearch(p: any): boolean;
/**
 * Predicate for whether a page should appear in the navigation menu
 * @param {MarkdownInstance<Record<string, any>>} p
 * @returns {boolean}
 */
export function showInMenu(p: any): boolean;
/**
 * Predicate for whether a page is an author page
 * @param {MarkdownInstance<Record<string, any>>} p
 * @returns {boolean}
 */
export function isAuthor(p: any): boolean;
/**
 * Predicate for whether a page is a search page
 * @param {MarkdownInstance<Record<string, any>>} p
 * @returns {boolean}
 */
export function isSearch(p: any): boolean;
/**
 * Predicate for whether a page should be listed
 * @param {MarkdownInstance<Record<string, any>>} p
 * @returns {boolean}
 */
export function isListable(p: any): boolean;
export type PageFunction = import("../types/PageFunction").PageFunction;
export type PagePredicate = import("../types/PagePredicate").PagePredicate;
export type MarkdownInstance = any;
