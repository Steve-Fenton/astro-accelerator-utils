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
        if (markdown == null) {
            return '';
        }

        return markdown.replace(/[\\*>~]/g, '').trim();
    }

    isLetter(char) {
        return char.match(/[a-zA-Z]/)
    }

    hasUpperCase(input) {
        for (var c of input) {
            if (this.isLetter(c) && c.toUpperCase() === c) {
                return true;
            }
        }
        return false;
    }
    
    titleCase(input) {
        if (input == null) {
            return '';
        }
        
        var words = input.split(' ');
        var newWords = [];

        for (var word of words) {
            if (this.hasUpperCase(word)) {
                newWords.push(word);
                continue;
            }
            
            newWords.push(word.replace(word[0], word[0].toUpperCase()));
        }
        
        return newWords.join(' ');
    }
}