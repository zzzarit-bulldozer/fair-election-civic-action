import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CHANNEL_URLS,
  classifyLinkInteraction,
  cleanCanonicalLocation,
  cleanPagePath,
  createGalleryPayload,
  createPageViewPayload,
  isValidEventPayload,
  isValidMeasurementId,
  trackEvent,
} from '../app/_lib/analytics.js';

const origin = 'https://right-wing.co.kr';

test('측정 ID와 정적 페이지 경로만 허용한다', () => {
  assert.equal(isValidMeasurementId('G-MELD7012VE'), true);
  assert.equal(isValidMeasurementId('UA-123'), false);
  assert.equal(isValidMeasurementId('G-bad-id'), false);
  assert.equal(cleanPagePath('/news?utm_source=test#top'), '/news');
  assert.equal(cleanPagePath('/unlisted'), null);
});

test('수동 page_view는 canonical origin과 pathname만 보낸다', () => {
  const payload = createPageViewPayload(origin, '/history?source=private#session-3');
  assert.deepEqual(payload, { page_location: 'https://right-wing.co.kr/history', page_path: '/history' });
  assert.equal(cleanCanonicalLocation(origin, '/news?email=a@example.com'), 'https://right-wing.co.kr/news');
});

test('CTA와 공식 가입 채널만 고정 필드로 분류한다', () => {
  assert.deepEqual(classifyLinkInteraction({
    href: '/join?from=header', hasPrimaryCta: false, location: 'header', pagePath: '/', origin,
  }), {
    eventName: 'cta_click', payload: { location: 'header', destination: '/join', page_path: '/' },
  });
  assert.deepEqual(classifyLinkInteraction({
    href: 'https://invite.kakao.com/tc/MqzolmVhza?from=join', hasPrimaryCta: true, location: 'content', pagePath: '/join', origin,
  }), {
    eventName: 'join_channel_click', payload: { channel: 'kakao', location: 'content', page_path: '/join' },
  });
  assert.deepEqual(classifyLinkInteraction({
    href: 'https://www.threads.com/@fairly_evenly?hl=ko#profile', hasPrimaryCta: false, location: 'content', pagePath: '/news', origin,
  }), {
    eventName: 'join_channel_click', payload: { channel: 'threads', location: 'content', page_path: '/news' },
  });
  assert.equal(classifyLinkInteraction({
    href: 'https://example.com/?email=a@example.com', hasPrimaryCta: false, location: 'content', pagePath: '/news', origin,
  }), null);
  assert.equal(CHANNEL_URLS.size, 2);
});

test('갤러리와 필터 payload는 숫자와 허용 목록만 보낸다', () => {
  assert.deepEqual(createGalleryPayload('gallery_open', '23회차', 'photos', 0, 34, '/history'), {
    activity_session: 23, media_type: 'photo', image_index: 1, image_count: 34, page_path: '/history',
  });
  assert.deepEqual(createGalleryPayload('gallery_image_view', '2회차', 'posters', 1, 2, '/history'), {
    activity_session: 2, media_type: 'poster', image_index: 2, image_count: 2, page_path: '/history',
  });
  assert.equal(createGalleryPayload('gallery_open', '알 수 없음', 'photos', 0, 1, '/history'), null);
  assert.equal(isValidEventPayload('news_filter_change', {
    filter_id: 'direct', result_count: 4, page_path: '/news',
  }), true);
  assert.equal(isValidEventPayload('news_filter_change', {
    filter_id: 'custom text', result_count: 4, page_path: '/news',
  }), false);
  assert.equal(isValidEventPayload('news_filter_change', {
    filter_id: 'direct', result_count: 4, page_path: '/news?email=a@example.com',
  }), false);
});

test('검증되지 않은 키, PII, 잘못된 ID는 gtag으로 전달하지 않는다', () => {
  const calls = [];
  const gtag = (...args) => calls.push(args);
  assert.equal(trackEvent('cta_click', {
    location: 'home', destination: '/join', page_path: '/', label: '홍길동',
  }, 'G-MELD7012VE', gtag), false);
  assert.equal(trackEvent('cta_click', {
    location: 'home', destination: '/join', page_path: '/',
  }, 'G-not-valid', gtag), false);
  assert.equal(trackEvent('cta_click', {
    location: 'home', destination: '/join', page_path: '/',
  }, 'G-MELD7012VE', gtag), true);
  assert.deepEqual(calls, [[
    'event', 'cta_click', { location: 'home', destination: '/join', page_path: '/' },
  ]]);
});

test('문서 위임 리스너는 capture로 등록하고 cleanup하며 갤러리 선택을 단일 경로로 처리한다', async () => {
  const { readFile } = await import('node:fs/promises');
  const [analyticsComponent, gallery] = await Promise.all([
    readFile(new URL('../app/_components/GoogleAnalytics.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/_components/PosterGallery.jsx', import.meta.url), 'utf8'),
  ]);

  assert.match(analyticsComponent, /document\.addEventListener\('click', onDocumentClick, true\)/);
  assert.match(analyticsComponent, /document\.removeEventListener\('click', onDocumentClick, true\)/);
  assert.doesNotMatch(analyticsComponent, /preventDefault/);
  assert.match(analyticsComponent, /page_referrer: ''/);
  assert.match(analyticsComponent, /page_title: ''/);
  assert.ok(analyticsComponent.includes("window.gtag('config', measurementId"));
  assert.match(gallery, /current === index \? current : index/);
  assert.match(gallery, /trackGallery\('gallery_open'/);
  assert.match(gallery, /trackGallery\('gallery_image_view'/);
  assert.match(gallery, /selectImage\(\(lightboxIndexRef\.current \+ 1\)/);
});
