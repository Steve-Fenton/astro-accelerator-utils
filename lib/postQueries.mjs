import { getItem, setItem } from "./Cache.mjs";

/**
 * @typedef { import("../types/PageFunction") } PageFunction
 * @typedef { import("../types/PagePredicate") } PagePredicate
 * @typedef { import("../types/Markdown") } Markdown
 */

/**
 * Fetches pages
 * @param {PageFunction} fetchPages 
 * @param {PagePredicate} [filter]
 * @returns {Markdown[]}
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