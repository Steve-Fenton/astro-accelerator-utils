import { getItem, setItem } from "./Cache.mjs";

/**
 * Fetches pages
 * @param {import("../types/PageFunction").PageFunction} fetchPages 
 * @param {import("../types/PagePredicate").PagePredicate} filter 
 * @returns {import("../types/Markdown").Markdown<Record<string, any>[]}
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