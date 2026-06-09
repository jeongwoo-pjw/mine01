# HANDY — 나만의 손글씨 폰트 만들기

> AI가 손글씨를 분석하여 세상에 하나뿐인 나만의 필기체 폰트를 만들어드립니다.

**라이브 데모 →** https://jeongwoo-pjw.github.io/mine01/

---

## 주요 기능

- **QR 스캔 업로드** — 스마트폰 카메라로 QR을 찍으면 바로 손글씨 업로드 화면으로 이동
- **사진 파일 업로드** — JPG · PNG · PDF 형식으로 직접 업로드
- **AI 폰트 생성** — 업로드된 손글씨를 AI가 분석하여 TTF/OTF 폰트 파일 자동 생성
- **폰트 갤러리** — 다양한 스타일의 손글씨 폰트 미리보기
- **AI 생성 미리보기 애니메이션** — 타이핑 효과로 다양한 손글씨 폰트를 시연
- **5가지 컬러 스킴** — 라이트/다크 모드 × 5가지 팔레트 전환
- **잉크 번짐 커서** — 1초 마우스 정지 시 캔버스 기반 잉크 번짐 효과
- **히어로 네온 스캔 라인** — 배경을 스캔하듯 가로지르는 은은한 네온 조명 효과
- **플로팅 액션 버튼(FAB)** — 히어로 이후 구간에서 나타나는 원형 확장 버튼

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16.2.7 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 + CSS Custom Properties |
| 배포 | GitHub Pages (`output: 'export'`) |
| 아이콘 | Lucide React · Google Material Symbols Outlined |
| QR 코드 | qrcode.react |
| 폰트 | Google Fonts, Naver Clova Handwriting Fonts |

---

## 컬러 스킴

| 이름 | 히어로 그라디언트 | 스캔 라인 glow |
|------|-----------------|----------------|
| **Blessing Sky** (기본) | `#FEE9BE` → `#E8FEFF` | 올리브 그린 |
| **Misty Rose** | `#FEE6E5` → `#EEEAF9` | 로즈 라벤더 |
| **Cloud Again** | `#E6E9F0` → `#EEF1F5` | 클리어 블루 |
| **Cloudy Apple** | `#F3E7E9` → `#E3EEFF` | 소프트 바이올렛 |
| **Snow Grey** | `#EBEDEE` → `#FDFBFB` | 쿨 실버 |

각 스킴은 라이트/다크 모드를 모두 지원하며, `localStorage`에 선택 값이 유지됩니다.

---

## 로컬 실행

```bash
npm install
npm run dev       # http://localhost:3000/mine01/
```

## GitHub Pages 배포

```bash
npm run build
node -e "require('fs').writeFileSync('out/.nojekyll','')"
npx gh-pages -d out --dotfiles
```

---

## 프로젝트 구조

```
src/
├── app/
│   ├── globals.css                   # 전역 스타일, 컬러 스킴, 애니메이션
│   ├── layout.tsx                    # 루트 레이아웃, 폰트 링크
│   └── page.tsx                      # 메인 페이지
└── components/
    ├── Header.tsx                    # 네비게이션, 테마 스위처
    ├── ThemeSwitcher.tsx             # 컬러 스킴 + 다크모드 토글
    ├── HeroSection.tsx               # 히어로 (QR, 업로드, 네온 스캔 라인)
    ├── HandwritingAnimation.tsx      # 타이핑 애니메이션
    ├── FountainPenCursor.tsx         # 잉크 번짐 커서 효과
    ├── FloatingActionButton.tsx      # 스크롤 감지 FAB + 부채꼴 서브버튼
    ├── FeaturesSection.tsx           # 기능 소개
    ├── FontGallery.tsx               # 폰트 갤러리
    ├── StatsSection.tsx              # 통계
    ├── StartSection.tsx              # 시작 가이드
    ├── PricingSection.tsx            # 요금제
    └── Footer.tsx                    # 푸터
```

---

## 라이선스

MIT
