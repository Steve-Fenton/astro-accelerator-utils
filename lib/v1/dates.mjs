/**
 * @typedef { import("../types/Site") } Site
 */

export class DateFormatter {
  /**
   * Constructor
   * @param {Intl.DateTimeFormatOptions} dateOptions 
   * @param {Intl.DateTimeFormatOptions} shortDateOptions 
   */
  constructor(dateOptions, shortDateOptions) {
    this.dateOptions = dateOptions;
    this.shortDateOptions = shortDateOptions;
  }

  /**
   * Returns the formatted pubDate
   * @param {string | Date} date
   * @param {string} lang 
   * @returns {string}
   */
  formatDate(date, lang) {
    if (date) {
      return new Date(date).toLocaleDateString(lang, this.dateOptions);
    }

    return '';
  }

  /**
   * Returns the formatted pubDate
   * @param {string | Date} date
   * @param {string} lang 
   * @returns {string}
   */
  formatShortDate(date, lang) {
    if (date) {
      return new Date(date).toLocaleDateString(lang, this.shortDateOptions);
    }

    return '';
  }
}