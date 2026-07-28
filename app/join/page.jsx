import DetailHero from '../_components/DetailHero';
import PageActions from '../_components/PageActions';
import RevealController from '../_components/RevealController';
import SiteFooter from '../_components/SiteFooter';
import SiteHeader from '../_components/SiteHeader';
import { nextAction, participationWays } from '../_data/content';
import { officialThreadsUrl, openChatUrl } from '../_lib/site';

export const metadata = {
  title: '참여하기 | 경기우파청년들',
  description: '현장 참여, 운영 지원, 소식 확인 중 나에게 맞는 경기우파청년들 참여 방법을 확인합니다.',
};

export default function JoinPage() {
  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main detail-main-join">
        <DetailHero
          index="06"
          eyebrow="JOIN THE ACTION"
          title="나에게 맞는 방식으로 함께합니다"
          description="현장 참여, 운영 지원, 소식 확인 중 지금 가능한 다음 행동을 먼저 확인합니다."
          word="JOIN"
        />

        <section className="join-options detail-section" aria-labelledby="join-options-title">
          <div className="detail-section-head reveal">
            <span>THREE WAYS</span>
            <h2 id="join-options-title">세 가지 참여 방법</h2>
          </div>
          <div className="join-option-list">
            {participationWays.map((way) => (
              <article className="join-option-row reveal" id={way.id} key={way.id}>
                <span>{way.number}</span>
                <div className="join-option-title"><h3>{way.title}</h3><p>{way.summary}</p></div>
                <dl>
                  <div><dt>이런 분께</dt><dd>{way.forWhom}</dd></div>
                  <div><dt>준비</dt><dd>{way.preparation}</dd></div>
                  <div><dt>다음 단계</dt><dd>{way.nextStep}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="next-action-panel detail-section" aria-labelledby="next-action-title">
          <div className="next-action-state reveal">
            <span>{nextAction.status === 'preparing' ? 'PREPARING' : 'OPEN'}</span>
            <strong>{nextAction.label}</strong>
          </div>
          <div className="next-action-copy reveal">
            <h2 id="next-action-title">{nextAction.title}</h2>
            <p>{nextAction.description}</p>
          </div>
        </section>

        <section className="join-channels detail-section" aria-labelledby="join-channels-title">
          <div className="detail-section-head reveal">
            <span>CHOOSE A CHANNEL</span>
            <h2 id="join-channels-title">채널의 역할이 다릅니다</h2>
          </div>
          <div className="join-channel-list">
            <article className="reveal">
              <span>OPEN CHAT</span>
              <h3>팀채팅방</h3>
              <p>현장 일정, 준비 역할, 당일 안내를 확인하고 운영진과 대화하는 참여 채널입니다.</p>
              <strong>참여할 준비가 되었을 때 연결합니다.</strong>
            </article>
            <article className="reveal">
              <span>OFFICIAL THREADS</span>
              <h3>공식 Threads</h3>
              <p>포스터, 활동 기록, 다음 일정 공지를 먼저 살펴보는 공개 소식 채널입니다.</p>
              <a href={officialThreadsUrl} target="_blank" rel="noreferrer">Threads에서 소식 확인하기 ↗</a>
            </article>
          </div>
        </section>

        <PageActions
          related={{ href: '/activities', label: '활동과 역할 다시 보기' }}
          action={{ href: openChatUrl, label: '팀채팅방으로 연결', external: true }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
