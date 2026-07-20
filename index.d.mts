import { Accelerator } from './lib/v1/accelerator.mjs';
export type PagePredicate = import("./types/PagePredicate").PagePredicate;
export type MarkdownInstance = import("./types/Astro").MarkdownInstance;
/**
 * @typedef { import("./types/PagePredicate").PagePredicate } PagePredicate
 * @typedef { import("./types/Astro").MarkdownInstance} MarkdownInstance
 */
/**
 * Predicate for whether a page should appear in the sitemap
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export declare function showInSitemap(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page should appear in the site search
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export declare function showInSearch(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page should appear in the navigation menu
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export declare function showInMenu(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page is an author page
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export declare function isAuthor(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page is an author page
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export declare function notAuthor(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page is a search page
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export declare function isSearch(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page is an search page
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export declare function notSearch(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page has a modified date
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export declare function hasDate(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page has a modified date
 * @param {MarkdownInstance} p
 * @returns {boolean}
 */
export declare function hasModDate(p: MarkdownInstance): boolean;
/**
 * Predicate for whether a page should be listed
 * @param {MarkdownInstance<Record<string, any>>} p
 * @returns {boolean}
 */
export declare function isListable(p: MarkdownInstance<Record<string, any>>): boolean;
/**
 * Predicate for whether a page should be used to create tag and category lists.
 * Specifically, this allows future-dated posts to cause taxonomy pages to be created,
 * @param {MarkdownInstance<Record<string, any>>} p
 * @returns {boolean}
 */
export declare function forTaxonomy(p: MarkdownInstance<Record<string, any>>): boolean;
/**
 * Sorts by the pubDate field
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export declare function sortByPubDate(a: MarkdownInstance, b: MarkdownInstance): any;
/**
 * Sorts by the pubDate field in descending order
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export declare function sortByPubDateDesc(a: MarkdownInstance, b: MarkdownInstance): any;
/**
 * Sorts by the modDate field
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export declare function sortByModDate(a: MarkdownInstance, b: MarkdownInstance): any;
/**
 * Sorts by the modDate field
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export declare function sortByModDateDesc(a: MarkdownInstance, b: MarkdownInstance): any;
export declare const PostFiltering: {
    showInSitemap: typeof showInSitemap;
    showInSearch: typeof showInSearch;
    showInMenu: typeof showInMenu;
    isAuthor: typeof isAuthor;
    notAuthor: typeof notAuthor;
    isSearch: typeof isSearch;
    notSearch: typeof notSearch;
    hasDate: typeof hasDate;
    hasModDate: typeof hasModDate;
    isListable: typeof isListable;
    forTaxonomy: typeof forTaxonomy;
};
export declare const PostOrdering: {
    sortByPubDate: typeof sortByPubDate;
    sortByPubDateDesc: typeof sortByPubDateDesc;
    sortByModDate: typeof sortByModDate;
    sortByModDateDesc: typeof sortByModDateDesc;
};
export { Accelerator };
