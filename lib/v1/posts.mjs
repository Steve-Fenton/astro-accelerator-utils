/**
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("./cache.mjs").Cache } Cache
 */

export class Posts {
    /**
     * Constructor
     * @param {Cache} cache
     * @param {() => MarkdownInstance[]} [fetchAll]
     */
    constructor(cache, fetchAll) {
        this.cache = cache;
        /* istanbul ignore next */
        this.fetchAll = fetchAll ?? function() { 
            return import.meta.glob("/src/pages/**/*.md", { eager: true });
        }
    }

    /**
     * Gets all markdown posts in the site
     * @returns {MarkdownInstance[]}
     */
    all () {
        const key = 'v1_posts.all';

        return this.cache.get(key, () => {
            const pageImportResult = this.fetchAll();
            return Object.values(pageImportResult);
        });
    }

    /**
     * Gets top-level markdown posts in the site
     * @returns {MarkdownInstance[]}
     */
    root (subfolder) {
        const isRoot = subfolder.length == 0;
        const expectedDepth = isRoot ? 1 : 2;

        return this.all().filter(p => {
            const url = p.url ?? '/';
            const depth = (url).split('/').length - 1;
            return depth == expectedDepth
                || (depth == (expectedDepth - 1) && p.file.includes(subfolder.toLowerCase() + '.md'));
        })
    }
}