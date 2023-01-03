import { Cache } from '../lib/v1/cache.mjs';
import { Navigation } from '../lib/v1/navigation.mjs';
import { Posts } from '../lib/v1/posts.mjs';
import { Taxonomy } from '../lib/v1/taxonomy.mjs';
import { UrlFormatter } from '../lib/v1/urls.mjs';

import { fetchAll } from './data/fetchAllMock.mjs';

describe('Navigation.footer', () => {

    // Zero-length cache
    const cache = new Cache(0);
    const posts = new Posts(cache, fetchAll);
    const urlFormatter = new UrlFormatter('https://www.example.com/');
    const taxonomy = new Taxonomy(cache, posts, urlFormatter);

    const translations = {
        articles: {
            tag: { en: 'tag' },
            tag_title: { en: 'Tag Title' },
            category: { en: 'category' },
            category_title: { en: 'Category Title' },
        }
    }

    test('Gets menu', () => {
        const posts = new Posts(cache, fetchAll);
        const navigation = new Navigation(posts, urlFormatter, taxonomy);
        const url = new URL('https://www.example.com/about/getting-started/');
        const lang = (entry) => entry.en;

        const result = navigation.footer(url, lang, translations, '', ['categories', 'tags', 'toptags'])
        
        expect(result).toMatchObject([{
            title: "Category Title",
            url: "/category/",
            ariaCurrent: false,
            isOpen: false,
            order: 1,
            children: [{
              title: "Example",
              url: "/category/example/1/",
              ariaCurrent: false,
              isOpen: false,
              order: 1,
              children: []
            }, {
              title: "Sample",
              url: "/category/sample/1/",
              ariaCurrent: false,
              isOpen: false,
              order: 2,
              children: []
            }, {
              title: "Test Category",
              url: "/category/test-category/1/",
              ariaCurrent: false,
              isOpen: false,
              order: 3,
              children: []
            }]
          }, {
            title: "Tag Title",
            url: "/tag/",
            ariaCurrent: false,
            isOpen: false,
            order: 1,
            children: [{
              title: "Other",
              url: "/tag/other/1/",
              ariaCurrent: false,
              isOpen: false,
              order: 1,
              children: []
            }, {
              title: "Technology",
              url: "/tag/technology/1/",
              ariaCurrent: false,
              isOpen: false,
              order: 2,
              children: []
            }, {
              title: "Test",
              url: "/tag/test/1/",
              ariaCurrent: false,
              isOpen: false,
              order: 3,
              children: []
            }, {
              title: "Test Tag",
              url: "/tag/test-tag/1/",
              ariaCurrent: false,
              isOpen: false,
              order: 4,
              children: []
            }]
          }, {
            title: "Tag Title",
            url: "/tag/",
            ariaCurrent: false,
            isOpen: false,
            order: 1,
            children: [{
              title: "Other",
              url: "/tag/other/1/",
              ariaCurrent: false,
              isOpen: false,
              order: 1,
              children: []
            }, {
              title: "Technology",
              url: "/tag/technology/1/",
              ariaCurrent: false,
              isOpen: false,
              order: 2,
              children: []
            }, {
              title: "Test",
              url: "/tag/test/1/",
              ariaCurrent: false,
              isOpen: false,
              order: 3,
              children: []
            }]
          }]);
    });

});