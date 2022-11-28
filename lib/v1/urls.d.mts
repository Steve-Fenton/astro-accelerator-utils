export class UrlFormatter {
    /**
     * Constructor
     * @param {string} siteUrl
     */
    constructor(siteUrl: string);
    siteUrl: string;
    /**
     * Ensures trailing slash is used
     * @param {URL} url
     * @returns {URL}
     */
    addSlashToUrl(url: URL): URL;
    /**
     * Ensures trailing slash is used
     * @param {string | undefined} address
     * @returns {string}
     */
    addSlashToAddress(address: string | undefined): string;
}
