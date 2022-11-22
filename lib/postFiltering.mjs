/**
 * @typedef { import("../types/PageFunction") } PageFunction
 * @typedef { import("../types/PagePredicate") } PagePredicate
 * @typedef { import("../types/Markdown") } Markdown
 */

/**
 * Predicate for whether a page should appear in the sitemap
 * @param {Markdown} p 
 * @returns {boolean}
 */
export function showInSitemap (p) {
  // User setting to remove from sitemap
  if (typeof p.frontmatter.navSitemap !== 'undefined'
    && p.frontmatter.navSitemap == false) {
    return false;
  }

  return isListable(p);
}

/**
 * Predicate for whether a page should appear in the site search
 * @param {Markdown} p 
 * @returns {boolean}
 */
export function showInSearch (p) {
  // User setting to remove from search
  if (typeof p.frontmatter.navSearch !== 'undefined'
    && p.frontmatter.navSearch == false) {
    return false;
  }

  return isListable(p);
}

/**
 * Predicate for whether a page should appear in the navigation menu
 * @param {Markdown} p 
 * @returns {boolean}
 */
export function showInMenu (p) {
  if (typeof p.frontmatter.navMenu !== 'undefined'
    && p.frontmatter.navMenu == false) {
    return false;
  }

  return true;
}

/**
 * Predicate for whether a page is an author page
 * @param {Markdown} p 
 * @returns {boolean}
 */
export function isAuthor (p) {
  if (p?.frontmatter?.layout?.indexOf('/Author.astro') > -1) {
    return true;
  }

  return false;
}

/**
 * Predicate for whether a page is a search page
 * @param {Markdown} p 
 * @returns {boolean}
 */
export function isSearch (p) {
  if (p?.frontmatter?.layout?.indexOf('/Search.astro') > -1) {
    return true;
  }

  return false;
}

/**
 * Predicate for whether a page should be listed
 * @param {Markdown} p 
 * @returns {boolean}
 */
export function isListable (p) {
  return p.url != null 
    && p.url != '' 
    && p.frontmatter.layout.includes('/Redirect.astro') !== true
    && Date.parse(p.frontmatter.pubDate) < Date.now()
}