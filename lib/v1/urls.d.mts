export class UrlFormatter {
    /**
     * Constructor
     * @param {string} siteUrl
     * @param {string} subfolder
     */
    constructor(siteUrl: string, subfolder: string);
    siteUrl: string;
    subfolder: string;
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
    /**
     * Gets the author id from an address
     * @param {URL} url
     */
    getAuthorId(url: URL): string;
}
