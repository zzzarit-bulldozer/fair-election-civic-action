import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { reports } from '../app/_data/content.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const pages = [
  ['/', 'out/index.html'],
  ['/about', 'out/about/index.html'],
  ['/activities', 'out/activities/index.html'],
  ['/history', 'out/history/index.html'],
  ['/organization', 'out/organization/index.html'],
  ['/news', 'out/news/index.html'],
  ['/join', 'out/join/index.html'],
];

function extractHeadings(html) {
  return [...html.matchAll(/<h([1-6])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/g)].map((match) => ({
    level: Number(match[1]),
    text: match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  }));
}

for (const [route, outputPath] of pages) {
  const html = await readFile(`${projectRoot}${outputPath}`, 'utf8');
  const headings = extractHeadings(html);
  const h1Count = headings.filter(({ level }) => level === 1).length;

  assert.equal(h1Count, 1, `${route}: h1은 정확히 하나여야 합니다.`);
  assert.equal(headings[0]?.level, 1, `${route}: 첫 제목은 h1이어야 합니다.`);

  for (let index = 1; index < headings.length; index += 1) {
    const previous = headings[index - 1];
    const current = headings[index];
    assert.ok(
      current.level <= previous.level + 1,
      `${route}: h${previous.level} 다음에 h${current.level}이 와서 제목 단계를 건너뜁니다.`,
    );
  }

  if (route === '/news') {
    const archiveStart = headings.findIndex(({ text }) => text === '외부 검증 자료');
    const archiveEnd = headings.findIndex(({ text }) => text === '직접 전하는 활동 기록');
    const reportHeadings = headings.slice(archiveStart + 1, archiveEnd);

    assert.ok(archiveStart >= 0 && archiveEnd > archiveStart, '/news: 언론보도 섹션 제목을 찾을 수 없습니다.');
    assert.equal(reportHeadings.length, reports.length, '/news: 기사 제목 수가 언론 데이터와 일치해야 합니다.');
    assert.ok(reportHeadings.every(({ level }) => level === 3), '/news: h2 섹션 아래 기사 제목은 모두 h3여야 합니다.');
  }
}

console.log(`제목 계층 검증 통과: ${pages.length}개 페이지`);
