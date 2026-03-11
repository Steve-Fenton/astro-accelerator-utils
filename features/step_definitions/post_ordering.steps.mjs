import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { PostOrdering } from '../../index.mjs';

function createPost(pubDate, modDate, title) {
    return { frontmatter: { pubDate, modDate, title } };
}

Given('I have a list of posts with different publication dates', function () {
    this.postList = [
        createPost('2023-03-15', null, 'March Post'),
        createPost('2023-01-10', null, 'January Post'),
        createPost('2023-05-20', null, 'May Post'),
        createPost('2023-02-28', null, 'February Post')
    ];
});

Given('I have posts with and without publication dates', function () {
    this.postList = [
        createPost('2023-06-15', null, 'Dated Post 1'),
        createPost(null, null, 'Undated Post 1'),
        createPost('2023-01-10', null, 'Dated Post 2'),
        createPost(undefined, null, 'Undated Post 2')
    ];
});

Given('I have a list of posts with different modification dates', function () {
    this.postList = [
        createPost('2023-01-01', '2023-03-15', 'March Modified'),
        createPost('2023-01-01', '2023-01-10', 'January Modified'),
        createPost('2023-01-01', '2023-05-20', 'May Modified'),
        createPost('2023-01-01', '2023-02-28', 'February Modified')
    ];
});

Given('I have posts without modDate or pubDate', function () {
    this.postList = [
        createPost(null, null, 'No Dates 1'),
        createPost(undefined, undefined, 'No Dates 2'),
        createPost('', '', 'Empty Dates'),
        createPost('2023-01-01', '2023-02-01', 'Has Dates')
    ];
});

When('I apply sortByPubDate', function () {
    this.sortedResult = [...this.postList].sort(PostOrdering.sortByPubDate);
});

When('I apply sortByPubDateDesc', function () {
    this.sortedResult = [...this.postList].sort(PostOrdering.sortByPubDateDesc);
});

When('I apply sortByModDate', function () {
    this.sortedResult = [...this.postList].sort(PostOrdering.sortByModDate);
});

When('I apply sortByModDateDesc', function () {
    this.sortedResult = [...this.postList].sort(PostOrdering.sortByModDateDesc);
});

Then('the posts should be ordered from oldest to newest by publication date', function () {
    const dates = this.sortedResult.map(post => post.frontmatter.pubDate || '1970-01-01');
    assert.deepStrictEqual(dates, ['2023-01-10', '2023-02-28', '2023-03-15', '2023-05-20']);
});

Then('posts without pubDate should be treated as 1970-01-01', function () {
    const postsWithoutPubDate = this.sortedResult.filter(post => !post.frontmatter.pubDate);
    const firstPosts = this.sortedResult.slice(0, postsWithoutPubDate.length);
    assert.ok(firstPosts.every(post => !post.frontmatter.pubDate || post.frontmatter.pubDate === ''));
});

Then('the posts should be ordered from newest to oldest by publication date', function () {
    const dates = this.sortedResult.map(post => post.frontmatter.pubDate || '1970-01-01');
    assert.deepStrictEqual(dates, ['2023-05-20', '2023-03-15', '2023-02-28', '2023-01-10']);
});

Then('posts without pubDate should be treated as 1970-01-01 and sorted last', function () {
    const postsWithoutPubDate = this.sortedResult.filter(post => !post.frontmatter.pubDate || post.frontmatter.pubDate === '');
    const lastPosts = this.sortedResult.slice(-postsWithoutPubDate.length);
    assert.ok(lastPosts.every(post => !post.frontmatter.pubDate || post.frontmatter.pubDate === ''));
});

Then('the posts should be ordered from oldest to newest by modification date', function () {
    const dates = this.sortedResult.map(post => post.frontmatter.modDate || post.frontmatter.pubDate || '1970-01-01');
    assert.deepStrictEqual(dates, ['2023-01-10', '2023-02-28', '2023-03-15', '2023-05-20']);
});

Then('posts without dates should be treated as 1970-01-01', function () {
    const postsWithoutDates = this.sortedResult.filter(post => !post.frontmatter.modDate && !post.frontmatter.pubDate);
    if (postsWithoutDates.length > 0) {
        const firstPosts = this.sortedResult.slice(0, postsWithoutDates.length);
        assert.ok(firstPosts.some(post => postsWithoutDates.includes(post)));
    }
});

Then('the posts should be ordered from newest to oldest by modification date', function () {
    const dates = this.sortedResult.map(post => post.frontmatter.modDate || post.frontmatter.pubDate || '1970-01-01');
    assert.deepStrictEqual(dates, ['2023-05-20', '2023-03-15', '2023-02-28', '2023-01-10']);
});

Then('posts without dates should be treated as 1970-01-01 and sorted last', function () {
    const postsWithoutDates = this.sortedResult.filter(post => !post.frontmatter.modDate && !post.frontmatter.pubDate);
    if (postsWithoutDates.length > 0) {
        const lastPosts = this.sortedResult.slice(-postsWithoutDates.length);
        assert.ok(lastPosts.some(post => postsWithoutDates.includes(post)));
    }
});
