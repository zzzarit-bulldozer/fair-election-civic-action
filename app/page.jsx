import Image from 'next/image';
import Link from 'next/link';
import JsonLd from './_components/JsonLd';
import RevealController from './_components/RevealController';
import SectionLabel from './_components/SectionLabel';
import SiteFooter from './_components/SiteFooter';
import SiteHeader from './_components/SiteHeader';
import { actions, nextAction, olgongTwoCut, reports, timeline } from './_data/content';
import { toIsoDate } from './_lib/date';
import { createHomeJsonLd } from './_lib/seo';
import { assetPath } from './_lib/site';

export default function HomePage() {
  const civicReport = reports.find((item) => item.id === 'newsis-suwon-20260613') ?? reports[0];
  const olgongReport = reports.find((item) => item.id === 'joongang-olgong-20260614')
    ?? reports.find((item) => item.project === 'olgong');
  const supportingReports = reports
    .filter((item) => item.id !== civicReport.id && item.project !== 'olgong')
    .slice(0, 2);

  return (
    <>
      <JsonLd id="home-json-ld" data={createHomeJsonLd()} />
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <Image src={assetPath('/images/civic-action-hero.webp')} alt="" fill priority sizes="100vw" quality={82} />
          </div>
          <div className="hero-scrim" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span /> GYEONGGI YOUTH ACTION</p>
            <h1 id="hero-title">
              <span>공정한 한 표,</span>
              <span>자유로운 선택. <em>끝까지 지킵니다.</em></span>
            </h1>
            <p className="hero-copy">듣고, 묻고, 확인하고, 함께 뛰겠습니다.</p>
            <ul className="hero-proof" aria-label="활동 원칙">
              <li>근거 기반</li>
              <li>공개 기록</li>
              <li>평화적 참여</li>
            </ul>
            <div className="hero-actions">
              <a className="text-link" href="#identity">우리는 누구인가 <span>↓</span></a>
              <Link className="text-link" href="/about">단체 소개 보기 <span>↗</span></Link>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true"><span>01</span><span>SCROLL TO ACT</span></div>
        </section>

        <section className="ticker" aria-label="핵심 가치">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <span className="ticker-set" key={copy}>
                <span>감시 WATCH</span><i>✳</i><span>검증 VERIFY</span><i>✳</i>
                <span>기록 RECORD</span><i>✳</i><span>행동 ACT</span><i>✳</i>
              </span>
            ))}
          </div>
        </section>

        <section className="manifesto section-pad" id="identity">
          <SectionLabel number="01">정체성 / 경기우파청년들</SectionLabel>
          <div className="manifesto-copy identity-copy reveal">
            <p className="kicker">아직 한 표를 행사하지 못한 유권자가 있습니다.</p>
            <h2>
              좌우가 아닌 <em>원칙</em>을, 의혹이 아닌 <em>대안</em>을, 침묵이 아닌 <em>행동</em>을 향합니다.
            </h2>
            <div className="manifesto-detail">
              <p>공정선거. 이를 위해 시민들과 함께 거리로 나섭니다. 현장에서 시민들의 목소리를 듣고, 모으고, 키웁니다. 누구나 참여할 수 있는 열린 행동으로, 공정한 대한민국을 함께 만들어갑니다.</p>
              <Link className="detail-link" href="/about">정체성과 원칙 자세히 보기 <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="actions" id="action" aria-labelledby="action-title">
          <div className="section-pad actions-intro">
            <SectionLabel number="02" inverse>우리가 하는 일</SectionLabel>
            <div className="actions-heading reveal">
              <p className="eyebrow"><span /> WHAT WE DO</p>
              <h2 id="action-title">
                공정과 자유의 가치를 바탕으로 질문을 하고, <em>답을 요구하고, 기록으로 남깁니다.</em>
              </h2>
            </div>
          </div>
          <div className="action-list section-pad">
            {actions.map((item) => (
              <article className="action-row reveal" key={item.number}>
                <span className="action-number">{item.number}</span>
                <div className="action-copy"><h3>{item.title}</h3><p>{item.description}</p></div>
                <span className="action-tag">{item.tag}</span>
              </article>
            ))}
            <Link className="action-list-link detail-link reveal" href="/activities">
              실제 활동과 참여 역할 보기 <span>↗</span>
            </Link>
          </div>
        </section>

        <section className="news section-pad" id="news" aria-labelledby="news-title">
          <SectionLabel number="03">언론보도 / 행동과 참여</SectionLabel>
          <div className="news-content">
            <div className="news-head reveal">
              <div>
                <p className="eyebrow"><span /> PRESS & ACTION</p>
                <h2 id="news-title">현장의 기록</h2>
              </div>
              <Link href="/news">언론보도 전체 보기 <span>↗</span></Link>
            </div>

            <article className="featured-news reveal">
              <a href={civicReport.href} target="_blank" rel="noreferrer" aria-label={`${civicReport.media} 공정선거시민행동 기사 새 창으로 보기`}>
                <div className="featured-visual" data-image-focus={civicReport.imageFocus}>
                  <Image src={assetPath(civicReport.image)} alt={civicReport.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" quality={82} />
                  <small className="news-image-credit">{civicReport.imageCredit}</small>
                  <span className="news-badge">공정선거시민행동</span>
                  <span className="view-arrow" aria-hidden="true">↗</span>
                </div>
                <div className="featured-copy">
                  <p className="project-kicker">공정선거시민행동</p>
                  <div className="news-meta"><span>{civicReport.media}</span><time dateTime={toIsoDate(civicReport.date)}>{civicReport.date}</time></div>
                  <h3>{civicReport.title}</h3>
                  <p>{civicReport.summary}</p>
                </div>
              </a>
            </article>

            {olgongReport ? (
              <article className="campaign-feature reveal">
                <a href={olgongReport.href} target="_blank" rel="noreferrer" aria-label={`${olgongReport.media} 올공두컷 기사 새 창으로 보기`}>
                  <div className="campaign-index"><span>CONTENT</span><strong>02</strong></div>
                  <div className="campaign-visual">
                    <Image src={assetPath(olgongReport.image)} alt={olgongReport.imageAlt} fill sizes="(max-width: 760px) 100vw, 360px" quality={82} />
                    <small className="news-image-credit">{olgongReport.imageCredit}</small>
                  </div>
                  <div className="campaign-copy">
                    <p>행동과 참여 · 현장 콘텐츠</p>
                    <h3>올공두컷</h3>
                    <span>{olgongTwoCut.title}. 누구나 휴대폰으로 찍고 평화로운 현장 기록을 남기는 공개 포토부스입니다.</span>
                  </div>
                  <span className="view-arrow" aria-hidden="true">↗</span>
                </a>
              </article>
            ) : null}

            <div className="news-list">
              {supportingReports.map((item) => (
                <article className="news-row reveal" key={item.id}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <div className="news-meta"><span>{item.media}</span><time dateTime={toIsoDate(item.date)}>{item.date}</time></div>
                    <h3>{item.title}</h3><span className="view-arrow" aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="journey-preview section-pad" aria-labelledby="journey-preview-title">
          <SectionLabel number="04" inverse>우리의 여정</SectionLabel>
          <div className="journey-preview-content">
            <div className="journey-preview-copy reveal">
              <p className="eyebrow"><span /> OUR JOURNEY</p>
              <h2 id="journey-preview-title">우리의 행동이, <em>시민의 참여로 이어졌습니다.</em></h2>
              <p>수원 올림픽공원 첫 행동부터 나혜석거리 {timeline.length}회차까지. 날짜, 장소, 포스터, 사진과 보도를 함께 남긴 공개 기록입니다.</p>
              <Link className="button button-accent" href="/history">우리의 여정 보기 <span>↗</span></Link>
            </div>
            <div className="journey-numbers reveal" aria-label="활동 기록 요약">
              <div><strong>{String(timeline.length).padStart(2, '0')}</strong><span>수원 행동 기록</span></div>
              <div><strong>{timeline.reduce((total, item) => total + item.photos.length, 0)}</strong><span>선별한 현장 사진</span></div>
              <div><strong>{timeline.reduce((total, item) => total + item.posters.length, 0)}</strong><span>공개 포스터 기록</span></div>
            </div>
          </div>
        </section>

        <section className="join" id="join" aria-labelledby="join-title">
          <div className="join-noise" aria-hidden="true" />
          <div className="join-content reveal">
            <p className="eyebrow"><span /> JOIN US</p>
            <h2 id="join-title">
              <span>자유민주주의는</span>
              <em>누리는 것이 아니라</em>
              <span>함께 만드는 것입니다.</span>
            </h2>
            <p>행동과 기록, 다음 현장 일정은 공식 Threads와 팀채팅방에서 가장 먼저 안내합니다.</p>
            <div className="join-status"><span>{nextAction.label}</span><p>{nextAction.description}</p></div>
            <Link className="button button-dark" data-primary-cta href="/join">
              참여 방법 보기 <span>↗</span>
            </Link>
          </div>
          <div className="join-word" aria-hidden="true">ACTION</div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
