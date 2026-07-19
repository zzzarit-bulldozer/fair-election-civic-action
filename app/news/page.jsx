import Image from 'next/image';
import Link from 'next/link';
import DetailHero from '../_components/DetailHero';
import RevealController from '../_components/RevealController';
import SiteFooter from '../_components/SiteFooter';
import SiteHeader from '../_components/SiteHeader';
import { reports } from '../_data/content';
import { toIsoDate } from '../_lib/date';
import { assetPath } from '../_lib/site';

export const metadata = {
  title: '언론보도 | 공정선거시민행동',
  description: '수원 공정선거시민행동, 전시언, 올공두컷과 관련된 공개 보도를 모았습니다.',
};

export default function NewsPage() {
  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main">
        <DetailHero index="05" eyebrow="PRESS & RECORDS" title={<>언론이 기록한<br />시민행동의 현장</>} description="직접 보도, 재전송 기사, 소셜 기록을 구분해 출처와 함께 모았습니다." word="PRESS" />

        <section className="reports-section detail-section" aria-labelledby="reports-title">
          <div className="detail-section-head reveal"><span>PRESS ARCHIVE</span><h2 id="reports-title">주요 보도</h2></div>
          <div className="report-list">
            {reports.map((item, index) => (
              <article className="report-row reveal" key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <span className="report-number">{String(index + 1).padStart(2, '0')}</span>
                  <div className="report-meta"><strong>{item.category}</strong><span>{item.media} · <time dateTime={toIsoDate(item.date)}>{item.date}</time></span></div>
                  <figure className="report-visual" data-image-focus={item.imageFocus}>
                    <Image src={assetPath(item.image)} alt={item.imageAlt} fill sizes="(max-width: 760px) 80vw, 220px" />
                    <figcaption>{item.imageCredit}</figcaption>
                  </figure>
                  <div className="report-copy"><h2>{item.title}</h2><p>{item.summary}</p></div>
                  <span className="view-arrow">↗</span>
                </a>
              </article>
            ))}
          </div>
          <p className="report-note reveal">기사 제목 일부는 홈페이지 문맥에 맞게 요약했습니다. 원문은 각 링크에서 확인할 수 있습니다.</p>
        </section>

        <section className="social-records detail-section" aria-labelledby="social-title">
          <div className="detail-section-head reveal"><span>SOCIAL RECORDS</span><h2 id="social-title">직접 전하는 활동 기록</h2></div>
          <div className="social-link-list">
            <a className="reveal" href="https://www.threads.com/@fairly_evenly?hl=ko" target="_blank" rel="noreferrer"><span>OFFICIAL THREADS</span><strong>전시언 · 공정선거 시민행동 from 수원</strong><b>↗</b></a>
            <a className="reveal" href="https://www.threads.com/%40gibalza_" target="_blank" rel="noreferrer"><span>THREADS</span><strong>올공두컷 운영 기록</strong><b>↗</b></a>
            <a className="reveal" href="https://revotemapkr.netlify.app/" target="_blank" rel="noreferrer"><span>PUBLIC MAP</span><strong>전국 시민행동 일정 지도</strong><b>↗</b></a>
          </div>
        </section>

        <section className="source-policy detail-section">
          <p className="reveal">EDITORIAL RULE</p>
          <div className="reveal"><h2>주장과 사실,<br />현장과 누적을 구분합니다.</h2><p>단체명 표기와 참가 인원은 기사마다 차이가 있습니다. 홈페이지는 하나의 숫자로 단정하지 않고 보도 시점과 출처를 함께 밝힙니다.</p><Link className="detail-link" href="/history">발자취에서 기준 보기 <span>↗</span></Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
