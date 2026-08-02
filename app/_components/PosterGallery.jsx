'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { assetPath } from '../_lib/site';

export default function PosterGallery({ posters = [], photos = [], session }) {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [archiveType, setArchiveType] = useState(posters.length > 0 ? 'posters' : 'photos');
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const lightboxRef = useRef(null);
  const openerRef = useRef(null);
  const hasPosters = posters.length > 0;
  const coverType = hasPosters ? 'posters' : 'photos';
  const cover = hasPosters ? posters[0] : photos[0];
  const photoPreviews = photos.slice(hasPosters ? 0 : 1, hasPosters ? 2 : 3);
  const archive = archiveType === 'photos' ? photos : posters;
  const active = archive[lightboxIndex] ?? archive[0];
  const archiveLabel = archiveType === 'photos' ? 'FIELD PHOTO ARCHIVE' : 'POSTER ARCHIVE';

  const openGallery = (event, type, index = 0) => {
    openerRef.current = event.currentTarget;
    setArchiveType(type);
    setLightboxIndex(index);
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
      <div className="archive-strip-head">
        <div><b>SESSION ARCHIVE</b><span>{session}</span></div>
        <div className="archive-strip-actions">
          {hasPosters && <button type="button" onClick={(event) => openGallery(event, 'posters')}>포스터 {posters.length}장</button>}
          {photos.length > 0 && <button type="button" onClick={(event) => openGallery(event, 'photos')}>현장 사진 {photos.length}장 ↗</button>}
        </div>
      </div>

      <div className="archive-media-grid">
        <button className={`archive-media-item is-cover ${hasPosters ? 'is-poster' : 'is-photo'}`} type="button" onClick={(event) => openGallery(event, coverType)} aria-label={`${session} ${cover.label} 크게 보기`}>
          <Image src={assetPath(cover.src)} alt={cover.alt} width={cover.width} height={cover.height} sizes="(max-width: 760px) 44vw, 260px" priority={session === '1회차'} />
          <span>{hasPosters ? `POSTER · ${String(posters.length).padStart(2, '0')}` : 'PHOTO · 01'}</span>
        </button>
        {photoPreviews.map((photo, index) => {
          const photoIndex = index + (hasPosters ? 0 : 1);
          return (
            <button className="archive-media-item is-photo" type="button" key={photo.src} onClick={(event) => openGallery(event, 'photos', photoIndex)} aria-label={`${session} ${photo.label} 크게 보기`}>
              <Image src={assetPath(photo.src)} alt="" width={photo.width} height={photo.height} sizes="(max-width: 760px) 38vw, 240px" />
              <span>{index === 1 && photos.length > photoIndex + 1 ? `PHOTO · +${photos.length - photoIndex - 1}` : `PHOTO · ${String(photoIndex + 1).padStart(2, '0')}`}</span>
            </button>
          );
        })}
      </div>

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
