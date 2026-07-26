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
  title: '언론보도 | 경기우파청년들',
  description: '수원 발언·집회·보도 기록을 공정선거시민행동 중심으로 분류해 모았습니다.',
};

export default function NewsPage() {
  const olgongReports = reports.filter((item) => item.project === 'olgong');
  const civicReports = reports.filter((item) => !olgongReports.includes(item));
  const reportGroups = [
    {
      id: 'civic-action',
      eyebrow: 'ACTION 01',
      title: '공정선거시민행동',
      description: '수원에서 시작한 집회와 선거 현장의 질문, 전시언의 공개 발언을 모았습니다.',
      items: civicReports,
    },
    {
      id: 'olgong-two-cut',
      eyebrow: 'ACTION 02',
      title: '올공두컷',
      description: '광장에 웃음과 기억을 남긴 시민 참여형 포토 콘텐츠의 보도를 모았습니다.',
      items: olgongReports,
    },
  ];

  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main">
        <DetailHero index="05" eyebrow="PRESS & RECORDS" title="언론이 기록한 시민행동의 현장" description="직접 보도, 재전송 기사, 소셜 기록을 구분해 출처와 함께 모았습니다." word="PRESS" />

        <section className="reports-section detail-section" aria-labelledby="reports-title">
          <div className="detail-section-head reveal"><span>PRESS ARCHIVE</span><h2 id="reports-title">행동별 언론보도</h2></div>
          {reportGroups.map((group) => (
            <section className="report-group" id={group.id} aria-labelledby={`${group.id}-title`} key={group.id}>
              <div className="report-group-head reveal">
                <span>{group.eyebrow}</span>
                <h2 id={`${group.id}-title`}>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <div className="report-list">
                {group.items.map((item, index) => (
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
            </section>
          ))}
          <p className="report-note reveal">기사 제목 일부는 홈페이지 문맥에 맞게 요약했습니다. 원문은 각 링크에서 확인할 수 있습니다.</p>
        </section>

        <section className="social-records detail-section" aria-labelledby="social-title">
          <div className="detail-section-head reveal"><span>SOCIAL RECORDS</span><h2 id="social-title">직접 전하는 활동 기록</h2></div>
          <div className="social-link-list">
            <a className="reveal" href="https://www.threads.com/@fairly_evenly?hl=ko" target="_blank" rel="noreferrer"><span>OFFICIAL THREADS</span><strong>전시언 · 공정선거 시민행동 공식 채널</strong><b>↗</b></a>
            <a className="reveal" href="https://www.threads.com/%40gibalza_" target="_blank" rel="noreferrer"><span>THREADS</span><strong>올공두컷 운영 기록</strong><b>↗</b></a>
            <a className="reveal" href="https://revotemapkr.netlify.app/" target="_blank" rel="noreferrer"><span>PUBLIC MAP</span><strong>전국 시민행동 일정 지도</strong><b>↗</b></a>
            <button className="reveal" type="button" aria-label="오픈 카톡방(준비중)"><span>OPEN CHAT</span><strong>오픈 카톡방 입장하기</strong><b>↗</b></button>
          </div>
        </section>

        <section className="source-policy detail-section">
          <p className="reveal">EDITORIAL RULE</p>
          <div className="reveal"><h2>주장과 사실, 현장과 누적을 구분합니다.</h2><p>단체명 표기와 참가 인원은 기사마다 차이가 있습니다. 홈페이지는 하나의 숫자로 단정하지 않고 보도 시점과 출처를 함께 밝힙니다.</p><Link className="detail-link" href="/history">발자취에서 기준 보기 <span>↗</span></Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
