# 공정선거시민행동 홈페이지

수원 기반 시민단체를 위한 Next.js App Router 홈페이지입니다.

## 웹사이트 미리보기

<https://zzzarit-bulldozer.github.io/fair-election-civic-action/>

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
