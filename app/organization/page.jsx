import BreadcrumbJsonLd from '../_components/BreadcrumbJsonLd';
import DetailHero from '../_components/DetailHero';
import PageActions from '../_components/PageActions';
import RevealController from '../_components/RevealController';
import SiteFooter from '../_components/SiteFooter';
import SiteHeader from '../_components/SiteHeader';
import { organization, organizationPlans } from '../_data/content';
import { createPageMetadata } from '../_lib/seo';

export const metadata = createPageMetadata({
  title: '조직과 운영',
  description: '경기우파청년들의 상임대표와 임원진, 운영 계획을 소개합니다.',
  path: '/organization',
});

export default function OrganizationPage() {
  return (
    <>
      <BreadcrumbJsonLd name="조직과 운영" path="/organization" />
      <a className="skip-link" href="#main">본문 바로가기</a>
      <SiteHeader />
      <RevealController />
      <main id="main" className="detail-main detail-main-organization">
        <DetailHero index="04" eyebrow="ORGANIZATION" title="함께 책임지고, 투명하게 운영합니다" description="창립 의결을 바탕으로 상임대표와 임원진이 각자의 책임을 다합니다." word="PEOPLE" />

        <section className="leader-detail detail-section">
          <div className="leader-detail-mark reveal" aria-hidden="true">창</div>
          <div className="leader-detail-copy reveal">
            <p>FOUNDING RESOLUTION</p><h2>경기우파청년들 창립</h2>
            <span>참석자 전원의 동의로 단체 창립을 의결하고, 배부된 정관안을 검토한 뒤 원안대로 확정했습니다.</span>
          </div>
          <ul className="leader-detail-work reveal">
            <li><span>01</span> 단체 창립 만장일치 의결</li>
            <li><span>02</span> 정관 원안 의결</li>
            <li><span>03</span> 상임대표·임원 선임</li>
          </ul>
        </section>

        <section className="org-detail detail-section" aria-labelledby="org-structure-title">
          <div className="detail-section-head reveal"><span>OFFICIAL LEADERSHIP</span><h2 id="org-structure-title">조직도</h2></div>
          <div className="org-chart reveal" role="img" aria-label="상임대표 전유섭·윤문진과 감사 최문영, 재무 이철우, 사무국장 김민섭, 특별위원장 한동원, 조직위원장 박보환, 청년위원장 박장훈, 기획위원장 장동재로 구성된 조직도">
            <div className="org-node org-root">
              <small>상임대표 · 공동 선출</small>
              <div className="org-representative-names"><strong>전유섭</strong><i aria-hidden="true">×</i><strong>윤문진</strong></div>
            </div>
            <div className="org-line vertical" />
            <div className="org-node org-core"><small>임원 구성</small><strong>임원진</strong></div>
            <div className="org-branches">
              {organization.map(([number, role, name]) => (
                <div className="org-node" key={number}><span>{number}</span><small>{role}</small><strong>{name}</strong></div>
              ))}
            </div>
          </div>
          <p className="org-disclaimer reveal">제공된 창립 회의 자료의 상임대표·임원 선임 내용을 기준으로 정리했습니다.</p>

          <div className="org-plan reveal" aria-labelledby="org-plan-title">
            <div><span>NEXT OPERATION</span><h3 id="org-plan-title">향후 운영계획</h3></div>
            <ol>
              {organizationPlans.map(([number, plan]) => (
                <li key={number}><span>{number}</span><strong>{plan}</strong></li>
              ))}
            </ol>
          </div>
        </section>

        <PageActions
          related={{ href: '/about', label: '단체 원칙 보기' }}
          action={{ href: '/join', label: '회원·후원 참여 보기' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
