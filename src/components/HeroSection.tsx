'use client';
import { PenLine, ArrowRight, Download, Sparkles } from 'lucide-react';
import HandwritingAnimation from './HandwritingAnimation';
import QRSection from './QRSection';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="notebook-bg"
      style={{
        minHeight: '100vh',
        paddingTop: 100,
        paddingBottom: 80,
        background: 'var(--bg-hero)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 60,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Left — Text Content */}
          <div>
            <div className="section-badge fade-up fade-up-1" style={{ marginBottom: 20 }}>
              ✨ AI 손글씨 폰트 변환
            </div>

            <h1 className="fade-up fade-up-2" style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.18,
              marginBottom: 20,
              letterSpacing: '-0.02em',
            }}>
              나만의 손글씨를<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--mocha), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                폰트로 만들어요
              </span>
            </h1>

            <p className="fade-up fade-up-3" style={{
              fontSize: '1.08rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.72,
              marginBottom: 36,
              maxWidth: 460,
            }}>
              손글씨를 스캔하면 AI가 분석하여 나만의 고유한 필기체 폰트를 자동 생성합니다.
              OTF·TTF·웹폰트 형식으로 즉시 다운로드하고 어디서든 활용하세요.
            </p>

            {/* Handwriting animation */}
            <div className="fade-up fade-up-3" style={{
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              borderRadius: 16,
              padding: '8px 20px',
              marginBottom: 32,
              boxShadow: '0 2px 12px var(--shadow)',
              maxWidth: 380,
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 2, fontWeight: 500 }}>
                AI가 생성 중...
              </div>
              <HandwritingAnimation />
            </div>

            {/* CTA Buttons */}
            <div className="fade-up fade-up-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#start"
                className="btn-primary"
                style={{ fontSize: '1rem' }}
              >
                <PenLine size={18} />
                나만의 손글씨만들기
              </a>
              <a
                href="#gallery"
                className="btn-secondary"
              >
                폰트 갤러리 보기
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Stats */}
            <div className="fade-up fade-up-5" style={{
              display: 'flex', gap: 32, marginTop: 44, flexWrap: 'wrap',
            }}>
              {[
                { val: '12,000+', label: '생성된 폰트' },
                { val: '98%', label: '정확도' },
                { val: '5분', label: '평균 완성 시간' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--mocha)', lineHeight: 1 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — QR + Mockup */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, position: 'relative', zIndex: 1 }}>
            {/* Phone mockup */}
            <div style={{
              width: '100%',
              maxWidth: 340,
              background: 'var(--bg-card)',
              borderRadius: 28,
              border: '1.5px solid var(--border)',
              boxShadow: '0 20px 60px var(--shadow-md)',
              overflow: 'hidden',
            }}>
              {/* Phone top bar */}
              <div style={{
                background: 'var(--surface)',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#FF6058','#FFBE2E','#2CC840'].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  handfont.app/scan
                </span>
              </div>

              {/* Scan area */}
              <div style={{ padding: '32px 28px', textAlign: 'center' }}>
                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, var(--bg-secondary), var(--cappuccino) 60%)',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  border: '2px dashed var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Scan lines */}
                  <div style={{
                    position: 'absolute',
                    top: '20%', left: '10%', right: '10%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                    animation: 'scanDown 2s ease-in-out infinite',
                  }} />

                  <div style={{ textAlign: 'center' }}>
                    <Sparkles size={36} color="var(--mocha)" style={{ opacity: 0.6, marginBottom: 8 }} />
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontFamily: 'Caveat, cursive' }}>
                      손글씨를 여기에 올려주세요
                    </p>
                  </div>
                </div>

                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', borderRadius: 12, fontSize: '0.92rem' }}>
                  <Download size={16} />
                  사진 업로드
                </button>
              </div>
            </div>

            {/* QR Code */}
            <QRSection />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanDown {
          0%   { top: 15%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 75%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
