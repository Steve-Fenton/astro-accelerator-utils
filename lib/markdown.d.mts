/**
 * Converts markdown to HTML without wrapping in a <p>
 * @param {string} markdown
 * @returns {Promise<string>}
 */
export function getInlineHtmlFrom(markdown: string): Promise<string>;
/**
 * Converts markdown to HTML
 * @param {string} markdown
 * @returns {Promise<string>}
 */
export function getHtmlFrom(markdown: string): Promise<string>;
/**
 * Converts markdown to plain text
 * @param {string} markdown
 * @returns {Promise<string>}
 */
export function getTextFrom(markdown: string): Promise<string>;
