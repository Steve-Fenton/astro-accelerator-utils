/**
 * @typedef { import("../types/Link").Link } Link
 */
/**
 * Provides a list of paging links, 1 ... 3 4 5 ... 7
 * @param {number} limit
 * @param {number} numberOfPages
 * @param {number} currentPage
 * @param {string} url
 * @returns {Link[]}
 */
export function getPageLinks(limit: number, numberOfPages: number, currentPage: number, url: string): Link[];
export type Link = import("../types/Link").Link;
