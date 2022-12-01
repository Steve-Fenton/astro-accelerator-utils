import { Cache } from '../lib/v1/cache.mjs';
import { Navigation } from '../lib/v1/navigation.mjs';
import { Posts } from '../lib/v1/posts.mjs';
import { UrlFormatter } from '../lib/v1/urls.mjs';

import { fetchAll } from './data/featchAllMock.mjs';
import { fetchAllSubfolderVersion } from './data/fetchAllSubfolderMock.mjs';

describe('Navigation.breadcrumbs', () => {

    // Zero-length cache
    const cache = new Cache(0);
    const urlFormatter = new UrlFormatter('https://www.example.com/');

    test('Gets breadcrumbs (2 levels)', () => {
        const posts = new Posts(cache, fetchAll);
        const navigation = new Navigation(posts, urlFormatter);
        const url = new URL('https://www.example.com/about/');

        const result = navigation.breadcrumbs(url, '');
        
        expect(result.length).toBe(2);
        
        expect(result[0].section).toBe('Home');
        expect(result[0].title).toBe('Home');
        expect(result[0].ariaCurrent).toBe(false);

        expect(result[1].section).toBe('About');
        expect(result[1].title).toBe('About');
        expect(result[1].ariaCurrent).toBe('page');
    });

    test('Gets breadcrumbs (3 levels)', () => {
        const posts = new Posts(cache, fetchAll);
        const navigation = new Navigation(posts, urlFormatter);
        const url = new URL('https://www.example.com/about/getting-started/');

        const result = navigation.breadcrumbs(url, '');
        
        expect(result.length).toBe(3);
        
        expect(result[0].section).toBe('Home');
        expect(result[0].title).toBe('Home');
        expect(result[0].ariaCurrent).toBe(false);

        expect(result[1].section).toBe('About');
        expect(result[1].title).toBe('About');
        expect(result[1].ariaCurrent).toBe(false);

        expect(result[2].section).toBe('Getting Started');
        expect(result[2].title).toBe('Getting Started');
        expect(result[2].ariaCurrent).toBe('page');
    });

    test('Gets breadcrumbs (subfoldered site)', () => {
        const posts = new Posts(cache, fetchAllSubfolderVersion);
        const navigation = new Navigation(posts, urlFormatter);
        const url = new URL('https://www.example.com/about/getting-started/');

        const result = navigation.breadcrumbs(url, 'about/');
        
        expect(result.length).toBe(2);
        
        expect(result[0].section).toBe('About');
        expect(result[0].title).toBe('About');
        expect(result[0].ariaCurrent).toBe(false);

        expect(result[1].section).toBe('Getting Started');
        expect(result[1].title).toBe('Getting Started');
        expect(result[1].ariaCurrent).toBe('page');
    });
});