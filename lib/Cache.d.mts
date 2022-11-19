/**
 * Get's the path of the cache files
 * @returns {string}
 */
export function getCachePath(): string;
/**
 * Gets the file path for a cache item
 * @param {string} key
 * @returns {string}
 */
export function getItemPath(key: string): string;
/**
 * Gets an item from the cache
 * @param {string} key
 * @returns {any}
 */
export function getItem(key: string): any;
/**
 * Adds an item to the cache
 * @param {string} key
 * @param {object} value
 */
export function setItem(key: string, value: object): Promise<void>;
export const maxAge: 200;
