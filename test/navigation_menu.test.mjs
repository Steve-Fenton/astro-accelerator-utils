import { Cache } from '../lib/v1/cache.mjs';
import { Navigation } from '../lib/v1/navigation.mjs';
import { Posts } from '../lib/v1/posts.mjs';
import { UrlFormatter } from '../lib/v1/urls.mjs';

import { fetchAll } from './data/featchAllMock.mjs';
import { fetchAllSubfolderVersion } from './data/fetchAllSubfolderMock.mjs';

describe('Navigation.menu', () => {

    // Zero-length cache
    const cache = new Cache(0);
    const urlFormatter = new UrlFormatter('https://www.example.com/');

    test('Gets menu', () => {
        const posts = new Posts(cache, fetchAll);
        const navigation = new Navigation(posts, urlFormatter);
        const url = new URL('https://www.example.com/about/getting-started/');

        const result = navigation.menu(url, '', ['auto']);

        expect(result[0].title).toBe('Home');
        expect(result[0].isOpen).toBe(true);
        expect(result[0].ariaCurrent).toBe(false);

        // About should be expanded
        expect(result[1].title).toBe('About');
        expect(result[1].isOpen).toBe(true);
        expect(result[1].ariaCurrent).toBe(false);

        expect(result[1].children[0].title).toBe('Frontmatter');
        expect(result[1].children[0].ariaCurrent).toBe(false);

        // Getting Started should be aria-current
        expect(result[1].children[1].title).toBe('Getting Started');
        expect(result[1].children[1].ariaCurrent).toBe('page');

        expect(result[2].title).toBe('Features');
        expect(result[2].isOpen).toBe(false);
        expect(result[2].ariaCurrent).toBe(false);

        expect(result[3].title).toBe('Writing');
        expect(result[3].isOpen).toBe(false);
        expect(result[3].ariaCurrent).toBe(false);

        expect(result[4].title).toBe('Articles');
        expect(result[4].isOpen).toBe(false);
        expect(result[4].ariaCurrent).toBe(false);

        expect(result[5].title).toBe('Kitchen sink');
        expect(result[5].isOpen).toBe(false);
        expect(result[5].ariaCurrent).toBe(false);

        expect(result[6].title).toBe('Main site');
        expect(result[6].isOpen).toBe(false);
        expect(result[6].ariaCurrent).toBe(false);
    });

});