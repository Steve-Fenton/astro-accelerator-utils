import { Cache } from '../lib/v1/cache.mjs';
import { Navigation } from '../lib/v1/navigation.mjs';
import { Posts } from '../lib/v1/posts.mjs';
import { UrlFormatter } from '../lib/v1/urls.mjs';

import { fetchAll } from './data/fetchAllMock.mjs';

describe('Navigation.menu', () => {

    // Zero-length cache
    const cache = new Cache(0);
    const urlFormatter = new UrlFormatter('https://www.example.com/');

    test('Gets menu', () => {
        const posts = new Posts(cache, fetchAll);
        const navigation = new Navigation(posts, urlFormatter);
        const url = new URL('https://www.example.com/about/getting-started/');

        const result = navigation.menu(url, '', ['auto']);

        expect(result[0].fullTitle).toBe('Welcome to Astro *Accelerator*');
        expect(result[0].title).toBe('Home');
        expect(result[0].isOpen).toBe(true);
        expect(result[0].ariaCurrent).toBe(false);

        // About should be expanded
        expect(result[1].fullTitle).toBe('About');
        expect(result[1].title).toBe('About');
        expect(result[1].isOpen).toBe(true);
        expect(result[1].ariaCurrent).toBe(false);

        expect(result[1].children[0].title).toBe('Frontmatter');
        expect(result[1].children[0].ariaCurrent).toBe(false);

        // Getting Started should be aria-current
        expect(result[1].children[1].title).toBe('Getting Started');
        expect(result[1].children[1].ariaCurrent).toBe('page');

        expect(result[2].fullTitle).toBe('Features');
        expect(result[2].title).toBe('Features');
        expect(result[2].isOpen).toBe(false);
        expect(result[2].ariaCurrent).toBe(false);

        expect(result[3].fullTitle).toBe('Writing');
        expect(result[3].title).toBe('Writing');
        expect(result[3].isOpen).toBe(false);
        expect(result[3].ariaCurrent).toBe(false);

        expect(result[4].fullTitle).toBe('Articles');
        expect(result[4].title).toBe('Articles');
        expect(result[4].isOpen).toBe(false);
        expect(result[4].ariaCurrent).toBe(false);

        expect(result[5].fullTitle).toBe('Kitchen sink');
        expect(result[5].title).toBe('Kitchen sink');
        expect(result[5].isOpen).toBe(false);
        expect(result[5].ariaCurrent).toBe(false);

        expect(result[6].fullTitle).toBe('Main site');
        expect(result[6].title).toBe('Main site');
        expect(result[6].isOpen).toBe(false);
        expect(result[6].ariaCurrent).toBe(false);
    });

    test('Gets custom menu', () => {
        const posts = new Posts(cache, fetchAll);
        const navigation = new Navigation(posts, urlFormatter);
        const url = new URL('https://www.example.com/section/');

        const result = navigation.menu(url, '', [ {
            title: 'Section',
            url: '/section/',
            ariaCurrent: false,
            isOpen: false,
            order: 1,
            section: 'Section',
            children: [
              {
                title: 'Blog',
                url: '/section/blog/',
                ariaCurrent: false,
                isOpen: false,
                order: 1,
                section: '',
                children: []
               },
               {
                title: 'Publications',
                url: '/section/publications/',
                ariaCurrent: false,
                isOpen: false,
                order: 2,
                section: '',
                children: []
               },
               {
                title: 'About',
                url: '/section/about/',
                ariaCurrent: false,
                isOpen: false,
                order: 3,
                section: '',
                children: []
               },
            ]
           }]);

        expect(result[0].title).toBe('Section');
        expect(result[0].isOpen).toBe(true);
        expect(result[0].ariaCurrent).toBe('page');

        // Child items
        expect(result[0].children[0].title).toBe('Blog');
        expect(result[0].children[0].url).toBe('/section/blog/');
        expect(result[0].children[0].isOpen).toBe(false);
        expect(result[0].children[0].ariaCurrent).toBe(false);

        expect(result[0].children[1].title).toBe('Publications');
        expect(result[0].children[1].url).toBe('/section/publications/');
        expect(result[0].children[1].isOpen).toBe(false);
        expect(result[0].children[1].ariaCurrent).toBe(false);

        expect(result[0].children[2].title).toBe('About');
        expect(result[0].children[2].url).toBe('/section/about/');
        expect(result[0].children[2].isOpen).toBe(false);
        expect(result[0].children[2].ariaCurrent).toBe(false);
    });

    test('Gets custom menu with auto children', () => {
        const posts = new Posts(cache, fetchAll);
        const navigation = new Navigation(posts, urlFormatter);
        const url = new URL('https://www.example.com/');

        const result = navigation.menu(url, '', [{
            title: 'Home',
            url: '/',
            ariaCurrent: false,
            isOpen: false,
            order: 1,
            section: 'Section',
            children: []
           },{
            title: 'All',
            url: '/all/',
            ariaCurrent: false,
            isOpen: false,
            order: 1,
            section: 'All',
            children: [
            /*   'auto'*/
            ]
           }]);

        expect(result[0].title).toBe('Home');
        expect(result[0].isOpen).toBe(true);
        expect(result[0].ariaCurrent).toBe('page');

        expect(result[1].title).toBe('All');
        expect(result[1].isOpen).toBe(false);
        expect(result[1].ariaCurrent).toBe(false);

    });

});