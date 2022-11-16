const x = 'loaded';

type FrontMatter = Record<string, any>;
type Site = { dateOptions: Intl.DateTimeFormatOptions };

export function formatDate (frontmatter: FrontMatter, lang: string, site: Site) {
  const date = frontmatter.pubDate ?? '';

  if (date) {
    return new Date(date).toLocaleDateString(lang, site.dateOptions);
  }
  
  return '';
}

export function formatModifiedDate (frontmatter: FrontMatter, lang: string, site: Site) {
  const date = frontmatter.modDate ?? '';

  if (date) {
    return new Date(date).toLocaleDateString(lang, site.dateOptions);
  }
  
  return '';
}