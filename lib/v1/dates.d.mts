/**
 * @typedef { import("../types/Site") } Site
 */
export class DateFormatter {
    /**
     * Constructor
     * @param {Intl.DateTimeFormatOptions} dateOptions
     */
    constructor(dateOptions: Intl.DateTimeFormatOptions);
    dateOptions: Intl.DateTimeFormatOptions;
    /**
     * Returns the formatted pubDate
     * @param {any} frontmatter
     * @param {string} lang
     * @param {Site} site
     * @returns {string}
     */
    formatDate(date: any, lang: string): string;
}
export type Site = any;
