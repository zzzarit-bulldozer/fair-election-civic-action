'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { assetPath } from '../_lib/site';

export default function PosterGallery({ posters, photos = [], session }) {
  const [posterIndex, setPosterIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [archiveType, setArchiveType] = useState('posters');
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const lightboxRef = useRef(null);
  const openerRef = useRef(null);
  const poster = posters[posterIndex];
  const archive = archiveType === 'photos' ? photos : posters;
  const active = archive[lightboxIndex] ?? archive[0];
  const archiveLabel = archiveType === 'photos' ? 'FIELD PHOTO ARCHIVE' : 'POSTER ARCHIVE';

  const openGallery = (event, type, index = 0) => {
    openerRef.current = event.currentTarget;
    setArchiveType(type);
    setLightboxIndex(type === 'posters' ? posterIndex : index);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'ArrowRight') setLightboxIndex((index) => (index + 1) % archive.length);
      if (event.key === 'ArrowLeft') setLightboxIndex((index) => (index - 1 + archive.length) % archive.length);
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
  }, [archive.length, isOpen]);

  return (
    <div className="poster-gallery">
      <div className="poster-gallery-head">
        <div>
          <b>ORIGINAL POSTERS</b>
          <span>{session} · {posters.length}장</span>
        </div>
        {photos.length > 0 ? (
          <button type="button" onClick={(event) => openGallery(event, 'photos')}>현장 사진 {photos.length}장 ↗</button>
        ) : (
          <button type="button" onClick={(event) => openGallery(event, 'posters')}>포스터 크게 보기 ↗</button>
        )}
      </div>

      <button className="poster-gallery-feature" type="button" onClick={(event) => openGallery(event, 'posters')} aria-label={`${session} ${poster.label} 크게 보기`}>
        <Image src={assetPath(poster.src)} alt={poster.alt} width={poster.width} height={poster.height} sizes="(max-width: 760px) 82vw, 320px" priority={session === '1회차'} />
        <span>{String(posterIndex + 1).padStart(2, '0')} / {String(posters.length).padStart(2, '0')} · {poster.label}</span>
      </button>

      {posters.length > 1 && (
        <div className="poster-gallery-thumbs" aria-label={`${session} 포스터 시안 선택`}>
          {posters.map((poster, index) => (
            <button className={index === posterIndex ? 'is-active' : ''} type="button" key={poster.src} onClick={() => setPosterIndex(index)} aria-label={`${poster.label} 선택`} aria-pressed={index === posterIndex}>
              <Image src={assetPath(poster.src)} alt="" width={poster.width} height={poster.height} sizes="72px" />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      )}

      {photos.length > 0 && (
        <div className="field-gallery">
          <div className="field-gallery-head">
            <b>FIELD ARCHIVE</b>
            <span>{photos.length} PHOTOS</span>
          </div>
          <div className="field-gallery-grid">
            {photos.slice(0, 4).map((photo, index) => (
              <button type="button" key={photo.src} onClick={(event) => openGallery(event, 'photos', index)} aria-label={`${session} ${photo.label} 크게 보기`}>
                <Image src={assetPath(photo.src)} alt="" width={photo.width} height={photo.height} sizes="(max-width: 760px) 42vw, 160px" />
                <span>{index === 3 && photos.length > 4 ? `+${photos.length - 4}` : String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen ? createPortal(
        <div className="poster-lightbox" role="dialog" aria-modal="true" aria-labelledby={`poster-lightbox-${session}`}>
          <button className="poster-lightbox-backdrop" type="button" tabIndex={-1} onClick={() => setIsOpen(false)} aria-label="사진 보기 닫기" />
          <div className="poster-lightbox-panel" ref={lightboxRef}>
            <div className="poster-lightbox-head">
              <div><b id={`poster-lightbox-${session}`}>{session} {archiveLabel}</b><span>{active.label} · {lightboxIndex + 1} / {archive.length}</span></div>
              <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} aria-label="닫기">×</button>
            </div>
            <div className="poster-lightbox-stage">
              <Image src={assetPath(active.src)} alt={active.alt} width={active.width} height={active.height} sizes="(max-width: 760px) 92vw, 70vh" priority />
            </div>
            {archive.length > 1 && (
              <div className="poster-lightbox-thumbs" aria-label={`${session} ${archiveLabel} 전체 목록`}>
                {archive.map((item, index) => (
                  <button className={index === lightboxIndex ? 'is-active' : ''} type="button" key={item.src} onClick={() => setLightboxIndex(index)} aria-label={`${item.label} 보기`} aria-pressed={index === lightboxIndex}>
                    <Image src={assetPath(item.src)} alt="" width={item.width} height={item.height} sizes="64px" />
                  </button>
                ))}
              </div>
            )}
            {archive.length > 1 && (
              <div className="poster-lightbox-nav">
                <button type="button" onClick={() => setLightboxIndex((lightboxIndex - 1 + archive.length) % archive.length)}>← 이전</button>
                <p>{active.alt}</p>
                <button type="button" onClick={() => setLightboxIndex((lightboxIndex + 1) % archive.length)}>다음 →</button>
              </div>
            )}
          </div>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
