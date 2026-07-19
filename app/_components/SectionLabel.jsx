export default function SectionLabel({ number, children, inverse = false }) {
  return (
    <div className={`section-label reveal${inverse ? ' inverse' : ''}`}>
      <span>{number}</span>
      <p>{children}</p>
    </div>
  );
}
