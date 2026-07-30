import { pageUrl } from './_lib/seo.js';
import { absoluteUrl } from './_lib/site.js';

export const dynamic = 'force-static';

const pages = [
  { route: '/', changeFrequency: 'weekly', priority: 1, images: ['/images/civic-action-hero.webp'] },
  { route: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { route: '/activities', changeFrequency: 'monthly', priority: 0.8 },
  { route: '/history', changeFrequency: 'weekly', priority: 0.8 },
  { route: '/organization', changeFrequency: 'monthly', priority: 0.7 },
  { route: '/news', changeFrequency: 'weekly', priority: 0.8 },
  { route: '/join', changeFrequency: 'weekly', priority: 0.9 },
];

export default function sitemap() {
  return pages.map(({ route, images = [], ...metadata }) => ({
    url: pageUrl(route),
    lastModified: new Date('2026-07-30'),
    ...metadata,
    ...(images.length ? { images: images.map((image) => absoluteUrl(image)) } : {}),
  }));
}
