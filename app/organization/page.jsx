import Link from 'next/link';
import DetailHero from '../_components/DetailHero';
import RevealController from '../_components/RevealController';
import SiteFooter from '../_components/SiteFooter';
import SiteHeader from '../_components/SiteHeader';
import { organization } from '../_data/content';

export const metadata = {
  title: '조직과 운영 | 공정선거시민행동',
  description: '공정선거시민행동의 활동가와 시민 중심 운영 구조를 소개합니다.',
};

export default function OrganizationPage() {
  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main">
        <DetailHero index="04" eyebrow="ORGANIZATION" title={<>누구나 제안하고,<br />함께 결정합니다</>} description="시민의 자발성과 투명한 운영을 중심에 둔 열린 조직을 지향합니다." word="PEOPLE" />

        <section className="leader-detail detail-section">
          <div className="leader-detail-mark reveal" aria-hidden="true">전</div>
          <div className="leader-detail-copy reveal">
            <p>주요 활동가 · 수원 현장 주최</p><h2>전시언</h2>
            <span>수원 시민행동을 주도하고 언론 인터뷰와 공개 소셜 채널을 통해 투표 중단, 참정권, 시민 참여의 문제를 공론화하고 있습니다.</span>
            <a className="detail-link" href="https://www.threads.com/@fairly_evenly?hl=ko" target="_blank" rel="noreferrer">전시언 공식 Threads <b>↗</b></a>
          </div>
          <ul className="leader-detail-work reveal">
            <li><span>01</span> 수원 시민행동 기획·현장 운영</li>
            <li><span>02</span> 언론 인터뷰·공적 문제 제기</li>
            <li><span>03</span> 지역 네트워크·참여자 모집</li>
          </ul>
        </section>

        <section className="org-detail detail-section" aria-labelledby="org-structure-title">
          <div className="detail-section-head reveal"><span>OPEN STRUCTURE</span><h2 id="org-structure-title">열린 운영 구조</h2></div>
          <div className="org-chart reveal" role="img" aria-label="시민 참여를 중심으로 운영 조정과 현장행동, 자료검증, 콘텐츠, 시민연대 영역이 연결된 운영 구조">
            <div className="org-node org-root"><small>활동의 중심</small><strong>시민 참여</strong></div>
            <div className="org-line vertical" />
            <div className="org-node org-core"><small>실행과 조정</small><strong>운영 조정</strong></div>
            <div className="org-branches">
              {organization.map(([number, title, description]) => (
                <div className="org-node" key={number}><span>{number}</span><strong>{title}</strong><small>{description}</small></div>
              ))}
            </div>
          </div>
          <p className="org-disclaimer reveal">현재 공개된 활동을 바탕으로 정리한 운영 영역입니다. 공식 직책과 조직 명칭은 단체 확정안에 맞춰 갱신합니다.</p>
        </section>

        <nav className="page-next section-pad" aria-label="다음 페이지">
          <Link href="/about"><span>우리가 지키는 원칙</span><strong>단체 소개 ↗</strong></Link>
          <Link href="/history"><span>함께 만든 기록</span><strong>발자취 보기 ↗</strong></Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
