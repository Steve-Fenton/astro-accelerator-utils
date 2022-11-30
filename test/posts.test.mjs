import { Cache } from '../lib/v1/cache.mjs';
import { Posts } from '../lib/v1/posts.mjs';

describe('Posts.All', () => {

    // Zero-length cache
    const cache = new Cache(0);

    test('Gets all posts', () => {
        const posts = new Posts(cache, fetchAll);

        const result = posts.all();
        const homePage = result.filter(p => p.frontmatter.navTitle === 'Home')[0];
        
        expect(result.length).toBe(40);
        expect(homePage.file).toBe('C:/Users/steve/repos/astro-accelerator/src/pages/index.md')
    });

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

    function fetchAll() {
        return [
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "About",
                    "navSection": "About",
                    "navOrder": 1000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "about,astro,accelerator",
                    "description": "Astro accelerator is an opinionated Astro site with features to jump start your use.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/about.md",
                "url": "/about"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Frontmatter",
                    "navOrder": 3000,
                    "pubDate": "2022-10-24T00:00:00.000Z",
                    "keywords": "astro accelerator,front matter,frontmatter",
                    "description": "An overview of frontmatter in Astro Accelerator."
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/about/frontmatter.md",
                "url": "/about/frontmatter"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Getting Started",
                    "navOrder": 1000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "astro accelerator,getting started",
                    "description": "There are just a couple of tasks to turn the Astro Accelerator into your own working website.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/about/getting-started.md",
                "url": "/about/getting-started"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Host Astro on GitHub Pages",
                    "navTitle": "GitHub Pages",
                    "navOrder": 10000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "astro accelerator,github pages,github action",
                    "description": "How to get the most from Astro Accelerator and GitHub Pages.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/about/github-pages.md",
                "url": "/about/github-pages"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Themes",
                    "navOrder": 2000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "astro accelerator,github pages,github action",
                    "description": "How to apply a theme in Astro Accelerator",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/about/themes.md",
                "url": "/about/themes"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Redirect.astro",
                    "title": "Articles",
                    "paged": true,
                    "navOrder": 100000,
                    "navSearch": false,
                    "navSitemap": false,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "redirect": "/articles/1/"
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles.md",
                "url": "/articles"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 1",
                    "navMenu": false,
                    "pubDate": "2022-09-01T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-1.md",
                "url": "/articles/2022/09/sample-post-1"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 10",
                    "navMenu": false,
                    "pubDate": "2022-09-10T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-10.md",
                "url": "/articles/2022/09/sample-post-10"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 11",
                    "navMenu": false,
                    "pubDate": "2022-09-11T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-11.md",
                "url": "/articles/2022/09/sample-post-11"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 12",
                    "navMenu": false,
                    "pubDate": "2022-09-12T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-12.md",
                "url": "/articles/2022/09/sample-post-12"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 13",
                    "navMenu": false,
                    "pubDate": "2022-09-13T00:00:00.000Z",
                    "modDate": "2022-10-05T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-13.md",
                "url": "/articles/2022/09/sample-post-13"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 14",
                    "navMenu": false,
                    "pubDate": "2022-09-14T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Test Category"
                    ],
                    "tags": [
                        "Test Tag"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-14.md",
                "url": "/articles/2022/09/sample-post-14"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 2",
                    "navMenu": false,
                    "pubDate": "2022-09-02T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-2.md",
                "url": "/articles/2022/09/sample-post-2"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 3",
                    "navMenu": false,
                    "pubDate": "2022-09-03T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ],
                    "tags": [
                        "Technology"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-3.md",
                "url": "/articles/2022/09/sample-post-3"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 4",
                    "navMenu": false,
                    "pubDate": "2022-09-04T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-4.md",
                "url": "/articles/2022/09/sample-post-4"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 5",
                    "navMenu": false,
                    "pubDate": "2022-09-05T00:00:00.000Z",
                    "modDate": "2022-10-18T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/load-balancing-with-arr.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ],
                    "tags": [
                        "Test",
                        "Other",
                        "Technology"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-5.md",
                "url": "/articles/2022/09/sample-post-5"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 6",
                    "navMenu": false,
                    "pubDate": "2022-09-06T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-6.md",
                "url": "/articles/2022/09/sample-post-6"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 7",
                    "navMenu": false,
                    "pubDate": "2022-09-07T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-7.md",
                "url": "/articles/2022/09/sample-post-7"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 8",
                    "navMenu": false,
                    "pubDate": "2022-09-08T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-8.md",
                "url": "/articles/2022/09/sample-post-8"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post 9",
                    "navMenu": false,
                    "pubDate": "2022-09-09T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-9.md",
                "url": "/articles/2022/09/sample-post-9"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Sample Post n (Future Dated)",
                    "navMenu": false,
                    "pubDate": "2525-12-31T00:00:00.000Z",
                    "keywords": "sample,post",
                    "description": "A sample post",
                    "bannerImage": {
                        "src": "/img/load-balancing-with-arr.png",
                        "alt": "Dummy image"
                    },
                    "authors": [
                        "steve-fenton"
                    ],
                    "categories": [
                        "Example",
                        "Sample"
                    ],
                    "tags": [
                        "Test",
                        "Other",
                        "Technology",
                        "Not Published Tag"
                    ]
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/articles/2022/09/sample-post-n.md",
                "url": "/articles/2022/09/sample-post-n"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Author.astro",
                    "id": "steve-fenton",
                    "title": "Steve Fenton",
                    "navOrder": 1000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "steve fenton",
                    "description": "Steve Fenton's profile on Astro Accelerator",
                    "bannerImage": {
                        "src": "/i/400/authors/steve-fenton.webp",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/authors/steve-fenton.md",
                "url": "/authors/steve-fenton"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Features",
                    "navOrder": 2000,
                    "pubDate": "2022-09-23T00:00:00.000Z",
                    "keywords": "features,astro,accelerator",
                    "description": "An overview of features in Astro Accelerator.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features.md",
                "url": "/features"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Accessibility",
                    "navOrder": 6000,
                    "pubDate": "2022-09-23T00:00:00.000Z",
                    "keywords": "astro accelerator,accessibility",
                    "description": "Astro Accelerator accessibility features.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/accessibility.md",
                "url": "/features/accessibility"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Feeds",
                    "navOrder": 5000,
                    "pubDate": "2022-09-23T00:00:00.000Z",
                    "keywords": "astro accelerator,feeds,sitemap,atom,rss",
                    "description": "How feeds work in Astro Accelerator.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/feeds.md",
                "url": "/features/feeds"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Flags",
                    "navOrder": 500,
                    "pubDate": "2022-10-31T00:00:00.000Z",
                    "keywords": "astro accelerator,feature flags",
                    "description": "How to use the Astro Accelerator feature flags to control site enhancements like code blocks, images, and video"
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/flags.md",
                "url": "/features/flags"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Header",
                    "navOrder": 2000,
                    "pubDate": "2022-09-23T00:00:00.000Z",
                    "keywords": "astro accelerator,header,skiplinks,mobile navigation,breadcrumbs",
                    "description": "How header features work in Astro Accelerator.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/header.md",
                "url": "/features/header"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Images",
                    "navOrder": 1500,
                    "pubDate": "2022-09-28T00:00:00.000Z",
                    "keywords": "astro accelerator,image,automation,conversion,resizing,responsive",
                    "description": "How image automation helps with conversion, resizing, and responsive images.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/image-automation.md",
                "url": "/features/image-automation"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "I18n",
                    "navOrder": 5000,
                    "pubDate": "2022-09-23T00:00:00.000Z",
                    "keywords": "astro accelerator,i18n,internationalization,languages,translations",
                    "description": "How languages work in Astro Accelerator.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/internationalization.md",
                "url": "/features/internationalization"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Markdown",
                    "navOrder": 1000,
                    "pubDate": "2022-09-23T00:00:00.000Z",
                    "keywords": "astro accelerator,markdown,custom markdown",
                    "description": "How markdown extensions work in Astro Accelerator.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/markdown.md",
                "url": "/features/markdown"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Navigation",
                    "navOrder": 3000,
                    "pubDate": "2022-09-23T00:00:00.000Z",
                    "modDate": "2022-11-04T00:00:00.000Z",
                    "keywords": "astro accelerator,navigation,menu",
                    "description": "How the navigation menu works in Astro Accelerator.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/navigation.md",
                "url": "/features/navigation"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Posts",
                    "navOrder": 4000,
                    "pubDate": "2022-09-23T00:00:00.000Z",
                    "keywords": "astro accelerator,articles,posts,list",
                    "description": "How articles and authors work in Astro Accelerator.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/posts.md",
                "url": "/features/posts"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Search",
                    "navOrder": 5000,
                    "pubDate": "2022-09-23T00:00:00.000Z",
                    "keywords": "astro accelerator,search,site search",
                    "description": "How the serverless search feature works in Astro Accelerator."
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/search.md",
                "url": "/features/search"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "SEO",
                    "navOrder": 6000,
                    "pubDate": "2022-09-23T00:00:00.000Z",
                    "keywords": "astro accelerator,seo",
                    "description": "Astro Accelerator SEO features.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/features/seo.md",
                "url": "/features/seo"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Redirect.astro",
                    "title": "Redirect",
                    "navMenu": false,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "redirect": "/articles/feed.xml"
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/feed.md",
                "url": "/feed"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Welcome to Astro *Accelerator*",
                    "subtitle": "A *super-lightweight*, accessible, SEO-friendly starter project for Astro",
                    "navTitle": "Home",
                    "navOrder": 0,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "astro,accelerator,site generator",
                    "description": "An accelerator for a very clean version of Astro.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/index.md",
                "url": ""
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Kitchen sink",
                    "navOrder": 200000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "astro,accelerator,site generator",
                    "description": "An accelerator for a very clean version of Astro.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/kitchen-sink.md",
                "url": "/kitchen-sink"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Redirect.astro",
                    "title": "Main site",
                    "redirect": "https://www.stevefenton.co.uk/",
                    "pubDate": "2022-10-16T00:00:00.000Z",
                    "navOrder": 300000
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/redirect.md",
                "url": "/redirect"
            },
            {
                "frontmatter": {
                    "warning": "This file is overwritten by Astro Accelerator",
                    "layout": "src/layouts/Search.astro",
                    "title": "Search",
                    "navSearch": false,
                    "navSitemap": false,
                    "navMenu": false,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "about,astro,accelerator",
                    "description": "Astro Accelerator is an opinionated Astro site.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/search.md",
                "url": "/search"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Writing",
                    "navOrder": 5000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "astro,accelerator,writing",
                    "description": "How to write in Astro.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/writing.md",
                "url": "/writing"
            }
        ];
    }

    function fetchAllSubfolderVersion() {
        return [
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "About",
                    "navSection": "About",
                    "navOrder": 1000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "about,astro,accelerator",
                    "description": "Astro accelerator is an opinionated Astro site with features to jump start your use.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/about.md",
                "url": "/about"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Frontmatter",
                    "navOrder": 3000,
                    "pubDate": "2022-10-24T00:00:00.000Z",
                    "keywords": "astro accelerator,front matter,frontmatter",
                    "description": "An overview of frontmatter in Astro Accelerator."
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/about/frontmatter.md",
                "url": "/about/frontmatter"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Getting Started",
                    "navOrder": 1000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "astro accelerator,getting started",
                    "description": "There are just a couple of tasks to turn the Astro Accelerator into your own working website.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/about/getting-started.md",
                "url": "/about/getting-started"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Host Astro on GitHub Pages",
                    "navTitle": "GitHub Pages",
                    "navOrder": 10000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "astro accelerator,github pages,github action",
                    "description": "How to get the most from Astro Accelerator and GitHub Pages.",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/about/github-pages.md",
                "url": "/about/github-pages"
            },
            {
                "frontmatter": {
                    "layout": "src/layouts/Default.astro",
                    "title": "Themes",
                    "navOrder": 2000,
                    "pubDate": "2022-09-17T00:00:00.000Z",
                    "keywords": "astro accelerator,github pages,github action",
                    "description": "How to apply a theme in Astro Accelerator",
                    "bannerImage": {
                        "src": "/img/surface-accessories.png",
                        "alt": "Dummy image"
                    }
                },
                "file": "C:/Users/steve/repos/astro-accelerator/src/pages/about/themes.md",
                "url": "/about/themes"
            },
        ];
    }
});