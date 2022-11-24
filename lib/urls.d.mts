/**
 * @typedef { import("../types/Site") } Site
 */
/**
 * Ensures trailing slash is used
 * @param {URL} url
 * @returns {URL}
 */
export function addSlashToUrl(url: URL): URL;
/**
 * Ensures trailing slash is used
 * @param {string | null} address
 * @param {Site} site
 * @returns {string}
 */
export function addSlashToAddress(address: string | null, site: Site): string;
export type Site = typeof import("../types/Site");
