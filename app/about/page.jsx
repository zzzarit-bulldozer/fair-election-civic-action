import Link from 'next/link';
import DetailHero from '../_components/DetailHero';
import RevealController from '../_components/RevealController';
import SiteFooter from '../_components/SiteFooter';
import SiteHeader from '../_components/SiteHeader';

export const metadata = {
  title: '단체 소개 | 공정선거시민행동',
  description: '수원에서 시작한 공정선거시민행동의 지향점과 활동 원칙을 소개합니다.',
};

const principles = [
  ['01', '원칙', '정파보다 시민의 참정권과 투명한 절차를 먼저 봅니다.'],
  ['02', '검증', '추측을 사실처럼 말하지 않고 확인 가능한 자료와 출처를 남깁니다.'],
  ['03', '평화', '시민의 안전과 존엄을 지키는 비폭력 행동을 기본으로 합니다.'],
  ['04', '개방', '나이와 배경을 넘어 누구나 질문하고 제안할 수 있는 광장을 만듭니다.'],
];

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main">
        <DetailHero index="01" eyebrow="ABOUT US" title={<>한 표의 무게를<br />지키는 시민들</>} description="공정선거시민행동은 선거 과정의 투명성과 시민의 온전한 참정권을 위해 수원에서 질문하고 기록하고 행동합니다." word="ABOUT" />

        <section className="detail-section intro-statement">
          <p className="detail-kicker reveal">WHY WE ACT</p>
          <div className="intro-statement-copy reveal">
            <h2>선거는 결과만이 아니라<br /><em>과정으로 신뢰받아야 합니다.</em></h2>
            <div>
              <p>우리는 막연한 의심을 확산하는 대신 현장을 보고, 공개 자료를 확인하고, 설명이 필요한 지점을 시민의 언어로 질문합니다.</p>
              <p>한 사람의 목소리가 광장의 기록이 되고, 그 기록이 더 투명한 제도를 만드는 근거가 되도록 행동합니다.</p>
            </div>
          </div>
        </section>

        <section className="detail-section principles-section" aria-labelledby="principles-title">
          <div className="detail-section-head reveal">
            <span>OUR PRINCIPLES</span>
            <h2 id="principles-title">우리가 지키는 네 가지</h2>
          </div>
          <div className="principles-list">
            {principles.map(([number, title, body]) => (
              <article className="principle-row reveal" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-quote">
          <blockquote className="reveal">“의심을 키우는 단체가 아니라,<br /><em>신뢰를 확인하는 시민</em>이 되겠습니다.”</blockquote>
        </section>

        <nav className="page-next section-pad" aria-label="다음 페이지">
          <Link href="/activities"><span>우리가 하는 일</span><strong>활동 보기 ↗</strong></Link>
          <Link href="/organization"><span>함께 움직이는 방식</span><strong>조직 보기 ↗</strong></Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
