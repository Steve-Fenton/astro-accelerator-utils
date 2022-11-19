export function sortByPubDate (a, b) {
  return b.frontmatter.pubDate.localeCompare(a.frontmatter.pubDate);
}

export function sortByPubDateDesc (a, b) {
  return b.frontmatter.pubDate.localeCompare(a.frontmatter.pubDate);
}

export function sortByModDate (a, b) {
  const dateA = a.frontmatter.modDate || a.frontmatter.pubDate || '1970-01-01';
  const dateB = b.frontmatter.modDate || b.frontmatter.pubDate || '1970-01-01';
  return dateA.localeCompare(dateB);
}
