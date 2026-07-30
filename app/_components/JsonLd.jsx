import { serializeJsonLd } from '../_lib/seo';

export default function JsonLd({ data, id }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}
