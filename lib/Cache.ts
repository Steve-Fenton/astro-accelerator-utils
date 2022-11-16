import fs from 'fs';
import path from 'path';
import process from 'process';

export const maxAge = 200; //seconds

export async function getCachePath () {
    const cachePath = path.join(process.cwd(), '.cache/');
    await fs.promises.mkdir(cachePath, { recursive: true })
    return cachePath;
}

export async function getItemPath (key: string) {
    const cachePath = await getCachePath();
    return path.join(cachePath, key + '.cache');
}

export async function getItem (key: string) {
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

export async function setItem (key: string, value: object) {
    const itemPath = await getItemPath(key);
    await fs.promises.writeFile(itemPath, JSON.stringify(value));
}
