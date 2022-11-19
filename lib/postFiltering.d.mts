/**
 * Predicate for whether a page should appear in the sitemap
 * @param {import("../types/Markdown").Markdown<Record<string, any>} p
 * @returns {boolean}
 */
export function showInSitemap(p: import("../types/Markdown").Markdown<Record<string, any>>): boolean;
/**
 * Predicate for whether a page should appear in the site search
 * @param {import("../types/Markdown").Markdown<Record<string, any>} p
 * @returns {boolean}
 */
export function showInSearch(p: import("../types/Markdown").Markdown<Record<string, any>>): boolean;
/**
 * Predicate for whether a page should appear in the navigation menu
 * @param {import("../types/Markdown").Markdown<Record<string, any>} p
 * @returns {boolean}
 */
export function showInMenu(p: import("../types/Markdown").Markdown<Record<string, any>>): boolean;
/**
 * Predicate for whether a page is an author page
 * @param {import("../types/Markdown").Markdown<Record<string, any>} p
 * @returns {boolean}
 */
export function isAuthor(p: import("../types/Markdown").Markdown<Record<string, any>>): boolean;
/**
 * Predicate for whether a page is a search page
 * @param {import("../types/Markdown").Markdown<Record<string, any>} p
 * @returns {boolean}
 */
export function isSearch(p: import("../types/Markdown").Markdown<Record<string, any>>): boolean;
/**
 * Predicate for whether a page should be listed
 * @param {import("../types/Markdown").Markdown<Record<string, any>} p
 * @returns {boolean}
 */
export function isListable(p: import("../types/Markdown").Markdown<Record<string, any>>): boolean;
