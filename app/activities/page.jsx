import DetailHero from '../_components/DetailHero';
import PageActions from '../_components/PageActions';
import RevealController from '../_components/RevealController';
import SiteFooter from '../_components/SiteFooter';
import SiteHeader from '../_components/SiteHeader';
import { actions, olgongTwoCut, participationWays } from '../_data/content';

export const metadata = {
  title: '주요 활동 | 경기우파청년들',
  description: '현장을 감시하고 검증하고 참여를 연결하는 경기우파청년들의 활동을 소개합니다.',
};

export default function ActivitiesPage() {
  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main detail-main-activities">
        <DetailHero index="02" eyebrow="FAIR ELECTION CIVIC ACTION" title="공정선거시민행동" description="공정과 자유의 가치를 바탕으로 질문하고, 답을 요구하고, 기록으로 남깁니다." word="ACTION" />

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
            <p className="field-content-relation">{olgongTwoCut.relationNote}</p>
            <ul className="field-content-points" aria-label="올공두컷 핵심 메시지">
              {olgongTwoCut.points.map(([label, text]) => (
                <li key={label}><span>{label}</span><strong>{text}</strong></li>
              ))}
            </ul>
            <div className="field-content-links" aria-label="올공두컷 링크">
              <a className="detail-link" href={olgongTwoCut.appUrl} target="_blank" rel="noreferrer">올공두컷 현장 시작하기 <span>↗</span></a>
              <a className="detail-link" href={olgongTwoCut.sourceUrl} target="_blank" rel="noreferrer">올공두컷 현장 기록 보기 <span>↗</span></a>
              <a className="detail-link" href={olgongTwoCut.stepsUrl} target="_blank" rel="noreferrer">사용법 보기 <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="participation-roles detail-section" aria-labelledby="participation-roles-title">
          <div className="detail-section-head reveal">
            <span>YOUR ROLE</span>
            <h2 id="participation-roles-title">함께할 수 있는 역할</h2>
          </div>
          <div className="participation-role-list">
            {participationWays.map((way) => (
              <article className="participation-role-row reveal" key={way.id}>
                <span>{way.number}</span>
                <h3>{way.title}</h3>
                <p>{way.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section detail-section" aria-labelledby="process-title">
          <div className="detail-section-head reveal"><span>HOW WE WORK</span><h2 id="process-title">행동하는 순서</h2></div>
          <ol className="process-list">
            <li className="reveal"><span>01</span><div><h3>듣습니다</h3><p>현장과 시민의 질문을 먼저 모읍니다.</p></div></li>
            <li className="reveal"><span>02</span><div><h3>확인합니다</h3><p>공개 자료와 언론 보도를 교차 확인합니다.</p></div></li>
            <li className="reveal"><span>03</span><div><h3>기록합니다</h3><p>누가 보아도 이해할 수 있는 기록을 남깁니다.</p></div></li>
            <li className="reveal"><span>04</span><div><h3>함께 확산합니다</h3><p>행동과 기록을 시민이 다시 열어 쓰게 만드는 공유 구조로 만듭니다.</p></div></li>
          </ol>
        </section>

        <PageActions
          related={{ href: '/history', label: '발자취 보기' }}
          action={{ href: '/join', label: '함께 참여하기' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
