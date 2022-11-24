/**
 * @typedef { import("../types/Site") } Site
 */

/**
 * Ensures trailing slash is used
 * @param {URL} url 
 * @returns {URL}
 */
export function addSlashToUrl(url) {
  url.pathname += url.pathname.endsWith('/') ? '' : '/';
  return url;
}

/**
 * Ensures trailing slash is used
 * @param {string | null} address 
 * @param {Site} site 
 * @returns {string}
 */
export function addSlashToAddress(address, site) {
  if (!address) {
    // Handle null or empty addresses
    address = '/';
  }

  if (address.indexOf('//') > -1) {
    // Don't mess with absolute addresses
    return address;
  }

  const url = addSlashToUrl(new URL(address, site.url));
  return url.pathname + url.search;
}