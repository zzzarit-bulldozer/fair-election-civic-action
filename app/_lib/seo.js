import { absoluteUrl } from './site.js';

export const siteName = '경기우파청년들';
export const siteDescription =
  '공정한 한 표, 자유로운 선택. 끝까지 지키는 경기우파청년들의 시민 네트워크입니다.';
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
        alternateName: 'GYEONGGI RIGHT-WING YOUTH',
        url: pageUrl('/'),
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/icon-512.png'),
          width: 512,
          height: 512,
        },
        image: absoluteUrl(defaultSocialImage),
        description: siteDescription,
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
        alternateName: '경기우파청년들 공식 홈페이지',
        url: pageUrl('/'),
        inLanguage: 'ko-KR',
        publisher: {
          '@id': organizationId,
        },
      },
    ],
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
