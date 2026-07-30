import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import robots from '../app/robots.js';
import sitemap from '../app/sitemap.js';
import {
  createBreadcrumbJsonLd,
  createHomeJsonLd,
  createPageMetadata,
  serializeJsonLd,
  siteName,
} from '../app/_lib/seo.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

test('상세 페이지 메타데이터가 canonical과 공유 정보를 함께 만든다', () => {
  const metadata = createPageMetadata({
    title: '참여하기',
    description: '참여 안내',
    path: '/join',
  });

  assert.equal(metadata.title, '참여하기');
  assert.equal(metadata.openGraph.title, `참여하기 | ${siteName}`);
  assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
  assert.equal(new URL(metadata.alternates.canonical).pathname.endsWith('/join/'), true);
  assert.equal(metadata.twitter.card, 'summary_large_image');
});

test('홈 구조화 데이터가 단체와 웹사이트의 관계를 연결한다', () => {
  const data = createHomeJsonLd();
  const organization = data['@graph'].find((item) => item['@type'] === 'Organization');
  const website = data['@graph'].find((item) => item['@type'] === 'WebSite');

  assert.equal(data['@context'], 'https://schema.org');
  assert.equal(organization.name, siteName);
  assert.equal(website.publisher['@id'], organization['@id']);
  assert.equal(new URL(organization.logo.url).pathname.endsWith('/icon-512.png'), true);
  assert.deepEqual(organization.sameAs, ['https://www.threads.com/@fairly_evenly']);
});

test('상세 페이지 breadcrumb 구조화 데이터가 홈부터 현재 페이지까지 이어진다', () => {
  const data = createBreadcrumbJsonLd({ name: '언론보도', path: '/news' });

  assert.equal(data['@type'], 'BreadcrumbList');
  assert.deepEqual(data.itemListElement.map((item) => item.position), [1, 2]);
  assert.deepEqual(data.itemListElement.map((item) => item.name), ['홈', '언론보도']);
  assert.equal(new URL(data.itemListElement[1].item).pathname.endsWith('/news/'), true);
});

test('JSON-LD 직렬화는 HTML 삽입 문자를 이스케이프한다', () => {
  const serialized = serializeJsonLd({ name: '</script><script>alert(1)</script>' });

  assert.doesNotMatch(serialized, /</);
  assert.match(serialized, /\\u003c\/script>/);
});

test('robots가 일반 검색과 AI 검색 접근을 허용한다', () => {
  const value = robots();
  const rules = new Map(value.rules.map((rule) => [rule.userAgent, rule]));

  assert.equal(rules.get('*').allow, '/');
  assert.equal(rules.get('OAI-SearchBot').allow, '/');
  assert.equal(rules.get('ChatGPT-User').allow, '/');
  assert.equal(new URL(value.sitemap).pathname.endsWith('/sitemap.xml'), true);
});

test('사이트맵이 모든 공개 페이지와 최신 수정일을 포함한다', () => {
  const entries = sitemap();
  const paths = entries.map((entry) => new URL(entry.url).pathname.replace(/\/$/, '') || '/');

  assert.equal(entries.length, 7);
  assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length);
  ['/about', '/activities', '/history', '/organization', '/news', '/join'].forEach((path) => {
    assert.ok(paths.some((entryPath) => entryPath.endsWith(path)));
  });
  entries.forEach((entry) => assert.equal(entry.lastModified.toISOString().slice(0, 10), '2026-07-30'));
  assert.ok(entries.find((entry) => new URL(entry.url).pathname.endsWith('/join/')).priority > 0.8);
});

test('모든 상세 페이지에 개별 메타데이터와 breadcrumb가 연결된다', async () => {
  const pages = ['about', 'activities', 'history', 'news', 'organization', 'join'];

  await Promise.all(pages.map(async (page) => {
    const source = await readFile(`${projectRoot}app/${page}/page.jsx`, 'utf8');

    assert.match(source, /createPageMetadata\(\{/);
    assert.match(source, /<BreadcrumbJsonLd /);
  }));

  const home = await readFile(`${projectRoot}app/page.jsx`, 'utf8');
  assert.match(home, /createHomeJsonLd\(\)/);
});
