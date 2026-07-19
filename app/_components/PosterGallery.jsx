'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { assetPath } from '../_lib/site';

export default function PosterGallery({ posters, session }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const lightboxRef = useRef(null);
  const openerRef = useRef(null);
  const active = posters[activeIndex];

  const openGallery = (event) => {
    openerRef.current = event.currentTarget;
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % posters.length);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => (index - 1 + posters.length) % posters.length);
      if (event.key === 'Tab') {
        const focusable = [...lightboxRef.current.querySelectorAll('button:not([tabindex="-1"])')];
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
    document.body.classList.add('is-gallery-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.classList.remove('is-gallery-open');
      window.removeEventListener('keydown', onKeyDown);
      openerRef.current?.focus();
    };
  }, [isOpen, posters.length]);

  return (
    <div className="poster-gallery">
      <div className="poster-gallery-head">
        <div>
          <b>ORIGINAL POSTERS</b>
          <span>{session} · {posters.length}장</span>
        </div>
        <button type="button" onClick={openGallery}>사진 보기 ↗</button>
      </div>

      <button className="poster-gallery-feature" type="button" onClick={openGallery} aria-label={`${session} ${active.label} 크게 보기`}>
        <Image src={assetPath(active.src)} alt={active.alt} width={active.width} height={active.height} sizes="(max-width: 760px) 82vw, 320px" priority={session === '1회차'} />
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(posters.length).padStart(2, '0')} · {active.label}</span>
      </button>

      {posters.length > 1 && (
        <div className="poster-gallery-thumbs" aria-label={`${session} 포스터 시안 선택`}>
          {posters.map((poster, index) => (
            <button className={index === activeIndex ? 'is-active' : ''} type="button" key={poster.src} onClick={() => setActiveIndex(index)} aria-label={`${poster.label} 선택`} aria-pressed={index === activeIndex}>
              <Image src={assetPath(poster.src)} alt="" width={poster.width} height={poster.height} sizes="72px" />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen ? createPortal(
        <div className="poster-lightbox" role="dialog" aria-modal="true" aria-labelledby={`poster-lightbox-${session}`}>
          <button className="poster-lightbox-backdrop" type="button" tabIndex={-1} onClick={() => setIsOpen(false)} aria-label="사진 보기 닫기" />
          <div className="poster-lightbox-panel" ref={lightboxRef}>
            <div className="poster-lightbox-head">
              <div><b id={`poster-lightbox-${session}`}>{session} POSTER ARCHIVE</b><span>{active.label} · {activeIndex + 1} / {posters.length}</span></div>
              <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} aria-label="닫기">×</button>
            </div>
            <div className="poster-lightbox-stage">
              <Image src={assetPath(active.src)} alt={active.alt} width={active.width} height={active.height} sizes="(max-width: 760px) 92vw, 70vh" priority />
            </div>
            {posters.length > 1 && (
              <div className="poster-lightbox-nav">
                <button type="button" onClick={() => setActiveIndex((activeIndex - 1 + posters.length) % posters.length)}>← 이전</button>
                <p>{active.alt}</p>
                <button type="button" onClick={() => setActiveIndex((activeIndex + 1) % posters.length)}>다음 →</button>
              </div>
            )}
          </div>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
