import { assetPath } from './_lib/site';

export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: '경기우파청년들',
    short_name: '경기우파청년들',
    description: '수원에서 시작하는 공정한 선거, 살아 숨쉬는 자유민주주의',
    start_url: assetPath('/'),
    display: 'standalone',
    background_color: '#10110f',
    theme_color: '#c9ff2e',
    lang: 'ko',
    icons: [
      { src: assetPath('/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: assetPath('/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  };
}
