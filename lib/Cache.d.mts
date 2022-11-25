/**
 * Get's the path of the cache files
 * @returns {Promise<string>}
 */
export function getCachePath(): Promise<string>;
/**
 * Gets the file path for a cache item
 * @param {string} key
 * @returns {Promise<string>}
 */
export function getItemPath(key: string): Promise<string>;
/**
 * Gets an item from the cache
 * @param {string} key
 * @returns {Promise<any>}
 */
export function getItem(key: string): Promise<any>;
/**
 * Adds an item to the cache
 * @param {string} key
 * @param {any} value
 * @returns {Promise<void>}
 */
export function setItem(key: string, value: any): Promise<void>;
/**
 * Clears the cache
 * @returns {Promise<void>}
 */
export function clear(): Promise<void>;
export const maxAge: 200;
