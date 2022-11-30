import fs from 'fs';
import path from 'path';
import process from 'process';

export class Cache {
    /**
     * Constructor
     * @param {number} maxAge
     */
    constructor(maxAge) {
        this.maxAge = maxAge;
    }

    /**
     * Gets an item from the cache, falls back to supplied function
     * @param {string} key 
     * @param {() => any} func
     */
    get(key, func) {
        const cached = this.getItem(key);

        if (cached) {
            return cached;
        }

        const fetched = func();

        this.setItem(key, fetched);

        return fetched;
    }

    /**
     * Gets an item from the cache
     * @param {string} key 
     * @returns {Promise<any>}
     */
    getItem (key) {
        const itemPath = this.getItemPath(key);
        try {

            const { mtime } = fs.statSync(itemPath);

            var date_time = new Date();
            let timeDifference = Math.abs((date_time.getTime() - mtime.getTime()) / 1000);
            if (timeDifference < this.maxAge) {
                console.log('Cache hit', key);
                const content = fs.readFileSync(itemPath).toString();
                return JSON.parse(content);
            }
        } catch{}

        console.log('Cache miss', key);
        return null;
    }

    /**
     * Adds an item to the cache
     * @param {string} key 
     * @param {any} value
     * @returns {Promise<void>} 
     */
    setItem (key, value) {
        const itemPath = this.getItemPath(key);
        fs.writeFileSync(itemPath, JSON.stringify(value));
    }

    /**
     * Clears the cache
     * @returns {Promise<void>}
     */
    clear() {
        const folder = this.getCachePath();
        const files = fs.readdirSync(folder);

        for(const file of files) {
            fs.unlinkSync(path.join(folder, file));
        }
    }

        /**
     * Get's the path of the cache files
     * @returns {string}
     */
         getCachePath () {
            const cachePath = path.join(process.cwd(), '.cache/');
            fs.mkdirSync(cachePath, { recursive: true })
            return cachePath;
        }
    
        /**
         * Gets the file path for a cache item
         * @param {string} key 
         * @returns {string}
         */
        getItemPath (key) {
            const cachePath = this.getCachePath();
            return path.join(cachePath, key + '.json');
        }
}