import Link from 'next/link';
import BreadcrumbJsonLd from '../_components/BreadcrumbJsonLd';
import DetailHero from '../_components/DetailHero';
import NewsArchive from '../_components/NewsArchive';
import PageActions from '../_components/PageActions';
import RevealController from '../_components/RevealController';
import SiteFooter from '../_components/SiteFooter';
import SiteHeader from '../_components/SiteHeader';
import { reports } from '../_data/content';
import { createPageMetadata } from '../_lib/seo';

export const metadata = createPageMetadata({
  title: '언론보도',
  description: '수원 발언·집회·보도 기록을 공정선거시민행동 중심으로 분류해 모았습니다.',
  path: '/news',
});

export default function NewsPage() {
  return (
    <>
      <BreadcrumbJsonLd name="언론보도" path="/news" />
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main detail-main-news">
        <DetailHero index="05" eyebrow="PRESS & RECORDS" title="언론이 기록한 시민행동의 현장" description="직접 보도, 재전송 기사, 소셜 기록을 구분해 출처와 함께 모았습니다." word="PRESS" />

        <section className="reports-section detail-section" aria-labelledby="reports-title">
          <div className="detail-section-head reveal"><span>PRESS ARCHIVE</span><h2 id="reports-title">외부 검증 자료</h2></div>
          <p className="reports-intro reveal">우리의 자체 활동 기록과 분리해, 언론 기사와 인터뷰·시민 콘텐츠의 원문을 한곳에서 관리합니다.</p>
          <NewsArchive reports={reports} />
          <p className="report-note reveal">기사 제목 일부는 홈페이지 문맥에 맞게 요약했습니다. 원문은 각 링크에서 확인할 수 있습니다.</p>
        </section>

        <section className="social-records detail-section" aria-labelledby="social-title">
          <div className="detail-section-head reveal"><span>SOCIAL RECORDS</span><h2 id="social-title">직접 전하는 활동 기록</h2></div>
          <div className="social-link-list">
            <a className="reveal" href="https://www.threads.com/@fairly_evenly?hl=ko" target="_blank" rel="noreferrer"><span>OFFICIAL THREADS</span><strong>전시언 · 공정선거 시민행동 공식 채널</strong><b>↗</b></a>
            <a className="reveal" href="https://www.threads.com/%40gibalza_" target="_blank" rel="noreferrer"><span>THREADS</span><strong>올공두컷 운영 기록</strong><b>↗</b></a>
            <a className="reveal" href="https://revotemapkr.netlify.app/" target="_blank" rel="noreferrer"><span>PUBLIC MAP</span><strong>전국 시민행동 일정 지도</strong><b>↗</b></a>
            <Link className="reveal" href="/join"><span>JOIN GUIDE</span><strong>참여 방법 확인하기</strong><b>↗</b></Link>
          </div>
        </section>

        <section className="source-policy detail-section">
          <p className="reveal">EDITORIAL RULE</p>
          <div className="reveal"><h2>주장과 사실, 현장과 누적을 구분합니다.</h2><p>단체명 표기와 참가 인원은 기사마다 차이가 있습니다. 홈페이지는 하나의 숫자로 단정하지 않고 보도 시점과 출처를 함께 밝힙니다.</p></div>
        </section>

        <PageActions
          related={{ href: '/history', label: '자체 발자취 보기' }}
          action={{ href: '/join', label: '참여 방법 보기' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
