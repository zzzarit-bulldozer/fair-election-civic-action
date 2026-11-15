const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

export const ANALYTICS_ROUTES = new Set(['/', '/about', '/activities', '/history', '/news', '/organization', '/join']);
export const ANALYTICS_LOCATIONS = new Set(['header', 'footer', 'home', 'content', 'menu']);
export const CTA_DESTINATIONS = new Set(['/join']);
export const FILTER_IDS = new Set(['all', 'direct', 'related', 'interview', 'citizen']);
export const CHANNEL_URLS = new Map([
  ['https://invite.kakao.com/tc/MqzolmVhza', 'kakao'],
  ['https://www.threads.com/@fairly_evenly', 'threads'],
]);

const EVENT_FIELDS = {
  page_view: ['page_location', 'page_path'],
  cta_click: ['location', 'destination', 'page_path'],
  join_channel_click: ['channel', 'location', 'page_path'],
  gallery_open: ['activity_session', 'media_type', 'image_index', 'image_count', 'page_path'],
  gallery_image_view: ['activity_session', 'media_type', 'image_index', 'image_count', 'page_path'],
  news_filter_change: ['filter_id', 'result_count', 'page_path'],
};

export function isValidMeasurementId(measurementId) {
  return typeof measurementId === 'string' && MEASUREMENT_ID_PATTERN.test(measurementId);
}

export function cleanPagePath(value) {
  if (typeof value !== 'string') return null;
  let pathname;
  try {
    pathname = new URL(value, 'https://analytics.invalid').pathname.replace(/\/+$/, '') || '/';
  } catch {
    return null;
  }
  return ANALYTICS_ROUTES.has(pathname) ? pathname : null;
}

export function cleanCanonicalLocation(origin, pathname) {
  const pagePath = cleanPagePath(pathname);
  if (!pagePath || typeof origin !== 'string') return null;
  try {
    const base = new URL(origin);
    return new URL(pagePath, `${base.origin}/`).toString();
  } catch {
    return null;
  }
}

export function cleanComparableUrl(value) {
  try {
    const url = new URL(value);
    url.search = '';
    url.hash = '';
    return url.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

function hasOnlyExpectedFields(eventName, payload) {
  const fields = EVENT_FIELDS[eventName];
  if (!fields || !payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  const keys = Object.keys(payload);
  return keys.length === fields.length && keys.every((key) => fields.includes(key));
}

export function isValidEventPayload(eventName, payload) {
  if (!hasOnlyExpectedFields(eventName, payload)) return false;
  const cleanPath = cleanPagePath(payload.page_path);
  if (!cleanPath || payload.page_path !== cleanPath) return false;

  if (eventName === 'page_view') return payload.page_location === cleanCanonicalLocation(payload.page_location, payload.page_path);
  if (eventName === 'cta_click') return ANALYTICS_LOCATIONS.has(payload.location) && CTA_DESTINATIONS.has(payload.destination);
  if (eventName === 'join_channel_click') return ANALYTICS_LOCATIONS.has(payload.location) && ['kakao', 'threads'].includes(payload.channel);
  if (eventName === 'news_filter_change') return FILTER_IDS.has(payload.filter_id) && Number.isInteger(payload.result_count) && payload.result_count >= 0;

  return Number.isInteger(payload.activity_session)
    && payload.activity_session > 0
    && ['photo', 'poster'].includes(payload.media_type)
    && Number.isInteger(payload.image_index)
    && payload.image_index > 0
    && Number.isInteger(payload.image_count)
    && payload.image_count >= payload.image_index;
}

export function trackEvent(eventName, payload, measurementId = process.env.NEXT_PUBLIC_GA_ID, gtag = globalThis.window?.gtag) {
  if (!isValidMeasurementId(measurementId) || !isValidEventPayload(eventName, payload) || typeof gtag !== 'function') return false;
  gtag('event', eventName, payload);
  return true;
}

export function createPageViewPayload(origin, pathname) {
  const page_path = cleanPagePath(pathname);
  const page_location = cleanCanonicalLocation(origin, page_path);
  return page_path && page_location ? { page_location, page_path } : null;
}

export function getLinkLocation(anchor, pagePath) {
  if (!anchor?.closest) return null;
  if (anchor.closest('.mobile-menu, .mobile-nav, .site-menu, [aria-label="사이트 메뉴"]')) return 'menu';
  if (anchor.closest('header, .site-header')) return 'header';
  if (anchor.closest('footer, .site-footer')) return 'footer';
  return cleanPagePath(pagePath) === '/' ? 'home' : 'content';
}

export function classifyLinkInteraction({ href, hasPrimaryCta, location, pagePath, origin }) {
  const safePagePath = cleanPagePath(pagePath);
  if (!safePagePath || !ANALYTICS_LOCATIONS.has(location) || typeof href !== 'string') return null;
  const comparable = cleanComparableUrl(href);
  const channel = comparable ? CHANNEL_URLS.get(comparable) : null;
  if (channel) return { eventName: 'join_channel_click', payload: { channel, location, page_path: safePagePath } };

  try {
    const url = new URL(href, origin);
    const destination = cleanPagePath(url.pathname);
    if (url.origin === new URL(origin).origin && destination && CTA_DESTINATIONS.has(destination) && (destination === '/join' || hasPrimaryCta)) {
      return { eventName: 'cta_click', payload: { location, destination, page_path: safePagePath } };
    }
  } catch {
    return null;
  }
  return null;
}

export function createGalleryPayload(eventName, session, archiveType, imageIndex, imageCount, pagePath) {
  const activity_session = Number.parseInt(String(session), 10);
  const media_type = archiveType === 'photos' ? 'photo' : archiveType === 'posters' ? 'poster' : null;
  const payload = {
    activity_session,
    media_type,
    image_index: imageIndex + 1,
    image_count: imageCount,
    page_path: cleanPagePath(pagePath),
  };
  return isValidEventPayload(eventName, payload) ? payload : null;
}
