import * as PostFiltering from '../postFiltering.mjs';

/**
 * @typedef { import("./posts.mjs").Posts } Posts
 * @typedef { import("./taxonomy.mjs").Taxonomy } Taxonomy
 * @typedef { import("./urls.mjs").UrlFormatter } UrlFormatter
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("../../types/NavPage").NavPage } NavPage
 */

export class Navigation {
    /**
     * Constructor
     * @param {Posts} posts
     * @param {UrlFormatter} urlFormatter
     * @param {Taxonomy} taxonomy
     */
    constructor(posts, urlFormatter, taxonomy) {
        this.posts = posts;
        this.urlFormatter = urlFormatter;
        this.taxonomy = taxonomy;
    }

    /**
     * Returns a list of breadcrumbs
     * @param {URL} currentUrl 
     * @param {string} subfolder
     * @param {number} customCount
     * @returns {NavPage[]}
     */
    breadcrumbs(currentUrl, subfolder, customCount) {
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

        if (customCount === 0) {
            navPages[navPages.length -1].url = currentUrl.pathname;
        }

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
    menu(currentUrl, subfolder, menu) {
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
     * @param {NavPage} page
     * @param {NavPage[]} pageList 
     */
    getChildren(page, pageList) {
        const children = pageList
        .filter((mp) =>
            page.url != '/'
            && mp.url != page.url
            && mp.url.startsWith(page.url)
            && mp.url.split('/').length == (page.url.split('/').length + 1)
        )
        .sort((mp) => mp.order);

        for (let child of children) {
            child.children = this.getChildren(child, pageList);
        }

        if (children.length > 0) {
            // Add the item to itself as the first item
            const ownChild = structuredClone(page);
            ownChild.order = -1;
            ownChild.children = [];
            children.push(ownChild);
        }

        return children;
    }

    /**
     * 
     * @param {string} subfolder 
     * @returns {NavPage[]}
     */
    autoMenu(subfolder) {
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
                page.children = this.getChildren(page, pageList);
            }
        }

        return pageHierarchy;
    }

    /**
     * 
     * @param {URL} currentUrl 
     * @param {TranslationProvider} _ 
     * @param {any} translations 
     * @param {string} subfolder 
     * @param {(NavPage | 'categories' | 'tags' | 'toptags')[]} menu 
     * @returns {NavPage[]}
     */
    footer(currentUrl, _, translations, subfolder, menu) {

        // const cache = new Cache(site.cacheMaxAge);
        // const posts = new Posts(cache);
        // const urlFormatter = new UrlFormatter(site.url);
        // const taxonomy = new Taxonomy(cache, posts, urlFormatter);
        // const navigation = new Navigation(posts, urlFormatter);
        const links = this.taxonomy.links(translations, _, subfolder);
        const entries = this.taxonomy.getTaxonomy();

        /** @type {NavPage[]} */
        let pages = [];

        for (let i = 0; i < menu.length; i++) {
            const item = menu[i];
            if (this.isNavPage(item)) {
                pages.push(item);
            } else {
                switch (item) {
                    case 'tags':
                        const tags = this.getTags(links, _, translations, subfolder, entries);
                        for (let j = 0; j < tags.length; j++) {
                            pages.push(tags[j]);
                        }
                        break;
                    case 'toptags':
                        const toptags = this.getTopTags(links, _, translations, subfolder, entries);
                        for (let j = 0; j < toptags.length; j++) {
                            pages.push(toptags[j]);
                        }
                        break;
                    case 'categories':
                        const categories = this.getCategories(links, _, translations, subfolder, entries);
                        for (let j = 0; j < categories.length; j++) {
                            pages.push(categories[j]);
                        }
                        break;
                }
            }
        }

        this.setCurrentPage(pages, currentUrl);

        return pages;
    }

    /**
     * 
     * @param {TaxonomyLinks} links 
     * @param {TranslationProvider} _ 
     * @param {any} translations 
     * @param {string} subfolder 
     * @param {TaxonomyList} entries
     * @returns {NavPage[]}
     */
    getCategories(links, _, translations, subfolder, entries) {

        const category = _(translations.articles.category) ?? 'category';
        const categoryTitle = _(translations.articles.category_title) ?? 'Categories';
        const categoryLink = `${subfolder}/${category}/`;

        let order = 0;

        /** @type {NavPage[]} */
        const pageHierarchy = [{
            title: categoryTitle,
            url: categoryLink,
            ariaCurrent: false,
            isOpen: false,
            order: 1,
            children: entries.categories.map(item => {
                return {
                    title: item.title,
                    url: links.getCategoryLink(item.title),
                    ariaCurrent: false,
                    isOpen: false,
                    order: ++order,
                    children: []
                };
            })
        }];

        return pageHierarchy;
    }

    /**
     * 
     * @param {TaxonomyLinks} links 
     * @param {TranslationProvider} _ 
     * @param {any} translations 
     * @param {string} subfolder 
     * @param {TaxonomyList} entries
     * @returns {NavPage[]}
     */
    getTags(links, _, translations, subfolder, entries) {

        const tag = _(translations.articles.tag) ?? 'tag';
        const tagTitle = _(translations.articles.tag_title) ?? 'Tags';
        const tagLink = `${subfolder}/${tag}/`;

        let order = 0;

        /** @type {NavPage[]} */
        const pageHierarchy = [{
            title: tagTitle,
            url: tagLink,
            ariaCurrent: false,
            isOpen: false,
            order: 1,
            children: entries.tags.map(item => {
                return {
                    title: item.title,
                    url: links.getTagLink(item.title),
                    ariaCurrent: false,
                    isOpen: false,
                    order: ++order,
                    children: []
                };
            })
        }];

        return pageHierarchy;
    }

    /**
     * 
     * @param {TaxonomyLinks} links 
     * @param {TranslationProvider} _ 
     * @param {any} translations 
     * @param {string} subfolder 
     * @param {TaxonomyList} entries
     * @returns {NavPage[]}
     */
    getTopTags(links, _, translations, subfolder, entries) {

        const tag = _(translations.articles.tag) ?? 'tag';
        const tagTitle = _(translations.articles.tag_title) ?? 'Tags';
        const tagLink = `${subfolder}/${tag}/`;

        let order = 0;

        /** @type {NavPage[]} */
        const pageHierarchy = [{
            title: tagTitle,
            url: tagLink,
            ariaCurrent: false,
            isOpen: false,
            order: 1,
            children: entries.topTags.map(item => {
                return {
                    title: item.title,
                    url: links.getTagLink(item.title),
                    ariaCurrent: false,
                    isOpen: false,
                    order: ++order,
                    children: []
                };
            })
        }];

        return pageHierarchy;
    }


    /**
     * Walks a NavPage tree to set current page
     * @param {NavPage[]} pages 
     * @param {URL} currentUrl 
     */
    setCurrentPage(pages, currentUrl) {
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
    mapNavPage(page) {
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
            fullTitle: page.frontmatter.title,
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
    isNavPage(item) {
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
    popMatchingPage(allPages, search) {
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