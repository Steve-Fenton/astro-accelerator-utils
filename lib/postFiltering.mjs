export function showInSitemap (p) {
  // User setting to remove from sitemap
  if (typeof p.frontmatter.navSitemap !== 'undefined'
    && p.frontmatter.navSitemap == false) {
    return false;
  }

  return isListable(p);
}

export function showInSearch (p) {
  // User setting to remove from search
  if (typeof p.frontmatter.navSearch !== 'undefined'
    && p.frontmatter.navSearch == false) {
    return false;
  }

  return isListable(p);
}

export function showInMenu (p) {
  if (typeof p.frontmatter.navMenu !== 'undefined'
    && p.frontmatter.navMenu == false) {
    return false;
  }

  return true;
}

export function isAuthor (p) {
  if (p?.frontmatter?.layout?.indexOf('/Author.astro') > -1) {
    return true;
  }

  return false;
}

export function isSearch (p) {
  if (p?.frontmatter?.layout?.indexOf('/Search.astro') > -1) {
    return true;
  }

  return false;
}

export function isListable (p) {
  return p.url != null 
    && p.url != '' 
    && p.frontmatter.layout.includes('/Redirect.astro') !== true
    && Date.parse(p.frontmatter.pubDate) < Date.now()
}