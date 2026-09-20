import { faqs, reports, timeline } from '../_data/content.js';
import { pageUrl, siteDescription, siteName, siteShortName } from '../_lib/seo.js';

export const dynamic = 'force-static';

const pages = [
  ['/about', '단체 소개', '정체성, 원칙, 자주 묻는 질문'],
  ['/activities', '활동', '감시·검증·행동·연대 활동 방식'],
  ['/history', '우리의 여정', `수원 올림픽공원 첫 행동부터 ${timeline.length}회차까지의 날짜·장소·포스터·사진 기록`],
  ['/organization', '조직과 운영', '상임대표와 임원진, 운영 계획'],
  ['/news', '언론보도', '활동을 다룬 외부 보도 모음'],
  ['/join', '참여하기', '현장 참여, 운영 지원, 소식 확인 방법'],
];

export function GET() {
  const body = [
    `# ${siteName} (${siteShortName})`,
    '',
    `> ${siteDescription}`,
    '',
    '## 핵심 사실',
    '',
    ...faqs.map(({ question, answer }) => `- **${question}** ${answer}`),
    '',
    '## 페이지',
    '',
    ...pages.map(([path, name, note]) => `- [${name}](${pageUrl(path)}): ${note}`),
    '',
    '## 외부 보도',
    '',
    ...reports.map((item) => `- [${item.media} ${item.date} — ${item.title}](${item.href})`),
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
