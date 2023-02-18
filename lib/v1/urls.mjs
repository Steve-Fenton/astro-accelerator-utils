export class UrlFormatter {
    /**
     * Constructor
     * @param {string} siteUrl 
     * @param {string} subfolder
     * @param {boolean} useTrailingUrlSlash
     */
    constructor(siteUrl, subfolder, useTrailingUrlSlash) {
        this.siteUrl = siteUrl;
        this.subfolder = subfolder;
        this.useTrailingUrlSlash = useTrailingUrlSlash;
    }

    /** Uses config to decide whether to add or remove trailing slashes
     * @param {URL} url
     * @returns {URL}
     */
    formatUrl(url) {
        if (!url) {
            return new URL(this.siteUrl);
        }

        if (this.useTrailingUrlSlash) {
            // Add slash
            url.pathname += url.pathname.endsWith('/')
            ? ''
            : '/';
        } else {
            // Remove slash
            if (url.pathname.endsWith('/')) {
                url.pathname = url.pathname.substring(0, url.pathname.length - 1);
            }
        }

        return url;
    }

    /**
     * Ensures trailing slash is used
     * @param {string | undefined} address 
     * @returns {string}
     */
    formatAddress(address) {
        if (!address) {
            // Handle null or empty addresses
            address = '/';
        }

        if (address.indexOf('//') > -1) {
            // Don't mess with absolute addresses
            return address;
        }

        const url = this.formatUrl(new URL(address, this.siteUrl));
        return url.pathname + url.search;
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