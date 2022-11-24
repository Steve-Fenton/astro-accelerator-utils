import * as Urls from './urls.mjs';
import * as Cache from './cache.mjs';
import * as PostQueries from './postQueries.mjs';

/**
 * @typedef { import("../types/Taxonomy").Taxonomy } Taxonomy
 * @typedef { import("../types/Taxonomy").TaxonomyEntry } TaxonomyEntry
 * @typedef { import("../types/Taxonomy").TaxonomyLinks } TaxonomyLinks
 * @typedef { import("../types/Astro").MarkdownInstance } MarkdownInstance
 */

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
    const category = lang(translations.articles.category) ?? 'category';
    const categoryLink = `${site.subfolder}/${category}/`;

    const tag = lang(translations.articles.tag) ?? 'category';
    const tagLink = `${site.subfolder}/${tag}/`;

    return {
        tag: tag,
        category: category,
        getCategoryLink: (category) => {
            return Urls.addSlashToAddress(categoryLink + category.toLowerCase().replace(/ /g, '-') + '/1/', site);
        },
        getTagLink: (tag) => {
            return Urls.addSlashToAddress(tagLink + tag.toLowerCase().replace(/ /g, '-') + '/1/', site);
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
    let taxonomy = await Cache.getItem(cacheKey);

    if (taxonomy == null) {
        /** @type {MarkdownInstance[]} */
        const allPages = await PostQueries.getPages();
        
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

        await Cache.setItem(cacheKey, taxonomy);
    }

    return taxonomy;
}
