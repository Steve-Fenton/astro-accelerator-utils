export function sortByPubDate (a: any, b: any) {
  return b.frontmatter.pubDate.localeCompare(a.frontmatter.pubDate);
}

export function sortByPubDateDesc (a: any, b: any) {
  return b.frontmatter.pubDate.localeCompare(a.frontmatter.pubDate);
}

export function sortByModDate (a: any, b: any) {
  const dateA = a.frontmatter.modDate || a.frontmatter.pubDate || '1970-01-01';
  const dateB = b.frontmatter.modDate || b.frontmatter.pubDate || '1970-01-01';
  return dateA.localeCompare(dateB);
}
