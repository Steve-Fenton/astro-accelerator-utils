/**
 * @typedef { import("../types/Site") } Site
 */

export class DateFormatter {
  /**
   * Constructor
   * @param {Intl.DateTimeFormatOptions} dateOptions 
   */
  constructor(dateOptions) {
    this.dateOptions = dateOptions;
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
}