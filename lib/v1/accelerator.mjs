import { Authors } from './authors.mjs';
import { Cache } from './cache.mjs';
import { DateFormatter } from './dates.mjs';
import { Markdown } from './markdown.mjs';
import { Navigation } from './navigation.mjs';
import { Paging } from './paging.mjs';
import { Posts } from './posts.mjs';
import { Taxonomy } from './taxonomy.mjs';
import { UrlFormatter } from './urls.mjs';

/**
 * @typedef { import("../../types/Site").Site } Site
 */

export class Accelerator {
    /**
     * @param {Site} site
     */
    constructor(site) {
        this.cacheMaxAge = site.cacheMaxAge;
        this.dateOptions = site.dateOptions;
        this.siteUrl = site.url;
        this.subfolder = site.subfolder;
        this.useTrailingUrlSlash = site.useTrailingUrlSlash;
    }

    get authors() {
        return new Authors(this.posts);
    }

    get cache() {
        return new Cache(this.cacheMaxAge);
    }

    get dateFormatter() {
        return new DateFormatter(this.dateOptions)
    }

    get markdown() {
        return new Markdown();
    }

    get navigation() {
        return new Navigation(this.posts, this.urlFormatter, this.taxonomy);
    }

    get paging() {
        return new Paging();
    }

    get posts() {
        return new Posts(this.cache);
    }

    get taxonomy() {
        return new Taxonomy(this.cache, this.posts, this.urlFormatter);
    }

    get urlFormatter() {
        return new UrlFormatter(this.siteUrl, this.subfolder, this.useTrailingUrlSlash)
    }
}