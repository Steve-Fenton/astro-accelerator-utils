/**
 * @typedef { import("../types/Site") } Site
 */

/**
 * Returns the formatted pubDate
 * @param {any} frontmatter 
 * @param {string} lang 
 * @param {Site} site 
 * @returns {string}
 */
export function formatDate (frontmatter, lang, site) {
    const date = frontmatter.pubDate ?? '';
  
    if (date) {
      return new Date(date).toLocaleDateString(lang, site.dateOptions);
    }
    
    return '';
  }
  
 /**
 * Returns the formatted modDate
 * @param {any} frontmatter 
 * @param {string} lang 
 * @param {Site} site 
 * @returns {string}
 */
  export function formatModifiedDate (frontmatter, lang, site) {
    const date = frontmatter.modDate ?? '';
  
    if (date) {
      return new Date(date).toLocaleDateString(lang, site.dateOptions);
    }
    
    return '';
  }