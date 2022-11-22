import fs from 'fs';
import path from 'path';
import process from 'process';

export const maxAge = 200; //seconds

/**
 * Get's the path of the cache files
 * @returns {string}
 */
export async function getCachePath () {
    const cachePath = path.join(process.cwd(), '.cache/');
    await fs.promises.mkdir(cachePath, { recursive: true })
    return cachePath;
}

/**
 * Gets the file path for a cache item
 * @param {string} key 
 * @returns {string}
 */
export async function getItemPath (key) {
    const cachePath = await getCachePath();
    return path.join(cachePath, key + '.json');
}

/**
 * Gets an item from the cache
 * @param {string} key 
 * @returns {any}
 */
export async function getItem (key) {
    const itemPath = await getItemPath(key);
    try {

        const { mtime } = await fs.promises.stat(itemPath);

        var date_time = new Date();
        let timeDifference = Math.abs((date_time.getTime() - mtime.getTime()) / 1000);
        if (timeDifference < maxAge) {
            console.log('Cache hit', key);
            const content = fs.readFileSync(itemPath).toString();
            return JSON.parse(content);
        }
    } catch{}

    console.warn('Cache miss', key);
    return null;
}

/**
 * Adds an item to the cache
 * @param {string} key 
 * @param {any} value 
 */
export async function setItem (key, value) {
    const itemPath = await getItemPath(key);
    await fs.promises.writeFile(itemPath, JSON.stringify(value));
}
