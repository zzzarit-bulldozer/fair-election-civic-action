'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  classifyLinkInteraction,
  createPageViewPayload,
  getLinkLocation,
  isValidMeasurementId,
  trackEvent,
} from '../_lib/analytics';

const measurementId = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isValidMeasurementId(measurementId)) return undefined;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };

    if (!window.__gaInitialized) {
      window.gtag('js', new Date());
      window.__gaInitialized = true;
    }

    const pageView = createPageViewPayload(window.location.origin, pathname);
    if (pageView && window.__gaLastPath !== pageView.page_path) {
      window.gtag('config', measurementId, {
        send_page_view: false,
        page_location: pageView.page_location,
        page_referrer: '',
        page_title: '',
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      trackEvent('page_view', pageView, measurementId, window.gtag);
      window.__gaLastPath = pageView.page_path;
    }
  }, [pathname]);

  useEffect(() => {
    if (!isValidMeasurementId(measurementId)) return undefined;
    const onDocumentClick = (event) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!anchor) return;
      const interaction = classifyLinkInteraction({
        href: anchor.href,
        hasPrimaryCta: anchor.hasAttribute('data-primary-cta'),
        location: getLinkLocation(anchor, window.location.pathname),
        pagePath: window.location.pathname,
        origin: window.location.origin,
      });
      if (interaction) trackEvent(interaction.eventName, interaction.payload, measurementId, window.gtag);
    };
    document.addEventListener('click', onDocumentClick, true);
    return () => document.removeEventListener('click', onDocumentClick, true);
  }, []);

  if (!isValidMeasurementId(measurementId)) return null;

  return <Script id="google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />;
}
