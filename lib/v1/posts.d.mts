export class Posts {
    /**
     * Constructor
     * @param {() => MarkdownInstance[]} fetchAll
     */
    constructor(fetchAll: () => MarkdownInstance[]);
    fetchAll: () => any;
    allPosts: any[];
    all(): any[];
    root(subfolder: any): any[];
}
