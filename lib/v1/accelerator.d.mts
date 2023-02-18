/**
 * @typedef { import("../../types/Site").Site } Site
 */
export class Accelerator {
    /**
     * @param {Site} site
     */
    constructor(site: Site);
    cacheMaxAge: number;
    dateOptions: Intl.DateTimeFormatOptions;
    siteUrl: string;
    subfolder: string;
    useTrailingUrlSlash: boolean;
    get authors(): Authors;
    get cache(): Cache;
    get dateFormatter(): DateFormatter;
    get markdown(): Markdown;
    get navigation(): Navigation;
    get paging(): Paging;
    get posts(): Posts;
    get taxonomy(): Taxonomy;
    get urlFormatter(): UrlFormatter;
}
export type Site = import("../../types/Site").Site;
import { Authors } from "./authors.mjs";
import { Cache } from "./cache.mjs";
import { DateFormatter } from "./dates.mjs";
import { Markdown } from "./markdown.mjs";
import { Navigation } from "./navigation.mjs";
import { Paging } from "./paging.mjs";
import { Posts } from "./posts.mjs";
import { Taxonomy } from "./taxonomy.mjs";
import { UrlFormatter } from "./urls.mjs";
