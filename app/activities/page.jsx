import Link from 'next/link';
import DetailHero from '../_components/DetailHero';
import RevealController from '../_components/RevealController';
import SiteFooter from '../_components/SiteFooter';
import SiteHeader from '../_components/SiteHeader';
import { actions, olgongTwoCut } from '../_data/content';

export const metadata = {
  title: '주요 활동 | 공정선거시민행동',
  description: '공정선거시민행동의 현장 기록, 자료 검증, 시민행동과 연대 활동을 소개합니다.',
};

export default function ActivitiesPage() {
  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main">
        <DetailHero index="02" eyebrow="WHAT WE DO" title="질문을 기록으로, 기록을 행동으로" description="현장을 지켜보고, 자료를 검증하고, 시민이 참여할 수 있는 방식으로 공론장을 엽니다." word="ACTION" />

        <section className="activity-detail-list detail-section" aria-label="주요 활동">
          {actions.map((item) => (
            <article className="activity-detail-row reveal" key={item.number}>
              <div className="activity-detail-index"><span>{item.number}</span><small>{item.tag}</small></div>
              <div><h2>{item.title}</h2><p>{item.description}</p></div>
              <strong aria-hidden="true">↗</strong>
            </article>
          ))}
        </section>

        <section className="field-content detail-section">
          <div className="field-content-index reveal"><span>FIELD CONTENT</span><strong>올공두컷</strong></div>
          <div className="field-content-copy reveal">
            <p className="eyebrow"><span /> {olgongTwoCut.eyebrow}</p>
            <h2>{olgongTwoCut.title}</h2>
            <p>{olgongTwoCut.summary}</p>
            <p>{olgongTwoCut.principle}</p>
            <ul className="field-content-points" aria-label="올공두컷 핵심 메시지">
              {olgongTwoCut.points.map(([label, text]) => (
                <li key={label}><span>{label}</span><strong>{text}</strong></li>
              ))}
            </ul>
            <div className="field-content-links" aria-label="올공두컷 링크">
              <a className="detail-link" href={olgongTwoCut.appUrl} target="_blank" rel="noreferrer">올공두컷 찍기 <span>↗</span></a>
              <a className="detail-link" href={olgongTwoCut.sourceUrl} target="_blank" rel="noreferrer">원문 보기 <span>↗</span></a>
              <a className="detail-link" href={olgongTwoCut.stepsUrl} target="_blank" rel="noreferrer">사용법 보기 <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="process-section detail-section" aria-labelledby="process-title">
          <div className="detail-section-head reveal"><span>HOW WE WORK</span><h2 id="process-title">행동하는 순서</h2></div>
          <ol className="process-list">
            <li className="reveal"><span>01</span><div><h3>듣습니다</h3><p>현장과 시민의 질문을 먼저 모읍니다.</p></div></li>
            <li className="reveal"><span>02</span><div><h3>확인합니다</h3><p>공개 자료와 언론 보도를 교차 확인합니다.</p></div></li>
            <li className="reveal"><span>03</span><div><h3>기록합니다</h3><p>누가 보아도 이해할 수 있는 기록을 남깁니다.</p></div></li>
            <li className="reveal"><span>04</span><div><h3>함께 움직입니다</h3><p>평화로운 집회와 콘텐츠로 참여의 문을 엽니다.</p></div></li>
          </ol>
        </section>

        <nav className="page-next section-pad" aria-label="다음 페이지">
          <Link href="/history"><span>행동이 쌓인 기록</span><strong>발자취 보기 ↗</strong></Link>
          <Link href="/news"><span>언론이 기록한 현장</span><strong>언론보도 보기 ↗</strong></Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
