import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify';

/**
 * Converts markdown to HTML without wrapping in a <p>
 * @param {string} markdown 
 * @returns {Promise<string>}
 */
export async function getInlineHtmlFrom(markdown) {
    let html = await getHtmlFrom(markdown);

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
export async function getHtmlFrom(markdown) {
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
export async function getTextFrom(markdown) {
    const html = await getInlineHtmlFrom(markdown);
    return html.replace(/<.*?>/g, '');
}
