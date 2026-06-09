'use client';
import { useState } from 'react';
import { PenLine, ArrowRight, Upload, ScanLine, Smartphone, Sparkles } from 'lucide-react';
import HandwritingAnimation from './HandwritingAnimation';
import dynamic from 'next/dynamic';

const QRCode = dynamic(() => import('qrcode.react').then(m => m.QRCodeSVG), { ssr: false });

export default function HeroSection() {
  const [uploadHover, setUploadHover] = useState(false);

  return (
    <section
      id="hero"
      className="notebook-bg"
      style={{
        minHeight: '100vh',
        paddingTop: 96,
        paddingBottom: 80,
        background: 'var(--bg-hero)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ── Left: Copy ─────────────────────────────── */}
          <div>
            <div className="section-badge fade-up fade-up-1">
              ✦ AI 손글씨 폰트 변환
            </div>

            <h1
              className="fade-up fade-up-2"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.18,
                marginTop: 16,
                marginBottom: 18,
                letterSpacing: '-0.025em',
              }}
            >
              나만의 손글씨를<br />
              <span
                style={{
                  background: 'linear-gradient(125deg, var(--midnight) 0%, var(--steel) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                폰트로 만들어요
              </span>
            </h1>

            <p
              className="fade-up fade-up-3"
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: 32,
                maxWidth: 440,
              }}
            >
              손글씨를 스캔하면 AI가 분석하여 나만의 고유한 필기체 폰트를
              자동 생성합니다. OTF·TTF·웹폰트로 즉시 다운로드하세요.
            </p>

            {/* Writing animation preview */}
            <div
              className="fade-up fade-up-3"
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border)',
                borderRadius: 14,
                padding: '10px 20px 6px',
                marginBottom: 30,
                boxShadow: '0 2px 12px var(--shadow)',
                maxWidth: 360,
              }}
            >
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: 2 }}>
                AI 생성 미리보기
              </div>
              <HandwritingAnimation />
            </div>

            {/* CTA */}
            <div className="fade-up fade-up-4" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="#start" className="btn-primary" style={{ fontSize: '0.97rem' }}>
                <PenLine size={17} />
                나만의 손글씨만들기
              </a>
              <a href="#gallery" className="btn-secondary" style={{ fontSize: '0.97rem' }}>
                폰트 갤러리
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Stats */}
            <div
              className="fade-up fade-up-5"
              style={{ display: 'flex', gap: 28, marginTop: 40, flexWrap: 'wrap' }}
            >
              {[
                { val: '12,000+', label: '생성된 폰트' },
                { val: '98%',     label: 'AI 정확도' },
                { val: '5분',     label: '평균 완성' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: QR + Upload (나란히) ────────────── */}
          <div
            className="fade-up fade-up-3"
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* 상단: 두 카드 나란히 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

              {/* Card 1 — QR로 바로 시작 */}
              <div style={{
                background: 'var(--accent)',
                borderRadius: 20,
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                boxShadow: '0 8px 32px rgba(28,46,80,0.28)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'rgba(255,255,255,0.80)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                }}>
                  <ScanLine size={13} />
                  QR로 바로 시작
                </div>

                {/* QR code */}
                <div
                  className="qr-pulse"
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 12,
                    padding: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <QRCode
                    value="https://jeongwoo-pjw.github.io/mine01/scan/"
                    size={120}
                    fgColor="#1C2E50"
                    bgColor="#FFFFFF"
                    level="M"
                  />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '0.75rem',
                    marginBottom: 3,
                  }}>
                    <Smartphone size={12} />
                    스마트폰으로 스캔
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                    카메라 앱으로 찍으면<br />바로 업로드 화면으로
                  </p>
                </div>
              </div>

              {/* Card 2 — 사진 업로드 */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border)',
                borderRadius: 20,
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                boxShadow: '0 4px 20px var(--shadow)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--text-muted)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                }}>
                  <Upload size={13} />
                  사진 업로드
                </div>

                {/* Drop zone */}
                <div
                  onMouseEnter={() => setUploadHover(true)}
                  onMouseLeave={() => setUploadHover(false)}
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    border: `2px dashed ${uploadHover ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    background: uploadHover ? 'var(--accent-light)' : 'var(--bg-secondary)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, background 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Scan animation bar */}
                  <div style={{
                    position: 'absolute',
                    left: '8%', right: '8%',
                    height: 2,
                    background: `linear-gradient(90deg, transparent, var(--accent), transparent)`,
                    opacity: uploadHover ? 1 : 0,
                    animation: uploadHover ? 'scanDown 1.8s ease-in-out infinite' : 'none',
                    transition: 'opacity 0.3s',
                  }} />

                  <Sparkles
                    size={28}
                    color={uploadHover ? 'var(--accent)' : 'var(--silver-ui)'}
                    style={{ transition: 'color 0.2s' }}
                  />
                  <p style={{
                    fontSize: '0.95rem',
                    color: uploadHover ? 'var(--accent)' : 'var(--text-secondary)',
                    fontFamily: 'Caveat, cursive',
                    textAlign: 'center',
                    lineHeight: 1.4,
                    transition: 'color 0.2s',
                    padding: '0 8px',
                  }}>
                    여기에 손글씨<br />이미지를 올려요
                  </p>
                  <span style={{
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                    background: 'var(--surface)',
                    padding: '2px 8px',
                    borderRadius: 4,
                  }}>
                    JPG · PNG · PDF
                  </span>
                </div>

                <button className="btn-primary" style={{
                  width: '100%',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding: '11px 16px',
                  fontSize: '0.85rem',
                }}>
                  <Upload size={14} />
                  파일 선택
                </button>
              </div>
            </div>

            {/* 하단: 분리선 + 안내 */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 2px 8px var(--shadow)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: 'var(--accent-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={17} color="var(--accent)" />
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                <strong style={{ color: 'var(--text-primary)' }}>두 가지 방법 모두 무료</strong>로 사용 가능합니다.
                손글씨 템플릿을 출력 후 작성해도 좋아요.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanDown {
          0%   { top: 10%; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { top: 82%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
