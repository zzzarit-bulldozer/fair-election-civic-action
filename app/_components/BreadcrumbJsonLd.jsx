import { createBreadcrumbJsonLd } from '../_lib/seo';
import JsonLd from './JsonLd';

export default function BreadcrumbJsonLd({ name, path }) {
  return (
    <JsonLd
      id="breadcrumb-json-ld"
      data={createBreadcrumbJsonLd({ name, path })}
    />
  );
}
