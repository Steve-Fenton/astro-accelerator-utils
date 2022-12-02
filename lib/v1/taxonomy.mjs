import * as PostFiltering from '../postFiltering.mjs';

/**
 * @typedef { import("./cache.mjs").Cache } Cache
 * @typedef { import("./posts.mjs").Posts } Posts
 * @typedef { import("./urls.mjs").UrlFormatter } UrlFormatter
 * @typedef { import("../../types/Site").Site } Site
 * @typedef { import("../../types/Taxonomy").TaxonomyList } TaxonomyList
 * @typedef { import("../../types/Taxonomy").TaxonomyEntry } TaxonomyEntry
 * @typedef { import("../../types/Taxonomy").TaxonomyLinks } TaxonomyLinks
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 */

export class Taxonomy {

    /**
     * Constructor
     * @param {Cache} cache 
     * @param {Posts} posts 
     * @param {UrlFormatter} urlFormatter
     */
    constructor(cache, posts, urlFormatter) {
        this.cache = cache;
        this.posts = posts;
        this.urlFormatter = urlFormatter;
    }

    /**
     * 
     * @returns {TaxonomyList}
     */
    all() {
        const taxonomy = this.cache.get('v1_taxonomy.all', () => this.getTaxonomy());
        return taxonomy;
    }

    /**
     * 
     * @param {any} translations 
     * @param {(entry: any) => string} lang 
     * @param {string} subfolder 
     * @returns {TaxonomyLinks}
     */
    links(translations, lang, subfolder) {
        const category = lang(translations.articles.category) ?? 'category';
        const categoryLink = `${subfolder}/${category}/`;

        const tag = lang(translations.articles.tag) ?? 'tag';
        const tagLink = `${subfolder}/${tag}/`;

        return {
            tag: tag,
            category: category,
            getCategoryLink: (category) => {
                return this.urlFormatter.addSlashToAddress(categoryLink + category.toLowerCase().replace(/ /g, '-') + '/1/');
            },
            getTagLink: (tag) => {
                return this.urlFormatter.addSlashToAddress(tagLink + tag.toLowerCase().replace(/ /g, '-') + '/1/');
            }
        };
    }

    /**
     * 
     * @returns {TaxonomyList}
     */
    getTaxonomy() {
        /** @type {MarkdownInstance[]} */
        const allPages = this.posts.all().filter(PostFiltering.isListable);

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
        const taxonomy = {
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
            .sort(this.sortByVolume)
            .slice(0, length);

        taxonomy.categories = taxonomy.categories.sort(this.sortByTitle);
        taxonomy.tags = taxonomy.tags.sort(this.sortByTitle);
        taxonomy.topTags = taxonomy.topTags.sort(this.sortByTitle);

        return taxonomy;
    }

    /**
     * Sorts taxonomy entries by title
     * @param {TaxonomyEntry} a 
     * @param {TaxonomyEntry} b 
     * @returns 
     */
    sortByTitle(a, b) {
        if (a.title < b.title) {
            return -1;
        }

        if (a.title > b.title) {
            return 1;
        }

        return 0;
    }

    /**
     * Sorts taxonomy entries by title
     * @param {TaxonomyEntry} a 
     * @param {TaxonomyEntry} b 
     * @returns 
     */
     sortByVolume(a, b) {
        return b.count - a.count;
    }
}