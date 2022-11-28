/**
 * @typedef { import("../types/NavPage").NavPage } NavPage
 * @typedef { import("../types/Astro").Site } Site
 * @typedef { import("../types/Translations").Entry } Entry
 * @typedef { import("../types/Translations").TranslationProvider } TranslationProvider
 * @typedef { import("../types/Taxonomy").TaxonomyLinks } TaxonomyLinks
 */
/**
 *
 * @param {URL} currentUrl
 * @param {TranslationProvider} _
 * @param {any} translations
 * @param {Site} site
 * @param {(NavPage | 'categories' | 'tags' | 'toptags')[]} menu
 * @returns {Promise<NavPage[]>}
 */
export function getMenu(currentUrl: URL, _: TranslationProvider, translations: any, site: any, menu: (NavPage | 'categories' | 'tags' | 'toptags')[]): Promise<NavPage[]>;
/**
 *
 * @param {TaxonomyLinks} links
 * @param {TranslationProvider} _
 * @param {any} translations
 * @param {Site} site
 * @returns {Promise<NavPage[]>}
 */
export function getCategories(links: TaxonomyLinks, _: TranslationProvider, translations: any, site: any): Promise<NavPage[]>;
/**
 *
 * @param {TaxonomyLinks} links
 * @param {TranslationProvider} _
 * @param {any} translations
 * @param {Site} site
 * @returns {Promise<NavPage[]>}
 */
export function getTags(links: TaxonomyLinks, _: TranslationProvider, translations: any, site: any): Promise<NavPage[]>;
/**
 *
 * @param {TaxonomyLinks} links
 * @param {TranslationProvider} _
 * @param {any} translations
 * @param {Site} site
 * @returns {Promise<NavPage[]>}
 */
export function getTopTags(links: TaxonomyLinks, _: TranslationProvider, translations: any, site: any): Promise<NavPage[]>;
export type NavPage = import("../types/NavPage").NavPage;
export type Site = import("../types/Astro").Site;
export type Entry = import("../types/Translations").Entry;
export type TranslationProvider = import("../types/Translations").TranslationProvider;
export type TaxonomyLinks = import("../types/Taxonomy").TaxonomyLinks;
