import Link from 'next/link';

export default function PageActions({ related, action }) {
  const actionContent = (
    <>
      <span>참여하기</span>
      <strong>{action.label} ↗</strong>
    </>
  );

  return (
    <nav className="page-next section-pad" aria-label="관련 정보와 참여">
      <Link className="page-next-related" href={related.href}>
        <span>관련 정보</span>
        <strong>{related.label} ↗</strong>
      </Link>
      {action.external ? (
        <a className="page-next-action" data-primary-cta href={action.href} target="_blank" rel="noreferrer">
          {actionContent}
        </a>
      ) : (
        <Link className="page-next-action" data-primary-cta href={action.href}>
          {actionContent}
        </Link>
      )}
    </nav>
  );
}
