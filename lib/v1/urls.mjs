export class UrlFormatter {
    /**
     * Constructor
     * @param {string} siteUrl 
     */
    constructor(siteUrl) {
        this.siteUrl = siteUrl;
    }

    /**
     * Ensures trailing slash is used
     * @param {URL} url 
     * @returns {URL}
     */
    addSlashToUrl(url) {
        if (!url) {
            return new URL(this.siteUrl);
        }

        url.pathname += url.pathname.endsWith('/')
            ? ''
            : '/';

        return url;
    }

    /**
     * Ensures trailing slash is used
     * @param {string | undefined} address 
     * @returns {string}
     */
    addSlashToAddress(address) {
        if (!address) {
            // Handle null or empty addresses
            address = '/';
        }

        if (address.indexOf('//') > -1) {
            // Don't mess with absolute addresses
            return address;
        }

        const url = this.addSlashToUrl(new URL(address, this.siteUrl));
        return url.pathname + url.search;
    }
}