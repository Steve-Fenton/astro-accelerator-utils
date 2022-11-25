import * as Taxonomy from './taxonomy.mjs';
import * as Navigation from './navigation.mjs';
import * as PostQueries from './postQueries.mjs';

/**
 * @typedef { import("../types/NavPage").NavPage } NavPage
 * @typedef { import("../types/Astro").Site } Site
 * @typedef { import("../types/Translations").Entry } Entry
 * @typedef { import("../types/Translations").TranslationProvider } TranslationProvider
 * @typedef { import("../types/Taxonomy").TaxonomyLinks } TaxonomyLinks
 */

/**
 * 
 * @param {URL} currentUrl 
 * @param {TranslationProvider} _ 
 * @param {any} translations 
 * @param {Site} site 
 * @param {(NavPage | 'categories' | 'tags' | 'toptags')[]} menu 
 * @returns {NavPage[]}
 */
export async function getMenu (currentUrl,  _, translations, site, menu) {
    const links = Taxonomy.taxonomyLinks(translations, _, site);

    /** @type {NavPage[]} */
    let pages = [];

    for (let i = 0; i < menu.length; i++) {
        const item = menu[i];
        if (Navigation.isNavPage(item)) {
            pages.push(item);
        } else {
            switch (item) {
                case 'tags':
                    const tags = await getTags(links, _, translations, site);
                    for (let j = 0; j < tags.length; j++) {
                        pages.push(tags[j]);
                    }
                    break;
                case 'toptags':
                    const toptags = await getTopTags(links, _, translations, site);
                    for (let j = 0; j < toptags.length; j++) {
                        pages.push(toptags[j]);
                    }
                    break;
                case 'categories':
                    const categories = await getCategories(links, _, translations, site);
                    for (let j = 0; j < categories.length; j++) {
                        pages.push(categories[j]);
                    }
                    break;
            }
        }
    }

    PostQueries.setCurrentPage(pages, currentUrl);

    return pages;
}

/**
 * 
 * @param {TaxonomyLinks} links 
 * @param {TranslationProvider} _ 
 * @param {any} translations 
 * @param {Site} site 
 * @returns {Promise<NavPage[]>}
 */
export async function getCategories (links, _, translations, site) {

    const category = _(translations.articles.category) ?? 'category';
    const categoryTitle = _(translations.articles.category_title) ?? 'Categories';
    const categoryLink = `${site.subfolder}/${category}/`;

    let order = 0;

    const taxonomy = await Taxonomy.getTaxonomy();

    /** @type {NavPage[]} */
    const pageHierarchy = [{
        title: categoryTitle,
        url: categoryLink,
        ariaCurrent: false,
        isOpen: false,
        order: 1,
        children: taxonomy.categories.map(item => {
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
 * @param {Site} site 
 * @returns {Promise<NavPage[]>}
 */
export async function getTags (links, _, translations, site) {

    const tag = _(translations.articles.tag) ?? 'tag';
    const tagTitle = _(translations.articles.tag_title) ?? 'Tags';
    const tagLink = `${site.subfolder}/${tag}/`;

    let order = 0;

    const taxonomy = await Taxonomy.getTaxonomy();

    /** @type {NavPage[]} */
    const pageHierarchy = [{
        title: tagTitle,
        url: tagLink,
        ariaCurrent: false,
        isOpen: false,
        order: 1,
        children: taxonomy.tags.map(item => {
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
 * @param {Site} site 
 * @returns {Promise<NavPage[]>}
 */
export async function getTopTags (links, _, translations, site) {

    const tag = _(translations.articles.tag) ?? 'tag';
    const tagTitle = _(translations.articles.tag_title) ?? 'Tags';
    const tagLink = `${site.subfolder}/${tag}/`;

    let order = 0;

    const taxonomy = await Taxonomy.getTaxonomy();

    /** @type {NavPage[]} */
    const pageHierarchy = [{
        title: tagTitle,
        url: tagLink,
        ariaCurrent: false,
        isOpen: false,
        order: 1,
        children: taxonomy.topTags.map(item => {
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
