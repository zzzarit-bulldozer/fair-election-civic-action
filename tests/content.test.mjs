import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  historyEvidence,
  organization,
  organizationPlans,
  reports,
  timeline,
} from '../app/_data/content.js';
import { toIsoDate } from '../app/_lib/date.js';
import { openChatUrl } from '../app/_lib/site.js';

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

test('언론 링크는 중복 없이 유효한 URL 형식이다', () => {
  for (const collection of [historyEvidence, reports]) {
    const links = collection.map((item) => item.href);
    assert.equal(new Set(links).size, links.length);
    links.forEach((link) => assert.doesNotThrow(() => new URL(link)));
  }
});

test('모든 언론 기록에 출처가 표시된 로컬 이미지가 연결된다', async () => {
  const records = [...historyEvidence, ...reports];

  records.forEach((item) => {
    assert.match(item.image, /^\/images\/news\//);
    assert.ok(item.imageAlt);
    assert.ok(item.imageCredit);
  });

  await Promise.all([...new Set(records.map((item) => item.image))].map((image) => (
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

test('표시 날짜를 ISO 날짜로 변환한다', () => {
  assert.equal(toIsoDate('2026. 06. 13'), '2026-06-13');
  [...timeline, ...historyEvidence, ...reports].forEach((item) => {
    assert.match(toIsoDate(item.date), /^\d{4}-\d{2}-\d{2}$/);
  });
});
