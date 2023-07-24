export class Cache {
    /**
     * Constructor
     * @param {number} maxAge
     */
    constructor(maxAge: number);
    maxAge: number;
    /**
     * Gets an item from the cache, falls back to supplied function
     * @param {string} key
     * @param {() => any} func
     */
    get(key: string, func: () => any): any;
    /**
     * Gets an item from the cache
     * @param {string} key
     * @returns {Promise<any>}
     */
    getItem(key: string): Promise<any>;
    /**
     * Adds an item to the cache
     * @param {string} key
     * @param {any} value
     * @returns {Promise<void>}
     */
    setItem(key: string, value: any): Promise<void>;
    /**
     * Clears the cache
     * @returns {Promise<void>}
     */
    clear(): Promise<void>;
    /**
     * Get's the path of the cache files
     * @returns {string}
     */
    getCachePath(): string;
    /**
     * Gets the file path for a cache item
     * @param {string} key
     * @returns {string}
     */
    getItemPath(key: string): string;
}
