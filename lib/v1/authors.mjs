import * as PostFiltering from '../postFiltering.mjs';

/**
 * @typedef { import("../../types/AuthorList").AuthorList } AuthorList
 * @typedef { import("../../types/Astro").MarkdownInstance } MarkdownInstance
 * @typedef { import("../../types/Frontmatter").Frontmatter } Frontmatter
 */

export class Authors {
    /**
     * Constructor
     * @param {Posts} posts
     */
    constructor(posts) {
        this.posts = posts;
    }

    /**
     * Gets a list of authors, and exposes main author and contributors
     * @param {Frontmatter} frontmatter 
     * @returns {AuthorList}
     */
    forPost (frontmatter) {
        const authors = this.posts.all()
            .filter(PostFiltering.isAuthor);

        /** @type {AuthorList} */
        const result = {
            image: null,
            writers: [],
            mainAuthor: null,
            contributors: []
        };

        (frontmatter.authors ?? []).forEach((a) => {
            const matches = authors.filter((x) => x.frontmatter.id == a);

            if (matches.length == 0) {
                console.warn("Unknown author", a);
            }

            if (matches.length > 1) {
                console.warn("Multiple authors with id", a);
            }

            if (matches.length == 1) {
                result.writers.push(matches[0]);
                if (result.image == null) {
                    result.image = matches[0].frontmatter.bannerImage;
                }
            }
        });

        result.mainAuthor = result.writers.slice(0, 1)[0];
        result.contributors = result.writers.slice(1);

        return result;
    }

    /**
     * Get a single author by id/slug
     * @param {string} slug 
     * @returns {MarkdownInstance}
     */
    info (slug) {
        const author = this.posts.all()
            .filter(PostFiltering.isAuthor)
            .filter(x => x.url?.split('/')[2] == slug)[0];

        return author;
    }
}