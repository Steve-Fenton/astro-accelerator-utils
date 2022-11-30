/**
 *
 * @param {TaxonomyEntry} a
 * @param {TaxonomyEntry} b
 * @returns
 */
export function sortByTitle(a: TaxonomyEntry, b: TaxonomyEntry): 0 | 1 | -1;
/**
 *
 * @param {any} translations
 * @param {(entry: any) => string} lang
 * @param {Site} site
 * @returns {TaxonomyLinks}
 */
export function taxonomyLinks(translations: any, lang: (entry: any) => string, site: Site): TaxonomyLinks;
/**
 *
 * @returns {Promise<Taxonomy}
 */
export function getTaxonomy(): Promise<Taxonomy>;
export type Site = import("../types/Site").Site;
export type Taxonomy = import("../types/Taxonomy").Taxonomy;
export type TaxonomyEntry = import("../types/Taxonomy").TaxonomyEntry;
export type TaxonomyLinks = import("../types/Taxonomy").TaxonomyLinks;
export type MarkdownInstance = import("../types/Astro").MarkdownInstance;
