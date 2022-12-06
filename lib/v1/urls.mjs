export class UrlFormatter {
    /**
     * Constructor
     * @param {string} siteUrl 
     * @param {string} subfolder
     */
    constructor(siteUrl, subfolder) {
        this.siteUrl = siteUrl;
        this.subfolder = subfolder;
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

    /**
     * Gets the author id from an address
     * @param {URL} url 
     */
    getAuthorId(url) {
        const index = (this.subfolder.length === 0)
            ? 2 // i.e. /authors/steve-fenton/
            : 3 // i.e. /subfolder/authors/steve-fenton/
        return url.pathname.split('/')[index];
    }
}