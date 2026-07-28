'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoMark from './LogoMark';

const navigation = [
  ['소개', '/about'],
  ['활동', '/activities'],
  ['발자취', '/history'],
  ['조직', '/organization'],
  ['언론보도', '/news'],
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstMenuLinkRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return () => document.body.classList.remove('menu-open');

    const previousFocus = document.activeElement;
    const focusTimer = window.setTimeout(() => firstMenuLinkRef.current?.focus(), 100);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key === 'Tab') {
        const focusable = [toggleRef.current, ...menuRef.current.querySelectorAll('a, button')];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
      previousFocus?.focus();
    };
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className={`site-header${scrolled || !isHome ? ' is-scrolled' : ''}`}>
      <Link className="brand" href="/" aria-label="경기우파청년들 홈">
        <LogoMark />
        <span className="brand-text">
          <strong>경기우파청년들</strong>
          <small>GYEONGGI RIGHT-WING YOUTH</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="주요 메뉴">
        {navigation.map(([label, href]) => (
          <Link className={pathname === href ? 'is-active' : ''} aria-current={pathname === href ? 'page' : undefined} key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>

      <Link className="header-cta" href="/join" aria-current={pathname === '/join' ? 'page' : undefined}>
        참여하기
      </Link>

      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="sr-only">{menuOpen ? '메뉴 닫기' : '메뉴 열기'}</span>
        <span />
        <span />
      </button>

      <div className="mobile-menu" id="mobile-menu" aria-hidden={!menuOpen} ref={menuRef}>
        <nav aria-label="모바일 메뉴">
          {navigation.map(([label, href], index) => (
            <Link ref={index === 0 ? firstMenuLinkRef : undefined} key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link className="mobile-join" href="/join" aria-current={pathname === '/join' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
            참여하기
          </Link>
        </nav>
      </div>
    </header>
  );
}
