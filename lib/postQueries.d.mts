/**
 * Fetches pages
 * @param {PagePredicate} [filter]
 * @returns {Promise<MarkdownInstance<Record<string, any>>[]>}
 */
export function getPages(filter?: PagePredicate): Promise<MarkdownInstance<Record<string, any>>[]>;
/**
 * Gets a list of authors, and exposes main author and contributors
 * @param {Frontmatter} frontmatter
 * @returns {Promise<AuthorList>}
 */
export function getAuthors(frontmatter: Frontmatter): Promise<AuthorList>;
/**
 * Returns a list of breadcrumbs
 * @param {URL} currentUrl
 * @returns {NavPage[]}
 */
export function getBreadcrumbs(currentUrl: URL): NavPage[];
/**
 * Converts a MarkdownInstance into a NavPage
 * @param {MarkdownInstance<Record<string, any>>} page
 * @returns {NavPage}
 */
export function mapNavPage(page: any): NavPage;
/**
 * Walks the tree to set current page
 * @param {NavPage[]} pages
 * @param {URL} currentUrl
 */
export function setCurrentPage(pages: NavPage[], currentUrl: URL): void;
/**
 * Pops matching page from array
 * @param {MarkdownInstance<Record<string, any>>[]} allPages
 * @param {string} search
 * @returns
 */
export function popMatchingPage(allPages: MarkdownInstance<Record<string, any>>[], search: string): any;
export type PagePredicate = import("../types/PagePredicate").PagePredicate;
export type Frontmatter = import("../types/Frontmatter").Frontmatter;
export type MarkdownInstance = any;
export type AuthorList = import("../types/AuthorList").AuthorList;
export type NavPage = import("../types/NavPage").NavPage;
