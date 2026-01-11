/**
 * @typedef { import("../types/PagePredicate").PagePredicate } PagePredicate
 * @typedef { import("../types/Astro").MarkdownInstance} MarkdownInstance
 */

/**
 * Predicate for whether a page should appear in the sitemap
 * @param {MarkdownInstance} p 
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
 * @param {MarkdownInstance} p 
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
 * @param {MarkdownInstance} p 
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
 * @param {MarkdownInstance} p 
 * @returns {boolean}
 */
export function isAuthor (p) {
  if (p?.frontmatter?.layout?.indexOf('/Author.astro') > -1) {
    return true;
  }

  return false;
}

/**
 * Predicate for whether a page is an author page
 * @param {MarkdownInstance} p 
 * @returns {boolean}
 */
export function notAuthor (p) {
  return !isAuthor(p);
}

/**
 * Predicate for whether a page is a search page
 * @param {MarkdownInstance} p 
 * @returns {boolean}
 */
export function isSearch (p) {
  if (p?.frontmatter?.layout?.indexOf('/Search.astro') > -1) {
    return true;
  }

  return false;
}

/**
 * Predicate for whether a page is an search page
 * @param {MarkdownInstance} p 
 * @returns {boolean}
 */
export function notSearch (p) {
  return !isSearch(p);
}

/**
 * Predicate for whether a page has a modified date
 * @param {MarkdownInstance} p 
 * @returns {boolean}
 */
export function hasDate (p) {
  if (p?.frontmatter?.modDate != null || p?.frontmatter?.pubDate != null) {
    return true;
  }

  return false;
}

/**
 * Predicate for whether a page has a modified date
 * @param {MarkdownInstance} p 
 * @returns {boolean}
 */
export function hasModDate (p) {
  if (p?.frontmatter?.modDate != null) {
    return true;
  }

  return false;
}

/**
 * Predicate for whether a page should be listed
 * @param {MarkdownInstance<Record<string, any>>} p 
 * @returns {boolean}
 */
export function isListable (p) {
  if (p.url == null || p.url === '') {
    return false;
  }

  if (p.frontmatter == null || p.frontmatter.layout == null) {
    return false;
  }

  if (p.frontmatter.layout.includes('/Redirect.astro')) {
    return false;
  }

  if (p.frontmatter.listable != null && p.frontmatter.listable == false) {
    return false;
  }

  if (p.frontmatter.draft == true) {
    return false;
  }

  if (p.frontmatter.pubDate != null && Date.parse(p.frontmatter.pubDate) > Date.now()) {
    return false;
  }

  return true;
}

/**
 * Predicate for whether a page should be used to create tag and category lists.
 * Specifically, this allows future-dated posts to cause taxonomy pages to be created,
 * @param {MarkdownInstance<Record<string, any>>} p 
 * @returns {boolean}
 */
export function forTaxonomy (p) {
  if (p.url == null || p.url === '') {
    return false;
  }

  if (p.frontmatter == null || p.frontmatter.layout == null) {
    return false;
  }

  if (p.frontmatter.layout.includes('/Redirect.astro')) {
    return false;
  }

  if (p.frontmatter.listable != null && p.frontmatter.listable == false) {
    return false;
  }

  if (p.frontmatter.draft == true) {
    return false;
  }

  return true;
}