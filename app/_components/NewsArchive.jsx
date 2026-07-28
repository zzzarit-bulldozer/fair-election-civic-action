'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toIsoDate } from '../_lib/date';
import { assetPath } from '../_lib/site';

const filters = [
  ['all', '전체'],
  ['direct', '직접 활동'],
  ['related', '관련 보도'],
  ['interview', '인터뷰'],
  ['citizen', '시민 콘텐츠'],
];

export default function NewsArchive({ reports }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const visibleReports = activeFilter === 'all'
    ? reports
    : reports.filter((report) => report.usage === activeFilter);

  return (
    <>
      <div className="report-filters reveal" aria-label="언론보도 분류">
        {filters.map(([id, label]) => (
          <button
            aria-pressed={activeFilter === id}
            key={id}
            onClick={() => setActiveFilter(id)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="report-filter-status" aria-live="polite">
        {visibleReports.length}개의 기록
      </p>
      <div className="report-list">
        {visibleReports.map((item, index) => (
          <article className="report-row reveal is-visible" key={item.id}>
            <a href={item.href} target="_blank" rel="noreferrer">
              <span className="report-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="report-meta">
                <strong>{item.category}</strong>
                <span>{item.media} · <time dateTime={toIsoDate(item.date)}>{item.date}</time></span>
              </div>
              <figure className="report-visual" data-image-focus={item.imageFocus}>
                <Image src={assetPath(item.image)} alt={item.imageAlt} fill sizes="(max-width: 760px) 80vw, 220px" />
                <figcaption>{item.imageCredit}</figcaption>
              </figure>
              <div className="report-copy">
                <p>{item.relation}</p>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
              </div>
              <span className="view-arrow" aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
