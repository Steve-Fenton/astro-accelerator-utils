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
   
    map(/Then the only item returned should be "(.*)"$/i, (context, title) => {
        expect(context.result.length).toBe(1);
        expect(context.result[0].frontmatter.title).toBe(title);
        return context;
    });
}