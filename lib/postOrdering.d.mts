/**
 * @typedef { import("../types/Markdown") } Markdown
 */
/**
 * Sorts by the pubDate field
 * @param {Markdown} a
 * @param {Markdown} b
 * @returns {any}
 */
export function sortByPubDate(a: Markdown, b: Markdown): any;
/**
 * Sorts by the pubDate field in descending order
 * @param {Markdown} a
 * @param {Markdown} b
 * @returns {any}
 */
export function sortByPubDateDesc(a: Markdown, b: Markdown): any;
/**
 * Sorts by the modDate field
 * @param {Markdown} a
 * @param {Markdown} b
 * @returns {any}
 */
export function sortByModDate(a: Markdown, b: Markdown): any;
export type Markdown = typeof import("../types/Markdown");
