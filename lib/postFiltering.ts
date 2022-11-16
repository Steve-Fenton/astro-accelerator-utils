import { Markdown } from '../types/Markdown';

export function showInSitemap (p: Markdown<Record<string, any>>) {
  // User setting to remove from sitemap
  if (typeof p.frontmatter.navSitemap !== 'undefined'
    && p.frontmatter.navSitemap == false) {
    return false;
  }

  return isListable(p);
}

export function showInSearch (p: Markdown<Record<string, any>>) {
  // User setting to remove from search
  if (typeof p.frontmatter.navSearch !== 'undefined'
    && p.frontmatter.navSearch == false) {
    return false;
  }

  return isListable(p);
}

export function showInMenu (p: Markdown<Record<string, any>>) {
  if (typeof p.frontmatter.navMenu !== 'undefined'
    && p.frontmatter.navMenu == false) {
    return false;
  }

  return true;
}

export function isAuthor (p: Markdown<Record<string, any>>) {
  if (p?.frontmatter?.layout?.indexOf('/Author.astro') > -1) {
    return true;
  }

  return false;
}

export function isSearch (p: Markdown<Record<string, any>>) {
  if (p?.frontmatter?.layout?.indexOf('/Search.astro') > -1) {
    return true;
  }

  return false;
}

export function isListable (p: Markdown<Record<string, any>>) {
  return p.url != null 
    && p.url != '' 
    && p.frontmatter.layout.includes('/Redirect.astro') !== true
    && Date.parse(p.frontmatter.pubDate) < Date.now()
}