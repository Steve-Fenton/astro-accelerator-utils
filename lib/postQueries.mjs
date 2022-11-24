import { getItem, setItem } from './cache.mjs';
import * as PostFiltering from './postFiltering.mjs';

/**
 * @typedef { import("../types/PageFunction").PageFunction } PageFunction
 * @typedef { import("../types/PagePredicate").PagePredicate } PagePredicate
 * @typedef { import("../types/Frontmatter").Frontmatter } Frontmatter
 * @typedef { import("../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("../types/AuthorList").AuthorList } AuthorList
 */

/**
 * Fetches pages
 * @param {PageFunction} fetchPages 
 * @param {PagePredicate} [filter]
 * @returns {Promise<MarkdownInstance<Record<string, any>>[]>}
 */
export async function getPages (fetchPages, filter) {
    const key = 'PageQueries__getPages';
    let allPages = await getItem(key);

    if (allPages == null) {
        const pageImportResult = fetchPages();
        allPages = Object.values(pageImportResult);
        await setItem(key, allPages);
    }

    if (filter == null) {
        return allPages;
    }

    return allPages.filter(filter);
}

/**
 * 
 * @param {PageFunction} fetchPages 
 * @param {Frontmatter} frontmatter 
 * @returns {Promise<AuthorList>}
 */
export async function getAuthors (fetchPages, frontmatter) {
    const authors = await getPages(fetchPages, PostFiltering.isAuthor);

    /** @type {AuthorList} */
    const result = {
        image: null,
        writers: [],
        mainAuthor: null,
        contributors: []
    };

    (frontmatter.authors ?? []).forEach((a) => {
        const matches = authors.filter((x) => x.frontmatter.id == a);

        if (matches.length == 0) {
            console.warn("Unknown author", a);
        }

        if (matches.length > 1) {
            console.warn("Multiple authors with id", a);
        }

        if (matches.length == 1) {
            result.writers.push(matches[0]);
            if (result.image == null) {
                result.image = matches[0].frontmatter.bannerImage;
            }
        }
    });

    result.mainAuthor = result.writers.slice(0, 1)[0];
    result.contributors = result.writers.slice(1);

    return result;
}