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
