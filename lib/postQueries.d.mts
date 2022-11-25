/**
 * Fetches pages
 * @param {PagePredicate} [filter]
 * @returns {Promise<MarkdownInstance[]>}
 */
export function getPages(filter?: PagePredicate): Promise<MarkdownInstance[]>;
/**
 *
 * @param {Site} site
 * @param {PagePredicate} [filter]
 * @returns {Promise<MarkdownInstance[]>}
 */
export function getTopLevelPages(site: Site, filter?: PagePredicate): Promise<MarkdownInstance[]>;
/**
 * Gets a list of authors, and exposes main author and contributors
 * @param {Frontmatter} frontmatter
 * @returns {Promise<AuthorList>}
 */
export function getAuthors(frontmatter: Frontmatter): Promise<AuthorList>;
/**
 *
 * @param {string} slug
 * @returns {Promise<AuthorInfo>}
 */
export function getAuthorInfo(slug: string): Promise<AuthorInfo>;
/**
 * Returns a list of breadcrumbs
 * @param {URL} currentUrl
 * @param {Site} site
 * @returns {Promise<NavPage[]>}
 */
export function getBreadcrumbs(currentUrl: URL, site: Site): Promise<NavPage[]>;
/**
 * Converts a MarkdownInstance into a NavPage
 * @param {MarkdownInstance} page
 * @param {Site}
 * @returns {NavPage}
 */
export function mapNavPage(page: MarkdownInstance, site: any): NavPage;
/**
 * Walks the tree to set current page
 * @param {NavPage[]} pages
 * @param {URL} currentUrl
 */
export function setCurrentPage(pages: NavPage[], currentUrl: URL): void;
/**
 * Pops matching page from array
 * @param {MarkdownInstance[]} allPages
 * @param {string} search
 * @returns
 */
export function popMatchingPage(allPages: MarkdownInstance[], search: string): import("../types/Astro").MarkdownInstance;
export type PagePredicate = import("../types/PagePredicate").PagePredicate;
export type Frontmatter = import("../types/Frontmatter").Frontmatter;
export type MarkdownInstance = import("../types/Astro").MarkdownInstance;
export type AuthorList = import("../types/AuthorList").AuthorList;
export type AuthorInfo = import("../types/AuthorInfo").AuthorInfo;
export type NavPage = import("../types/NavPage").NavPage;
export type Site = import("../types/Site").Site;
