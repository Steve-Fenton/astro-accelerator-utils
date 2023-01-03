import { Cache } from '../lib/v1/cache.mjs';
import { Posts } from '../lib/v1/posts.mjs';

import { fetchAll } from './data/fetchAllMock.mjs';
import { fetchAllSubfolderVersion } from './data/fetchAllSubfolderMock.mjs';

describe('Posts.root', () => {

    // Zero-length cache
    const cache = new Cache(0);

    test('Top level pages (default', () => {
        const subfolder = '';
        const posts = new Posts(cache, fetchAll);

        const result = posts.root(subfolder);

        // Shown in menu
        const home = result.filter(p => p.frontmatter.navTitle === 'Home')[0];
        const about = result.filter(p => p.frontmatter.title === 'About')[0];
        const features = result.filter(p => p.frontmatter.title === 'Features')[0];
        const writing = result.filter(p => p.frontmatter.title === 'Writing')[0];
        const articles = result.filter(p => p.frontmatter.title === 'Articles')[0];
        const kitchenSink = result.filter(p => p.frontmatter.title === 'Kitchen sink')[0];
        const mainSite = result.filter(p => p.frontmatter.title === 'Main site')[0];

        // Not shown in menu
        const feed = result.filter(p => p.frontmatter.title === 'Redirect')[0];
        const search = result.filter(p => p.frontmatter.title === 'Search')[0];
        
        expect(result.length).toBe(9);

        expect(home.url).toBe('');
        expect(about.url).toBe('/about');
        expect(features.url).toBe('/features');
        expect(writing.url).toBe('/writing');
        expect(articles.url).toBe('/articles');
        expect(kitchenSink.url).toBe('/kitchen-sink');
        expect(mainSite.url).toBe('/redirect');
        expect(feed.url).toBe('/feed');
        expect(search.url).toBe('/search');
    });

    test('Top level pages for subfolder site (i.e. /blog)', () => {
        const subfolder = '/about';
        const posts = new Posts(cache, fetchAllSubfolderVersion);

        const result = posts.root(subfolder);

        // Shown in menu
        const about = result.filter(p => p.frontmatter.title === 'About')[0];
        const gettingStarted = result.filter(p => p.frontmatter.title === 'Getting Started')[0];
        const themes = result.filter(p => p.frontmatter.title === 'Themes')[0];
        const frontmatter = result.filter(p => p.frontmatter.title === 'Frontmatter')[0];
        const gitHubPages = result.filter(p => p.frontmatter.navTitle === 'GitHub Pages')[0];

        expect(result.length).toBe(5);

        expect(about.url).toBe('/about');
        expect(gettingStarted.url).toBe('/about/getting-started');
        expect(themes.url).toBe('/about/themes');
        expect(frontmatter.url).toBe('/about/frontmatter');
        expect(gitHubPages.url).toBe('/about/github-pages');
    });
});