/**
 * @typedef { import("../types/Astro").MarkdownInstance} MarkdownInstance
 */

/**
 * Sorts by the pubDate field
 * @param {MarkdownInstance<Record<string, any>>} a 
 * @param {MarkdownInstance<Record<string, any>>} b 
 * @returns {any}
 */
export function sortByPubDate (a, b) {
  return b.frontmatter.pubDate.localeCompare(a.frontmatter.pubDate);
}

/**
 * Sorts by the pubDate field in descending order
 * @param {MarkdownInstance<Record<string, any>>} a 
 * @param {MarkdownInstance<Record<string, any>>} b 
 * @returns {any}
 */
export function sortByPubDateDesc (a, b) {
  return b.frontmatter.pubDate.localeCompare(a.frontmatter.pubDate);
}

/**
 * Sorts by the modDate field
 * @param {MarkdownInstance<Record<string, any>>} a 
 * @param {MarkdownInstance<Record<string, any>>} b 
 * @returns {any}
 */
export function sortByModDate (a, b) {
  const dateA = a.frontmatter.modDate || a.frontmatter.pubDate || '1970-01-01';
  const dateB = b.frontmatter.modDate || b.frontmatter.pubDate || '1970-01-01';
  return dateA.localeCompare(dateB);
}
