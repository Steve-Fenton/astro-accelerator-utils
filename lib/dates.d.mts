/**
 * @typedef { import("../types/Site") } Site
 */
/**
 * Returns the formatted pubDate
 * @param {any} frontmatter
 * @param {string} lang
 * @param {Site} site
 * @returns {string}
 */
export function formatDate(frontmatter: any, lang: string, site: Site): string;
/**
* Returns the formatted modDate
* @param {any} frontmatter
* @param {string} lang
* @param {Site} site
* @returns {string}
*/
export function formatModifiedDate(frontmatter: any, lang: string, site: Site): string;
export type Site = typeof import("../types/Site");
