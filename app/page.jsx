import Image from 'next/image';
import Link from 'next/link';
import JsonLd from './_components/JsonLd';
import RevealController from './_components/RevealController';
import SectionLabel from './_components/SectionLabel';
import SiteFooter from './_components/SiteFooter';
import SiteHeader from './_components/SiteHeader';
import { actions, nextAction, reports, timeline } from './_data/content';
import { toIsoDate } from './_lib/date';
import { createHomeJsonLd } from './_lib/seo';
import { assetPath } from './_lib/site';

export default function HomePage() {
  const civicReport = reports.find((item) => item.id === 'newsis-suwon-20260613') ?? reports[0];
  const latestAction = timeline.at(-1);
  const latestPhoto = latestAction.photos[0];

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

        <section className="evidence-preview section-pad" aria-labelledby="evidence-title">
          <SectionLabel number="03">자체 기록과 외부 검증</SectionLabel>
          <div className="evidence-head reveal">
            <p className="eyebrow"><span /> PROOF & RECORDS</p>
            <h2 id="evidence-title">우리가 남긴 기록과 언론이 확인한 현장을 함께 봅니다.</h2>
          </div>
          <div className="evidence-grid">
            <article className="evidence-panel evidence-panel-history reveal">
              <Link href="/history">
                <figure>
                  <Image
                    src={assetPath(latestPhoto.src)}
                    alt={latestPhoto.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </figure>
                <div className="evidence-panel-copy">
                  <p>자체 활동 기록 · {latestAction.session}</p>
                  <time dateTime={toIsoDate(latestAction.date)}>{latestAction.date} · {latestAction.place}</time>
                  <h3>{latestAction.title}</h3>
                  <span>발자취 보기 ↗</span>
                </div>
              </Link>
            </article>
            <article className="evidence-panel evidence-panel-press reveal">
              <a href={civicReport.href} target="_blank" rel="noreferrer">
                <figure data-image-focus={civicReport.imageFocus}>
                  <Image
                    src={assetPath(civicReport.image)}
                    alt={civicReport.imageAlt}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                    quality={82}
                  />
                  <figcaption>{civicReport.imageCredit}</figcaption>
                </figure>
                <div className="evidence-panel-copy">
                  <p>외부 검증 자료 · {civicReport.media}</p>
                  <time dateTime={toIsoDate(civicReport.date)}>{civicReport.date}</time>
                  <h3>{civicReport.title}</h3>
                  <span>기사 원문 보기 ↗</span>
                </div>
              </a>
              <Link className="evidence-all-link" href="/news">언론보도 전체 보기 ↗</Link>
            </article>
          </div>
        </section>

        <section className="join" id="join" aria-labelledby="join-title">
          <div className="join-noise" aria-hidden="true" />
          <div className="join-content reveal">
            <p className="eyebrow"><span /> NEXT ACTION</p>
            <h2 id="join-title">
              <span>자유민주주의는</span>
              <em>누리는 것이 아니라</em>
              <span>함께 만드는 것입니다.</span>
            </h2>
            <p>현장 참여, 운영 지원, 소식 확인 중 나에게 맞는 다음 행동을 확인합니다.</p>
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
