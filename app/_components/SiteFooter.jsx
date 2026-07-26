import Link from 'next/link';
import LogoMark from './LogoMark';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" href="/">
        <LogoMark />
        <span>
          <strong>경기우파청년들</strong>
          <small>GYEONGGI RIGHT-WING YOUTH</small>
        </span>
      </Link>
      <div className="footer-info">
        <p>수원에서 시작하는 공정한 선거, 살아 숨쉬는 자유민주주의</p>
        <p>© {new Date().getFullYear()} 경기우파청년들</p>
      </div>
      <Link className="back-top" href="#top">맨 위로 ↑</Link>
    </footer>
  );
}
