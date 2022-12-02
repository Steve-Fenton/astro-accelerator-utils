/**
 * @typedef { import("./posts.mjs").Posts } Posts
 * @typedef { import("./taxonomy.mjs").Taxonomy } Taxonomy
 * @typedef { import("./urls.mjs").UrlFormatter } UrlFormatter
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("../../types/NavPage").NavPage } NavPage
 */
export class Navigation {
    /**
     * Constructor
     * @param {Posts} posts
     * @param {UrlFormatter} urlFormatter
     * @param {Taxonomy} taxonomy
     */
    constructor(posts: Posts, urlFormatter: UrlFormatter, taxonomy: Taxonomy);
    posts: import("./posts.mjs").Posts;
    urlFormatter: import("./urls.mjs").UrlFormatter;
    taxonomy: import("./taxonomy.mjs").Taxonomy;
    /**
     * Returns a list of breadcrumbs
     * @param {URL} currentUrl
     * @param {string} subfolder
     * @returns {NavPage[]}
     */
    breadcrumbs(currentUrl: URL, subfolder: string): NavPage[];
    /**
     *
     * @param {URL} currentUrl
     * @param {string} subfolder
     * @param {(NavPage | 'auto')[]} menu
     * @returns {NavPage[]}
     */
    menu(currentUrl: URL, subfolder: string, menu: (NavPage | 'auto')[]): NavPage[];
    /**
     *
     * @param {string} subfolder
     * @returns {NavPage[]}
     */
    autoMenu(subfolder: string): NavPage[];
    /**
     *
     * @param {URL} currentUrl
     * @param {TranslationProvider} _
     * @param {any} translations
     * @param {string} subfolder
     * @param {(NavPage | 'categories' | 'tags' | 'toptags')[]} menu
     * @returns {NavPage[]}
     */
    footer(currentUrl: URL, _: TranslationProvider, translations: any, subfolder: string, menu: (NavPage | 'categories' | 'tags' | 'toptags')[]): NavPage[];
    /**
     *
     * @param {TaxonomyLinks} links
     * @param {TranslationProvider} _
     * @param {any} translations
     * @param {string} subfolder
     * @param {TaxonomyList} entries
     * @returns {NavPage[]}
     */
    getCategories(links: TaxonomyLinks, _: TranslationProvider, translations: any, subfolder: string, entries: TaxonomyList): NavPage[];
    /**
     *
     * @param {TaxonomyLinks} links
     * @param {TranslationProvider} _
     * @param {any} translations
     * @param {string} subfolder
     * @param {TaxonomyList} entries
     * @returns {NavPage[]}
     */
    getTags(links: TaxonomyLinks, _: TranslationProvider, translations: any, subfolder: string, entries: TaxonomyList): NavPage[];
    /**
     *
     * @param {TaxonomyLinks} links
     * @param {TranslationProvider} _
     * @param {any} translations
     * @param {string} subfolder
     * @param {TaxonomyList} entries
     * @returns {NavPage[]}
     */
    getTopTags(links: TaxonomyLinks, _: TranslationProvider, translations: any, subfolder: string, entries: TaxonomyList): NavPage[];
    /**
     * Walks a NavPage tree to set current page
     * @param {NavPage[]} pages
     * @param {URL} currentUrl
     */
    setCurrentPage(pages: NavPage[], currentUrl: URL): void;
    /**
     * Converts a MarkdownInstance into a NavPage
     * @param {MarkdownInstance} page
     * @returns {NavPage}
     */
    mapNavPage(page: MarkdownInstance): NavPage;
    /**
     * Checks whether the item is a NavPage
     * @param {NavPage | 'auto' | 'tags' | 'toptags' | 'categories'} item
     * @returns {item is NavPage}
     */
    isNavPage(item: NavPage | 'auto' | 'tags' | 'toptags' | 'categories'): item is import("../../types/NavPage").NavPage;
    /**
     * Pops matching page from array
     * @param {MarkdownInstance[]} allPages
     * @param {string} search
     * @returns
     */
    popMatchingPage(allPages: MarkdownInstance[], search: string): import("../../types/Astro").MarkdownInstance;
}
export type Posts = import("./posts.mjs").Posts;
export type Taxonomy = import("./taxonomy.mjs").Taxonomy;
export type UrlFormatter = import("./urls.mjs").UrlFormatter;
export type MarkdownInstance = import("../../types/Astro").MarkdownInstance;
export type NavPage = import("../../types/NavPage").NavPage;
