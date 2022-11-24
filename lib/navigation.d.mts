/**
 * @typedef { import("../types/Site").Site } Site
 * @typedef { import("../types/NavPage").NavPage } NavPage
 */
/**
 *
 * @param {URL} currentUrl
 * @param {Site} site
 * @returns {Promise<NavPage[]}
 */
export function getMenu(currentUrl: URL, site: Site): Promise<NavPage[]>;
/**
 *
 * @param {URL} currentUrl
 * @param {Site} site
 * @returns {Promise<NavPage[]}
 */
export function getNavigation(currentUrl: URL, site: Site): Promise<NavPage[]>;
export type Site = import("../types/Site").Site;
export type NavPage = import("../types/NavPage").NavPage;
