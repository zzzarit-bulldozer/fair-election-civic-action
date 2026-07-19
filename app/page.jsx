import Image from 'next/image';
import Link from 'next/link';
import RevealController from './_components/RevealController';
import SectionLabel from './_components/SectionLabel';
import SiteFooter from './_components/SiteFooter';
import SiteHeader from './_components/SiteHeader';
import { actions, reports } from './_data/content';
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
              선거의 모든 과정이 투명해질 때까지.
              <br />
              우리는 감시하고, 알리고, 함께 행동합니다.
            </p>
            <div className="hero-actions">
              <a className="button button-accent" href="#action">지금 하는 일 <span>↓</span></a>
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
            <p className="kicker">선거는 하루지만,<br />민주주의는 매일입니다.</p>
            <h2>
              정파가 아니라 <em>원칙</em>을,<br />
              의심이 아니라 <em>검증</em>을,<br />
              침묵이 아니라 <em>행동</em>을 선택합니다.
            </h2>
            <div className="manifesto-detail">
              <p>공정선거시민행동은 수원에서 시작된 시민 네트워크입니다. 사실에 근거해 질문하고, 현장을 기록하며, 평화로운 시민 참여의 문을 넓힙니다.</p>
              <Link className="detail-link" href="/about">단체 소개 자세히 보기 <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="actions" id="action" aria-labelledby="action-title">
          <div className="section-pad actions-intro">
            <SectionLabel number="02" inverse>우리가 하는 일</SectionLabel>
            <div className="actions-heading reveal">
              <p className="eyebrow"><span /> WHAT WE DO</p>
              <h2 id="action-title">질문에서 멈추지 않고,<br /><em>현장에서 답을 만듭니다.</em></h2>
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
              <a href="https://www.joongang.co.kr/article/25436607" target="_blank" rel="noreferrer">
                <div className="campaign-index"><span>CONTENT</span><strong>01</strong></div>
                <div className="campaign-copy"><p>시민이 만든 현장 콘텐츠</p><h3>올공두컷</h3><span>집회의 기억을 시민의 사진으로 남긴 즉석사진 프로젝트.</span></div>
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
              <h2 id="journey-preview-title">한 번의 집회가<br /><em>이어지는 행동이 되었습니다.</em></h2>
              <p>수원 올림픽공원에서 시작해 나혜석거리 6회차까지. 시민이 만들고 시민이 이어온 기록입니다.</p>
              <Link className="button button-accent" href="/history">전체 발자취 보기 <span>↗</span></Link>
            </div>
            <div className="journey-numbers reveal" aria-label="활동 기록 요약">
              <div><strong>06</strong><span>이어진 수원 행동</span></div>
              <div><strong>300</strong><span>첫날 언론 보도 누적 참여</span></div>
              <div><strong>04</strong><span>감시·검증·행동·연대</span></div>
            </div>
          </div>
        </section>

        <section className="join" id="join" aria-labelledby="join-title">
          <div className="join-noise" aria-hidden="true" />
          <div className="join-content reveal">
            <p className="eyebrow"><span /> JOIN THE ACTION</p>
            <h2 id="join-title">민주주의는<br /><em>구경하는 것이 아니라</em><br />함께 만드는 것.</h2>
            <p>당신의 질문, 기록, 목소리가 다음 행동의 시작입니다.</p>
            <a className="button button-dark" href="https://www.threads.com/@fairly_evenly?hl=ko" target="_blank" rel="noreferrer">전시언 공식 Threads <span>↗</span></a>
          </div>
          <div className="join-word" aria-hidden="true">ACTION</div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
