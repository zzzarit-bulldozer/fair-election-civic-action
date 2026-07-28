import DetailHero from '../_components/DetailHero';
import PageActions from '../_components/PageActions';
import PosterGallery from '../_components/PosterGallery';
import RevealController from '../_components/RevealController';
import SiteFooter from '../_components/SiteFooter';
import SiteHeader from '../_components/SiteHeader';
import { getReportsByIds, historyEvidenceIds, timeline } from '../_data/content';
import { toIsoDate } from '../_lib/date';

export const metadata = {
  title: '우리의 여정 | 경기우파청년들',
  description: '수원 올림픽공원 첫 집회부터 이어진 공개 활동 기록과 포스터·보도를 정리합니다.',
};

export default function HistoryPage() {
  const posterCount = timeline.reduce((total, item) => total + item.posters.length, 0);
  const photoCount = timeline.reduce((total, item) => total + (item.photos?.length ?? 0), 0);
  const historyEvidence = getReportsByIds(historyEvidenceIds);

  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main detail-main-history">
        <DetailHero index="03" eyebrow="OUR JOURNEY" title="수원의 광장을 잇는 일곱 번의 기록" description="날짜, 장소, 포스터와 사진을 기준으로 정리한 공정선거시민행동의 자체 활동 기록입니다." word="JOURNEY" />

        <section className="history-detail detail-section" aria-label="활동 연혁">
          <div className="history-rail" aria-hidden="true" />
          {timeline.map((item, index) => {
            const reportSources = getReportsByIds(item.reportIds ?? []);

            return (
              <article className={`history-detail-row reveal${item.posters?.length ? ' has-poster' : ''}`} key={`${item.date}-${item.title}`}>
                <div className="history-year">
                  <span>{String(index + 1).padStart(2, '0')} · {item.session}</span>
                  <time dateTime={toIsoDate(item.date)}>{item.date}</time>
                </div>
                <div className="history-detail-copy">
                  <div className="history-event-meta"><span>{item.time}</span><span>{item.place}</span></div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                  {item.link ? <a href={item.link} target="_blank" rel="noreferrer">{item.source} 확인 ↗</a> : null}
                  {reportSources.map((report) => (
                    <a href={report.href} key={report.id} target="_blank" rel="noreferrer">{report.media} 현장 보도 확인 ↗</a>
                  ))}
                </div>
                {item.posters?.length ? <PosterGallery posters={item.posters} photos={item.photos} session={item.session} /> : null}
              </article>
            );
          })}
        </section>

        <section className="history-references detail-section" aria-labelledby="history-evidence-title">
          <div className="detail-section-head reveal">
            <span>EXTERNAL REFERENCES</span>
            <h2 id="history-evidence-title">이 활동을 확인한 외부 기록</h2>
          </div>
          <div className="history-reference-list">
            {historyEvidence.map((item, index) => (
              <article className="history-reference-row reveal" key={item.id}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><p>{item.media} · {item.date}</p><h3>{item.title}</h3></div>
                  <span className="view-arrow" aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
          <p className="history-reference-note reveal">기사의 상세 분류와 원문은 언론보도에서 한곳에 모아 확인할 수 있습니다.</p>
        </section>

        <section className="history-note detail-section">
          <p className="reveal">기록의 기준</p>
          <div className="reveal"><h2>포스터와 사진, 기사까지 함께 봅니다.</h2><p>1~{timeline.length}회차의 날짜·시간·장소는 전시언의 공식 Threads 게시물과 직접 제공된 원본 자료를 기준으로 정리했습니다. 같은 날 제작된 여러 시안까지 {posterCount}장의 포스터를 바로 확인할 수 있고, 선별한 현장 사진 {photoCount}장은 회차별 사진보기에서 열람할 수 있습니다. 첫날 참가 인원은 보도 시점별로 약 40명·50명, 하루 누적 약 300명으로 집계 기준이 달라 출처와 함께 밝힙니다.</p></div>
        </section>

        <PageActions
          related={{ href: '/news', label: '언론 근거 보기' }}
          action={{ href: '/join', label: '다음 행동 확인' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
