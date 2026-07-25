import Image from 'next/image';
import Link from 'next/link';
import DetailHero from '../_components/DetailHero';
import PosterGallery from '../_components/PosterGallery';
import RevealController from '../_components/RevealController';
import SiteFooter from '../_components/SiteFooter';
import SiteHeader from '../_components/SiteHeader';
import { historyEvidence, timeline } from '../_data/content';
import { toIsoDate } from '../_lib/date';
import { assetPath } from '../_lib/site';

export const metadata = {
  title: '걸어온 발자취 | 공정선거시민행동',
  description: '수원 올림픽공원 첫 집회부터 이어진 공정선거시민행동의 공개 활동 기록입니다.',
};

export default function HistoryPage() {
  const posterCount = timeline.reduce((total, item) => total + item.posters.length, 0);

  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main">
        <DetailHero index="03" eyebrow="OUR JOURNEY" title="수원의 광장을 잇는 일곱 번의 기록" description="전시언의 공식 Threads 포스터와 공개 언론 보도를 기준으로 정리한 수원 시민행동 타임라인입니다." word="JOURNEY" />

        <section className="history-detail detail-section" aria-label="활동 연혁">
          <div className="history-rail" aria-hidden="true" />
          {timeline.map((item, index) => (
            <article className={`history-detail-row reveal${item.posters?.length ? ' has-poster' : ''}`} key={`${item.date}-${item.title}`}>
              <div className="history-year">
                <span>{String(index + 1).padStart(2, '0')} · {item.session}</span>
                <time dateTime={toIsoDate(item.date)}>{item.date}</time>
              </div>
              <div className="history-detail-copy">
                <div className="history-event-meta"><span>{item.time}</span><span>{item.place}</span></div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <a href={item.link} target="_blank" rel="noreferrer">{item.source} 확인 ↗</a>
              </div>
              {item.posters?.length ? <PosterGallery posters={item.posters} session={item.session} /> : null}
            </article>
          ))}
        </section>

        <section className="history-evidence detail-section" aria-labelledby="history-evidence-title">
          <div className="detail-section-head reveal">
            <span>PRESS ARCHIVE</span>
            <h2 id="history-evidence-title">기록이 된 현장의 목소리</h2>
          </div>
          <div className="history-evidence-list">
            {historyEvidence.map((item, index) => (
              <article className="history-evidence-row reveal" key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <div className="history-evidence-index">
                    <strong>{String(index + 1).padStart(2, '0')}</strong>
                    <time dateTime={toIsoDate(item.date)}>{item.date}</time>
                  </div>
                  <figure className="history-evidence-visual" data-image-focus={item.imageFocus}>
                    <Image src={assetPath(item.image)} alt={item.imageAlt} fill sizes="(max-width: 760px) 82vw, 260px" />
                    <figcaption>{item.imageCredit}</figcaption>
                  </figure>
                  <div className="history-evidence-copy">
                    <p className="history-evidence-meta"><span>{item.category}</span>{item.media} · {item.relation}</p>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </div>
                  <span className="view-arrow" aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="history-note detail-section">
          <p className="reveal">기록의 기준</p>
          <div className="reveal"><h2>포스터와 기사, 두 기록을 함께 봅니다.</h2><p>1~{timeline.length}회차의 날짜·시간·장소는 전시언의 공식 Threads 게시물과 직접 제공된 원본 포스터를 기준으로 정리했습니다. 같은 날 제작된 여러 시안까지 {posterCount}장의 포스터를 회차별로 함께 보존합니다. 첫날 참가 인원은 보도 시점별로 약 40명·50명, 하루 누적 약 300명으로 집계 기준이 달라 출처와 함께 밝힙니다.</p></div>
        </section>

        <nav className="page-next section-pad" aria-label="다음 페이지">
          <Link href="/organization"><span>행동을 만드는 사람들</span><strong>조직 보기 ↗</strong></Link>
          <Link href="/news"><span>기록의 근거</span><strong>언론보도 보기 ↗</strong></Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
