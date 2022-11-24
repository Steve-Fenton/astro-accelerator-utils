/**
 * @typedef { import("../types/Astro").MarkdownInstance} MarkdownInstance
 */
/**
 * Sorts by the pubDate field
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export function sortByPubDate(a: MarkdownInstance, b: MarkdownInstance): any;
/**
 * Sorts by the pubDate field in descending order
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export function sortByPubDateDesc(a: MarkdownInstance, b: MarkdownInstance): any;
/**
 * Sorts by the modDate field
 * @param {MarkdownInstance} a
 * @param {MarkdownInstance} b
 * @returns {any}
 */
export function sortByModDate(a: MarkdownInstance, b: MarkdownInstance): any;
export type MarkdownInstance = import("../types/Astro").MarkdownInstance;
