# HANDY 개발일지

AI 손글씨 폰트 변환 서비스 **HANDY** 프로젝트의 개발 과정을 기록합니다.

---

## 2026-06-09 ~ 2026-06-10

### 프로젝트 개요

**HANDY**는 사용자의 손글씨를 AI로 분석하여 개인 맞춤 필기체 폰트를 생성하는 서비스입니다.  
Next.js App Router 기반의 정적 사이트로, GitHub Pages에 배포됩니다.

---

### 초기 구축

- Next.js 16.2.7 App Router + TypeScript + Tailwind CSS v4 환경 세팅
- GitHub Pages용 정적 빌드 설정 (`output: 'export'`, `basePath: '/mine01'`, `trailingSlash: true`)
- 기본 페이지 섹션 구성: Header, Hero, Features, FontGallery, Stats, Start, Pricing, Footer

---

### 컬러 스킴 시스템 설계

**설계 원칙**

- CSS custom property(`--accent`, `--bg-hero` 등)를 `html` 요소에 정의
- `data-color-scheme` attribute 부재 → Blessing Sky(`:root` 기본값)
- `data-color-scheme="X"` → 해당 스킴 변수 적용
- `[data-color-scheme="X"][data-theme="dark"]` — specificity (0,2,0)으로 per-scheme 다크 오버라이드

**구현된 5가지 스킴**

| 스킴 | 라이트 히어로 | 다크 히어로 |
|------|-------------|------------|
| Blessing Sky | `#FDDB92 → #D1FDFF` | `#181818` |
| Misty Rose | `#FEE6E5 → #EEEAF9` | `#2A1028` |
| Cloud Again | `#E6E9F0 → #EEF1F5` | `#101828` |
| Cloudy Apple | `#F3E7E9 → #E3EEFF` | `#181224` |
| Snow Grey | `#EBEDEE → #FDFBFB` | `#181A1C` |

**트러블슈팅: `--badge-text` cascade bleed**

초기 설계에서 `--badge-text`를 `:root`(Misty Rose)에만 정의했더니, 다른 스킴에서도 Misty Rose 배지 색상이 상속되는 버그가 발생했습니다. 모든 스킴에 `--badge-text: var(--accent)`를 명시적으로 선언하여 해결했습니다.

---

### Hero 섹션 구현

**레이아웃 구성**

- 좌측: 헤드카피, AI 생성 미리보기 애니메이션, CTA 버튼
- 우측: QR 카드 + 사진 업로드 카드 (2열 그리드) + 안내 인포 박스

**노트 패턴 배경**

CSS `repeating-linear-gradient`로 수평선 + 수직선을 구현했습니다.  
수직선 opacity(`--hero-pattern: 0.02`)를 극히 낮게 설정하여 노트처럼 보이도록 했습니다.

**글래스모피즘**

- `.hero-preview-box`: `backdrop-filter: blur(14px)`, `background: rgba(255,255,255,0.42)`
- `.hero-info-box`: `backdrop-filter: blur(10px)`, `background: rgba(255,255,255,0.50)`
- 스킴/다크별 색상 오버라이드 분리 적용

---

### HandwritingAnimation 컴포넌트

AI 생성 미리보기 영역에 타이핑 → 일시정지 → 지우기 사이클 애니메이션을 구현했습니다.

**최종 SAMPLES 목록**

| 텍스트 | 폰트 |
|--------|------|
| 내가 끄적이는대로 | Grandiflora One (Google) |
| Memories in Ink | Shadows Into Light (Google) |
| 손끝에서 피어나는 글씨 | Poor Story (Google) |
| Write Your Heart | Pinyon Script (Google) |
| 내가 만드는 나만의 손글씨체 | East Sea Dokdo (Google) |

폰트 선택 시 Naver Clova 손글씨 폰트도 검토했으나, 렌더링 안정성을 고려하여 Google Fonts로 통일했습니다.

---

### FountainPenCursor 컴포넌트

**구현 기능**

- 마우스 트레일: 최근 마우스 위치를 배열로 관리, `requestAnimationFrame`으로 잉크 선 드로잉
- 잉크 번짐 블롭: 마우스 정지 1초 후 캔버스에 radial gradient 블롭 생성
  - 반지름 55~90px, 최대 alpha 0.11로 은은한 효과
  - 마우스 이동 시 블롭 즉시 소멸

---

