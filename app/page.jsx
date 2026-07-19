import Image from 'next/image';
import Link from 'next/link';
import RevealController from './_components/RevealController';
import SectionLabel from './_components/SectionLabel';
import SiteFooter from './_components/SiteFooter';
import SiteHeader from './_components/SiteHeader';
import { actions, olgongTwoCut, reports } from './_data/content';
import { toIsoDate } from './_lib/date';
import { assetPath } from './_lib/site';

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <Image src={assetPath('/images/civic-action-hero.jpg')} alt="" fill priority sizes="100vw" quality={82} />
          </div>
          <div className="hero-scrim" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span /> SUWON · CITIZEN ACTION</p>
            <h1 id="hero-title">
              <span>한 표의 무게를</span>
              <span>끝까지 <em>지킵니다.</em></span>
            </h1>
            <p className="hero-copy">
              공개 자료와 현장 기록을 바탕으로 질문하고, 확인하고, 평화롭게 움직입니다.
            </p>
            <ul className="hero-proof" aria-label="활동 원칙">
              <li>근거 기반</li>
              <li>공개 기록</li>
              <li>평화적 참여</li>
            </ul>
            <div className="hero-actions">
              <a className="button button-accent" href="#action">활동 방식 보기 <span>↓</span></a>
              <Link className="text-link" href="/about">우리를 더 알아보기 <span>↗</span></Link>
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

        <section className="manifesto section-pad" id="about">
          <SectionLabel number="01">우리는 누구인가</SectionLabel>
          <div className="manifesto-copy reveal">
            <p className="kicker">선거는 하루지만 민주주의는 매일입니다.</p>
            <h2>
              정파가 아니라 <em>원칙</em>을, 의심이 아니라 <em>검증</em>을, 침묵이 아니라 <em>행동</em>을 선택합니다.
            </h2>
            <div className="manifesto-detail">
              <p>공정선거시민행동은 수원에서 시작된 시민 네트워크입니다. 현장을 기록하고 공개 자료를 확인하며, 누구나 참여할 수 있는 평화로운 행동의 문을 넓힙니다.</p>
              <Link className="detail-link" href="/about">단체 소개 자세히 보기 <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="actions" id="action" aria-labelledby="action-title">
          <div className="section-pad actions-intro">
            <SectionLabel number="02" inverse>우리가 하는 일</SectionLabel>
            <div className="actions-heading reveal">
              <p className="eyebrow"><span /> WHAT WE DO</p>
              <h2 id="action-title">질문을 기록으로 남기고, <em>현장에서 답을 만듭니다.</em></h2>
            </div>
          </div>
          <div className="action-list section-pad">
            {actions.map((item) => (
              <Link className="action-row reveal" href="/activities" key={item.number}>
                <span className="action-number">{item.number}</span>
                <div className="action-copy"><h3>{item.title}</h3><p>{item.description}</p></div>
                <span className="action-tag">{item.tag}</span>
                <span className="action-arrow">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="news section-pad" id="news" aria-labelledby="news-title">
          <SectionLabel number="03">지금, 시민행동</SectionLabel>
          <div className="news-content">
            <div className="news-head reveal">
              <h2 id="news-title">현장의 기록</h2>
              <Link href="/news">언론보도 전체 보기 <span>↗</span></Link>
            </div>

            <article className="featured-news reveal">
              <a href={reports[0].href} target="_blank" rel="noreferrer" aria-label="뉴시스 수원 집회 기사 새 창으로 보기">
                <div className="featured-visual" data-image-focus={reports[0].imageFocus}>
                  <Image src={assetPath(reports[0].image)} alt={reports[0].imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" quality={78} />
                  <small className="news-image-credit">{reports[0].imageCredit}</small>
                  <span className="news-badge">수원 현장</span><span className="view-arrow">↗</span>
                </div>
                <div className="featured-copy">
                  <div className="news-meta"><span>뉴시스</span><time dateTime="2026-06-13">2026. 06. 13</time></div>
                  <h3>유모차 끌고, 돗자리 깔고…수원 시민들이 모였습니다</h3>
                  <p>수원 올림픽공원에서 가족, 청년, 어르신이 함께한 첫 현장을 기록했습니다.</p>
                </div>
              </a>
            </article>

            <article className="campaign-feature reveal">
              <a href={olgongTwoCut.appUrl} target="_blank" rel="noreferrer">
                <div className="campaign-index"><span>CONTENT</span><strong>01</strong></div>
                <div className="campaign-copy"><p>시민이 만든 현장 콘텐츠</p><h3>올공두컷</h3><span>{olgongTwoCut.title}. 누구나 휴대폰으로 찍고, 평화로운 기억을 남기는 공개 포토부스.</span></div>
                <div className="campaign-symbol" aria-hidden="true">▣</div><span className="view-arrow">↗</span>
              </a>
            </article>

            <div className="news-list">
              {reports.slice(2, 4).map((item) => (
                <article className="news-row reveal" key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <div className="news-meta"><span>{item.media}</span><time dateTime={toIsoDate(item.date)}>{item.date}</time></div>
                    <h3>{item.title}</h3><span className="view-arrow">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="journey-preview section-pad" aria-labelledby="journey-preview-title">
          <SectionLabel number="04" inverse>걸어온 발자취</SectionLabel>
          <div className="journey-preview-content">
            <div className="journey-preview-copy reveal">
              <p className="eyebrow"><span /> OUR JOURNEY</p>
              <h2 id="journey-preview-title">한 번의 집회가 <em>이어지는 행동이 되었습니다.</em></h2>
              <p>수원 올림픽공원에서 시작해 나혜석거리 여섯 번째 행동까지. 날짜, 장소, 포스터, 보도를 함께 남긴 공개 기록입니다.</p>
              <Link className="button button-accent" href="/history">전체 발자취 보기 <span>↗</span></Link>
            </div>
            <div className="journey-numbers reveal" aria-label="활동 기록 요약">
              <div><strong>06</strong><span>이어진 수원 행동</span></div>
              <div><strong>300</strong><span>첫날 보도 기준 누적 참여</span></div>
              <div><strong>04</strong><span>감시·검증·행동·연대</span></div>
            </div>
          </div>
        </section>

        <section className="join" id="join" aria-labelledby="join-title">
          <div className="join-noise" aria-hidden="true" />
          <div className="join-content reveal">
            <p className="eyebrow"><span /> JOIN THE ACTION</p>
            <h2 id="join-title">민주주의는 <em>구경하는 것이 아니라</em> 함께 만드는 것.</h2>
            <p>다음 행동과 현장 공지는 공식 Threads에서 가장 먼저 확인할 수 있습니다.</p>
            <a className="button button-dark" href="https://www.threads.com/@fairly_evenly?hl=ko" target="_blank" rel="noreferrer">공식 Threads 보기 <span>↗</span></a>
          </div>
          <div className="join-word" aria-hidden="true">ACTION</div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
