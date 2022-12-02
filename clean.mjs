import fs from 'fs';
import path from 'path';

const workingFolder = process.cwd();

const files = [
    'index.d.mts',
    '/lib/v1/authors.d.mts',
    '/lib/v1/cache.d.mts',
    '/lib/v1/dates.d.mts',
    '/lib/v1/markdown.d.mts',
    '/lib/v1/navigation.d.mts',
    '/lib/v1/paging.d.mts',
    '/lib/v1/posts.d.mts',
    '/lib/v1/taxonomy.d.mts',
    '/lib/v1/urls.d.mts',

    '/lib/footerMenu.d.mts',
    '/lib/postFiltering.d.mts',
    '/lib/postOrdering.d.mts',
    '/lib/postPaging.d.mts',
    '/lib/taxonomy.d.mts',

    '/types/Astro.d.ts',
    '/types/AuthorInfo.d.ts',
    '/types/AuthorList.d.ts',
    '/types/BannerImage.d.ts',
    '/types/Frontmatter.d.ts',
    '/types/Link.d.ts',
    '/types/NavPage.d.ts',
    '/types/PagePredicate.d.ts',
    '/types/Site.d.ts',
    '/types/Taxonomy.d.ts',
    '/types/Translations.d.ts'
]

files.forEach(f => {
    const filePath = path.join(workingFolder, f);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
})