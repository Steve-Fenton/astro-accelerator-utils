import { getItem, setItem } from './cache.mjs';
import * as PostFiltering from './postFiltering.mjs';
import * as Urls from './urls.mjs';

/**
 * @typedef { import("../types/PagePredicate").PagePredicate } PagePredicate
 * @typedef { import("../types/Frontmatter").Frontmatter } Frontmatter
 * @typedef { import("../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("../types/AuthorList").AuthorList } AuthorList
 * @typedef { import("../types/AuthorInfo").AuthorInfo } AuthorInfo
 * @typedef { import("../types/NavPage").NavPage } NavPage
 * @typedef { import("../types/Site").Site } Site
 */

/* istanbul ignore next */
/** @type {() => MarkdownInstance[]} */
let fetchAll = () => {
    return import.meta.glob("/src/pages/**/*.md", { eager: true });
}

/**
 * Replaces the import.meta.glob function
 * @param {() => MarkdownInstance[]} fetcher 
 */
export function injectFetchAll (fetcher) {
    fetchAll = fetcher;
}

/**
 * Fetches pages
 * @param {PagePredicate} [filter]
 * @returns {Promise<MarkdownInstance[]>}
 */
export async function getPages (filter) {
    const key = 'PageQueries__getPages';
    let allPages = await getItem(key);

    if (allPages == null) {
        const pageImportResult = fetchAll();
        allPages = Object.values(pageImportResult);
        await setItem(key, allPages);
    }

    if (filter == null) {
        return allPages;
    }

    return allPages.filter(filter);
}

/**
 * Fetches top-level pages
 * @param {Site} site
 * @param {PagePredicate} [filter] 
 * @returns {Promise<MarkdownInstance[]>}
 */
export async function getTopLevelPages (site, filter) {
    const key = 'PageQueries__getTopLevelPages';
    
    /** @type {MarkdownInstance[]} */
    let allPages = await getItem(key);

    if (allPages == null) {
        allPages = await getPages();

        const isRoot = site.subfolder.length == 0;
        const expectedDepth = isRoot ? 1 : 2;
        allPages = allPages.filter(p => {
            const depth = (p.url ?? '/').split('/').length - 1;
            return depth == expectedDepth
                || (depth == (expectedDepth - 1) && p.file.includes(site.subfolder.toLowerCase() + '.md'));
        });

        await setItem(key, allPages);
    }

    if (filter == null) {
        return allPages;
    }

    return allPages.filter(filter);
}

/**
 * Gets a list of authors, and exposes main author and contributors
 * @param {Frontmatter} frontmatter 
 * @returns {Promise<AuthorList>}
 */
export async function getAuthors (frontmatter) {
    const authors = await getPages(fetchAll, PostFiltering.isAuthor);

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

/**
 * Get a single author by id/slug
 * @param {string} slug 
 * @returns {Promise<AuthorInfo>}
 */
export async function getAuthorInfo (slug) {
    const cacheKey = 'Global__author_info';
    
    /** @type {AuthorInfo} */
    let authorInfo = await getItem(cacheKey);

    if (authorInfo == null) {
        const allPages = await getPages();

        const author = allPages
            .filter(PostFiltering.isAuthor)
            .filter(x => x.url?.split('/')[2] == slug)[0];

        authorInfo = {
            frontmatter: author.frontmatter
        };
  
      await setItem(cacheKey, authorInfo);
    }

    return authorInfo;
}

/**
 * Returns a list of breadcrumbs
 * @param {URL} currentUrl 
 * @param {Site} site
 * @returns {Promise<NavPage[]>}
 */
export async function getBreadcrumbs (currentUrl, site) {
    const allPages = await getPages();

    const pathParts = currentUrl.pathname.split('/');
    
    /** @type {NavPage[]} */
    const navPages = [];
    let path = '';

    pathParts.forEach((part) => {
        path += part.length > 0 ? '/' + part : '';
        const match = popMatchingPage(allPages, path);

        if (match) {
            navPages.push(mapNavPage(match, site));
        }
    });

    setCurrentPage(navPages, currentUrl);

    return navPages;
}

/**
 * Converts a MarkdownInstance into a NavPage
 * @param {MarkdownInstance} page 
 * @param {Site}
 * @returns {NavPage}
 */
export function mapNavPage (page, site) {

    let url = page.url == null || (page.url ?? '').length == 0 
        ? '/'
        : page.url;
  
    // Send visitors straight to the first page
    if (page.frontmatter.paged) {
      url += '/1/';
    }
  
    url = Urls.addSlashToAddress(url, site);
  
    if (page.frontmatter.layout == 'src/layouts/Redirect.astro') {
      // Skips past the redirect
      url = page.frontmatter.redirect;
    }
  
    /** @type {NavPage} */
    const entry = {
      section: page.frontmatter.navSection ?? page.frontmatter.navTitle ?? page.frontmatter.title,
      title: page.frontmatter.navTitle ?? page.frontmatter.title,
      url: url,
      order: page.frontmatter.navOrder,
      children: [],
      // These are later set to the correct value, but not now as we want to cache
      isOpen: false,
      ariaCurrent: false,
    }
  
    return entry;
};

/**
 * Walks the tree to set current page
 * @param {NavPage[]} pages 
 * @param {URL} currentUrl 
 */
export function setCurrentPage (pages, currentUrl) {
    pages.forEach(p => {
        p.isOpen = currentUrl.pathname.startsWith(p.url);
        p.ariaCurrent = p.url == currentUrl.pathname ? 'page': false;
        if (p.children) setCurrentPage(p.children, currentUrl);
    });
}

/**
 * Pops matching page from array
 * @param {MarkdownInstance[]} allPages 
 * @param {string} search 
 * @returns 
 */
export function popMatchingPage (allPages, search) {
    const numberToRemove = 1;
    let indexToRemove = -1;
    let match = null;
  
    for (let i = 0; i < allPages.length; i++) {
      if (allPages[i].url == search) {
        indexToRemove = i;
        match = allPages[i];
      }
    }
  
    if (match) {
      allPages.splice(indexToRemove, numberToRemove);
    }
  
    return match;
  };