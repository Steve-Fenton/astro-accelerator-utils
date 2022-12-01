/**
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("../../types/NavPage").NavPage } NavPage
 */
export class Navigation {
    /**
     * Constructor
     * @param {Posts} posts
     * @param {UrlFormatter} urlFormatter
     */
    constructor(posts: Posts, urlFormatter: UrlFormatter);
    posts: Posts;
    urlFormatter: UrlFormatter;
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
export type MarkdownInstance = import("../../types/Astro").MarkdownInstance;
export type NavPage = import("../../types/NavPage").NavPage;
