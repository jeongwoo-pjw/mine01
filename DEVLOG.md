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

### 향후 과제

- [ ] 실제 AI 손글씨 분석 백엔드 연동
- [ ] 손글씨 템플릿 PDF 다운로드 기능
- [ ] 폰트 미리보기 커스텀 텍스트 입력
- [ ] 모바일 반응형 레이아웃 개선
- [ ] 업로드 → 분석 → 다운로드 전체 플로우 구현
