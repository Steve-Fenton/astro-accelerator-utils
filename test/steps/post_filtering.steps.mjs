import { PostFiltering } from '../../index.mjs';

export function steps(map) {

    map(/Given I have a list with an author and an article$/i, (context) => {
        const site = {};

        context.postList = [
            {
                frontmatter: {
                    title: 'Test Author',
                    layout: 'src/Layouts/Author.astro'
                }
            },{
                frontmatter: {
                    title: 'Test Article',
                    layout: 'src/Layouts/Default.astro'
                }
            }
        ]

        return context;
    });

    map(/Given I have a list with a search page and an article$/i, (context) => {
        const site = {};

        context.postList = [
            {
                frontmatter: {
                    title: 'Test Search',
                    layout: 'src/Layouts/Search.astro'
                }
            },{
                frontmatter: {
                    title: 'Test Article',
                    layout: 'src/Layouts/Default.astro'
                }
            }
        ]

        return context;
    });

    map(/Given I have a page with navSitemap set to false$/i, (context) => {
        context.postList = [{
            url: '/test',
            frontmatter: {
                title: 'Test Page',
                layout: 'src/Layouts/Default.astro',
                navSitemap: false
            }
        }];
        return context;
    });

    map(/Given I have a listable page with navSitemap set to true$/i, (context) => {
        context.postList = [{
            url: '/test',
            frontmatter: {
                title: 'Test Page',
                layout: 'src/Layouts/Default.astro',
                navSitemap: true
            }
        }];
        return context;
    });

    map(/Given I have a page with navSearch set to false$/i, (context) => {
        context.postList = [{
            url: '/test',
            frontmatter: {
                title: 'Test Page',
                layout: 'src/Layouts/Default.astro',
                navSearch: false
            }
        }];
        return context;
    });

    map(/Given I have a listable page with navSearch set to true$/i, (context) => {
        context.postList = [{
            url: '/test',
            frontmatter: {
                title: 'Test Page',
                layout: 'src/Layouts/Default.astro',
                navSearch: true
            }
        }];
        return context;
    });

    map(/Given I have a page with navMenu set to false$/i, (context) => {
        context.postList = [{
            frontmatter: {
                title: 'Test Page',
                navMenu: false
            }
        }];
        return context;
    });

    map(/Given I have a page with null url$/i, (context) => {
        context.postList = [{
            url: null,
            frontmatter: {
                title: 'Test Page',
                layout: 'src/Layouts/Default.astro'
            }
        }];
        return context;
    });

    map(/Given I have a page with empty url$/i, (context) => {
        context.postList = [{
            url: '',
            frontmatter: {
                title: 'Test Page',
                layout: 'src/Layouts/Default.astro'
            }
        }];
        return context;
    });

    map(/Given I have a page with null frontmatter$/i, (context) => {
        context.postList = [{
            url: '/test',
            frontmatter: null
        }];
        return context;
    });

    map(/Given I have a page with null layout$/i, (context) => {
        context.postList = [{
            url: '/test',
            frontmatter: {
                title: 'Test Page',
                layout: null
            }
        }];
        return context;
    });

    map(/Given I have a redirect page$/i, (context) => {
        context.postList = [{
            url: '/test',
            frontmatter: {
                title: 'Test Page',
                layout: 'src/Layouts/Redirect.astro'
            }
        }];
        return context;
    });

    map(/Given I have a page with listable set to false$/i, (context) => {
        context.postList = [{
            url: '/test',
            frontmatter: {
                title: 'Test Page',
                layout: 'src/Layouts/Default.astro',
                listable: false
            }
        }];
        return context;
    });

    map(/Given I have a draft page$/i, (context) => {
        context.postList = [{
            url: '/test',
            frontmatter: {
                title: 'Test Page',
                layout: 'src/Layouts/Default.astro',
                draft: true
            }
        }];
        return context;
    });

    map(/Given I have a future-dated page$/i, (context) => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 7); // 7 days in the future
        
        context.postList = [{
            url: '/future-test',
            frontmatter: {
                title: 'Future Test Page',
                layout: 'src/Layouts/Default.astro',
                pubDate: futureDate.toISOString()
            }
        }];
        return context;
    });

    map(/Given I have a page with modDate$/i, (context) => {
        context.postList = [{
            frontmatter: {
                title: 'Test Page',
                modDate: '2023-01-01'
            }
        }];
        return context;
    });

    map(/Given I have a page with pubDate$/i, (context) => {
        context.postList = [{
            frontmatter: {
                title: 'Test Page',
                pubDate: '2023-01-01'
            }
        }];
        return context;
    });

    map(/Given I have a page without dates$/i, (context) => {
        context.postList = [{
            frontmatter: {
                title: 'Test Page'
            }
        }];
        return context;
    });

    map(/Given I have a page without modDate$/i, (context) => {
        context.postList = [{
            frontmatter: {
                title: 'Test Page',
                pubDate: '2023-01-01' // Has pubDate but no modDate
            }
        }];
        return context;
    });

    // Filter application steps
    map(/When I apply an isAuthor filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.isAuthor);
        return context;
    });

    map(/When I apply an notAuthor filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.notAuthor);
        return context;
    });

    map(/When I apply an isSearch filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.isSearch);
        return context;
    });

    map(/When I apply an notSearch filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.notSearch);
        return context;
    });

    map(/When I apply a showInSitemap filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.showInSitemap);
        return context;
    });

    map(/When I apply a showInSearch filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.showInSearch);
        return context;
    });

    map(/When I apply a showInMenu filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.showInMenu);
        return context;
    });

    map(/When I apply an isListable filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.isListable);
        return context;
    });

    map(/When I apply an forTaxonomy filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.forTaxonomy);
        return context;
    });

    map(/When I apply a hasDate filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.hasDate);
        return context;
    });

    map(/When I apply a hasModDate filter$/i, (context) => {
        context.result = context.postList.filter(PostFiltering.hasModDate);
        return context;
    });

    // Assertion steps
    map(/Then the only item returned should be "(.*)"$/i, (context, title) => {
        expect(context.result.length).toBe(1);
        expect(context.result[0].frontmatter.title).toBe(title);
        return context;
    });

    map(/Then no items should be returned$/i, (context) => {
        expect(context.result.length).toBe(0);
        return context;
    });

    map(/Then the item should be returned$/i, (context) => {
        expect(context.result.length).toBe(1);
        return context;
    });
}