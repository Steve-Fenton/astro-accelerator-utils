import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify';

export class Markdown {
    /**
     * Converts markdown to HTML without wrapping in a <p>
     * @param {string} markdown 
     * @returns {Promise<string>}
     */
    async getInlineHtmlFrom(markdown) {
        let html = await this.getHtmlFrom(markdown);

        // There may be a better way to unwrap this... maybe a visitor
        if (html.substring(0, 3) == '<p>' && html.substring(html.length - 4) == '</p>') {
            html = html.substring(3, html.length - 4);
        }

        return html;
    }

    /**
     * Converts markdown to HTML
     * @param {string} markdown 
     * @returns {Promise<string>}
     */
    async getHtmlFrom(markdown) {
        const vfile = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(markdown)

        return String(vfile);
    }

    /**
     * Converts markdown to plain text
     * @param {string} markdown 
     * @returns {Promise<string>}
     */
    async getTextFrom(markdown) {
        const html = await this.getInlineHtmlFrom(markdown);
        return html.replace(/<.*?>/g, '');
    }
}