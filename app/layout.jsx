import './globals.css';
import GoogleAnalytics from './_components/GoogleAnalytics';
import { absoluteUrl, assetPath, siteUrl } from './_lib/site';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: '경기우파청년들 | 공정한 한 표, 자유로운 선택',
  description:
    '공정한 한 표, 자유로운 선택. 끝까지 지키는 경기우파청년들의 시민 네트워크입니다.',
  applicationName: '경기우파청년들',
  manifest: assetPath('/manifest.webmanifest'),
  openGraph: {
    title: '경기우파청년들',
    description: '공정한 한 표, 자유로운 선택. 공개 자료와 현장 기록으로 질문하고, 확인하고, 함께 움직입니다.',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: absoluteUrl('/images/civic-action-hero.webp'), width: 2560, height: 1440, alt: '수원 나혜석거리의 태극기와 공정선거 시민행동 현장' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '경기우파청년들',
    description: '공정한 한 표, 자유로운 선택. 공개 자료와 현장 기록으로 질문하고, 확인하고, 함께 움직입니다.',
    images: [absoluteUrl('/images/civic-action-hero.webp')],
  },
  icons: {
    icon: [
      { url: assetPath('/favicon.ico'), sizes: 'any' },
      { url: assetPath('/favicon.svg'), type: 'image/svg+xml' },
    ],
    shortcut: assetPath('/favicon.ico'),
    apple: [{ url: assetPath('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport = {
  themeColor: '#10110f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
