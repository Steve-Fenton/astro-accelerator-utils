export class Markdown {
    /**
     * Converts markdown to HTML without wrapping in a <p>
     * @param {string} markdown
     * @returns {Promise<string>}
     */
    getInlineHtmlFrom(markdown: string): Promise<string>;
    /**
     * Converts markdown to HTML
     * @param {string} markdown
     * @returns {Promise<string>}
     */
    getHtmlFrom(markdown: string): Promise<string>;
    /**
     * Converts markdown to plain text
     * @param {string} markdown
     * @returns {Promise<string>}
     */
    getTextFrom(markdown: string): Promise<string>;
    isLetter(char: any): any;
    hasUpperCase(input: any): boolean;
    titleCase(input: any): string;
}