### QR Pulse 애니메이션 트러블슈팅

**문제**

Blessing Sky와 Misty Rose 라이트/다크 모드에서 QR 코드 pulse 효과가 보이지 않는 현상 발생.

**원인 분석**

QR 카드의 배경색이 `var(--accent)`로 설정되어 있습니다.  
Blessing Sky(`--accent: #aebba0`)와 Misty Rose(`--accent: #EDD6E7`)는 매우 연한 색상이어서, 기존 pulse 그림자 색상이 카드 배경색과 동일한 계열로 묻혔습니다.

Cloud Again(`#4A6090`), Cloudy Apple(`#7062A2`), Snow Grey(`#484C52`)는 진한 accent 색상이라 기본 green glow와 대비가 생겨 잘 보였습니다.

**해결**

Blessing Sky와 Misty Rose의 pulse 색상을 흰색 glow(`rgba(255,255,255,0.72)`)로 변경했습니다.  
QR 코드 박스는 항상 흰색(`#FFFFFF`)이므로, 흰색 glow가 퍼져나가는 것은 어떤 배경색에서도 자연스럽게 보입니다. 라이트/다크 모두 동일하게 적용했습니다.

---

### 버튼 가독성 문제 해결

Blessing Sky와 Misty Rose의 연한 accent 색상이 `.btn-primary` 배경색으로 사용될 때, 기본 흰색 텍스트가 거의 보이지 않는 문제가 있었습니다.

**해결**: 스킴별 텍스트 색상 오버라이드 추가

```css
html:not([data-color-scheme]) .btn-primary { color: #2C3C20; }
[data-color-scheme="mistyrose"] .btn-primary { color: #3D1E38; }
```

---

### 파비콘 제작

Blessing Sky 키컬러(`#FDDB92 → #D1FDFF`)를 배경으로, 심플한 만년필 형태의 SVG 아이콘을 제작했습니다.

- 32×32 viewport, 둥근 모서리(`rx="7"`) 사각형 배경
- 펜 바디: `-40deg` 회전, 다크 그린(`#3E5830`) 계열
- 광택 효과: 반투명 흰색 세로 선

---

### 배포 환경

| 항목 | 설정 |
|------|------|
| 빌드 타겟 | `output: 'export'` (정적 HTML) |
| 배포 브랜치 | `gh-pages` |
| basePath | `/mine01` |
| Jekyll 비활성화 | `out/.nojekyll` |

배포 명령어:
```bash
npm run build
node -e "require('fs').writeFileSync('out/.nojekyll','')"
npx gh-pages -d out --dotfiles
```

---

## 2026-06-10 (추가 개발)

### 플로팅 액션 버튼(FAB)

히어로 섹션을 벗어난 뒤 퀵 액세스 수단을 제공하기 위해 FAB를 추가했습니다.

**동작 설계**

- `scrollY > window.innerHeight × 0.75` 조건으로 `opacity` 페이드인/아웃
- 히어로로 돌아가면 메뉴 자동 닫힘
- 데스크톱: `onMouseEnter/Leave`로 열기/닫기, 모바일: 탭으로 토글

**서브버튼 부채꼴 배치**

메인 FAB(56×56px) 중심에서 반경 80px, 세 방향으로 전개됩니다.

| 버튼 | 아이콘 | 방향 | translate |
|---|---|---|---|
| QR 스캔 | `qr_code_2` | 위 | `(0, -80px)` |
| 사진 업로드 | `upload` | 좌상 | `(-57px, -57px)` |
| 폰트 검색 | `search` | 좌 | `(-80px, 0)` |

열릴 때는 `cubic-bezier(0.34,1.56,0.64,1)` 스프링 바운스, 닫힐 때는 역순 stagger로 자연스럽게 접힙니다.

**컬러 처리**

메인 FAB 배경은 `var(--accent)` 공통 사용. 아이콘 색은 스킴별 accent 밝기에 따라 별도 오버라이드:
- Blessing Sky / Misty Rose (연한 accent) → 어두운 아이콘
- Cloud Again / Cloudy Apple / Snow Grey (진한 accent) → 흰 아이콘

---

### 히어로 네온 스캔 라인 효과

손글씨·폰트 서비스 특유의 스캐닝 감성을 시각화하기 위해 히어로 배경에 수직 neon 라인 효과를 추가했습니다.

**구현**

