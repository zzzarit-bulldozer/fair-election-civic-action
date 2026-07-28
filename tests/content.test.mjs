import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  brandRelationship,
  getReportsByIds,
  historyEvidenceIds,
  nextAction,
  organization,
  organizationPlans,
  participationWays,
  reports,
  reportsById,
  timeline,
} from '../app/_data/content.js';
import { toIsoDate } from '../app/_lib/date.js';
import { officialThreadsUrl, openChatUrl } from '../app/_lib/site.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

test('모든 회차와 16장 포스터가 연결된다', async () => {
  assert.equal(timeline.length, 7);
  assert.equal(timeline.reduce((total, item) => total + item.posters.length, 0), 16);

  await Promise.all(timeline.flatMap((item) => item.posters.map((poster) => (
    access(`${projectRoot}public${poster.src}`)
  ))));
});

test('모든 회차와 회차별 현장 사진 48장이 연결된다', async () => {
  const photos = timeline.flatMap((item) => item.photos ?? []);

  assert.deepEqual(timeline.map((item) => item.photos.length), [4, 10, 14, 8, 2, 6, 4]);
  assert.equal(photos.length, 48);
  assert.equal(new Set(photos.map((photo) => photo.src)).size, photos.length);
  photos.forEach((photo) => {
    assert.match(photo.src, /^\/images\/history\/session-\d{2}\/field-\d{2}\.webp$/);
    assert.ok(photo.alt);
    assert.ok(photo.label);
    assert.ok(photo.width > 0);
    assert.ok(photo.height > 0);
  });

  await Promise.all(photos.map((photo) => access(`${projectRoot}public${photo.src}`)));
});

test('언론 원문은 canonical 컬렉션에서 ID와 URL 중복 없이 관리된다', () => {
  const ids = reports.map((item) => item.id);
  const links = reports.map((item) => item.href);

  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(links).size, links.length);
  links.forEach((link) => assert.doesNotThrow(() => new URL(link)));
  reports.forEach((item) => {
    assert.ok(item.relation);
    assert.ok(['direct', 'related', 'interview', 'citizen'].includes(item.usage));
  });
});

test('발자취는 canonical 기사 ID만 참조한다', () => {
  assert.ok(historyEvidenceIds.every((id) => typeof id === 'string'));
  assert.deepEqual(getReportsByIds(historyEvidenceIds), historyEvidenceIds.map((id) => reportsById[id]));
  historyEvidenceIds.forEach((id) => assert.ok(reportsById[id]));

  timeline.flatMap((item) => item.reportIds ?? []).forEach((id) => {
    assert.ok(reportsById[id]);
  });
});

test('언론 필터 네 분류에는 각각 확인 가능한 기록이 있다', () => {
  ['direct', 'related', 'interview', 'citizen'].forEach((usage) => {
    assert.ok(reports.some((report) => report.usage === usage));
  });
});

test('기사 URL과 표시 매체명이 일치한다', () => {
  assert.equal(reportsById['tvchosun-suwon-20260613'].media, 'TV조선');
});

test('모든 언론 기록에 출처가 표시된 로컬 이미지가 연결된다', async () => {
  reports.forEach((item) => {
    assert.match(item.image, /^\/images\/news\//);
    assert.ok(item.imageAlt);
    assert.ok(item.imageCredit);
  });

  await Promise.all([...new Set(reports.map((item) => item.image))].map((image) => (
    access(`${projectRoot}public${image}`)
  )));
});

test('올공두컷을 직접 다룬 고유 언론 원문이 별도 분류된다', () => {
  const olgongReports = reports.filter((item) => item.project === 'olgong');

  assert.equal(olgongReports.length, 3);
  assert.deepEqual(
    olgongReports.map((item) => item.media).sort(),
    ['위키트리', '이데일리', '중앙일보'].sort(),
  );
});

test('브라우저와 모바일용 아이콘 파일이 준비된다', async () => {
  await Promise.all([
    'favicon.svg',
    'favicon.ico',
    'apple-touch-icon.png',
    'icon-192.png',
    'icon-512.png',
  ].map((icon) => access(`${projectRoot}public/${icon}`)));
});

test('창립 회의 자료의 임원진과 운영계획이 정확히 반영된다', () => {
  assert.deepEqual(organization, [
    ['01', '감사', '최문영'],
    ['02', '재무', '이철우'],
    ['03', '사무국장', '김민섭'],
    ['04', '특별위원장', '한동원'],
    ['05', '조직위원장', '박보환'],
    ['06', '청년위원장', '박장훈'],
    ['07', '기획위원장', '장동재'],
  ]);
  assert.deepEqual(organizationPlans.map(([, plan]) => plan), [
    '고유번호증 발급 추진',
    '단체 명의 통장 개설',
    '회원 및 후원회원 모집',
  ]);
});

test('오픈 카톡 링크는 공식 초대 주소를 사용한다', () => {
  assert.equal(openChatUrl, 'https://invite.kakao.com/tc/MqzolmVhza');
});

test('메인 Threads CTA는 공식 계정 주소를 사용한다', () => {
  assert.equal(officialThreadsUrl, 'https://www.threads.com/@fairly_evenly?igshid=NTc4MTIwNjQ2YQ==');
});

test('브랜드 관계와 참여 상태가 한 데이터 원천에서 관리된다', () => {
  assert.equal(
    brandRelationship,
    '경기우파청년들은 상위 단체이며, 공정선거시민행동은 경기우파청년들의 첫 시민행동입니다.',
  );
  assert.equal(participationWays.length, 3);
  assert.deepEqual(participationWays.map((way) => way.title), ['현장 참여', '운영 지원', '소식 확인']);
  assert.equal(nextAction.status, 'preparing');
  assert.equal(nextAction.label, '다음 일정 준비 중');
});

test('모든 주요 페이지에 참여 CTA가 하나 있고 join 라우트가 연결된다', async () => {
  const pages = [
    ['app/page.jsx', 'data-primary-cta'],
    ['app/about/page.jsx', '<PageActions'],
    ['app/activities/page.jsx', '<PageActions'],
    ['app/history/page.jsx', '<PageActions'],
    ['app/news/page.jsx', '<PageActions'],
    ['app/organization/page.jsx', '<PageActions'],
    ['app/join/page.jsx', '<PageActions'],
  ];

  await Promise.all(pages.map(async ([path, marker]) => {
    const source = await readFile(`${projectRoot}${path}`, 'utf8');
    assert.equal(source.split(marker).length - 1, 1, `${path}의 primary CTA`);
  }));

  const header = await readFile(`${projectRoot}app/_components/SiteHeader.jsx`, 'utf8');
  const sitemap = await readFile(`${projectRoot}app/sitemap.js`, 'utf8');
  assert.match(header, /href="\/join"/);
  assert.doesNotMatch(header, /openChatUrl/);
  assert.match(sitemap, /'\/join'/);
});

test('표시 날짜를 ISO 날짜로 변환한다', () => {
  assert.equal(toIsoDate('2026. 06. 13'), '2026-06-13');
  [...timeline, ...reports].forEach((item) => {
    assert.match(toIsoDate(item.date), /^\d{4}-\d{2}-\d{2}$/);
  });
});
