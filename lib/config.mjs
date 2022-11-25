/**
 * @typedef { import("../types/Site").Site } Site
 */

/**
 * Gets default configuration
 * @returns {Site}
 */
export function getDefault() {
    return {
        owner: '',
        url: '',
        feedUrl: '',
        title: '',
        description: '',
        themeColor: '#222255',
        subfolder: '',
        defaultLanguage: 'en',
        default: {
            lang: 'en',
            locale: 'en-US',
            dir: 'ltr'
        },
        search: {
            fallbackUrl: 'https://www.google.com/search',
            fallbackSite: 'q',
            fallbackQuery: 'q',
        },
        pageSize: 12,
        pageLinks: 3,
        rssLimit: 20,
        dateOptions: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        },
        featureFlags: {
            codeBlocks: ['copy'],
            figures: ['enlarge'],
            youTubeLinks: ['embed'],
        },
        images: {
            contentSize: '(max-width: 860px) 100vw, 620px',
            listerSize: '(max-width: 860px) 90vw, 350px',
            authorSize: '50px',
        }
    };
}