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
 * @param {string} address 
 * @param {Site} site 
 * @returns {string}
 */
export function addSlashToAddress(address, site) {
  if (!address) {
    address = '/';
  }

  if (address.indexOf('://') > -1) {
    return address;
  }

  const url = addSlashToUrl(new URL(address, site.url));
  return url.pathname + url.search;
}