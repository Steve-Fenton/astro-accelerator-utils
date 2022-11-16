import type { Site } from '../types/Site';
import type { Frontmatter } from '../types/Frontmatter';

export function formatDate (frontmatter: Frontmatter, lang: string, site: Site) {
    const date = frontmatter.pubDate ?? '';
  
    if (date) {
      return new Date(date).toLocaleDateString(lang, site.dateOptions);
    }
    
    return '';
  }
  
  export function formatModifiedDate (frontmatter: Frontmatter, lang: string, site: Site) {
    const date = frontmatter.modDate ?? '';
  
    if (date) {
      return new Date(date).toLocaleDateString(lang, site.dateOptions);
    }
    
    return '';
  }