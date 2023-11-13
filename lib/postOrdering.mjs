/**
 * @typedef { import("../types/Astro").MarkdownInstance} MarkdownInstance
 */

/**
 * Sorts by the pubDate field
 * @param {MarkdownInstance} a 
 * @param {MarkdownInstance} b 
 * @returns {any}
 */
export function sortByPubDate (a, b) {
  const dateA = a.frontmatter.pubDate || '1970-01-01';
  const dateB = b.frontmatter.pubDate || '1970-01-01';
  return dateA.localeCompare(dateB);
}

/**
 * Sorts by the pubDate field in descending order
 * @param {MarkdownInstance} a 
 * @param {MarkdownInstance} b 
 * @returns {any}
 */
export function sortByPubDateDesc (a, b) {
  const dateA = a.frontmatter.pubDate || '1970-01-01';
  const dateB = b.frontmatter.pubDate || '1970-01-01';
  return dateB.localeCompare(dateA);
}

/**
 * Sorts by the modDate field
 * @param {MarkdownInstance} a 
 * @param {MarkdownInstance} b 
 * @returns {any}
 */
export function sortByModDate (a, b) {
  const dateA = a.frontmatter.modDate || a.frontmatter.pubDate || '1970-01-01';
  const dateB = b.frontmatter.modDate || b.frontmatter.pubDate || '1970-01-01';
  return dateA.localeCompare(dateB);
}

/**
 * Sorts by the modDate field
 * @param {MarkdownInstance} a 
 * @param {MarkdownInstance} b 
 * @returns {any}
 */
export function sortByModDateDesc (a, b) {
  const dateA = a.frontmatter.modDate || a.frontmatter.pubDate || '1970-01-01';
  const dateB = b.frontmatter.modDate || b.frontmatter.pubDate || '1970-01-01';
  return dateB.localeCompare(dateA);
}
