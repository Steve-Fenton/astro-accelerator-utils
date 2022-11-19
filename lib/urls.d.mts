/**
 * Ensures trailing slash is used
 * @param {URL} url
 * @returns {URL}
 */
export function addSlashToUrl(url: URL): URL;
/**
 * Ensures trailing slash is used
 * @param {string} address
 * @param {import("../types/Site").Site} site
 * @returns {string}
 */
export function addSlashToAddress(address: string, site: import("../types/Site").Site): string;
