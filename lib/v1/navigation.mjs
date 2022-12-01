import * as PostFiltering from '../postFiltering.mjs';

/**
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("../../types/NavPage").NavPage } NavPage
 */

export class Navigation {
    /**
     * Constructor
     * @param {Posts} posts
     * @param {UrlFormatter} urlFormatter
     */
    constructor(posts, urlFormatter) {
        /* istanbul ignore next */
        this.posts = posts;
        this.urlFormatter = urlFormatter;
    }

    /**
     * Returns a list of breadcrumbs
     * @param {URL} currentUrl 
     * @param {string} subfolder
     * @returns {NavPage[]}
     */
    breadcrumbs (currentUrl, subfolder) {
        const allPages = this.posts.all();

        const pathParts = currentUrl.pathname.split('/');
    
        if (subfolder.length > 0) {
            // Running in a subfolder
            pathParts.shift();
        }
        
        /** @type {NavPage[]} */
        const navPages = [];
        let path = '';
    
        pathParts.forEach((part) => {
            path += part.length > 0 ? '/' + part : '';
            const match = this.popMatchingPage(allPages, path);
    
            if (match) {
                navPages.push(this.mapNavPage(match));
            }
        });
    
        this.setCurrentPage(navPages, currentUrl);
    
        return navPages;
    }

    /**
     * 
     * @param {URL} currentUrl 
     * @param {string} subfolder
     * @param {(NavPage | 'auto')[]} menu
     * @returns {NavPage[]}
     */
    menu (currentUrl, subfolder, menu) {
            const pages = [];
            for (let i = 0; i < menu.length; i++) {
                const item = menu[i];
                if (this.isNavPage(item)) {
                    pages.push(item);
                } else {
                    const p = this.autoMenu(subfolder);
                    for (let j = 0; j < p.length; j++) {
                        pages.push(p[j]);
                    }
                }
            }

        this.setCurrentPage(pages, currentUrl);

        return pages;
    }

    /**
     * 
     * @param {string} subfolder 
     * @returns {NavPage[]}
     */
    autoMenu (subfolder) {
        const allPages = this.posts
            .all()
            .filter(PostFiltering.showInMenu);

        const topLevelPages = this.posts
            .root(subfolder)
            .filter(PostFiltering.showInMenu);

        const pageHierarchy = topLevelPages
            .map(p => this.mapNavPage(p))
            .sort((a, b) => a.order - b.order);
            
        /** @type {NavPage[]} */
        const pageList = allPages.map(p => this.mapNavPage(p));

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

        return pageHierarchy;
    }


    /**
     * Walks a NavPage tree to set current page
     * @param {NavPage[]} pages 
     * @param {URL} currentUrl 
     */
    setCurrentPage (pages, currentUrl) {
        pages.forEach(p => {
            p.isOpen = currentUrl.pathname.startsWith(p.url);
            p.ariaCurrent = p.url == currentUrl.pathname
                ? 'page'
                : false;
            
            if (p.children) {
                this.setCurrentPage(p.children, currentUrl);
            }
        });
    }

    /**
     * Converts a MarkdownInstance into a NavPage
     * @param {MarkdownInstance} page 
     * @returns {NavPage}
     */
    mapNavPage (page) {
        let url = page.url == null || (page.url ?? '').length == 0 
            ? '/'
            : page.url;
    
        // Send visitors straight to the first page
        if (page.frontmatter.paged) {
            url += '/1/';
        }
    
        url = this.urlFormatter.addSlashToAddress(url);
    
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
            ariaCurrent: false
        }
    
        return entry;
    }


    /**
     * Checks whether the item is a NavPage
     * @param {NavPage | 'auto' | 'tags' | 'toptags' | 'categories'} item 
     * @returns {item is NavPage}
     */
    isNavPage (item) {
        if (typeof item === 'string' && ['auto', 'tags', 'toptags', 'categories'].includes(item)) {
            return false;
        }
    
        return true;
    }

    /**
     * Pops matching page from array
     * @param {MarkdownInstance[]} allPages 
     * @param {string} search 
     * @returns 
     */
    popMatchingPage (allPages, search) {
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
  }
}