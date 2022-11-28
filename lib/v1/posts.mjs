export class Posts {
    /**
     * Constructor
     * @param {() => MarkdownInstance[]} fetchAll 
     */
    constructor(fetchAll) {
        this.fetchAll = fetchAll ?? function() { return import.meta.glob("/src/pages/**/*.md", { eager: true }); }
        this.allPosts = [];
    }

    all () {
        if (this.allPosts.length === 0) {
            const pageImportResult = this.fetchAll();
            this.allPosts = Object.values(pageImportResult);
        }

        return this.allPosts;
    }

    root (subfolder) {
        const isRoot = subfolder.length == 0;
        const expectedDepth = isRoot ? 1 : 2;

        return this.all().filter(p => {
            const depth = (p.url ?? '/').split('/').length - 1;
            return depth == expectedDepth
                || (depth == (expectedDepth - 1) && p.file.includes(subfolder.toLowerCase() + '.md'));
        })
    }
}