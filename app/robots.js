import { absoluteUrl, siteUrl } from './_lib/site.js';

export const dynamic = 'force-static';

// Named explicitly so answer engines that check for their own token see an allow rule.
export const aiCrawlers = [
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'CCBot',
];

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl,
  };
}
