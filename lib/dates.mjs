/**
 * 
 * @param {any} frontmatter 
 * @param {string} lang 
 * @param {any} site 
 * @returns 
 */
export function formatDate (frontmatter, lang, site) {
    const date = frontmatter.pubDate ?? '';
  
    if (date) {
      return new Date(date).toLocaleDateString(lang, site.dateOptions);
    }
    
    return '';
  }
  
 /**
 * 
 * @param {any} frontmatter 
 * @param {string} lang 
 * @param {any} site 
 * @returns 
 */
  export function formatModifiedDate (frontmatter, lang, site) {
    const date = frontmatter.modDate ?? '';
  
    if (date) {
      return new Date(date).toLocaleDateString(lang, site.dateOptions);
    }
    
    return '';
  }