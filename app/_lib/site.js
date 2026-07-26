const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const openChatUrl = 'https://invite.kakao.com/tc/MqzolmVhza';

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL
  ?? (deploymentHost ? `https://${deploymentHost}` : 'http://localhost:3100')
).replace(/\/$/, '');

export function absoluteUrl(path = '/') {
  return new URL(path.replace(/^\/+/, ''), `${siteUrl}/`).toString();
}

export function assetPath(path = '/') {
  if (!basePath) return path;
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
