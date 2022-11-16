import { Markdown } from "../types/Markdown";
import { PagePredicate } from "../types/PagePredicate";
import { getItem, setItem } from "./Cache";

export async function getPages (fetchPages: () => Record<string, any>, filter?: PagePredicate | null): Promise<Markdown<Record<string,any>>[]> {
    const key = 'PageQueries__getPages';
    let allPages: Markdown<Record<string,any>>[] = await getItem(key);

    if (allPages == null) {
        const pageImportResult = fetchPages();
        allPages = Object.values(pageImportResult) as Markdown<Record<string,any>>[];
        await setItem(key, allPages);
    }

    if (filter == null) {
        return allPages;
    }

    return allPages.filter(filter);
}