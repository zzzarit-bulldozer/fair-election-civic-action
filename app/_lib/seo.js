import { absoluteUrl } from './site.js';

export const siteName = '경기우파청년들';
export const siteShortName = '경우청';
export const siteDescription =
  '공정하고 자유로운 대한민국. 끝까지 지키는 경기우파청년들(경우청)의 청년 네트워크입니다.';
export const siteKeywords = [
  '경기우파청년들',
  '경우청',
  '경기 우파 청년들',
  '경기우파청년들 경우청',
  '경기도 우파',
  '우파 청년 단체',
  '청년 우파',
  '보수 청년 단체',
  '수원 우파 청년',
  '수원 올림픽공원 집회',
  '수원 나혜석거리 집회',
  '경기 청년 정치',
  '경기도 좌파',
  '경기도 민주당',
  '경기도 정치',
  '경기도 시민단체',
  '공정선거시민행동',
];
export const defaultSocialImage = '/images/civic-action-hero.webp';

const officialThreadsProfileUrl = 'https://www.threads.com/@fairly_evenly';

export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function pageUrl(path = '/') {
  const normalizedPath = path === '/' ? '/' : `${path.replace(/\/$/, '')}/`;
  return absoluteUrl(normalizedPath);
}

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultSocialImage,
}) {
  const socialTitle = `${title} | ${siteName}`;
  const socialImage = absoluteUrl(image);

  return {
    title,
    description,
    keywords: siteKeywords,
    alternates: {
      canonical: pageUrl(path),
    },
    openGraph: {
      title: socialTitle,
      description,
      url: pageUrl(path),
      siteName,
      type: 'website',
      locale: 'ko_KR',
      images: [
        {
          url: socialImage,
          width: 2560,
          height: 1440,
          alt: '수원 나혜석거리의 태극기와 공정선거 시민행동 현장',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}

export function createHomeJsonLd() {
  const organizationId = absoluteUrl('/#organization');
  const websiteId = absoluteUrl('/#website');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteName,
        alternateName: [siteShortName, '경기 우파 청년들', 'GYEONGGI RIGHT-WING YOUTH'],
        url: pageUrl('/'),
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/icon-512.png'),
          width: 512,
          height: 512,
        },
        image: absoluteUrl(defaultSocialImage),
        description: siteDescription,
        keywords: siteKeywords.join(', '),
        slogan: '공정하고 자유로운 대한민국',
        knowsAbout: ['공정선거', '우파 청년 운동', '경기도 청년 정치', '시민 참여', '평화 집회'],
        foundingLocation: {
          '@type': 'Place',
          name: '수원 올림픽공원',
          address: { '@type': 'PostalAddress', addressLocality: '수원시', addressRegion: '경기도', addressCountry: 'KR' },
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: '경기도',
        },
        sameAs: [officialThreadsProfileUrl],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteName,
        alternateName: [siteShortName, '경기우파청년들 공식 홈페이지'],
        url: pageUrl('/'),
        inLanguage: 'ko-KR',
        publisher: {
          '@id': organizationId,
        },
      },
    ],
  };
}

export function createFaqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function createBreadcrumbJsonLd({ name, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: pageUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: pageUrl(path),
      },
    ],
  };
}
