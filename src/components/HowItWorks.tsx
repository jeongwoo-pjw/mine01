'use client';
import { QrCode, PenLine, Wand2, Download } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: QrCode,
    title: 'QR 스캔 또는 업로드',
    desc: 'QR 코드를 스마트폰으로 스캔하거나, 손글씨 이미지를 직접 업로드하세요.',
  },
  {
    num: '02',
    icon: PenLine,
    title: '템플릿 작성',
    desc: '제공된 템플릿 시트에 손글씨로 정해진 글자들을 자연스럽게 채워 넣습니다.',
  },
  {
    num: '03',
    icon: Wand2,
    title: 'AI 자동 변환',
    desc: 'AI가 손글씨를 분석해 고품질 벡터 폰트를 약 3~5분 내에 자동 생성합니다.',
  },
  {
    num: '04',
    icon: Download,
    title: '폰트 다운로드',
    desc: '완성된 폰트를 OTF·TTF·웹폰트 형식으로 즉시 다운로드하여 사용하세요.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '100px 24px', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-badge">사용 방법</div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginTop: 12,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
          }}>
            단 4단계로 완성되는<br />나만의 폰트
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 0,
          position: 'relative',
        }}>
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={step.num} style={{ position: 'relative', padding: '0 16px' }}>
                {!isLast && (
                  <div style={{
                    position: 'absolute',
                    top: 36,
                    right: -4,
                    width: 32,
                    height: 2,
                    background: 'linear-gradient(90deg, var(--accent), var(--border))',
                    zIndex: 0,
                  }} className="step-line" />
                )}

                <div style={{
                  width: 72, height: 72,
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: '2px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                  boxShadow: '0 4px 16px var(--shadow)',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <Icon size={28} color="var(--accent)" strokeWidth={1.8} />
                  <div style={{
                    position: 'absolute',
                    top: -6, right: -6,
                    width: 24, height: 24,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                  }}>
                    {step.num.slice(1)}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
                  <span style={{
                    color: 'var(--accent)',
                    fontFamily: 'Caveat, cursive',
                    fontSize: '1.3rem',
                    marginRight: 6,
                    opacity: 0.6,
                  }}>
                    {step.num}
                  </span>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <a href="#start" className="btn-primary" style={{ fontSize: '1.05rem', padding: '15px 36px' }}>
            <PenLine size={20} />
            지금 바로 나만의 손글씨만들기
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) { .step-line { display: none; } }
      `}</style>
    </section>
  );
}
