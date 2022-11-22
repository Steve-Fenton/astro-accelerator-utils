/**
 * @typedef { import("../types/Astro").MarkdownInstance} MarkdownInstance
 */
/**
 * Sorts by the pubDate field
 * @param {MarkdownInstance<Record<string, any>>} a
 * @param {MarkdownInstance<Record<string, any>>} b
 * @returns {any}
 */
export function sortByPubDate(a: any, b: any): any;
/**
 * Sorts by the pubDate field in descending order
 * @param {MarkdownInstance<Record<string, any>>} a
 * @param {MarkdownInstance<Record<string, any>>} b
 * @returns {any}
 */
export function sortByPubDateDesc(a: any, b: any): any;
/**
 * Sorts by the modDate field
 * @param {MarkdownInstance<Record<string, any>>} a
 * @param {MarkdownInstance<Record<string, any>>} b
 * @returns {any}
 */
export function sortByModDate(a: any, b: any): any;
export type MarkdownInstance = any;
