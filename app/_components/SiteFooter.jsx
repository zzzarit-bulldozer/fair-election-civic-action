import Link from 'next/link';
import LogoMark from './LogoMark';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" href="/">
        <LogoMark />
        <strong>공정선거시민행동</strong>
      </Link>
      <div className="footer-info">
        <p>수원에서 시작하는 투명한 선거, 살아있는 민주주의</p>
        <p>© {new Date().getFullYear()} FAIR ELECTION CITIZEN ACTION</p>
      </div>
      <Link className="back-top" href="#top">맨 위로 ↑</Link>
    </footer>
  );
}
