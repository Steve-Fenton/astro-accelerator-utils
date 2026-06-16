/**
 * @typedef { import("./types/PagePredicate").PagePredicate } PagePredicate
 * @typedef { import("./types/Astro").MarkdownInstance} MarkdownInstance
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
 * Predicate for whether a page is an author page
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export function notAuthor(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page is a search page
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export function isSearch(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page is an search page
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export function notSearch(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page has a modified date
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export function hasDate(p: MarkdownInstance): boolean;
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
export function isListable(p: MarkdownInstance<Record<string, any>>): boolean;
/**
 * Predicate for whether a page should be used to create tag and category lists.
 * Specifically, this allows future-dated posts to cause taxonomy pages to be created,
 * @param {MarkdownInstance<Record<string, any>>} p
 * @returns {boolean}
 */
export function forTaxonomy(p: MarkdownInstance<Record<string, any>>): boolean;
/**
 * Sorts by the pubDate field
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export function sortByPubDate(a: MarkdownInstance, b: MarkdownInstance): any;
/**
 * Sorts by the pubDate field in descending order
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export function sortByPubDateDesc(a: MarkdownInstance, b: MarkdownInstance): any;
/**
 * Sorts by the modDate field
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export function sortByModDate(a: MarkdownInstance, b: MarkdownInstance): any;
/**
 * Sorts by the modDate field
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export function sortByModDateDesc(a: MarkdownInstance, b: MarkdownInstance): any;
export namespace PostFiltering {
    export { showInSitemap };
    export { showInSearch };
    export { showInMenu };
    export { isAuthor };
    export { notAuthor };
    export { isSearch };
    export { notSearch };
    export { hasDate };
    export { hasModDate };
    export { isListable };
    export { forTaxonomy };
}
export namespace PostOrdering {
    export { sortByPubDate };
    export { sortByPubDateDesc };
    export { sortByModDate };
    export { sortByModDateDesc };
}
export { Accelerator };
export type PagePredicate = import("./types/PagePredicate").PagePredicate;
export type MarkdownInstance = import("./types/Astro").MarkdownInstance;
import { Accelerator } from './lib/v1/accelerator.mjs';
