import { absoluteUrl, siteUrl } from './_lib/site.js';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl,
  };
}
