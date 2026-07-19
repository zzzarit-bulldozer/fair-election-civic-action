'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const measurementId = process.env.NEXT_PUBLIC_GA_ID;
const isValidMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId ?? '');

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isValidMeasurementId || window.__gaLastPath === pathname) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };

    if (!window.__gaInitialized) {
      window.gtag('js', new Date());
      window.__gaInitialized = true;
    }

    window.gtag('config', measurementId, { page_path: pathname });
    window.__gaLastPath = pathname;
  }, [pathname]);

  if (!isValidMeasurementId) return null;

  return (
    <Script
      id="google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
    />
  );
}
