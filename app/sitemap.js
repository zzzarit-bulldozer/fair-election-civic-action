import { absoluteUrl } from './_lib/site';

export const dynamic = 'force-static';

const routes = ['/', '/about', '/activities', '/history', '/organization', '/news'];

export default function sitemap() {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date('2026-07-25'),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
