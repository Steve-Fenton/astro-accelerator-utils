export class UrlFormatter {
    /**
     * Constructor
     * @param {string} siteUrl
     * @param {string} subfolder
     * @param {boolean} useTrailingUrlSlash
     */
    constructor(siteUrl: string, subfolder: string, useTrailingUrlSlash: boolean);
    siteUrl: string;
    subfolder: string;
    useTrailingUrlSlash: boolean;
    /** Uses config to decide whether to add or remove trailing slashes
     * @param {URL} url
     * @returns {URL}
     */
    formatUrl(url: URL): URL;
    /**
     * Ensures trailing slash is used
     * @param {string | undefined} address
     * @returns {string}
     */
    formatAddress(address: string | undefined): string;
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
