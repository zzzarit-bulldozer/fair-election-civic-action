import { assetPath } from './_lib/site';

export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: '공정선거시민행동',
    short_name: '공정선거시민행동',
    description: '수원에서 시작하는 투명한 선거, 살아있는 민주주의',
    start_url: assetPath('/'),
    display: 'standalone',
    background_color: '#10110f',
    theme_color: '#c9ff2e',
    lang: 'ko',
    icons: [{ src: assetPath('/favicon.svg'), sizes: 'any', type: 'image/svg+xml' }],
  };
}
