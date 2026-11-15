# 경기우파청년들 홈페이지

경기우파청년들과 첫 시민행동인 공정선거시민행동의 기록·참여를 연결하는 Next.js App Router 홈페이지입니다.

## 웹사이트 미리보기

<https://right-wing.co.kr/>

## 실행

```bash
npm install
npm run dev
```

## 정적 배포용 빌드

```bash
npm run build
```

`main` 브랜치에 푸시하면 GitHub Actions가 테스트와 정적 빌드를 실행하고 GitHub Pages에 자동 배포합니다.

## Google Analytics 4

저장소 설정의 Actions 변수 `GA_MEASUREMENT_ID`에 `G-`로 시작하는 GA4 측정 ID를 등록하면 다음 배포부터 페이지 조회가 수집됩니다. ID가 없거나 형식이 올바르지 않으면 분석 스크립트는 로드되지 않습니다.

## 검색·AI 답변 엔진 최적화(GEO)

- `app/_data/content.js`의 `faqs`: 단체의 시작·정체성·참여 방법을 질문-답변 형태로 정리한 단일 출처입니다. 단체 소개 페이지의 FAQ, `FAQPage` JSON-LD, `/llms.txt`가 모두 이 값을 씁니다.
- `app/llms.txt/route.js`: AI 답변 엔진용 요약과 페이지·보도 링크를 `/llms.txt`로 내보냅니다.
- `app/robots.js`: 일반 검색과 주요 AI 크롤러를 명시적으로 허용합니다.
- 답변에는 이 저장소와 외부 보도로 확인되는 사실만 씁니다.

## 게시 전 교체할 정보

- 공식 대표 이메일과 SNS 채널
- 창립총회에서 확정한 조직 명칭과 담당자
- 추가 활동 사진과 연혁
- 추가 보도 및 보도자료 링크

## 구조

- `app/page.jsx`: 서버 렌더링되는 홈페이지 콘텐츠
- `app/_components/`: 메뉴와 스크롤 모션 등 작은 클라이언트 컴포넌트
- `app/globals.css`: 반응형 디자인 시스템
- `public/`: 이미지와 파비콘

### 맞춤 이벤트와 개인정보 최소화

페이지 조회는 App Router의 pathname 변경 때만 수동으로 전송합니다. `page_location`은 현재 배포 origin과 공개 고정 pathname으로 만들고, `page_path`는 공개 고정 경로만 허용합니다. 쿼리·해시는 제거하며, pathname마다 GA 설정에서 `page_referrer`는 빈 값으로 덮어쓰고 `page_title`은 사용자·원문 제목이 아닌 고정 안전 경로명으로만 보냅니다. 맞춤 이벤트에도 같은 clean location과 설정을 명시해 전송합니다. GA4의 자동 history 측정은 관리 화면에서 끈 상태를 유지하고, Google signals 및 광고 개인화 신호도 비활성화합니다.

| 이벤트 | 전송 시점 | 필드 |
| --- | --- | --- |
| `cta_click` | 내부 `/join` 링크 또는 내부 기본 CTA 클릭 | `location`, `destination`, `page_path` |
| `join_channel_click` | 공식 카카오 초대 또는 공식 Threads 프로필 클릭 | `channel` (`kakao`/`threads`), `location`, `page_path` |
| `gallery_open` | 회차별 포스터·사진 확대 보기 열기 | `activity_session`, `media_type`, `image_index`, `image_count`, `page_path` |
| `gallery_image_view` | 확대 보기의 실제 이미지 선택 변경, 또는 열릴 때의 첫 이미지 | `activity_session`, `media_type`, `image_index`, `image_count`, `page_path` |
| `news_filter_change` | 다른 언론보도 필터 선택 | `filter_id`, `result_count`, `page_path` |

`location`은 `header`, `footer`, `home`, `content`, `menu` 중 하나이며, `destination`은 `/join`만 전송합니다. 이미지 URL·대체 텍스트·사용자 입력·링크 원문·쿼리 문자열은 이 맞춤 이벤트로 전송하지 않습니다. 일반 외부 링크는 기존 GA4 향상된 측정의 자동 외부 클릭 수집(`link_url` 등)에 맡기며, 이 구현은 중복 맞춤 이벤트를 만들지 않습니다.

`join_channel_click`은 **가입 또는 참여 완료가 아니라 공식 채널 링크 클릭**만 뜻합니다. 가입 완료율을 보려면 채널에서 별도의 동의된 전환 측정이 필요합니다.

GA4 관리 화면에서 `location`, `destination`, `channel`, `media_type`, `activity_session`, `filter_id`를 이벤트 범위 맞춤 측정기준으로 등록하고, 필요하면 `image_index`, `image_count`, `result_count`, `page_path`도 이벤트 매개변수 보고용 맞춤 측정기준으로 등록합니다. 탐색 보고서에서는 `cta_click`을 위치별로, `join_channel_click`을 채널별로, 갤러리 이벤트를 회차·매체별로, `news_filter_change`를 필터와 결과 수별로 비교합니다.
