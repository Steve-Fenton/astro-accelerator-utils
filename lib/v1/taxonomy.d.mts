/**
 * @typedef { import("./cache.mjs").Cache } Cache
 * @typedef { import("./posts.mjs").Posts } Posts
 * @typedef { import("./urls.mjs").UrlFormatter } UrlFormatter
 * @typedef { import("../../types/Site").Site } Site
 * @typedef { import("../../types/Taxonomy").TaxonomyList } TaxonomyList
 * @typedef { import("../../types/Taxonomy").TaxonomyEntry } TaxonomyEntry
 * @typedef { import("../../types/Taxonomy").TaxonomyLinks } TaxonomyLinks
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 */
export class Taxonomy {
    /**
     * Constructor
     * @param {Cache} cache
     * @param {Posts} posts
     * @param {UrlFormatter} urlFormatter
     */
    constructor(cache: Cache, posts: Posts, urlFormatter: UrlFormatter);
    cache: import("./cache.mjs").Cache;
    posts: import("./posts.mjs").Posts;
    urlFormatter: import("./urls.mjs").UrlFormatter;
    /**
     *
     * @returns {TaxonomyList}
     */
    all(): TaxonomyList;
    /**
     *
     * @param {any} translations
     * @param {(entry: any) => string} lang
     * @param {string} subfolder
     * @returns {TaxonomyLinks}
     */
    links(translations: any, lang: (entry: any) => string, subfolder: string): TaxonomyLinks;
    /**
     *
     * @returns {TaxonomyList}
     */
    getTaxonomy(): TaxonomyList;
    /**
     * Sorts taxonomy entries by title
     * @param {TaxonomyEntry} a
     * @param {TaxonomyEntry} b
     * @returns
     */
    sortByTitle(a: TaxonomyEntry, b: TaxonomyEntry): 0 | 1 | -1;
    /**
     * Sorts taxonomy entries by title
     * @param {TaxonomyEntry} a
     * @param {TaxonomyEntry} b
     * @returns
     */
    sortByVolume(a: TaxonomyEntry, b: TaxonomyEntry): number;
}
export type Cache = import("./cache.mjs").Cache;
export type Posts = import("./posts.mjs").Posts;
export type UrlFormatter = import("./urls.mjs").UrlFormatter;
export type Site = import("../../types/Site").Site;
export type TaxonomyList = import("../../types/Taxonomy").TaxonomyList;
export type TaxonomyEntry = import("../../types/Taxonomy").TaxonomyEntry;
export type TaxonomyLinks = import("../../types/Taxonomy").TaxonomyLinks;
export type MarkdownInstance = import("../../types/Astro").MarkdownInstance;