- 90px 너비 div에 `linear-gradient(to right, ...)` 적용 — 양끝 투명, 중앙 흰빛 피크
- `@keyframes heroScanSwipe` : `translateX(-90px) → translateX(calc(100vw + 90px))`
- 7초 주기: 스캔 5.5초 + 정지 1.5초
- `will-change: transform` + 부모 `overflow: hidden` 클리핑으로 성능 확보

**스킴별 glow 색상 및 투명도**

라이트 모드는 흰색 중심 + 컬러 배광(peak 0.31), 다크 모드는 컬러 glow 주도 + 흰색 센터(peak 0.30).

| 스킴 | glow 색상 | 특이사항 |
|---|---|---|
| Blessing Sky | `rgb(162,182,138)` 올리브 그린 | accent `#aebba0`와 동일 계열 |
| Misty Rose | `rgb(218,138,200)` 로즈 라벤더 | — |
| Cloud Again | `rgb(78,130,214)` 클리어 블루 | — |
| Cloudy Apple | `rgb(138,106,224)` 소프트 바이올렛 | — |
| Snow Grey | `rgb(152,156,172)` 쿨 실버 | — |

**아이콘 라이브러리 전환 이슈**

초기에 Font Awesome으로 서브버튼 아이콘을 교체했다가, 기존 Material Symbols의 시각적 완성도가 더 높다는 판단으로 즉시 롤백했습니다. 결과적으로 Material Symbols Outlined(wght 300, FILL 0)를 유지하고, upload / search 아이콘만 교체했습니다.

---

### Blessing Sky 파인튜닝

히어로 그라디언트를 채도·명도를 낮추는 방향으로 3단계 조정했습니다.

| 단계 | 컬러 |
|---|---|
| 초기 | `#FDDB92 → #D1FDFF` |
| 1차 조정 | `#FEF4DE → #E8FEFF` |
| 최종 | `#FEE9BE → #E8FEFF` |

채도를 낮춰 크림빛 톤을 강화하고, 우측 아쿠아(`#E8FEFF`)와의 온도 차이를 자연스럽게 유지했습니다.

스캔 라인 glow도 초기 스카이 시안에서 포인트 컬러(올리브 그린 계열)로 변경하여 배경 컬러 톤과의 통일감을 높였습니다.

---

## 2026-06-10 (커뮤니티 게시판 + 인증 시스템)

### 개요

기존 랜딩 페이지에 커뮤니티 기능을 추가했습니다. 별도 백엔드 서버 없이 Supabase를 활용하여 인증·데이터·권한 관리를 모두 처리합니다.

**기술 선택 이유**

| 항목 | 선택 | 이유 |
|------|------|------|
| DB | Supabase | GitHub Pages 정적 배포 환경에서 별도 서버 불필요 |
| 인증 | Supabase Auth | 이메일 + OAuth 통합 지원 |
| 보안 | RLS | 서버 측 권한 강제, 클라이언트 우회 불가 |
| 소셜 | 카카오 OAuth | 국내 사용자 편의성 |

---

### DB 설계

기존 start04 프로젝트의 Supabase 프로젝트를 공유합니다. 테이블 구조는 그대로 사용하고 사이트만 추가됩니다.

**posts 테이블**

```sql
CREATE TABLE public.posts (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  content      text NOT NULL,
  board_type   text NOT NULL DEFAULT 'general'
               CHECK (board_type IN ('general', 'qna', 'notice')),
  author_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_email text NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);
```

**profiles 테이블**

```sql
CREATE TABLE public.profiles (
  id       uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_admin boolean NOT NULL DEFAULT false
);
```

---

### RLS 정책 설계

`board_type` + 로그인 여부 + `is_admin` 조합으로 3가지 게시판의 쓰기 권한을 서버에서 강제합니다.

| 정책 | 명령 | 조건 |
|------|------|------|
| `posts_select_all` | SELECT | 누구나 |
| `posts_insert_general_qna` | INSERT | 로그인 + board_type IN (general, qna) |
| `posts_insert_notice` | INSERT | 로그인 + board_type = notice + is_admin = true |
| `posts_update_own` | UPDATE | auth.uid() = author_id |
| `posts_delete_own` | DELETE | auth.uid() = author_id |

---

### 카카오 OAuth 연동

**연동 과정**

Supabase → 카카오 개발자 콘솔 설정의 흐름은 아래와 같습니다.

