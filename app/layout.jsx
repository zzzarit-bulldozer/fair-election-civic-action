import './globals.css';
import GoogleAnalytics from './_components/GoogleAnalytics';
import { absoluteUrl, assetPath, siteUrl } from './_lib/site';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: '공정선거시민행동 | 한 표의 무게를 지키는 시민들',
  description:
    '공정한 한 표가 온전히 반영되는 사회를 위해 행동하는 수원 시민들의 네트워크, 공정선거시민행동입니다.',
  applicationName: '공정선거시민행동',
  manifest: assetPath('/manifest.webmanifest'),
  openGraph: {
    title: '공정선거시민행동',
    description: '한 표의 무게를 지키는 시민들. 공개 자료와 현장 기록을 바탕으로 질문하고, 확인하고, 평화롭게 행동합니다.',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: absoluteUrl('/images/civic-action-hero.jpg'), width: 1672, height: 941, alt: '공정선거시민행동 시민들의 행진' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '공정선거시민행동',
    description: '한 표의 무게를 지키는 시민들. 공개 자료와 현장 기록을 바탕으로 질문하고, 확인하고, 평화롭게 행동합니다.',
    images: [absoluteUrl('/images/civic-action-hero.jpg')],
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
