import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { historyEvidence, reports, timeline } from '../app/_data/content.js';
import { toIsoDate } from '../app/_lib/date.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

test('모든 회차와 16장 포스터가 연결된다', async () => {
  assert.equal(timeline.length, 7);
  assert.equal(timeline.reduce((total, item) => total + item.posters.length, 0), 16);

  await Promise.all(timeline.flatMap((item) => item.posters.map((poster) => (
    access(`${projectRoot}public${poster.src}`)
  ))));
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

test('표시 날짜를 ISO 날짜로 변환한다', () => {
  assert.equal(toIsoDate('2026. 06. 13'), '2026-06-13');
  [...timeline, ...historyEvidence, ...reports].forEach((item) => {
    assert.match(toIsoDate(item.date), /^\d{4}-\d{2}-\d{2}$/);
  });
});
