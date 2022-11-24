import fs, { existsSync } from 'fs';
import path from 'path';

const workingFolder = process.cwd();

const files = [
    'index.d.mts',
    '/lib/cache.d.mts',
    '/lib/dates.d.mts',
    '/lib/postFiltering.d.mts',
    '/lib/postOrdering.d.mts',
    '/lib/postQueries.d.mts',
    '/lib/urls.d.mts',
    '/types/Astro.d.ts',
    '/types/Frontmatter.d.ts',
    '/types/PagePredicate.d.ts',
    '/types/Site.d.ts'
]

files.forEach(f => {
    const filePath = path.join(workingFolder, f);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
})