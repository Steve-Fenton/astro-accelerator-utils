import { PostOrdering } from '../../index.mjs';

export function steps(map) {

    // Helper function to create mock posts
    function createPost(pubDate, modDate, title) {
        return {
            frontmatter: {
                pubDate: pubDate,
                modDate: modDate,
                title: title
            }
        };
    }

    // Given steps for different test data scenarios
    map(/Given I have a list of posts with different publication dates$/i, (context) => {
        context.postList = [
            createPost('2023-03-15', null, 'March Post'),
            createPost('2023-01-10', null, 'January Post'),
            createPost('2023-05-20', null, 'May Post'),
            createPost('2023-02-28', null, 'February Post')
        ];
        return context;
    });

    map(/Given I have posts with and without publication dates$/i, (context) => {
        context.postList = [
            createPost('2023-06-15', null, 'Dated Post 1'),
            createPost(null, null, 'Undated Post 1'),
            createPost('2023-01-10', null, 'Dated Post 2'),
            createPost(undefined, null, 'Undated Post 2')
        ];
        return context;
    });

    map(/Given I have a list of posts with different modification dates$/i, (context) => {
        context.postList = [
            createPost('2023-01-01', '2023-03-15', 'March Modified'),
            createPost('2023-01-01', '2023-01-10', 'January Modified'),
            createPost('2023-01-01', '2023-05-20', 'May Modified'),
            createPost('2023-01-01', '2023-02-28', 'February Modified')
        ];
        return context;
    });

    map(/Given I have posts with modDate and posts with only pubDate$/i, (context) => {
        context.postList = [
            createPost('2023-01-01', '2023-06-15', 'Has ModDate'),
            createPost('2023-03-10', null, 'Only PubDate 1'),
            createPost('2023-02-05', undefined, 'Only PubDate 2'),
            createPost('2023-01-01', '2023-04-20', 'Has ModDate 2')
        ];
        return context;
    });

    map(/Given I have posts without modDate or pubDate$/i, (context) => {
        context.postList = [
            createPost(null, null, 'No Dates 1'),
            createPost(undefined, undefined, 'No Dates 2'),
            createPost('', '', 'Empty Dates'),
            createPost('2023-01-01', '2023-02-01', 'Has Dates')
        ];
        return context;
    });

    // When steps for applying sorting functions
    map(/When I apply sortByPubDate$/i, (context) => {
        context.sortedResult = [...context.postList].sort(PostOrdering.sortByPubDate);
        return context;
    });

    map(/When I apply sortByPubDateDesc$/i, (context) => {
        context.sortedResult = [...context.postList].sort(PostOrdering.sortByPubDateDesc);
        return context;
    });

    map(/When I apply sortByModDate$/i, (context) => {
        context.sortedResult = [...context.postList].sort(PostOrdering.sortByModDate);
        return context;
    });

    map(/When I apply sortByModDateDesc$/i, (context) => {
        context.sortedResult = [...context.postList].sort(PostOrdering.sortByModDateDesc);
        return context;
    });

    // Then steps for verifying sort order
    map(/Then the posts should be ordered from oldest to newest by publication date$/i, (context) => {
        const dates = context.sortedResult.map(post => post.frontmatter.pubDate || '1970-01-01');
        const expectedOrder = [
            '2023-01-10',
            '2023-02-28',
            '2023-03-15',
            '2023-05-20'
        ];
        expect(dates).toEqual(expectedOrder);
        return context;
    });

    map(/Then posts without pubDate should be treated as 1970-01-01$/i, (context) => {
        const postsWithoutPubDate = context.sortedResult.filter(post => !post.frontmatter.pubDate);
        
        // In ascending order, posts without dates should appear first
        const firstTwoPosts = context.sortedResult.slice(0, postsWithoutPubDate.length);
        expect(firstTwoPosts.every(post => !post.frontmatter.pubDate || post.frontmatter.pubDate === '')).toBe(true);
        return context;
    });

    map(/Then the posts should be ordered from newest to oldest by publication date$/i, (context) => {
        const dates = context.sortedResult.map(post => post.frontmatter.pubDate || '1970-01-01');
        const expectedOrder = [
            '2023-05-20',
            '2023-03-15',
            '2023-02-28',
            '2023-01-10'];
        expect(dates).toEqual(expectedOrder);
        return context;
    });

    map(/Then posts without pubDate should be treated as 1970-01-01 and sorted last$/i, (context) => {
        const postsWithoutPubDate = context.sortedResult.filter(post => !post.frontmatter.pubDate || post.frontmatter.pubDate === '');
        
        // In descending order, posts with 1970-01-01 should be at the end
        const lastPosts = context.sortedResult.slice(-postsWithoutPubDate.length);
        expect(lastPosts.every(post => !post.frontmatter.pubDate || post.frontmatter.pubDate === '')).toBe(true);
        return context;
    });

    map(/Then the posts should be ordered from oldest to newest by modification date$/i, (context) => {
        const dates = context.sortedResult.map(post => post.frontmatter.modDate || post.frontmatter.pubDate || '1970-01-01');
        const expectedOrder = [
            '2023-01-10',
            '2023-02-28',
            '2023-03-15',
            '2023-05-20'
        ];
        expect(dates).toEqual(expectedOrder);
        return context;
    });


    map(/Then posts without dates should be treated as 1970-01-01$/i, (context) => {
        const postsWithoutDates = context.sortedResult.filter(post => 
            !post.frontmatter.modDate && !post.frontmatter.pubDate
        );
        
        // These should be sorted first (oldest) in ascending order
        if (postsWithoutDates.length > 0) {
            const firstPosts = context.sortedResult.slice(0, postsWithoutDates.length);
            expect(firstPosts).toEqual(expect.arrayContaining(postsWithoutDates));
        }
        return context;
    });

    map(/Then the posts should be ordered from newest to oldest by modification date$/i, (context) => {
        const dates = context.sortedResult.map(post => post.frontmatter.modDate || post.frontmatter.pubDate || '1970-01-01');
        const expectedOrder = [
            '2023-05-20',
            '2023-03-15',
            '2023-02-28',
            '2023-01-10'
        ];
        expect(dates).toEqual(expectedOrder);
        return context;
    });

    map(/Then posts without dates should be treated as 1970-01-01 and sorted last$/i, (context) => {
        const postsWithoutDates = context.sortedResult.filter(post => 
            !post.frontmatter.modDate && !post.frontmatter.pubDate
        );
        
        // In descending order, posts with 1970-01-01 should be at the end
        if (postsWithoutDates.length > 0) {
            const lastPosts = context.sortedResult.slice(-postsWithoutDates.length);
            expect(lastPosts).toEqual(expect.arrayContaining(postsWithoutDates));
        }
        return context;
    });
}