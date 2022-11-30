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
     * @param {string | Date} date
     * @param {string} lang
     * @returns {string}
     */
    formatDate(date: string | Date, lang: string): string;
}
export type Site = any;
