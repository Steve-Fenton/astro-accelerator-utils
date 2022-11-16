import { Markdown } from "../types/Markdown";

export function sortByPubDate (a: Markdown<Record<string, any>>, b: Markdown<Record<string, any>>) {
  return b.frontmatter.pubDate.localeCompare(a.frontmatter.pubDate);
}

export function sortByPubDateDesc (a: Markdown<Record<string, any>>, b: Markdown<Record<string, any>>) {
  return b.frontmatter.pubDate.localeCompare(a.frontmatter.pubDate);
}

export function sortByModDate (a: Markdown<Record<string, any>>, b: Markdown<Record<string, any>>) {
  const dateA = a.frontmatter.modDate || a.frontmatter.pubDate || '1970-01-01';
  const dateB = b.frontmatter.modDate || b.frontmatter.pubDate || '1970-01-01';
  return dateA.localeCompare(dateB);
}