```
Supabase Auth → kauth.kakao.com → accounts.kakao.com/login
```

**트러블슈팅: KOE205 "잘못된 요청" 오류 (start04에서 해결)**

| 원인 후보 | 결과 |
|---|---|
| redirect_uri 불일치 | ✅ 정상 |
| Client ID 오류 | ✅ 정상 |
| Client Secret 오류 | ❌ REST API key를 두 곳에 입력 → 수정 |
| OpenID Connect 비활성화 | ❌ 미활성화 → Kakao 콘솔에서 활성화 |
| Skip nonce check | ❌ 미설정 → Supabase에서 활성화 |
| 동의항목 미설정 | ❌ account_email 등 미설정 → 설정 완료 |

OpenID Connect 활성화가 핵심 해결책이었습니다. Supabase Kakao 프로바이더는 OIDC 방식으로 동작하므로 Kakao 콘솔의 OpenID Connect 활성화가 필수입니다.

---

### 라우팅 구조 (정적 빌드 제약)

Next.js `output: 'export'` 환경에서 동적 라우트(`/board/[id]`)는 `generateStaticParams` 없이 빌드할 수 없습니다. 게시글은 사용자가 동적으로 생성하므로 사전 빌드가 불가능합니다.

**해결**: 쿼리 파라미터 방식 채택

```
/board/post?id=<uuid>   ← 동적 라우트 대신 쿼리 파라미터 사용
/board/write?type=qna   ← 게시판 타입 전달
/board/write?id=<uuid>  ← 수정 시 게시글 ID 전달
```

모든 데이터 로드는 `useEffect` 내부 클라이언트 사이드 fetch로 처리합니다.

---

### useSearchParams Suspense 처리

Next.js App Router에서 `useSearchParams()`는 반드시 `<Suspense>` 바운더리 안에서 사용해야 합니다. 각 페이지를 두 계층으로 분리했습니다.

```tsx
// 데이터를 실제로 사용하는 내부 컴포넌트
function BoardContent() {
  const type = useSearchParams().get('type') ?? 'general'
  // ...
}

// 페이지 진입점 — Suspense로 감싸기
export default function BoardPage() {
  return (
    <Suspense fallback={<LoadingView />}>
      <BoardContent />
    </Suspense>
  )
}
```

---

### Header Board 드롭다운

기존 단순 링크 구조에서 **Board** 메뉴 항목 + 호버 드롭다운으로 변경했습니다.

- `onMouseEnter/Leave`로 드롭다운 열기/닫기
- `useRef` + `mousedown` 이벤트로 외부 클릭 시 닫기
- `ChevronDown` 아이콘이 열림 상태에서 180° 회전
- 모바일 메뉴에서는 하위 목록으로 표시

---

### 인증 상태에 따른 Header 변화

| 상태 | 버튼 |
|------|------|
| 비로그인 | 로그인 버튼 → `/login` |
| 로그인 | 로그아웃 버튼 → `sb.auth.signOut()` 후 홈으로 이동 |

`useAuth` 훅이 `onAuthStateChange`를 구독하여 탭 간 세션 동기화를 유지합니다.

---

### 최종 페이지 라우트

| 경로 | 설명 | 접근 |
|------|------|------|
| `/` | 메인 랜딩 | 전체 |
| `/login` | 로그인/회원가입 | 전체 (로그인 시 /board로 리다이렉트) |
| `/board?type=notice` | 공지사항 목록 | 전체 |
| `/board?type=qna` | Q&A 목록 | 전체 |
| `/board?type=general` | 자유게시판 목록 | 전체 |
| `/board/write?type=...` | 게시글 작성 | 로그인 필요 |
| `/board/write?id=...` | 게시글 수정 | 작성자 본인 |
| `/board/post?id=...` | 게시글 상세 | 전체 |

---

### 향후 과제

- [ ] 실제 AI 손글씨 분석 백엔드 연동
- [ ] 손글씨 템플릿 PDF 다운로드 기능
- [ ] 폰트 미리보기 커스텀 텍스트 입력
- [ ] 모바일 반응형 레이아웃 개선
- [ ] 업로드 → 분석 → 다운로드 전체 플로우 구현
- [ ] FAB 서브버튼 실제 기능 연결 (QR 생성, 파일 업로드, 검색 페이지)
- [ ] 게시판 검색 기능
- [ ] 게시글 댓글 기능
