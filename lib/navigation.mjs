import { Posts } from './v1/posts.mjs';
import * as PostQueries from './postQueries.mjs';
import * as PostFiltering from './postFiltering.mjs';
import * as Cache from './cache.mjs';

/**
 * @typedef { import("../types/Site").Site } Site
 * @typedef { import("../types/NavPage").NavPage } NavPage
 */

/**
 * 
 * @param {URL} currentUrl 
 * @param {Site} site 
 * @param {NavPage | 'auto'} menu
 * @returns {Promise<NavPage[]}
 */
export async function getMenu (currentUrl, site, menu) {
    const key = 'Navigation__getMenu';

    /** @type {NavPage[]} */
    let pages = await Cache.getItem(key);

    if (pages == null) {
        pages = [];
        for (let i = 0; i < menu.length; i++) {
            const item = menu[i];
            if (isNavPage(item)) {
                pages.push(item);
            } else {
                const p = await getNavigation(currentUrl, site);
                for (let j = 0; j < p.length; j++) {
                    pages.push(p[j]);
                }
            }
        }

        // Cache the result
        await Cache.setItem(key, pages);
    }

    PostQueries.setCurrentPage(pages, currentUrl);

    return pages;
}

/**
 * 
 * @param {NavPage | 'auto' | 'tags' | 'toptags' | 'categories'} item 
 * @returns {item is NavPage}
 */
export function isNavPage (item) {
    if (typeof item === 'string' && ['auto', 'tags', 'toptags', 'categories'].includes(item)) {
      return false;
    }
  
    return true;
  }
  

/**
 * 
 * @param {URL} currentUrl 
 * @param {Site} site 
 * @returns {Promise<NavPage[]}
 */
export async function getNavigation (currentUrl, site) {

    const key = 'Navigation__getNavigation';
    const posts = new Posts();

    /** @type {NavPage[]} */
    let pageHierarchy = await Cache.getItem(key);

    if (pageHierarchy == null) {
        const topLevelPages = posts.root(site.subfolder).filter(PostFiltering.showInMenu);
        const allPages = posts.all().filter(PostFiltering.showInMenu);

        pageHierarchy = topLevelPages
            .map(p => PostQueries.mapNavPage(p, site))
            .sort((a, b) => a.order - b.order);
            
        /** @type {NavPage[]} */
        const pageList = allPages.map(p => PostQueries.mapNavPage(p, site));

        for (let i = 0; i < pageHierarchy.length; i++) {
            const page = pageHierarchy[i];

            if (i > 0) {
                // Don't add children to first link (Home)
                page.children = pageList
                    .filter((mp) =>
                        page.url != '/'
                        && mp.url != page.url
                        && mp.url.startsWith(page.url)
                    )
                    .sort((mp) => mp.order);
            }

            if (page.children.length > 0) {
                const ownChild = structuredClone(page);
                ownChild.order = -1;
                ownChild.children = [];
                page.children.push(ownChild);
            }
        }

        // Cache the result
        await Cache.setItem(key, pageHierarchy);
    }

    return pageHierarchy;
}
