import Link from 'next/link';

export default function DetailHero({ index, eyebrow, title, description, word }) {
  return (
    <section className="detail-hero" id="top" aria-labelledby="detail-title">
      <div className="detail-hero-grid" aria-hidden="true" />
      <div className="detail-hero-inner">
        <div className="detail-breadcrumb">
          <Link href="/">HOME</Link>
          <span>/</span>
          <strong>{eyebrow}</strong>
        </div>
        <div className="detail-hero-copy">
          <p className="eyebrow"><span /> {eyebrow}</p>
          <h1 id="detail-title">{title}</h1>
          <p>{description}</p>
        </div>
        <span className="detail-index">{index}</span>
      </div>
      <div className="detail-word" aria-hidden="true">{word}</div>
    </section>
  );
}
