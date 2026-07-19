import './globals.css';
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
    description: '한 표의 무게를 지키는 시민들. 감시하고, 알리고, 함께 행동합니다.',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: absoluteUrl('/images/civic-action-hero.jpg'), width: 1672, height: 941, alt: '공정선거시민행동 시민들의 행진' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '공정선거시민행동',
    description: '한 표의 무게를 지키는 시민들. 감시하고, 알리고, 함께 행동합니다.',
    images: [absoluteUrl('/images/civic-action-hero.jpg')],
  },
  icons: {
    icon: assetPath('/favicon.svg'),
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
      <body>{children}</body>
    </html>
  );
}
