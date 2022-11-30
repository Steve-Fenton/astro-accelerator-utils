import { Cache } from './v1/cache.mjs';
import { UrlFormatter } from './v1/urls.mjs';
import * as PostQueries from './postQueries.mjs';
import * as PostFiltering from './postFiltering.mjs';

/**
 * @typedef { import("../types/Site").Site } Site
 * @typedef { import("../types/Taxonomy").Taxonomy } Taxonomy
 * @typedef { import("../types/Taxonomy").TaxonomyEntry } TaxonomyEntry
 * @typedef { import("../types/Taxonomy").TaxonomyLinks } TaxonomyLinks
 * @typedef { import("../types/Astro").MarkdownInstance } MarkdownInstance
 */

const cache = new Cache(200);

/**
 * 
 * @param {TaxonomyEntry} a 
 * @param {TaxonomyEntry} b 
 * @returns 
 */
export function sortByTitle (a, b) {
    if ( a.title < b.title ){
      return -1;
    }
  
    if ( a.title > b.title ){
      return 1;
    }
    
    return 0;
}

/**
 * 
 * @param {any} translations 
 * @param {(entry: any) => string} lang 
 * @param {Site} site 
 * @returns {TaxonomyLinks}
 */
export function taxonomyLinks(translations, lang, site) {
    const urlFormatter = new UrlFormatter(site.url);
    const category = lang(translations.articles.category) ?? 'category';
    const categoryLink = `${site.subfolder}/${category}/`;

    const tag = lang(translations.articles.tag) ?? 'category';
    const tagLink = `${site.subfolder}/${tag}/`;

    return {
        tag: tag,
        category: category,
        getCategoryLink: (category) => {
            return urlFormatter.addSlashToAddress(categoryLink + category.toLowerCase().replace(/ /g, '-') + '/1/');
        },
        getTagLink: (tag) => {
            return urlFormatter.addSlashToAddress(tagLink + tag.toLowerCase().replace(/ /g, '-') + '/1/');
        }
    };
}

/**
 * 
 * @returns {Promise<Taxonomy}
 */
export async function getTaxonomy () {
    const cacheKey = 'Global__taxonomy';

    /** @type {Taxonomy} */
    let taxonomy = cache.getItem(cacheKey);

    if (taxonomy == null) {
        /** @type {MarkdownInstance[]} */
        const allPages = await PostQueries.getPages(PostFiltering.isListable);
        
        /** @type {{ [key: string]: number }} */
        const tags = {};

        /** @type {{ [key: string]: number }} */
        const cats = {};

        // Get taxonomy and counts
        allPages.forEach((p) => {
            p.frontmatter.tags && (p.frontmatter.tags).forEach(t => {
                tags[t] = (tags[t] ?? 0) + 1;
            });

            p.frontmatter.categories && (p.frontmatter.categories).forEach(c => {
                cats[c] = (cats[c] ?? 0) + 1;
            });
        });

        // Map into the taxonomy
        taxonomy = {
            tags: Object.keys(tags).sort().map(x => {
                return {
                    title: x,
                    count: tags[x]
                };
            }),
            topTags: [],
            categories: Object.keys(cats).sort().map(x => {
                return {
                    title: x,
                    count: cats[x]
                };
            })
        };

        // Get a list of "top tags" by usage count
        const length = Math.min(taxonomy.categories.length, taxonomy.tags.length);
        taxonomy.topTags = taxonomy.tags
            .sort((a, b) => b.count - a.count)
            .slice(0, length)
            .sort((a, b) => {
                if ( a.title < b.title ){
                    return -1;
                }
                if ( a.title > b.title ){
                    return 1;
                }
                return 0;
             });

        cache.setItem(cacheKey, taxonomy);
    }

    return taxonomy;
}
