/**
 * @typedef { import("../types/Site") } Site
 */
export class DateFormatter {
    /**
     * Constructor
     * @param {Intl.DateTimeFormatOptions} dateOptions
     * @param {Intl.DateTimeFormatOptions} shortDateOptions
     */
    constructor(dateOptions: Intl.DateTimeFormatOptions, shortDateOptions: Intl.DateTimeFormatOptions);
    dateOptions: Intl.DateTimeFormatOptions;
    shortDateOptions: Intl.DateTimeFormatOptions;
    /**
     * Returns the formatted pubDate
     * @param {string | Date} date
     * @param {string} lang
     * @returns {string}
     */
    formatDate(date: string | Date, lang: string): string;
    /**
     * Returns the formatted pubDate
     * @param {string | Date} date
     * @param {string} lang
     * @returns {string}
     */
    formatShortDate(date: string | Date, lang: string): string;
}
export type Site = any;
